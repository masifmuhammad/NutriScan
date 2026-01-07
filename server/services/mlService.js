const tf = require('@tensorflow/tfjs');
const mobilenet = require('@tensorflow-models/mobilenet');
const Jimp = require('jimp');

// Food-related categories
const FOOD_CATEGORIES = [
  // Fruits
  'orange', 'apple', 'banana', 'lemon', 'lime', 'grape', 'strawberry', 'blueberry',
  'raspberry', 'blackberry', 'cherry', 'peach', 'pear', 'plum', 'mango', 'pineapple',
  'watermelon', 'melon', 'cantaloupe', 'kiwi', 'coconut', 'fig', 'pomegranate', 
  'fruit', 'citrus', 'grapefruit', 'tangerine', 'mandarin', 'clementine',
  
  // Vegetables
  'vegetable', 'carrot', 'broccoli', 'cauliflower', 'cabbage', 'lettuce', 'spinach',
  'tomato', 'potato', 'corn', 'pea', 'bean', 'cucumber', 'pepper', 'bell pepper',
  'onion', 'garlic', 'mushroom', 'zucchini', 'eggplant', 'squash', 'pumpkin', 
  'celery', 'asparagus', 'artichoke', 'leek', 'radish', 'turnip', 'beet',
  
  // Meals & Dishes
  'plate', 'dish', 'meal', 'food', 'pizza', 'burger', 'sandwich', 'taco', 'burrito',
  'hotdog', 'hot dog', 'french fries', 'fries', 'soup', 'salad', 'pasta', 'spaghetti',
  'noodle', 'rice', 'fried rice', 'curry', 'stew', 'casserole', 'lasagna', 'ravioli',
  'cheeseburger', 'carbonara', 'guacamole', 'hummus', 'potpie', 'pot pie',
  
  // Meat & Protein
  'meat', 'steak', 'beef', 'pork', 'chicken', 'turkey', 'duck', 'lamb', 'bacon',
  'sausage', 'ham', 'fish', 'salmon', 'tuna', 'shrimp', 'lobster', 'crab', 'seafood',
  'egg', 'omelet', 'omelette', 'drumstick', 'wing', 'breast',
  
  // Bread & Baked
  'bread', 'toast', 'bagel', 'croissant', 'muffin', 'donut', 'doughnut', 'cake',
  'pie', 'cookie', 'biscuit', 'pretzel', 'waffle', 'pancake', 'crepe', 'loaf',
  
  // Dairy & Cheese
  'cheese', 'milk', 'yogurt', 'butter', 'cream', 'ice cream', 'icecream',
  
  // Snacks & Desserts
  'chocolate', 'candy', 'popcorn', 'chip', 'crisp', 'cracker', 'pudding',
  'custard', 'brownie', 'fudge', 'caramel', 'toffee',
  
  // Drinks & Beverages
  'smoothie', 'milkshake', 'juice', 'latte', 'cappuccino', 'espresso', 'coffee cup',
  'water bottle', 'pop bottle', 'soda bottle', 'cola', 'pepsi', 'coke', 'sprite',
  'beer bottle', 'wine bottle', 'beer glass', 'wine glass', 'coffee mug',
  
  // South Asian/Pakistani Foods
  'biryani', 'pulao', 'pilaf', 'pilau', 'naan', 'roti', 'chapati', 'paratha', 
  'samosa', 'pakora', 'bhajia', 'dal', 'daal', 'lentil', 'tikka', 'tandoori', 
  'korma', 'qorma', 'masala', 'chutney', 'raita', 'paneer', 'kebab', 'kabab',
  'seekh', 'shami', 'chapli', 'nihari', 'nihaari', 'haleem', 'karahi', 'kadai',
  'chana', 'chole', 'mutton', 'chai', 'tea', 'lassi', 'halwa', 'sooji',
  'gajar halwa', 'doodh patti'
];

// Things that are definitely NOT food (will reject ONLY if no food found)
const NOT_FOOD_STRICT = [
  'person', 'man', 'woman', 'boy', 'girl', 'face', 'head', 'body',
  'dog', 'cat', 'animal', 'bird', 'car', 'phone', 'laptop',
  'monitor', 'television', 'tv', 'screen',
  'candle', 'spotlight', 'lampshade', 'lamp', 'light', 'switch',
  'clock', 'curtain', 'velvet', 'screw', 'matchstick'
];

