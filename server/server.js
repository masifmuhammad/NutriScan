const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

const { initDatabase, getDb, saveDatabase } = require('./config/database');
const mlService = require('./services/mlService');
const nutritionDb = require('./data/nutritionDb');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
};
app.use(cors(corsOptions));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// File upload config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, 'uploads')),
  filename: (req, file, cb) => cb(null, `${uuidv4()}${path.extname(file.originalname)}`)
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowed = /jpeg|jpg|png|webp/;
    if (allowed.test(path.extname(file.originalname).toLowerCase()) && allowed.test(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only images allowed'));
    }
  }
});

// =========================== ROUTES ===========================

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'NutriScan API running' });
});

// Scan food image
app.post('/api/scan', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image provided' });
    }

    const imagePath = req.file.path;
    const imageUrl = `/uploads/${req.file.filename}`;

    console.log(`🔍 Scanning: ${req.file.filename}`);

    // Run ML classification
    let mlResults;
    try {
      mlResults = await mlService.classifyFood(imagePath);
    } catch (err) {
      // Check if it's a "not food" error
      if (err.message.startsWith('NOT_FOOD:')) {
        return res.status(400).json({ 
          error: 'not_food',
          message: err.message.replace('NOT_FOOD: ', ''),
          suggestion: 'Please take a photo of food, not selfies! 😄'
        });
      }
      throw err;
    }
    
    // Get nutrition data for detected food
    const nutritionData = nutritionDb.getNutrition(mlResults.topPrediction);
    
    // Save scan result
    const scanId = uuidv4();
    const db = getDb();
    
    db.run(
      `INSERT INTO scans (id, image_url, food_name, food_category, confidence, calories, protein, carbs, fat, serving_size, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'))`,
      [scanId, imageUrl, nutritionData.name, nutritionData.category, mlResults.confidence, 
       nutritionData.calories, nutritionData.protein, nutritionData.carbs, nutritionData.fat, nutritionData.servingSize]
    );
    saveDatabase();

    res.json({
      id: scanId,
      imageUrl,
      confidence: mlResults.confidence,
      food: {
        name: nutritionData.name,
        category: nutritionData.category,
        servingSize: nutritionData.servingSize
      },
      nutrition: {
        calories: nutritionData.calories,
        protein: nutritionData.protein,
        carbs: nutritionData.carbs,
        fat: nutritionData.fat,
        micronutrients: nutritionData.micronutrients
      },
      alternatives: mlResults.alternatives
    });

  } catch (error) {
    console.error('Scan error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Log meal from scan
app.post('/api/log/:scanId', (req, res) => {
  try {
    const db = getDb();
    const scan = db.prepare('SELECT * FROM scans WHERE id = ?').get([req.params.scanId]);
    
    if (!scan) {
      return res.status(404).json({ error: 'Scan not found' });
    }

    const mealId = uuidv4();
    const mealTime = req.body.mealTime || 'lunch';
    
    db.run(
      `INSERT INTO meals (id, scan_id, meal_time, created_at)
       VALUES (?, ?, ?, datetime('now'))`,
      [mealId, req.params.scanId, mealTime]
    );
    saveDatabase();

    res.json({ message: 'Meal logged', mealId });
  } catch (error) {
    console.error('Log error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get today's stats
app.get('/api/stats/today', (req, res) => {
  try {
    const db = getDb();
    const today = new Date().toISOString().split('T')[0];
    
    const stmt = db.prepare(`
      SELECT 
        COALESCE(SUM(s.calories), 0) as calories,
        COALESCE(SUM(s.protein), 0) as protein,
        COALESCE(SUM(s.carbs), 0) as carbs,
        COALESCE(SUM(s.fat), 0) as fat
      FROM meals m
      JOIN scans s ON m.scan_id = s.id
      WHERE date(m.created_at) = ?
    `);
    stmt.bind([today]);
    
    let stats = { calories: 0, protein: 0, carbs: 0, fat: 0 };
    if (stmt.step()) {
      stats = stmt.getAsObject();
    }
    stmt.free();

    res.json(stats);
  } catch (error) {
    console.error('Stats error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get history
app.get('/api/history', (req, res) => {
  try {
    const days = parseInt(req.query.days) || 7;
    const db = getDb();
    
    const stmt = db.prepare(`
      SELECT m.id, m.meal_time, m.created_at as time, 
             s.image_url as imageUrl, s.food_name, s.food_category,
             s.calories, s.protein, s.carbs, s.fat, s.confidence
      FROM meals m
      JOIN scans s ON m.scan_id = s.id
      WHERE m.created_at >= datetime('now', '-' || ? || ' days')
      ORDER BY m.created_at DESC
      LIMIT 20
    `);
    stmt.bind([days]);
    
    const meals = [];
    while (stmt.step()) {
      const row = stmt.getAsObject();
      meals.push({
        id: row.id,
        imageUrl: row.imageUrl,
        time: row.time,
        mealTime: row.meal_time,
        food: { name: row.food_name, category: row.food_category },
        nutrition: { calories: row.calories, protein: row.protein, carbs: row.carbs, fat: row.fat },
        confidence: row.confidence
      });
    }
    stmt.free();

    res.json(meals);
  } catch (error) {
    console.error('History error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Manual food selection (when AI fails)
app.post('/api/manual-select', (req, res) => {
  try {
    const { foodId, imageUrl } = req.body;
    
    if (!foodId) {
      return res.status(400).json({ error: 'Food ID required' });
    }

    const nutritionData = nutritionDb.getNutrition(foodId);
    
    // Save to database
    const scanId = require('uuid').v4();
    const db = getDb();
    
    db.run(
      `INSERT INTO scans (id, image_url, food_name, food_category, confidence, calories, protein, carbs, fat, serving_size, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'))`,
      [scanId, imageUrl || '', nutritionData.name, nutritionData.category, 100, 
       nutritionData.calories, nutritionData.protein, nutritionData.carbs, nutritionData.fat, nutritionData.servingSize]
    );
    saveDatabase();

    res.json({
      id: scanId,
      imageUrl: imageUrl || '',
      confidence: 100,
      food: {
        name: nutritionData.name,
        category: nutritionData.category,
        servingSize: nutritionData.servingSize
      },
      nutrition: {
        calories: nutritionData.calories,
        protein: nutritionData.protein,
        carbs: nutritionData.carbs,
        fat: nutritionData.fat,
        micronutrients: nutritionData.micronutrients
      }
    });
  } catch (error) {
    console.error('Manual select error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Delete meal
app.delete('/api/meals/:id', (req, res) => {
  try {
    const db = getDb();
    db.run('DELETE FROM meals WHERE id = ?', [req.params.id]);
    saveDatabase();
    res.json({ message: 'Meal deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: err.message });
});

// Start server
(async () => {
  try {
    console.log('🍽️  Starting NutriScan...');
    await initDatabase();
    
    console.log('🧠 Loading AI models...');
    await mlService.initialize();
    
    app.listen(PORT, () => {
      console.log(`✅ Server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Startup failed:', error);
    process.exit(1);
  }
})();

