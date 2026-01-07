# NutriScan — Pakistani Food Nutrition Tracker

**AI-powered nutrition tracking with comprehensive Pakistani food database**

The ONLY app with accurate nutrition data for Pakistani dishes like biryani, karahi, nihari, haleem, and more.

---

## 🇵🇰 Why NutriScan?

**Problem:** MyFitnessPal and other apps have terrible data for Pakistani foods. When you eat desi food, you're guessing at nutrition.

**Solution:** NutriScan has a comprehensive database of 25+ Pakistani dishes with accurate nutrition data, plus AI recognition for when you're eating out.

---

## ✨ Features

### 🍛 **Comprehensive Pakistani Food Database**
- **Main Dishes:** Biryani, Pulao, Karahi, Nihari, Haleem, Korma, Chana Masala
- **Breads:** Naan, Roti, Paratha
- **BBQ:** Tikka, Seekh Kebab, Shami Kebab
- **Snacks:** Samosa, Pakora
- **Beverages:** Chai, Lassi
- **Desserts:** Halwa

### 📸 **AI Food Recognition**
- Scan your meal with camera
- AI identifies Pakistani dishes
- Manual search if AI misses

### 📊 **Nutrition Tracking**
- Calories, Protein, Carbs, Fat
- Micronutrients (Iron, Vitamins, etc.)
- Daily progress tracking
- Meal history

### 🎯 **Portion Size Adjuster**
- Adjust servings (0.25x to 5x)
- Real-time nutrition recalculation
- Preset sizes (Small, Regular, Large, X-Large)

---

## 🛠️ Tech Stack

| Frontend | Backend | AI/ML |
|----------|---------|-------|
| React 18 | Node.js + Express | TensorFlow.js |
| Framer Motion | SQLite | MobileNet v2 |
| Recharts | REST API | Custom Food DB |

---

## 🚀 Quick Start

### Local Development

```bash
# Clone the repo
git clone https://github.com/masifmuhammad/NutriScan.git
cd NutriScan

# Install dependencies
npm install
npm run install:all

# Start development servers
npm run dev
```

**Frontend:** http://localhost:3000  
**Backend:** http://localhost:5000

### Deploy to Production (Free)

See [DEPLOYMENT.md](./DEPLOYMENT.md) for step-by-step instructions to deploy on:
- **Vercel** (Frontend) - Free, unlimited
- **Railway** (Backend) - Free tier available
- **Render** (Backend alternative) - Free tier available

---

## 📱 How to Use

1. **Scan Food** → Take photo or upload image
2. **AI Identifies** → Recognizes Pakistani dishes
3. **Adjust Portion** → Set serving size
4. **Log Meal** → Track your nutrition
5. **View Progress** → See daily/weekly stats

---

## 🍽️ Supported Pakistani Foods

### Main Dishes
- Chicken/Mutton Biryani
- Chicken/Mutton Karahi
- Beef Nihari
- Haleem
- Chicken Korma
- Chana Masala
- Dal Tadka
- Chicken Pulao

### Breads
- Naan
- Roti/Chapati
- Aloo Paratha

### BBQ & Grilled
- Chicken Tikka
- Seekh Kebab

### Snacks
- Samosa
- Pakora

### Beverages
- Chai (Pakistani Tea)
- Lassi

### Desserts
- Sooji Halwa

---

## 📊 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/scan` | Analyze food image |
| POST | `/api/manual-select` | Select food manually |
| GET | `/api/stats/today` | Get today's nutrition |
| GET | `/api/history` | Get meal history |
| POST | `/api/log/:scanId` | Log a meal |

---

## 🎯 Perfect For

- **Pakistani families** tracking nutrition
- **Health-conscious desis** eating out
- **Anyone** who eats Pakistani food regularly
- **Real-world testing** in Pakistan

---

## 💡 What Makes This Different

| Feature | MyFitnessPal | NutriScan |
|---------|--------------|-----------|
| Pakistani Food Data | ❌ Poor | ✅ Comprehensive |
| AI Recognition | ✅ Generic | ✅ Pakistani-focused |
| Portion Adjuster | ✅ Yes | ✅ Yes |
| Manual Search | ✅ Yes | ✅ Yes |
| Free | ❌ Premium | ✅ Free |

---

## 🧪 Skills Demonstrated

- **Full-Stack Development** — React + Node.js + Express
- **Machine Learning** — TensorFlow.js image classification
- **Database Design** — SQLite with relational schema
- **REST API** — Clean, documented endpoints
- **Real-World Application** — Built for actual use in Pakistan

---

## 📄 License

MIT License

---

## 👨‍💻 Author

**Masif Muhammad**  
[GitHub](https://github.com/masifmuhammad) • BSc Computer Science, UK

*Built specifically for Pakistani food tracking*

