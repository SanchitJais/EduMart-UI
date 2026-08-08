// API helper for backend endpoints

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

const request = async (path, { method = 'GET', body, token } = {}) => {
  const res = await fetch(`${API_URL}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await res.json().catch(() => null);

  if (!res.ok || !data?.success) {
    throw new ApiError(data?.message || 'Something went wrong. Please try again.', res.status);
  }

  // Array payloads (e.g. order lists) must pass through as-is — spreading
  // an array into an object literal silently mangles it into {0: ..., 1: ...}.
  if (Array.isArray(data.data)) return data.data;

  return { message: data.message, ...(data.data || {}) };
};

export const authApi = {
  register: (payload) => request('/auth/register', { method: 'POST', body: payload }),
  login: (email, password) => request('/auth/login', { method: 'POST', body: { email, password } }),
  google: (credential) => request('/auth/google', { method: 'POST', body: { credential } }),
  resendVerification: (token) => request('/auth/resend-verification', { method: 'POST', token }),
  verifyEmail: (verificationToken) => request(`/auth/verify-email?token=${encodeURIComponent(verificationToken)}`),
  me: (token) => request('/auth/me', { token }),
};

export const orderApi = {
  list: (token) => request('/orders', { token }),
  place: (payload, token) => request('/orders', { method: 'POST', body: payload, token }),
  cancel: (id, token) => request(`/orders/${id}/cancel`, { method: 'PUT', token }),
};

export { ApiError };
