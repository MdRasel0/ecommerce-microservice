import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || '';

const api = axios.create({
  baseURL: `${API_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Products
export const getProducts = () => api.get('/products');
export const getProduct = (id) => api.get(`/products/${id}`);
export const createProduct = (product) => api.post('/products', product);
export const searchProducts = (query) => api.get(`/products/search?q=${query}`);
export const getProductsByCategory = (category) => api.get(`/products/category/${category}`);

// Orders
export const getOrders = () => api.get('/orders');
export const getOrder = (id) => api.get(`/orders/${id}`);
export const createOrder = (order) => api.post('/orders', order);
export const getUserOrders = (userId) => api.get(`/orders/user/${userId}`);
export const updateOrderStatus = (id, status) => api.put(`/orders/${id}/status`, { status });

// Users
export const getUsers = () => api.get('/users');
export const getUser = (id) => api.get(`/users/${id}`);
export const createUser = (user) => api.post('/users', user);
export const updateUser = (id, user) => api.put(`/users/${id}`, user);
export const login = (credentials) => api.post('/users/login', credentials);

export default api;
