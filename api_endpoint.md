Ran tool
Here is a list of backend API endpoints you can implement on the frontend, grouped by their purpose and including their HTTP methods and paths:

**Authentication & Registration (from `/auth`):**
- `POST /register` — Register a new user account (requires email verification)
- `POST /verify-email` — Verify email with OTP and activate user account
- `POST /resend-verification` — Resend verification OTP for email verification
- `POST /login` — Login user (requires email verification)
- `GET /oauth/google/url` — Get Google OAuth authorization URL

**OTP (One-Time Password) for Login:**
- `POST /otp/send` — Send OTP to user's email for login (requires verified email)
- `POST /otp/verify` — Verify OTP and authenticate user for login
- `POST /otp/resend` — Resend OTP to user's email for login

**User Profile (from `/user`):**
- `GET /profile` — Get current user's basic profile information
- `PUT /profile` — Update current user's profile
- `GET /users/me` — Get detailed current user information
- `GET /profile/status` — Get profile completion status and missing fields
- `DELETE /profile` — Delete user profile (account deletion)

If you need details about request/response payloads for any endpoint, let me know!