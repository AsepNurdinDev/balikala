// API Service for BaliKala Blog
// Based on API Contract source of truth

// Diambil dari environment variable agar bisa diatur berbeda
// antara development lokal dan deployment Docker, tanpa perlu rebuild kode.
// Lihat file .env.example untuk detail konfigurasi.
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8090";
export const UPLOADS_BASE_URL = `${API_BASE_URL}/uploads`;

// Data Models
export interface Post {
  id: number;
  title: string;
  content: string;
  image: string; // Only filename, e.g. "foto.jpg"
  created_at: string;
}

export interface Comment {
  id: number;
  post_id: number;
  name: string;
  email?: string;
  body: string;
  created_at: string;
}

export interface ValidationError {
  field: string;
  message: string;
}

export interface ApiError {
  error?: string;
  message?: string;
  errors?: ValidationError[];
}

// Cookie Helpers
export const getCookie = (name: string): string | null => {
  if (typeof window === "undefined") return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift() || null;
  return null;
};

export const setCookie = (name: string, value: string, days = 1) => {
  if (typeof window === "undefined") return;
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = `; expires=${date.toUTCString()}`;
  document.cookie = `${name}=${value || ""}${expires}; path=/; SameSite=Lax`;
};

export const deleteCookie = (name: string) => {
  if (typeof window === "undefined") return;
  document.cookie = `${name}=; Max-Age=-99999999; path=/; SameSite=Lax`;
};

// Token Management
export const getToken = (): string | null => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("admin_token") || getCookie("admin_token");
};

export const setToken = (token: string) => {
  if (typeof window === "undefined") return;
  localStorage.setItem("admin_token", token);
  setCookie("admin_token", token, 1); // 24 hours
};

export const removeToken = () => {
  if (typeof window === "undefined") return;
  localStorage.removeItem("admin_token");
  deleteCookie("admin_token");
};

export const logout = () => {
  removeToken();
  if (typeof window !== "undefined") {
    window.location.href = "/admin/login";
  }
};

// Helper for Image URLs
export const getImageUrl = (imageName: string | null | undefined): string => {
  if (!imageName) return "";
  // Check if it's already a full URL (defensive)
  if (imageName.startsWith("http://") || imageName.startsWith("https://")) {
    return imageName;
  }
  return `${UPLOADS_BASE_URL}/${imageName}`;
};

// Base Fetch Wrapper
async function apiFetch(
  path: string,
  options: RequestInit = {}
): Promise<Response> {
  const token = getToken();
  const headers = new Headers(options.headers || {});

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
  });

  if (response.status === 401) {
    // If unauthorized, logout and redirect to login page
    logout();
  }

  return response;
}

// Error Message Parser
export const parseApiError = async (response: Response): Promise<string> => {
  try {
    const data: ApiError = await response.json();
    
    // Format 1: errors array of validation errors
    if (data.errors && Array.isArray(data.errors)) {
      return data.errors.map((err) => `${err.field}: ${err.message}`).join(", ");
    }
    
    // Format 2: error field
    if (data.error) {
      return data.error;
    }
    
    // Format 3: message field
    if (data.message) {
      return data.message;
    }
    
    return `Error ${response.status}: ${response.statusText}`;
  } catch (e) {
    return `Error ${response.status}: ${response.statusText || "Unknown error"}`;
  }
};

// API Endpoints Functions

// AUTH-001: Login Admin
export async function loginAdmin(email: string, password: string): Promise<string> {
  const res = await apiFetch("/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    const errorMessage = await parseApiError(res);
    throw new Error(errorMessage);
  }

  const data = await res.json();
  if (data.success && data.token) {
    setToken(data.token);
    return data.token;
  }
  throw new Error("Pernyataan sukses tidak valid dari server");
}

// POST-001: Get All Posts
export async function getAllPosts(search?: string): Promise<Post[]> {
  const query = search ? `?search=${encodeURIComponent(search)}` : "";
  const res = await apiFetch(`/api/posts${query}`);

  if (!res.ok) {
    const errorMessage = await parseApiError(res);
    throw new Error(errorMessage);
  }

  const data = await res.json();
  return data.data || [];
}

// POST-002: Get Post By ID
export async function getPostById(id: number): Promise<Post> {
  const res = await apiFetch(`/api/posts/${id}`);

  if (!res.ok) {
    const errorMessage = await parseApiError(res);
    throw new Error(errorMessage);
  }

  const data = await res.json();
  return data.data;
}

// POST-003: Create Post (multipart/form-data via FormData)
export async function createPost(formData: FormData): Promise<Post> {
  // Do NOT set Content-Type header manually, let fetch set boundary automatically
  const res = await apiFetch("/api/posts", {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    const errorMessage = await parseApiError(res);
    throw new Error(errorMessage);
  }

  const data = await res.json();
  return data.data;
}

// POST-004: Update Post (multipart/form-data via FormData)
export async function updatePost(id: number, formData: FormData): Promise<Post> {
  // Do NOT set Content-Type header manually, let fetch set boundary automatically
  const res = await apiFetch(`/api/posts/${id}`, {
    method: "PUT",
    body: formData,
  });

  if (!res.ok) {
    const errorMessage = await parseApiError(res);
    throw new Error(errorMessage);
  }

  const data = await res.json();
  return data.data;
}

// POST-005: Delete Post
export async function deletePost(id: number): Promise<boolean> {
  const res = await apiFetch(`/api/posts/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    const errorMessage = await parseApiError(res);
    throw new Error(errorMessage);
  }

  const data = await res.json();
  return !!data.success;
}

// COMMENT-001: Get Comments By Post
export async function getCommentsByPost(postId: number): Promise<Comment[]> {
  const res = await apiFetch(`/api/posts/${postId}/comments`);

  if (!res.ok) {
    const errorMessage = await parseApiError(res);
    throw new Error(errorMessage);
  }

  const data = await res.json();
  return data.data || [];
}

// COMMENT-002: Create Comment
export async function createComment(
  postId: number,
  commentData: { name: string; email?: string; body: string }
): Promise<Comment> {
  const res = await apiFetch(`/api/posts/${postId}/comments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(commentData),
  });

  if (!res.ok) {
    const errorMessage = await parseApiError(res);
    throw new Error(errorMessage);
  }

  const data = await res.json();
  return data.data;
}

// COMMENT-003: Delete Comment
export async function deleteComment(commentId: number): Promise<boolean> {
  const res = await apiFetch(`/api/comments/${commentId}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    const errorMessage = await parseApiError(res);
    throw new Error(errorMessage);
  }

  const data = await res.json();
  return !!data.success;
}
