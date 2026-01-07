import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { HiMinus, HiPlus, HiInformationCircle } from 'react-icons/hi';
import './Results.css';

function Results({ results, onLog, onRescan, onWrongFood }) {
  const { food, nutrition, confidence, imageUrl } = results;
  
  // Portion size multiplier (0.5 = half, 1 = standard, 2 = double, etc.)
  const [portions, setPortions] = useState(1);

  // Calculate adjusted nutrition based on portions
  const adjustedNutrition = useMemo(() => ({
    calories: Math.round(nutrition.calories * portions),
    protein: Math.round(nutrition.protein * portions * 10) / 10,
    carbs: Math.round(nutrition.carbs * portions * 10) / 10,
    fat: Math.round(nutrition.fat * portions * 10) / 10,
    micronutrients: nutrition.micronutrients?.map(m => ({
      ...m,
      value: Math.round(m.value * portions * 10) / 10,
      dailyPercent: Math.round(m.dailyPercent * portions)
    }))
  }), [nutrition, portions]);

  const macroData = [
    { name: 'Protein', value: adjustedNutrition.protein, color: '#7D9970' },
    { name: 'Carbs', value: adjustedNutrition.carbs, color: '#D4A84B' },
    { name: 'Fat', value: adjustedNutrition.fat, color: '#C65D3B' },
  ];

  const totalMacros = adjustedNutrition.protein + adjustedNutrition.carbs + adjustedNutrition.fat;

  const decreasePortions = () => setPortions(p => Math.max(0.25, p - 0.25));
  const increasePortions = () => setPortions(p => Math.min(5, p + 0.25));

  const getPortionLabel = () => {
    if (portions === 0.25) return '¼ serving';
    if (portions === 0.5) return '½ serving';
    if (portions === 0.75) return '¾ serving';
    if (portions === 1) return '1 serving';
    if (portions === 1.5) return '1½ servings';
    return `${portions} servings`;
  };

  return (
    <section className="results">
      <div className="container">
        <motion.div 
          className="results-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Header */}
          <div className="results-header">
            <div className="food-image">
              <img src={imageUrl || '/placeholder.jpg'} alt={food.name} />
              <div className="confidence-badge">
                {confidence}% match
              </div>
              <button className="wrong-food-btn" onClick={onWrongFood}>
                Wrong? Fix it
              </button>
            </div>
            
            <div className="food-info">
              <span className="food-category">{food.category}</span>
              <h1 className="food-name">{food.name}</h1>
              <p className="food-serving">Base: {food.servingSize}</p>
              
              <div className="calorie-display">
                <span className="calorie-number">{adjustedNutrition.calories}</span>
                <span className="calorie-unit">kcal</span>
              </div>
            </div>
          </div>

          {/* Portion Size Selector */}
          <div className="portion-section">
            <div className="portion-header">
              <h3 className="section-label">Adjust Portion Size</h3>
              <div className="portion-hint">
                <HiInformationCircle />
                <span>AI can't measure exact size - adjust manually for accuracy</span>
              </div>
            </div>
            
            <div className="portion-control">
              <button 
                className="portion-btn" 
                onClick={decreasePortions}
                disabled={portions <= 0.25}
              >
                <HiMinus />
              </button>
              
              <div className="portion-display">
                <span className="portion-value">{getPortionLabel()}</span>
                <span className="portion-multiplier">
                  {portions !== 1 && `(${portions}x)`}
                </span>
              </div>
              
              <button 
                className="portion-btn" 
                onClick={increasePortions}
                disabled={portions >= 5}
              >
                <HiPlus />
              </button>
            </div>

            <div className="portion-presets">
              <button 
                className={`preset-btn ${portions === 0.5 ? 'active' : ''}`}
                onClick={() => setPortions(0.5)}
              >
                Small
              </button>
              <button 
                className={`preset-btn ${portions === 1 ? 'active' : ''}`}
                onClick={() => setPortions(1)}
              >
                Regular
              </button>
              <button 
                className={`preset-btn ${portions === 1.5 ? 'active' : ''}`}
                onClick={() => setPortions(1.5)}
              >
                Large
              </button>
              <button 
                className={`preset-btn ${portions === 2 ? 'active' : ''}`}
                onClick={() => setPortions(2)}
              >
                X-Large
              </button>
            </div>
          </div>

          {/* Macro Chart */}
          <div className="macro-section">
            <h3 className="section-label">Macronutrients</h3>
            
            <div className="macro-chart-container">
              <div className="macro-chart">
                <ResponsiveContainer width="100%" height={180}>
                  <PieChart>
                    <Pie
                      data={macroData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={75}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {macroData.map((entry, index) => (
                        <Cell key={index} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="chart-center">
                  <span className="chart-total">{Math.round(totalMacros)}g</span>
                  <span className="chart-label">total</span>
                </div>
              </div>

              <div className="macro-legend">
                {macroData.map((macro) => (
                  <div key={macro.name} className="macro-item">
                    <div className="macro-color" style={{ background: macro.color }}></div>
                    <div className="macro-details">
                      <span className="macro-name">{macro.name}</span>
                      <span className="macro-value">{macro.value}g</span>
                    </div>
                    <span className="macro-percent">
                      {totalMacros > 0 ? Math.round((macro.value / totalMacros) * 100) : 0}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Micronutrients */}
          {adjustedNutrition.micronutrients && (
            <div className="micro-section">
              <h3 className="section-label">Key Nutrients</h3>
              <div className="nutrients-grid">
                {adjustedNutrition.micronutrients.map((nutrient) => (
                  <div key={nutrient.name} className="nutrient-card">
                    <span className="nutrient-icon">{nutrient.icon}</span>
                    <div className="nutrient-info">
                      <span className="nutrient-name">{nutrient.name}</span>
                      <span className="nutrient-value">{nutrient.value}{nutrient.unit}</span>
                    </div>
                    <div className="nutrient-bar-container">
                      <div 
                        className="nutrient-bar-fill"
                        style={{ width: `${Math.min(100, nutrient.dailyPercent)}%` }}
                      ></div>
                    </div>
                    <span className="nutrient-daily">{nutrient.dailyPercent}% daily</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Disclaimer */}
          <div className="disclaimer">
            <HiInformationCircle />
            <p>
              Nutrition values are estimates based on standard serving sizes. 
              Actual values may vary based on preparation and exact portion.
            </p>
          </div>

          {/* Actions */}
          <div className="results-actions">
            <button className="btn-outline" onClick={onRescan}>
              Scan Another
            </button>
            <button className="btn-primary" onClick={onLog}>
              <span>✓</span>
              Log {getPortionLabel()}
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Results;
