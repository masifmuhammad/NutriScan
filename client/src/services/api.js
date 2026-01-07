import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
});

const api = {
  async scanFood(file) {
    const formData = new FormData();
    formData.append('image', file);
    const { data } = await API.post('/scan', formData);
    return data;
  },

  async getHistory(days = 7) {
    const { data } = await API.get(`/history?days=${days}`);
    return data;
  },

  async getTodayStats() {
    const { data } = await API.get('/stats/today');
    return data;
  },

  async logMeal(scanId) {
    const { data } = await API.post(`/log/${scanId}`);
    return data;
  },

  async deleteMeal(mealId) {
    const { data } = await API.delete(`/meals/${mealId}`);
    return data;
  },

  async getManualFood(foodId, imageUrl) {
    const { data } = await API.post('/manual-select', { foodId, imageUrl });
    return data;
  },
};

export default api;

