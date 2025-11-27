const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api"

export const apiCall = async (endpoint, options = {}) => {
  const token = localStorage.getItem("authToken")

  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || "API request failed")
  }

  return response.json()
}

// Auth API calls
export const authAPI = {
  register: (fullName, email, password, role) =>
    apiCall("/auth/register", {
      method: "POST",
      body: JSON.stringify({ fullName, email, password, role }),
    }),
  login: (email, password) =>
    apiCall("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),
}

// Course API calls
export const courseAPI = {
  getAllCourses: () => apiCall("/courses"),
  getCourse: (id) => apiCall(`/courses/${id}`),
  createCourse: (courseData) =>
    apiCall("/courses", {
      method: "POST",
      body: JSON.stringify(courseData),
    }),
  updateCourse: (id, courseData) =>
    apiCall(`/courses/${id}`, {
      method: "PUT",
      body: JSON.stringify(courseData),
    }),
  deleteCourse: (id) =>
    apiCall(`/courses/${id}`, {
      method: "DELETE",
    }),
  enrollCourse: (courseId) =>
    apiCall(`/courses/${courseId}/enroll`, {
      method: "POST",
    }),
}

// User API calls
export const userAPI = {
  getProfile: () => apiCall("/users/profile"),
  updateProfile: (profileData) =>
    apiCall("/users/profile", {
      method: "PUT",
      body: JSON.stringify(profileData),
    }),
}
