// Nutrition database with Pakistani and international foods
const nutritionData = {
  // Fruits
  'orange': {
    name: 'Orange',
    category: 'Fruit',
    servingSize: '1 medium (150g)',
    calories: 62,
    protein: 1.2,
    carbs: 15.4,
    fat: 0.2,
    micronutrients: [
      { name: 'Vitamin C', value: 70, unit: 'mg', dailyPercent: 78, icon: '🍊' },
      { name: 'Fiber', value: 3.1, unit: 'g', dailyPercent: 11, icon: '🌾' },
      { name: 'Potassium', value: 237, unit: 'mg', dailyPercent: 7, icon: '⚡' },
      { name: 'Folate', value: 40, unit: 'μg', dailyPercent: 10, icon: '💚' }
    ]
  },
  'apple': {
    name: 'Apple',
    category: 'Fruit',
    servingSize: '1 medium (180g)',
    calories: 95,
    protein: 0.5,
    carbs: 25,
    fat: 0.3,
    micronutrients: [
      { name: 'Fiber', value: 4.4, unit: 'g', dailyPercent: 16, icon: '🌾' },
      { name: 'Vitamin C', value: 8, unit: 'mg', dailyPercent: 9, icon: '🍊' },
      { name: 'Potassium', value: 195, unit: 'mg', dailyPercent: 6, icon: '⚡' },
      { name: 'Vitamin K', value: 4, unit: 'μg', dailyPercent: 3, icon: '💚' }
    ]
  },
  'banana': {
    name: 'Banana',
    category: 'Fruit',
    servingSize: '1 medium (120g)',
    calories: 105,
    protein: 1.3,
    carbs: 27,
    fat: 0.4,
    micronutrients: [
      { name: 'Potassium', value: 422, unit: 'mg', dailyPercent: 12, icon: '⚡' },
      { name: 'Vitamin B6', value: 0.4, unit: 'mg', dailyPercent: 25, icon: '💊' },
      { name: 'Vitamin C', value: 10, unit: 'mg', dailyPercent: 11, icon: '🍊' },
      { name: 'Fiber', value: 3.1, unit: 'g', dailyPercent: 11, icon: '🌾' }
    ]
  },
  'soda': {
    name: 'Cola Soda',
    category: 'Beverage',
    servingSize: '1 bottle (500ml)',
    calories: 210,
    protein: 0,
    carbs: 58,
    fat: 0,
    micronutrients: [
      { name: 'Sugar', value: 58, unit: 'g', dailyPercent: 116, icon: '🍬' },
      { name: 'Sodium', value: 75, unit: 'mg', dailyPercent: 3, icon: '🧂' },
      { name: 'Caffeine', value: 64, unit: 'mg', dailyPercent: 16, icon: '☕' },
      { name: 'Carbs', value: 58, unit: 'g', dailyPercent: 19, icon: '🌾' }
    ]
  },

  // Pakistani Foods
  'biryani': {
    name: 'Chicken Biryani',
    category: 'Pakistani',
    servingSize: '1 plate (350g)',
    calories: 450,
    protein: 28,
    carbs: 52,
    fat: 14,
    micronutrients: [
      { name: 'Iron', value: 3.2, unit: 'mg', dailyPercent: 18, icon: '🔴' },
      { name: 'Vitamin B12', value: 1.8, unit: 'μg', dailyPercent: 75, icon: '💊' },
      { name: 'Sodium', value: 890, unit: 'mg', dailyPercent: 39, icon: '🧂' },
      { name: 'Fiber', value: 3, unit: 'g', dailyPercent: 11, icon: '🌾' }
    ]
  },
  'karahi': {
    name: 'Chicken Karahi',
    category: 'Pakistani',
    servingSize: '1 serving (250g)',
    calories: 380,
    protein: 32,
    carbs: 8,
    fat: 24,
    micronutrients: [
      { name: 'Protein', value: 32, unit: 'g', dailyPercent: 64, icon: '💪' },
      { name: 'Vitamin A', value: 180, unit: 'μg', dailyPercent: 20, icon: '👁️' },
      { name: 'Iron', value: 2.8, unit: 'mg', dailyPercent: 16, icon: '🔴' },
      { name: 'Calcium', value: 45, unit: 'mg', dailyPercent: 4, icon: '🦴' }
    ]
  },
  'nihari': {
    name: 'Beef Nihari',
    category: 'Pakistani',
    servingSize: '1 bowl (300g)',
    calories: 520,
    protein: 35,
    carbs: 12,
    fat: 38,
    micronutrients: [
      { name: 'Iron', value: 5.2, unit: 'mg', dailyPercent: 29, icon: '🔴' },
      { name: 'Zinc', value: 8, unit: 'mg', dailyPercent: 73, icon: '⚡' },
      { name: 'B12', value: 4.5, unit: 'μg', dailyPercent: 188, icon: '💊' },
      { name: 'Collagen', value: 8, unit: 'g', dailyPercent: 40, icon: '✨' }
    ]
  },
  'paratha': {
    name: 'Aloo Paratha',
    category: 'Pakistani',
    servingSize: '1 piece (120g)',
    calories: 280,
    protein: 6,
    carbs: 38,
    fat: 12,
    micronutrients: [
      { name: 'Carbs', value: 38, unit: 'g', dailyPercent: 13, icon: '🌾' },
      { name: 'Potassium', value: 320, unit: 'mg', dailyPercent: 9, icon: '⚡' },
      { name: 'Fiber', value: 2.5, unit: 'g', dailyPercent: 9, icon: '🌿' },
      { name: 'Vitamin C', value: 8, unit: 'mg', dailyPercent: 9, icon: '🍊' }
    ]
  },
  'dal': {
    name: 'Dal Tadka',
    category: 'Pakistani',
    servingSize: '1 bowl (200g)',
    calories: 180,
    protein: 12,
    carbs: 28,
    fat: 4,
    micronutrients: [
      { name: 'Fiber', value: 8, unit: 'g', dailyPercent: 29, icon: '🌾' },
      { name: 'Iron', value: 3.5, unit: 'mg', dailyPercent: 19, icon: '🔴' },
      { name: 'Folate', value: 180, unit: 'μg', dailyPercent: 45, icon: '💚' },
      { name: 'Protein', value: 12, unit: 'g', dailyPercent: 24, icon: '💪' }
    ]
  },
  'haleem': {
    name: 'Haleem',
    category: 'Pakistani',
    servingSize: '1 bowl (300g)',
    calories: 420,
    protein: 22,
    carbs: 45,
    fat: 18,
    micronutrients: [
      { name: 'Protein', value: 22, unit: 'g', dailyPercent: 44, icon: '💪' },
      { name: 'Iron', value: 4.2, unit: 'mg', dailyPercent: 23, icon: '🔴' },
      { name: 'Fiber', value: 6, unit: 'g', dailyPercent: 21, icon: '🌾' },
      { name: 'Zinc', value: 3.5, unit: 'mg', dailyPercent: 32, icon: '⚡' }
    ]
  },
  'tikka': {
    name: 'Chicken Tikka',
    category: 'Pakistani',
    servingSize: '6 pieces (200g)',
    calories: 320,
    protein: 38,
    carbs: 4,
    fat: 16,
    micronutrients: [
      { name: 'Protein', value: 38, unit: 'g', dailyPercent: 76, icon: '💪' },
      { name: 'Iron', value: 2.2, unit: 'mg', dailyPercent: 12, icon: '🔴' },
      { name: 'B12', value: 1.2, unit: 'μg', dailyPercent: 50, icon: '💊' },
      { name: 'Niacin', value: 12, unit: 'mg', dailyPercent: 75, icon: '✨' }
    ]
  },
  'kebab': {
    name: 'Seekh Kebab',
    category: 'Pakistani',
    servingSize: '2 pieces (150g)',
    calories: 280,
    protein: 24,
    carbs: 6,
    fat: 18,
    micronutrients: [
      { name: 'Protein', value: 24, unit: 'g', dailyPercent: 48, icon: '💪' },
      { name: 'Iron', value: 3.5, unit: 'mg', dailyPercent: 19, icon: '🔴' },
      { name: 'Zinc', value: 4.2, unit: 'mg', dailyPercent: 38, icon: '⚡' },
      { name: 'B12', value: 1.8, unit: 'μg', dailyPercent: 75, icon: '💊' }
    ]
  },
  'samosa': {
    name: 'Samosa',
    category: 'Pakistani',
    servingSize: '2 pieces (80g)',
    calories: 240,
    protein: 4,
    carbs: 28,
    fat: 12,
    micronutrients: [
      { name: 'Carbs', value: 28, unit: 'g', dailyPercent: 9, icon: '🌾' },
      { name: 'Fiber', value: 2, unit: 'g', dailyPercent: 7, icon: '🌿' },
      { name: 'Sodium', value: 420, unit: 'mg', dailyPercent: 18, icon: '🧂' },
      { name: 'Potassium', value: 180, unit: 'mg', dailyPercent: 5, icon: '⚡' }
    ]
  },
  'pakora': {
    name: 'Pakora',
    category: 'Pakistani',
    servingSize: '5 pieces (100g)',
    calories: 220,
    protein: 5,
    carbs: 22,
    fat: 12,
    micronutrients: [
      { name: 'Fiber', value: 3, unit: 'g', dailyPercent: 11, icon: '🌾' },
      { name: 'Vitamin C', value: 12, unit: 'mg', dailyPercent: 13, icon: '🍊' },
      { name: 'Folate', value: 45, unit: 'μg', dailyPercent: 11, icon: '💚' },
      { name: 'Sodium', value: 380, unit: 'mg', dailyPercent: 17, icon: '🧂' }
    ]
  },
  'naan': {
    name: 'Naan',
    category: 'Pakistani',
    servingSize: '1 piece (100g)',
    calories: 280,
    protein: 8,
    carbs: 48,
    fat: 6,
    micronutrients: [
      { name: 'Carbs', value: 48, unit: 'g', dailyPercent: 16, icon: '🌾' },
      { name: 'Calcium', value: 120, unit: 'mg', dailyPercent: 9, icon: '🦴' },
      { name: 'Iron', value: 2.2, unit: 'mg', dailyPercent: 12, icon: '🔴' },
      { name: 'Fiber', value: 2, unit: 'g', dailyPercent: 7, icon: '🌿' }
    ]
  },
  'roti': {
    name: 'Chapati/Roti',
    category: 'Pakistani',
    servingSize: '1 piece (50g)',
    calories: 120,
    protein: 3,
    carbs: 22,
    fat: 2,
    micronutrients: [
      { name: 'Carbs', value: 22, unit: 'g', dailyPercent: 7, icon: '🌾' },
      { name: 'Fiber', value: 1.5, unit: 'g', dailyPercent: 5, icon: '🌿' },
      { name: 'Iron', value: 1.2, unit: 'mg', dailyPercent: 7, icon: '🔴' },
      { name: 'Calcium', value: 40, unit: 'mg', dailyPercent: 3, icon: '🦴' }
    ]
  },
  'chana': {
    name: 'Chana Masala',
    category: 'Pakistani',
    servingSize: '1 bowl (200g)',
    calories: 240,
    protein: 10,
    carbs: 38,
    fat: 6,
    micronutrients: [
      { name: 'Fiber', value: 10, unit: 'g', dailyPercent: 36, icon: '🌾' },
      { name: 'Iron', value: 3.8, unit: 'mg', dailyPercent: 21, icon: '🔴' },
      { name: 'Folate', value: 200, unit: 'μg', dailyPercent: 50, icon: '💚' },
      { name: 'Protein', value: 10, unit: 'g', dailyPercent: 20, icon: '💪' }
    ]
  },
  'korma': {
    name: 'Chicken Korma',
    category: 'Pakistani',
    servingSize: '1 serving (250g)',
    calories: 420,
    protein: 28,
    carbs: 12,
    fat: 28,
    micronutrients: [
      { name: 'Protein', value: 28, unit: 'g', dailyPercent: 56, icon: '💪' },
      { name: 'Vitamin A', value: 220, unit: 'μg', dailyPercent: 24, icon: '👁️' },
      { name: 'Iron', value: 2.5, unit: 'mg', dailyPercent: 14, icon: '🔴' },
      { name: 'Calcium', value: 60, unit: 'mg', dailyPercent: 5, icon: '🦴' }
    ]
  },
  'qorma': {
    name: 'Chicken Korma',
    category: 'Pakistani',
    servingSize: '1 serving (250g)',
    calories: 420,
    protein: 28,
    carbs: 12,
    fat: 28,
    micronutrients: [
      { name: 'Protein', value: 28, unit: 'g', dailyPercent: 56, icon: '💪' },
      { name: 'Vitamin A', value: 220, unit: 'μg', dailyPercent: 24, icon: '👁️' },
      { name: 'Iron', value: 2.5, unit: 'mg', dailyPercent: 14, icon: '🔴' },
      { name: 'Calcium', value: 60, unit: 'mg', dailyPercent: 5, icon: '🦴' }
    ]
  },
  'pulao': {
    name: 'Chicken Pulao',
    category: 'Pakistani',
    servingSize: '1 plate (300g)',
    calories: 420,
    protein: 24,
    carbs: 48,
    fat: 16,
    micronutrients: [
      { name: 'Iron', value: 2.8, unit: 'mg', dailyPercent: 16, icon: '🔴' },
      { name: 'Vitamin B6', value: 0.6, unit: 'mg', dailyPercent: 35, icon: '💊' },
      { name: 'Sodium', value: 650, unit: 'mg', dailyPercent: 28, icon: '🧂' },
      { name: 'Fiber', value: 2.5, unit: 'g', dailyPercent: 9, icon: '🌾' }
    ]
  },
  'mutton': {
    name: 'Mutton Karahi',
    category: 'Pakistani',
    servingSize: '1 serving (250g)',
    calories: 450,
    protein: 35,
    carbs: 8,
    fat: 30,
    micronutrients: [
      { name: 'Protein', value: 35, unit: 'g', dailyPercent: 70, icon: '💪' },
      { name: 'Iron', value: 4.2, unit: 'mg', dailyPercent: 23, icon: '🔴' },
      { name: 'B12', value: 3.2, unit: 'μg', dailyPercent: 133, icon: '💊' },
      { name: 'Zinc', value: 6.5, unit: 'mg', dailyPercent: 59, icon: '⚡' }
    ]
  },
  'chai': {
    name: 'Chai (Tea)',
    category: 'Pakistani',
    servingSize: '1 cup (200ml)',
    calories: 45,
    protein: 1,
    carbs: 8,
    fat: 1,
    micronutrients: [
      { name: 'Caffeine', value: 40, unit: 'mg', dailyPercent: 10, icon: '☕' },
      { name: 'Calcium', value: 30, unit: 'mg', dailyPercent: 2, icon: '🦴' },
      { name: 'Antioxidants', value: 120, unit: 'mg', dailyPercent: 15, icon: '✨' },
      { name: 'Manganese', value: 0.5, unit: 'mg', dailyPercent: 22, icon: '⚡' }
    ]
  },
  'lassi': {
    name: 'Lassi',
    category: 'Pakistani',
    servingSize: '1 glass (250ml)',
    calories: 180,
    protein: 8,
    carbs: 22,
    fat: 6,
    micronutrients: [
      { name: 'Calcium', value: 280, unit: 'mg', dailyPercent: 22, icon: '🦴' },
      { name: 'Protein', value: 8, unit: 'g', dailyPercent: 16, icon: '💪' },
      { name: 'Probiotics', value: 1, unit: 'billion', dailyPercent: 20, icon: '🦠' },
      { name: 'Vitamin B12', value: 1.2, unit: 'μg', dailyPercent: 50, icon: '💊' }
    ]
  },
  'halwa': {
    name: 'Sooji Halwa',
    category: 'Pakistani',
    servingSize: '1 bowl (150g)',
    calories: 320,
    protein: 4,
    carbs: 48,
    fat: 14,
    micronutrients: [
      { name: 'Carbs', value: 48, unit: 'g', dailyPercent: 16, icon: '🌾' },
      { name: 'Sugar', value: 32, unit: 'g', dailyPercent: 64, icon: '🍬' },
      { name: 'Iron', value: 1.8, unit: 'mg', dailyPercent: 10, icon: '🔴' },
      { name: 'Calcium', value: 60, unit: 'mg', dailyPercent: 5, icon: '🦴' }
    ]
  },

  // International Foods
  'pizza': {
    name: 'Pepperoni Pizza',
    category: 'Italian',
    servingSize: '2 slices (200g)',
    calories: 540,
    protein: 22,
    carbs: 58,
    fat: 24,
    micronutrients: [
      { name: 'Calcium', value: 220, unit: 'mg', dailyPercent: 17, icon: '🦴' },
      { name: 'Sodium', value: 1200, unit: 'mg', dailyPercent: 52, icon: '🧂' },
      { name: 'Vitamin A', value: 150, unit: 'μg', dailyPercent: 17, icon: '👁️' },
      { name: 'Iron', value: 2.8, unit: 'mg', dailyPercent: 16, icon: '🔴' }
    ]
  },
  'burger': {
    name: 'Beef Burger',
    category: 'American',
    servingSize: '1 burger (220g)',
    calories: 480,
    protein: 26,
    carbs: 40,
    fat: 24,
    micronutrients: [
      { name: 'Protein', value: 26, unit: 'g', dailyPercent: 52, icon: '💪' },
      { name: 'Iron', value: 4, unit: 'mg', dailyPercent: 22, icon: '🔴' },
      { name: 'B12', value: 2.5, unit: 'μg', dailyPercent: 104, icon: '💊' },
      { name: 'Zinc', value: 5, unit: 'mg', dailyPercent: 45, icon: '⚡' }
    ]
  },
  'salad': {
    name: 'Garden Salad',
    category: 'Healthy',
    servingSize: '1 bowl (150g)',
    calories: 85,
    protein: 3,
    carbs: 12,
    fat: 4,
    micronutrients: [
      { name: 'Vitamin C', value: 45, unit: 'mg', dailyPercent: 50, icon: '🍊' },
      { name: 'Fiber', value: 4, unit: 'g', dailyPercent: 14, icon: '🌾' },
      { name: 'Vitamin K', value: 80, unit: 'μg', dailyPercent: 67, icon: '💚' },
      { name: 'Folate', value: 60, unit: 'μg', dailyPercent: 15, icon: '🌿' }
    ]
  },
  'rice': {
    name: 'Steamed Rice',
    category: 'Grain',
    servingSize: '1 cup (200g)',
    calories: 240,
    protein: 5,
    carbs: 53,
    fat: 0.5,
    micronutrients: [
      { name: 'Carbs', value: 53, unit: 'g', dailyPercent: 18, icon: '🌾' },
      { name: 'Manganese', value: 1, unit: 'mg', dailyPercent: 43, icon: '⚡' },
      { name: 'Selenium', value: 15, unit: 'μg', dailyPercent: 27, icon: '💎' },
      { name: 'Niacin', value: 2.3, unit: 'mg', dailyPercent: 14, icon: '💊' }
    ]
  },
  'chicken': {
    name: 'Grilled Chicken',
    category: 'Protein',
    servingSize: '1 breast (150g)',
    calories: 280,
    protein: 42,
    carbs: 0,
    fat: 12,
    micronutrients: [
      { name: 'Protein', value: 42, unit: 'g', dailyPercent: 84, icon: '💪' },
      { name: 'B6', value: 0.9, unit: 'mg', dailyPercent: 53, icon: '💊' },
      { name: 'Niacin', value: 14, unit: 'mg', dailyPercent: 88, icon: '✨' },
      { name: 'Selenium', value: 30, unit: 'μg', dailyPercent: 55, icon: '💎' }
    ]
  },

  // Default fallback
  'default': {
    name: 'Mixed Meal',
    category: 'General',
    servingSize: '1 serving (250g)',
    calories: 350,
    protein: 18,
    carbs: 40,
    fat: 14,
    micronutrients: [
      { name: 'Protein', value: 18, unit: 'g', dailyPercent: 36, icon: '💪' },
      { name: 'Fiber', value: 4, unit: 'g', dailyPercent: 14, icon: '🌾' },
      { name: 'Iron', value: 2, unit: 'mg', dailyPercent: 11, icon: '🔴' },
      { name: 'Vitamin C', value: 15, unit: 'mg', dailyPercent: 17, icon: '🍊' }
    ]
  }
};

