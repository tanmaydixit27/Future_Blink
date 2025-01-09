import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api"; // Update with your backend URL if hosted elsewhere

// Create an Axios instance for centralized API management
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor to attach JWT token to headers
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Fetch token from localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Attach token to Authorization header
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle API errors gracefully
const handleError = (error) => {
  console.error("API Error:", error.response || error.message || error);
  return { error: error.response?.data?.error || "Something went wrong!" };
};

/**
 * Create a new email sequence
 * @param {Object} emailData - Email sequence data
 * @param {string} emailData.email - Recipient email address
 * @param {string} emailData.subject - Email subject
 * @param {string} emailData.body - Email body content
 * @param {number} emailData.delay - Delay in seconds before sending
 * @returns {Promise<Object>} - Response or error object
 */
export const createEmailSequence = async (emailData) => {
  try {
    const response = await apiClient.post("/email-sequence", emailData);
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

/**
 * Fetch email sequences (if needed for displaying them in the frontend)
 * @returns {Promise<Object>} - Array of email sequences or error object
 */
export const fetchEmailSequences = async () => {
  try {
    const response = await apiClient.get("/email-sequences");
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

/**
 * Save flowchart data
 * @param {Object} flowData - The flowchart data to save
 * @returns {Promise<Object>} - Response or error object
 */
export const saveFlowchartData = async (flowData) => {
  try {
    const response = await apiClient.post("/email/save-flowchart", flowData);
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

/**
 * Login user and get JWT token
 * @param {Object} credentials - User credentials
 * @param {string} credentials.email - User's email address
 * @param {string} credentials.password - User's password
 * @returns {Promise<Object>} - JWT token or error object
 */
export const loginUser = async (email, password) => {
  try {
    const response = await apiClient.post('/auth/login', { email, password });
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

/**
 * Register a new user
 * @param {Object} userData - User registration data
 * @returns {Promise<Object>} - Response or error object
 */
export const registerUser = async (userData) => {
  try {
    const response = await apiClient.post("/auth/register", userData);
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

/**
 * Logout user
 */
export const logoutUser = () => {
  localStorage.removeItem("token"); // Remove token from localStorage
};
