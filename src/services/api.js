// API Base URL
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://api.drganeshcs.com/api';

// API Service class
class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
    this.authToken = null;
  }

  // Set authentication token
  setAuthToken(token) {
    this.authToken = token;
  }

  // Generic request method
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...(this.authToken && { Authorization: `Bearer ${this.authToken}` }),
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `HTTP error! status: ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error('API Request Error:', error);
      throw error;
    }
  }

  // GET request
  async get(endpoint, options = {}) {
    return this.request(endpoint, { method: 'GET', ...options });
  }

  // POST request
  async post(endpoint, data, options = {}) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
      ...options,
    });
  }

  // PUT request
  async put(endpoint, data, options = {}) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
      ...options,
    });
  }

  // DELETE request
  async delete(endpoint, options = {}) {
    return this.request(endpoint, { method: 'DELETE', ...options });
  }

  // Health check
  async checkHealth() {
    return this.get('/health');
  }

  // Appointments API
  async createAppointment(appointmentData) {
    return this.post('/appointments', appointmentData);
  }

  async trackAppointment(referenceNumber) {
    return this.get(`/appointments/track/${referenceNumber}`);
  }

  async getAllAppointments(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.get(`/appointments/all${queryString ? `?${queryString}` : ''}`);
  }

  async updateAppointment(appointmentId, updateData) {
    return this.put(`/appointments/${appointmentId}`, updateData);
  }

  async getAppointmentStats() {
    return this.get('/appointments/stats/overview');
  }

  // Slots API
  async getSlots(hospitalId, date) {
    return this.get(`/slots/${hospitalId}/${date}`);
  }

  async initializeSlots(hospitalId, dates) {
    return this.post('/slots/initialize', { hospital_id: hospitalId, dates });
  }

  // Content API
  async getContent() {
    return this.get('/content');
  }

  async createContent(contentData) {
    return this.post('/content', contentData);
  }

  async updateContent(id, contentData) {
    return this.put(`/content/${id}`, contentData);
  }

  async deleteContent(id) {
    return this.delete(`/content/${id}`);
  }

  // Contact API
  async submitContact(contactData) {
    return this.post('/contact', contactData);
  }

  async getContacts() {
    return this.get('/contact');
  }

  // Reviews API
  async getReviews() {
    return this.get('/reviews');
  }

  async submitReview(reviewData) {
    return this.post('/reviews', reviewData);
  }

  // Users API
  async loginUser(credentials) {
    return this.post('/auth/login', credentials);
  }

  // Doctor login with PIN or email/password
  async doctorLogin(credentials) {
    const response = await this.post('/auth/doctor-login', credentials);
    
    if (response.token) {
      this.setAuthToken(response.token);
    }
    
    return response;
  }

  async registerUser(userData) {
    return this.post('/auth/register', userData);
  }

  async getUserProfile() {
    return this.get('/auth/profile');
  }

  // Hospital/Clinic specific endpoints
  async getHospitals() {
    return this.get('/hospitals');
  }

  async getHospitalSlots(hospitalId, date) {
    return this.get(`/hospitals/${hospitalId}/slots/${date}`);
  }
}

// Export a singleton instance
export const apiService = new ApiService();
export default apiService;