// Keywords mapping for better matching
const keywordMap = {
  'orange': ['orange', 'citrus', 'tangerine', 'mandarin', 'clementine'],
  'apple': ['apple', 'granny smith', 'fuji', 'gala'],
  'banana': ['banana', 'plantain'],
  'soda': ['pop bottle', 'soda', 'cola', 'pepsi', 'coke', 'sprite', 'fanta', 'bottle', 'soft drink'],
  'biryani': ['biryani', 'biryani'],
  'pulao': ['pulao', 'pilau', 'pilaf', 'rice dish'],
  'karahi': ['karahi', 'kadai', 'kadhai'],
  'nihari': ['nihari', 'nihaari'],
  'haleem': ['haleem', 'haleem'],
  'tikka': ['tikka', 'chicken tikka', 'mutton tikka'],
  'kebab': ['kebab', 'seekh kebab', 'shami kebab', 'chapli kebab', 'kabab'],
  'samosa': ['samosa', 'samosas'],
  'pakora': ['pakora', 'pakoras', 'bhajia', 'bhaji'],
  'paratha': ['paratha', 'paratha', 'aloo paratha', 'gobi paratha'],
  'naan': ['naan', 'naan bread'],
  'roti': ['roti', 'chapati', 'chapatti', 'phulka'],
  'dal': ['dal', 'lentil', 'daal', 'pulse', 'dal tadka', 'dal fry'],
  'chana': ['chana', 'chana masala', 'chole', 'chole masala'],
  'korma': ['korma', 'qorma', 'chicken korma', 'mutton korma'],
  'mutton': ['mutton', 'mutton karahi', 'mutton curry'],
  'chai': ['chai', 'tea', 'doodh patti', 'pakistani tea'],
  'lassi': ['lassi', 'sweet lassi', 'mango lassi'],
  'halwa': ['halwa', 'sooji halwa', 'semolina halwa', 'gajar halwa'],
  'pizza': ['pizza', 'italian'],
  'burger': ['burger', 'hamburger', 'sandwich'],
  'salad': ['salad', 'lettuce', 'greens', 'vegetables'],
  'rice': ['rice', 'grain', 'basmati', 'steamed rice'],
  'chicken': ['chicken', 'poultry', 'grilled', 'roasted']
};

function getNutrition(foodName) {
  const lowerName = foodName.toLowerCase();
  
  // Try direct match first
  if (nutritionData[lowerName]) {
    return nutritionData[lowerName];
  }
  
  // Try keyword matching
  for (const [key, keywords] of Object.entries(keywordMap)) {
    if (keywords.some(kw => lowerName.includes(kw))) {
      return nutritionData[key];
    }
  }
  
  // Return default with detected name
  return {
    ...nutritionData['default'],
    name: foodName
  };
}

module.exports = { getNutrition, nutritionData };

