import React from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, ResponsiveContainer } from 'recharts';
import './History.css';

function History({ history, todayStats }) {
  const weekData = [
    { day: 'Mon', calories: 1850 },
    { day: 'Tue', calories: 2100 },
    { day: 'Wed', calories: 1920 },
    { day: 'Thu', calories: 2250 },
    { day: 'Fri', calories: 1780 },
    { day: 'Sat', calories: 2400 },
    { day: 'Sun', calories: todayStats.calories || 0 },
  ];

  const dailyGoal = 2000;

  return (
    <section className="history">
      <div className="container">
        <div className="history-grid">
          {/* Today's Summary */}
          <motion.div 
            className="today-card"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="card-header">
              <h3 className="card-title">Today's Progress</h3>
              <span className="card-date">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}</span>
            </div>

            <div className="progress-ring-container">
              <svg className="progress-ring" viewBox="0 0 120 120">
                <circle
                  className="progress-bg"
                  cx="60"
                  cy="60"
                  r="52"
                  fill="none"
                  strokeWidth="12"
                />
                <circle
                  className="progress-fill"
                  cx="60"
                  cy="60"
                  r="52"
                  fill="none"
                  strokeWidth="12"
                  strokeDasharray={`${(todayStats.calories / dailyGoal) * 327} 327`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="progress-content">
                <span className="progress-value">{todayStats.calories || 0}</span>
                <span className="progress-label">of {dailyGoal} kcal</span>
              </div>
            </div>

            <div className="macro-summary">
              <div className="macro-stat">
                <div className="macro-stat-bar protein" style={{ height: `${(todayStats.protein / 120) * 100}%` }}></div>
                <span className="macro-stat-value">{todayStats.protein || 0}g</span>
                <span className="macro-stat-label">Protein</span>
              </div>
              <div className="macro-stat">
                <div className="macro-stat-bar carbs" style={{ height: `${(todayStats.carbs / 250) * 100}%` }}></div>
                <span className="macro-stat-value">{todayStats.carbs || 0}g</span>
                <span className="macro-stat-label">Carbs</span>
              </div>
              <div className="macro-stat">
                <div className="macro-stat-bar fat" style={{ height: `${(todayStats.fat / 65) * 100}%` }}></div>
                <span className="macro-stat-value">{todayStats.fat || 0}g</span>
                <span className="macro-stat-label">Fat</span>
              </div>
            </div>
          </motion.div>

          {/* Weekly Chart */}
          <motion.div 
            className="week-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="card-header">
              <h3 className="card-title">This Week</h3>
              <span className="card-badge">Avg: 2,043 kcal</span>
            </div>

            <div className="week-chart">
              <ResponsiveContainer width="100%" height={160}>
                <BarChart data={weekData} barCategoryGap="20%">
                  <XAxis 
                    dataKey="day" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: '#8A857D' }}
                  />
                  <Bar 
                    dataKey="calories" 
                    fill="#EBE4D8"
                    radius={[6, 6, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
              <div className="goal-line" style={{ bottom: `${(dailyGoal / 2500) * 100}%` }}>
                <span>Goal</span>
              </div>
            </div>
          </motion.div>

          {/* Recent Meals */}
          <motion.div 
            className="meals-card"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="card-header">
              <h3 className="card-title">Recent Meals</h3>
              <button className="view-all-btn">View All</button>
            </div>

            <div className="meals-list">
              {history.length > 0 ? (
                history.slice(0, 4).map((meal, index) => (
                  <div key={meal.id || index} className="meal-item">
                    <div className="meal-image">
                      {meal.imageUrl ? (
                        <img src={`http://localhost:5000${meal.imageUrl}`} alt={meal.food?.name} />
                      ) : (
                        <span className="meal-emoji">🍽️</span>
                      )}
                    </div>
                    <div className="meal-info">
                      <span className="meal-name">{meal.food?.name || 'Meal'}</span>
                      <span className="meal-time">{meal.time || 'Today'}</span>
                    </div>
                    <span className="meal-calories">{meal.nutrition?.calories || 0} kcal</span>
                  </div>
                ))
              ) : (
                <div className="meals-empty">
                  <span className="empty-icon">📷</span>
                  <p>No meals logged yet</p>
                  <span>Scan your first meal to start tracking</span>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default History;

