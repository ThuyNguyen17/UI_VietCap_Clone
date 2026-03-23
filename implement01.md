# Authentication Implementation Guide: Login, Register, and Email OTP (Frontend)

This guide provides a concise step-by-step approach to implement **Login**, **Registration**, and **Send OTP via Email** in any frontend project (React/Next.js, Vue, etc.), using typical REST API endpoints.

---

## 📋 API Endpoints Overview

```
POST /api/auth/register          - Register new user
POST /api/auth/login             - User login
POST /api/auth/verify-email      - Verify email with OTP
POST /api/auth/otp/send          - Send OTP to email (for login or verification)
```

---

## 🗂️ Required Files/Components

- **API Service** (e.g., `authService.js` or `authService.ts`)
- **Login Form Component** (e.g., `LoginForm.tsx`)
- **Register Form Component** (e.g., `RegisterForm.tsx`)
- **OTP Verification Component** (e.g., `OtpVerification.tsx`)
- **Token Storage Utility** (optional, e.g., `storage.ts`)

---

## 1️⃣ User Registration

### **Step 1: Registration API Call**
```typescript
// authService.ts
export async function register({ email, password, full_name }) {
  return fetch('/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, full_name })
  }).then(res => res.json());
}
```

### **Step 2: Registration Form**
- Collect email, password, and full name.
- On submit, call `register()`.
- If successful, prompt user to verify email with OTP.

```typescript
// RegisterForm.tsx (pseudo-code)
const handleRegister = async (formData) => {
  const res = await register(formData);
  if (res.user_id) {
    // Show OTP verification UI
  }
};
```

---

## 2️⃣ Login with Email & Password

### **Step 1: Login API Call**
```typescript
// authService.ts
export async function login({ email, password }) {
  return fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  }).then(res => res.json());
}
```

### **Step 2: Login Form**
- Collect email and password.
- On submit, call `login()`.
- If response requires OTP, prompt for OTP input.

```typescript
// LoginForm.tsx (pseudo-code)
const handleLogin = async (credentials) => {
  const res = await login(credentials);
  if (res.requires_verification) {
    // Show OTP input UI
  }
};
```

---

## 3️⃣ Send OTP to Email (for Login or Registration)

### **Step 1: Send OTP API Call**
```typescript
// authService.ts
export async function sendOtp(email) {
  return fetch('/api/auth/otp/send', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email })
  }).then(res => res.json());
}
```

### **Step 2: OTP Verification Form**
- After registration or login, call `sendOtp(email)` if needed.
- Show OTP input field.
- On submit, call `/api/auth/verify-email` with email and OTP.

```typescript
// OtpVerification.tsx (pseudo-code)
const handleVerifyOtp = async (email, otp) => {
  const res = await fetch('/api/auth/verify-email', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, otp })
  }).then(res => res.json());
  if (res.access_token) {
    // Save token, redirect to dashboard
  }
};
```

---

## 🔒 Token Storage (Optional)
```typescript
// storage.ts
export const tokenStorage = {
  setToken: (token) => localStorage.setItem('access_token', token),
  getToken: () => localStorage.getItem('access_token'),
  removeToken: () => localStorage.removeItem('access_token'),
};
```

---

## ✅ Summary
- Use the provided API endpoints for registration, login, and OTP.
- Implement forms for user input and call the respective API functions.
- After successful OTP verification, store the access token and redirect the user.
- Adapt the code snippets to your frontend framework as needed. 