class MLService {
  constructor() {
    this.model = null;
    this.initialized = false;
  }

  async initialize() {
    if (this.initialized) return;
    
    console.log('  → Loading MobileNet model...');
    this.model = await mobilenet.load({ version: 2, alpha: 1.0 });
    this.initialized = true;
    console.log('  → Model loaded');
  }

  async classifyFood(imagePath) {
    if (!this.initialized) throw new Error('ML not initialized');

    // Load and process image
    const image = await Jimp.read(imagePath);
    
    // Auto-enhance dark images
    const brightness = this.calculateBrightness(image);
    console.log(`📸 Image brightness: ${brightness.toFixed(0)}%`);
    
    if (brightness < 40) {
      console.log('🔆 Enhancing dark image...');
      image.brightness(0.3);  // Brighten
      image.contrast(0.2);    // Add contrast
    }
    
    image.resize(224, 224);
    
    const width = image.bitmap.width;
    const height = image.bitmap.height;
    const buffer = new Float32Array(width * height * 3);
    
    let i = 0;
    image.scan(0, 0, width, height, function(x, y, idx) {
      buffer[i++] = this.bitmap.data[idx] / 255;
      buffer[i++] = this.bitmap.data[idx + 1] / 255;
      buffer[i++] = this.bitmap.data[idx + 2] / 255;
    });

    const tensor = tf.tensor3d(buffer, [height, width, 3]);
    const predictions = await this.model.classify(tensor, 10);
    tensor.dispose();

    // Process predictions
    const processed = predictions.map(p => ({
      label: this.formatLabel(p.className),
      confidence: Math.round(p.probability * 100),
      raw: p.className.toLowerCase()
    }));

    console.log('🔍 All predictions:', processed.map(p => `${p.label} (${p.confidence}%)`).join(', '));

    // IMPROVED: Check ALL predictions for food, not just the first one
    const foodResult = this.findFood(processed);
    
    if (!foodResult.found) {
      throw new Error(`NOT_FOOD: This doesn't look like food. I see "${processed[0].label}" instead. Please take a photo of your meal!`);
    }

    return {
      topPrediction: foodResult.label,
      confidence: foodResult.confidence,
      alternatives: processed.slice(0, 5),
      isFood: true
    };
  }

  findFood(predictions) {
    // First pass: Look for food in ANY of the top predictions
    for (const pred of predictions) {
      const lowerRaw = pred.raw;
      
      for (const food of FOOD_CATEGORIES) {
        if (lowerRaw.includes(food) || food.includes(lowerRaw.split(',')[0].trim())) {
          console.log(`✅ Found food: ${pred.label} (matched: ${food})`);
          return {
            found: true,
            label: pred.label,
            confidence: pred.confidence
          };
        }
      }
    }

    // Second pass: Check if top prediction is strictly NOT food
    const topPredRaw = predictions[0].raw;
    for (const notFood of NOT_FOOD_STRICT) {
      if (topPredRaw.includes(notFood)) {
        console.log(`❌ Rejected: ${predictions[0].label} (matched not-food: ${notFood})`);
        return { found: false };
      }
    }

    // Third pass: If confidence is decent and nothing matched NOT_FOOD, accept it
    // (might be food we don't have in our list)
    if (predictions[0].confidence >= 30) {
      console.log(`⚠️ Accepting unknown: ${predictions[0].label} (${predictions[0].confidence}%)`);
      return {
        found: true,
        label: predictions[0].label,
        confidence: predictions[0].confidence
      };
    }

    return { found: false };
  }

  formatLabel(className) {
    return className
      .split(',')[0]
      .split('_')
      .map(w => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');
  }

  calculateBrightness(image) {
    // Sample pixels to calculate average brightness
    let totalBrightness = 0;
    let sampleCount = 0;
    const step = 10; // Sample every 10th pixel for speed
    
    image.scan(0, 0, image.bitmap.width, image.bitmap.height, function(x, y, idx) {
      if (x % step === 0 && y % step === 0) {
        const r = this.bitmap.data[idx];
        const g = this.bitmap.data[idx + 1];
        const b = this.bitmap.data[idx + 2];
        // Perceived brightness formula
        const brightness = (0.299 * r + 0.587 * g + 0.114 * b);
        totalBrightness += brightness;
        sampleCount++;
      }
    });
    
    return (totalBrightness / sampleCount / 255) * 100;
  }
}

module.exports = new MLService();
