# Fantasia Asia Tour Booking Platform
## Comprehensive System Documentation Manual

**Version:** 1.0  
**Last Updated:** December 2025  
**Prepared by:** Nightwing Development Team

---

# Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [System Architecture Overview](#2-system-architecture-overview)
3. [Getting Started](#3-getting-started)
4. [User Website (Fantasia Asia)](#4-user-website-fantasia-asia)
5. [Admin Dashboard (CMS)](#5-admin-dashboard-cms)
6. [Backend APIs](#6-backend-apis)
7. [Database Structure](#7-database-structure)
8. [Payment Integration](#8-payment-integration)
9. [Email Notifications](#9-email-notifications)
10. [Security & Authentication](#10-security--authentication)
11. [Deployment Guide](#11-deployment-guide)
12. [Troubleshooting](#12-troubleshooting)
13. [API Reference](#13-api-reference)
14. [Business Rules](#14-business-rules)
15. [Appendix](#15-appendix)

---

# 1. Executive Summary

## 1.1 Platform Overview

Fantasia Asia is a comprehensive tour booking platform designed to connect travelers with curated Asian tour experiences. The platform consists of three main components:

1. **User Website** (`fatasiaasia`) - A Next.js-based customer-facing website where users can browse tours, create accounts, manage wishlists, and make bookings.

2. **Admin Dashboard** (`eee`) - A React-based content management system for administrators to manage tours, bookings, clients, and business operations.

3. **Backend APIs** - Two Go-based API services:
   - `tour-user-api` - Handles user authentication, tour browsing, bookings, and profile management
   - `tour-admin-api` - Handles admin authentication, tour CRUD operations, booking management, and payment processing

## 1.2 Key Features

### For Users
- Browse and search tours by country, category, and duration
- User registration with email verification (OTP)
- Secure login with JWT authentication
- Wishlist management
- Tour booking with traveler details
- Profile management with avatar upload
- Booking history and past tours view
- Password reset functionality

### For Administrators
- Complete tour management (CRUD operations)
- Booking confirmation and pricing
- Client management
- Payment link generation via Omise
- User account management (tour agencies)
- File upload to cloud storage

## 1.3 Technology Stack

| Component | Technology |
|-----------|------------|
| User Website | Next.js 15, React 18, TypeScript, Tailwind CSS |
| Admin Dashboard | React 18, Vite, JavaScript, CSS3 |
| User API | Go 1.21+, Gin Framework, PostgreSQL |
| Admin API | Go 1.21+, Gin Framework, PostgreSQL |
| Database | PostgreSQL |
| File Storage | DigitalOcean Spaces (S3-compatible) |
| Payment Gateway | Omise |
| Email Service | SMTP (Gmail/Custom) |
| Hosting | DigitalOcean App Platform |

---

# 2. System Architecture Overview

## 2.1 High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────────────┐
│                           INTERNET                                       │
└─────────────────────────────────────────────────────────────────────────┘
                    │                           │
                    ▼                           ▼
    ┌───────────────────────────┐   ┌───────────────────────────┐
    │    User Website           │   │    Admin Dashboard        │
    │    (fatasiaasia)          │   │    (eee)                  │
    │    Next.js 15             │   │    React + Vite           │
    │    Port: 3000             │   │    Port: 5173             │
    └───────────────────────────┘   └───────────────────────────┘
                    │                           │
                    ▼                           ▼
    ┌───────────────────────────┐   ┌───────────────────────────┐
    │    Tour User API          │   │    Tour Admin API         │
    │    (tour-user-api)        │   │    (tour-admin-api)       │
    │    Go + Gin               │   │    Go + Gin               │
    │    Port: 9090             │   │    Port: 9091             │
    └───────────────────────────┘   └───────────────────────────┘
                    │                           │
                    └───────────┬───────────────┘
                                ▼
                ┌───────────────────────────┐
                │       PostgreSQL          │
                │       Database            │
                └───────────────────────────┘
                                │
        ┌───────────────────────┼───────────────────────┐
        ▼                       ▼                       ▼
┌───────────────┐   ┌───────────────────┐   ┌───────────────┐
│ DigitalOcean  │   │   Omise Payment   │   │  SMTP Email   │
│ Spaces        │   │   Gateway         │   │  Service      │
│ (S3 Storage)  │   │                   │   │               │
└───────────────┘   └───────────────────┘   └───────────────┘
```

## 2.2 Data Flow

### User Booking Flow
```
1. User browses tours → User Website → User API → Database
2. User creates booking → User Website → User API → Database
3. Admin confirms booking → Admin Dashboard → Admin API → Database + Omise
4. User receives payment link → Email Service
5. User completes payment → Omise Webhook → Admin API → Database
6. Booking status updated to "paid"
```

### Authentication Flow
```
1. User registers → OTP sent via email
2. User verifies OTP → Account created
3. User logs in → JWT token issued
4. Token stored in cookies → Used for authenticated requests
5. Token expires after 1 hour → User must re-login
```

## 2.3 Repository Structure

### User Website (fatasiaasia)
```
fatasiaasia/
├── app/                    # Next.js App Router pages
│   ├── (auth)/             # Authentication pages (login, register)
│   ├── _components/        # Shared page components
│   ├── about/              # About page
│   ├── api/                # API routes
│   ├── beach-tours/        # Beach tours page
│   ├── contact/            # Contact page
│   ├── destinations/       # Destinations pages
│   ├── profile/            # User profile pages
│   └── tours/              # Tours listing and detail pages
├── assets/                 # Static assets (images, icons)
├── components/             # Reusable UI components
├── lib/                    # Utility libraries
├── server/                 # API client functions
├── types/                  # TypeScript type definitions
└── utils/                  # Helper functions
```

### Admin Dashboard (eee)
```
eee/
├── src/
│   ├── components/         # UI components
│   │   ├── Layout/         # Dashboard layout (Header, Sidebar)
│   │   └── Modals/         # CRUD modals for each entity
│   ├── pages/              # Main pages
│   │   ├── Overview.jsx    # Dashboard overview
│   │   ├── ToursPage.jsx   # Tours management
│   │   ├── BookingsPage.jsx# Bookings management
│   │   ├── ClientsPage.jsx # Clients management
│   │   └── ...
│   ├── context/            # React Context (Auth, App state)
│   ├── hooks/              # Custom React hooks
│   ├── services/           # API service layer
│   └── utils/              # Utility functions
└── public/                 # Static assets
```

### Backend APIs Structure
```
tour-user-api/ or tour-admin-api/
├── app/                    # Application modules
│   ├── auth/               # Authentication handlers
│   ├── booking/            # Booking handlers (admin only)
│   ├── tour/               # Tour handlers
│   └── user/               # User/profile handlers
├── cmd/                    # Application entry point
│   └── main.go             # Main server file
├── config/                 # Configuration loading
├── database/               # Database connection
├── logger/                 # Logging utilities
└── migrations/             # Database migrations (admin only)
```

---

# 3. Getting Started

## 3.1 Prerequisites

Before setting up the development environment, ensure you have:

- **Node.js** 18+ (for frontend applications)
- **Go** 1.21+ (for backend APIs)
- **Docker** and Docker Compose (for local database)
- **PostgreSQL** client (optional, for direct DB access)
- **Git** for version control

## 3.2 Environment Setup

### User Website (fatasiaasia)

1. Clone the repository:
```bash
git clone https://github.com/RachaponKjr/fatasiaasia.git
cd fatasiaasia
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
# Create .env.local file
NEXT_PUBLIC_API_BASE_URL=https://tour-user-api-27tvf.ondigitalocean.app
```

4. Start development server:
```bash
npm run dev
# Server runs at http://localhost:3000
```

### Admin Dashboard (eee)

1. Clone the repository:
```bash
git clone https://github.com/nightwingteam/eee.git
cd eee
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
# Create .env file
VITE_API_URL=https://tour-admin-api.ondigitalocean.app
```

4. Start development server:
```bash
npm run dev
# Server runs at http://localhost:5173
```

### Backend APIs

1. Clone the repositories:
```bash
git clone https://github.com/Lect1val/tour-user-api.git
git clone https://github.com/Lect1val/tour-admin-api.git
```

2. Start local database:
```bash
cd tour-user-api
make start-local
# This starts PostgreSQL via Docker Compose
```

3. Run the API:
```bash
# Option 1: Using Docker
make start-local

# Option 2: Running directly
export $(cat env.local | xargs) && go run ./cmd/main.go
```

## 3.3 Default Credentials

### Admin Dashboard
- **Email:** admin@example.com (must be whitelisted)
- **Password:** Set during registration

### User Website
- Users register via the registration form
- Email verification required

---

# 4. User Website (Fantasia Asia)

## 4.1 Public Pages

### 4.1.1 Homepage
The homepage showcases:
- Hero banner with call-to-action
- Featured destinations (Thailand, Japan, Vietnam, etc.)
- Popular tours section (top 4 by booking count)
- Beach tours highlight
- Newsletter subscription

### 4.1.2 Tours Page (`/tours`)
Features:
- Complete tour listing with pagination (15 per page)
- Filter by category:
  - All Tours
  - Popular
  - Sea, Beaches and Islands
  - Culture, History and Traditions
  - Nature
  - Local Experiences
  - Cities and Modernity
  - Wellness and Spirituality
- Filter by duration:
  - Half-Day
  - Full-Day
  - Multi-Day
- Search functionality
- Wishlist toggle (logged-in users)

### 4.1.3 Tour Detail Page (`/tours/[id]`)
Displays:
- Tour gallery with image slider
- Tour title and country
- Pricing information
- Overview and highlights
- Day-by-day itinerary
- What's included/not included
- What to bring
- Booking button
- Wishlist toggle

### 4.1.4 Destinations Pages
Country-specific pages showing tours available in:
- Thailand
- Japan
- Vietnam
- Cambodia
- Indonesia
- And more...

### 4.1.5 About Page (`/about`)
Company information and mission statement.

### 4.1.6 Contact Page (`/contact`)
Contact form and business information.

## 4.2 Authentication Pages

### 4.2.1 Login (`/login`)
- Email and password fields
- "Remember me" option
- Forgot password link
- Register link

### 4.2.2 Register (`/register`)
- Email field
- Password field (8+ characters)
- First name and last name
- OTP verification step

### 4.2.3 Forgot Password (`/forgot-password`)
- Email input
- Reset link sent to email
- 1-hour expiration

### 4.2.4 Reset Password
- New password input
- Confirmation input
- Token validation

## 4.3 Protected Pages (Requires Login)

### 4.3.1 Profile Page (`/profile`)
Overview showing:
- User information summary
- Recent bookings (up to 3)
- Quick links to other sections

### 4.3.2 Account Settings (`/profile/accountsetting`)
Editable fields:
- First name
- Last name
- Phone number
- Language preference
- Birthday
- Country
- Timezone
- Address
- Profile picture upload (max 2MB)

### 4.3.3 My Tours (`/profile/tour`)
List of all user bookings with:
- Tour thumbnail
- Tour title
- Date range
- Status badge (Confirmed, In Progress)
- Cancel booking button

### 4.3.4 Past Tours (`/profile/past`)
Completed tours (paid and past end date).

### 4.3.5 Wishlist (`/profile/wishlist`)
Saved tours with quick actions.

## 4.4 Booking Flow

### Step 1: Tour Selection
User clicks "Book Now" on a tour detail page.

### Step 2: Booking Form (`/tours/[id]/booking`)
User enters:
- Start date (must be future)
- Visit time
- Number of adult tickets (18+)
- Number of child tickets (6-17)
- Number of infant tickets (0-5)
- Contact email
- First name
- Last name
- Phone number
- Address (optional)

### Step 3: Confirmation
- Booking created with "pending" status
- Admin notified via email
- Confirmation shown to user

### Step 4: Payment (After Admin Confirmation)
- Admin sets price and confirms booking
- Payment link generated via Omise
- User receives email with payment link
- User completes payment
- Status updated to "paid"

## 4.5 User Profile Features

### Profile Picture Upload
- Supported formats: JPG, PNG, WebP
- Maximum size: 2 MB
- Images stored in DigitalOcean Spaces
- URL saved to user profile

### Booking Cancellation
- Users can cancel bookings
- Confirmation prompt before cancellation
- Booking deleted from system

---

# 5. Admin Dashboard (CMS)

## 5.1 Dashboard Overview

The dashboard provides:
- Total tours count
- Total bookings count
- Total clients count
- Recent activity feed
- Quick action buttons

## 5.2 Tours Management

### 5.2.1 Tours List
- Grid view of all tours
- Search by title
- Filter by country
- Status indicators (published/draft)

### 5.2.2 Create Tour
The tour creation modal has 4 tabs:

**Tab 1: Basic Information**
- Title (required)
- Country (required, from preset list)
- Estimated cost per person
- Estimated cost for tour agencies (optional)
- Currency
- Overview (rich text)
- Highlights (rich text)
- Brochure URL

**Tab 2: Gallery**
- Image upload (drag & drop)
- Multiple images support
- Preview with delete option

**Tab 3: Itinerary**
- Day-by-day breakdown
- Day title
- Day description
- Day images

**Tab 4: Tour Details**
- Included items (with icons)
- Not included items
- What to bring

### 5.2.3 Edit Tour
Same interface as create, with pre-filled data.

### 5.2.4 Delete Tour
- Confirmation required
- Cannot delete if tour has bookings

### 5.2.5 Display Status
- Toggle to show/hide tour on website
- Hidden tours not visible to users

## 5.3 Bookings Management

### 5.3.1 Bookings List
- All bookings with status badges
- Client name and email
- Tour title
- Total price
- Created date

### 5.3.2 Confirm Booking
- Set final price
- Generate Omise payment link
- Email sent to client

### 5.3.3 Decline Booking
- Mark booking as declined
- Reason (optional)

### 5.3.4 Delete Booking
- Remove booking from system
- Confirmation required

### 5.3.5 Booking Statuses
- **Pending**: Awaiting confirmation
- **Confirmed**: Price set, payment link sent
- **Paid**: Payment completed (via Omise webhook)
- **Declined**: Booking rejected

## 5.4 Clients Management

### 5.4.1 Clients List
- All registered users
- Avatar display
- Name and email
- User type (general_user, tour_agency)
- Registration date

### 5.4.2 Create Client
- Name
- Email
- Phone
- Password (auto-generated if empty)

### 5.4.3 Edit Client
- Update name, email, phone
- Change user type

### 5.4.4 Create Tour Agency
- Special user type with agency pricing
- See lower prices on tours

## 5.5 Settings

### 5.5.1 Profile Settings
- Update admin profile
- Change password

### 5.5.2 System Settings
- API configuration
- Email settings (read-only)

---

# 6. Backend APIs

## 6.1 Tour User API

### Base URL
- Production: `https://tour-user-api-27tvf.ondigitalocean.app`
- Development: `http://localhost:9090`

### Endpoints Overview

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | /readiness | No | Health check |
| GET | /liveness | No | Liveness probe |
| GET | /metrics | No | Memory stats |
| POST | /auth/register | No | Initiate registration |
| POST | /auth/verify-otp | No | Verify OTP |
| POST | /auth/login | No | User login |
| POST | /auth/forgot-password | No | Request password reset |
| POST | /auth/reset-password | No | Reset password |
| GET | /tour | No* | List all tours |
| GET | /tour/popular | No* | Get popular tours |
| GET | /tour/:id | No* | Get tour details |
| GET | /tour/wishlist | Yes | Get user's wishlist |
| POST | /tour/:id/wishlist | Yes | Add to wishlist |
| DELETE | /tour/:id/wishlist | Yes | Remove from wishlist |
| GET | /tour/booking | Yes | Get user's bookings |
| POST | /tour/:id/booking | Yes | Create booking |
| DELETE | /tour/booking/:id | Yes | Cancel booking |
| GET | /tour/past | Yes | Get past tours |
| GET | /user/profile | Yes | Get user profile |
| PUT | /user/profile | Yes | Update user profile |
| POST | /user/profile/avatar | Yes | Upload avatar |

*Optional auth for wishlist status

### Response Format
```json
{
  "code": 2000,
  "message": "Success.",
  "data": { ... }
}
```

### Error Codes
- 2000: Success
- 4000: General failure
- 4002: Invalid parameter
- 4010: Token expired/invalid
- 4030: No permission
- 4040: Not found
- 4090: Conflict
- 5001: Database error
- 5002: Operation error

## 6.2 Tour Admin API

### Base URL
- Production: `https://tour-admin-api.ondigitalocean.app`
- Development: `http://localhost:9091`

### Endpoints Overview

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | /readiness | No | Health check |
| GET | /liveness | No | Liveness probe |
| POST | /auth/login | No | Admin login |
| POST | /auth/register | No | Register admin (whitelisted) |
| POST | /auth/forgot-password | No | Request password reset |
| POST | /auth/reset-password | No | Reset password |
| GET | /tour | Yes | List all tours |
| GET | /tour/:id | Yes | Get tour details |
| POST | /tour | Yes | Create tour (multipart) |
| PUT | /tour/:id | Yes | Update tour |
| DELETE | /tour/:id | Yes | Delete tour |
| POST | /tour/create-from-urls | Yes | Create tour with URLs |
| PUT | /tour/update-from-urls/:id | Yes | Update tour with URLs |
| GET | /booking | Yes | List bookings |
| POST | /booking/:id/confirm | Yes | Confirm booking |
| DELETE | /booking/:id | Yes | Delete booking |
| POST | /payment/webhook/omise | No | Omise webhook |
| POST | /file/upload | Yes | Upload file to storage |
| POST | /user/tour-agency | Yes | Create tour agency user |
| GET | /user/clients | Yes | List all clients |
| PUT | /user/clients/:id | Yes | Update client |
| DELETE | /user/clients/:id | Yes | Delete client |

---

# 7. Database Structure

## 7.1 Core Tables

### users
```sql
CREATE TABLE users (
    user_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    user_type VARCHAR(50) NOT NULL DEFAULT 'general_user',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

### user_profiles
```sql
CREATE TABLE user_profiles (
    profile_id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES users(user_id) ON DELETE CASCADE,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    phone_number VARCHAR(20),
    language VARCHAR(50) DEFAULT 'English',
    birthday DATE,
    country VARCHAR(100),
    timezone VARCHAR(50),
    address TEXT,
    profile_picture_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

### tours
```sql
CREATE TABLE tours (
    tour_id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    country VARCHAR(100) NOT NULL,
    estimate_cost_per_person TEXT,
    estimate_cost_per_person_tour_agency TEXT,
    currency VARCHAR(10) DEFAULT 'USD',
    overview TEXT,
    highlight TEXT,
    gallery_urls TEXT[],
    brochure_url TEXT,
    itineraries JSONB,
    tour_details JSONB,
    display_status BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

### bookings
```sql
CREATE TABLE bookings (
    booking_id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES users(user_id),
    tour_id INTEGER REFERENCES tours(tour_id),
    start_date DATE NOT NULL,
    visit_time TIME,
    adult_tickets INTEGER DEFAULT 0,
    child_tickets INTEGER DEFAULT 0,
    infant_tickets INTEGER DEFAULT 0,
    booking_email VARCHAR(255) NOT NULL,
    booking_firstname VARCHAR(100) NOT NULL,
    booking_surname VARCHAR(100) NOT NULL,
    booking_phone VARCHAR(20) NOT NULL,
    booking_address TEXT,
    booking_status VARCHAR(50) DEFAULT 'pending',
    total_price DECIMAL(10, 2) DEFAULT 0,
    currency VARCHAR(10) DEFAULT 'USD',
    payment_url TEXT,
    payment_ref TEXT,
    booking_ref VARCHAR(100),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

### wishlists
```sql
CREATE TABLE wishlists (
    wishlist_id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES users(user_id) ON DELETE CASCADE,
    tour_id INTEGER REFERENCES tours(tour_id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(user_id, tour_id)
);
```

### backoffice_users (Admin API)
```sql
CREATE TABLE backoffice_users (
    admin_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

## 7.2 Support Tables

### otp_verifications
```sql
CREATE TABLE otp_verifications (
    otp_id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    otp_code VARCHAR(6) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    expires_at TIMESTAMPTZ NOT NULL,
    attempts INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

### password_reset_tokens
```sql
CREATE TABLE password_reset_tokens (
    token_id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES users(user_id),
    token VARCHAR(64) NOT NULL UNIQUE,
    expires_at TIMESTAMPTZ NOT NULL,
    used BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

---

# 8. Payment Integration

## 8.1 Omise Payment Gateway

### Overview
The platform uses Omise for payment processing. Omise is a Thailand-based payment gateway supporting:
- Credit/debit cards
- Online banking
- QR payments
- And more

### Configuration
```bash
# Environment variables
OMISE_PUBLIC_KEY=pkey_test_xxxxx
OMISE_SECRET_KEY=skey_test_xxxxx
```

### Payment Flow

1. **Booking Confirmed by Admin**
   - Admin sets final price
   - Admin API creates Omise payment link
   - Link stored in database
   - Email sent to customer

2. **Customer Payment**
   - Customer clicks payment link
   - Completes payment on Omise
   - Omise processes transaction

3. **Webhook Notification**
   - Omise sends webhook to `/payment/webhook/omise`
   - Admin API updates booking status
   - Status changed to "paid"

### Payment Link Creation
```go
// Admin API creates payment link
linkParams := &omise.CreateLinkParams{
    Amount:      int64(price * 100), // In satang
    Currency:    "thb",
    Description: fmt.Sprintf("Booking #%d - %s", bookingID, tourTitle),
    Title:       "Tour Booking Payment",
}
```

### Webhook Handling
```go
// Webhook event structure
type OmiseWebhook struct {
    Key  string `json:"key"`
    Data struct {
        Object string `json:"object"`
        ID     string `json:"id"`
        Status string `json:"status"`
        Link   string `json:"link"`
    } `json:"data"`
}
```

---

# 9. Email Notifications

## 9.1 Email Types

### Registration Verification
Sent when user registers.
```
Subject: Verify Your Fantasia Asia Account

Your verification code is: XXXXXX

This code expires in 5 minutes.
```

### Password Reset
Sent when user requests password reset.
```
Subject: Reset Your Password

Click the link below to reset your password:
[Reset Link]

This link expires in 1 hour.
```

### Booking Notification (Admin)
Sent when new booking is created.
```
Subject: New Booking Received

Tour: [Tour Title]
Customer: [Name]
Email: [Email]
Tickets: X adults, X children, X infants
```

## 9.2 SMTP Configuration

```bash
# Environment variables
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USERNAME=your-email@gmail.com
SMTP_PASSWORD=app-specific-password
SMTP_FROM=noreply@fantasiaasia.com
```

---

# 10. Security & Authentication

## 10.1 JWT Authentication

### Token Structure
```json
{
  "user_id": "uuid",
  "email": "user@example.com",
  "user_type": "general_user",
  "exp": 1234567890,
  "iat": 1234567890
}
```

### Token Lifecycle
- Issued on successful login
- Expires after 1 hour
- Stored in HTTP-only cookies
- Refreshed on each request (optional)

### Token Validation
- Signature verified using secret key
- Expiration checked
- User existence verified

## 10.2 Password Security

### Hashing
- Passwords hashed using bcrypt
- Cost factor: 10
- Never stored in plain text

### Password Requirements
- Minimum 8 characters
- Maximum 64 characters

## 10.3 OTP Security

### Generation
- 6-digit random numeric code
- Cryptographically secure random

### Rate Limiting
- Max 3 OTP requests per email per 15 minutes
- Max 5 verification attempts per OTP

### Expiration
- OTP expires after 5 minutes
- New OTP invalidates previous

## 10.4 Admin Security

### Whitelist Protection
- Only whitelisted emails can register
- Configured in environment variables

```bash
WHITELIST_EMAILS=admin@company.com,staff@company.com
```

---

# 11. Deployment Guide

## 11.1 DigitalOcean App Platform

### User Website
1. Connect GitHub repository
2. Select Dockerfile or npm build
3. Configure environment variables
4. Deploy

### Backend APIs
1. Connect GitHub repository
2. Use Dockerfile for build
3. Configure:
   - Environment variables
   - Database add-on (PostgreSQL)
   - Health check path: /readiness

### Environment Variables

**User API:**
```
DATABASE_URL=postgresql://...
JWT_SECRET=your-secret
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USERNAME=...
SMTP_PASSWORD=...
```

**Admin API:**
```
DATABASE_URL=postgresql://...
JWT_SECRET=your-secret
WHITELIST_EMAILS=admin@company.com
OMISE_SECRET_KEY=skey_...
DO_SPACES_KEY=...
DO_SPACES_SECRET=...
DO_SPACES_ENDPOINT=...
DO_SPACES_BUCKET=...
```

## 11.2 Database Migrations

Run migrations before first deployment:
```bash
# Apply all migrations
psql $DATABASE_URL -f migrations/001_initial.sql
psql $DATABASE_URL -f migrations/002_add_tour_agency.sql
# etc.
```

## 11.3 Domain Configuration

1. Configure custom domain in DigitalOcean
2. Add DNS records (A, CNAME)
3. Enable HTTPS (automatic with Let's Encrypt)

---

# 12. Troubleshooting

## 12.1 Common Issues

### "Session token expired"
**Problem:** API returns code 4010
**Solution:** User needs to log in again. Check JWT expiration settings.

### Tours not showing
**Problem:** Tours page empty
**Cause:** API returning error or tours have display_status = false
**Solution:** 
1. Check API is running
2. Check tours have display_status enabled
3. Check for expired tokens being sent

### Image upload fails
**Problem:** Profile picture or tour images not uploading
**Cause:** File too large or wrong format
**Solution:**
1. Check file size (max 2MB for avatar, 32MB for tour)
2. Check file format (JPG, PNG, WebP)
3. Check DO Spaces credentials

### Payment link not working
**Problem:** Customer cannot complete payment
**Cause:** Omise configuration or link expired
**Solution:**
1. Verify Omise keys are correct
2. Check if link has expired
3. Generate new payment link

### OTP not received
**Problem:** User not receiving verification email
**Cause:** SMTP configuration or email blocked
**Solution:**
1. Check SMTP credentials
2. Check spam folder
3. Verify email address format
4. Check rate limits

## 12.2 Log Locations

- **User API logs:** DigitalOcean App Platform console
- **Admin API logs:** DigitalOcean App Platform console
- **Frontend errors:** Browser console

## 12.3 Health Checks

**User API:**
```bash
curl https://tour-user-api-27tvf.ondigitalocean.app/liveness
```

**Admin API:**
```bash
curl https://tour-admin-api.ondigitalocean.app/liveness
```

---

# 13. API Reference

## 13.1 Authentication Endpoints

### POST /auth/register
Initiates user registration.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "SecurePass123",
  "firstName": "John",
  "lastName": "Doe"
}
```

**Response (200):**
```json
{
  "code": 2000,
  "message": "OTP sent successfully. Please check your email to verify your account."
}
```

### POST /auth/verify-otp
Verifies OTP and creates account.

**Request:**
```json
{
  "email": "user@example.com",
  "otpCode": "123456"
}
```

### POST /auth/login
Authenticates user.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "SecurePass123"
}
```

**Response (200):**
```json
{
  "code": 2000,
  "message": "Success.",
  "data": {
    "sessionToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

## 13.2 Tour Endpoints

### GET /tour
Lists all visible tours.

**Query Parameters:**
- `country` (optional): Filter by country

**Response (200):**
```json
{
  "code": 2000,
  "message": "Success.",
  "data": [
    {
      "tourId": 1,
      "title": "Amazing Thailand Tour",
      "country": "Thailand",
      "estimateCostPerPerson": 1500.00,
      "thumbnail": "https://...",
      "itinerariesDays": 7,
      "isWishlist": true
    }
  ]
}
```

### GET /tour/:id
Gets tour details.

**Response (200):**
```json
{
  "code": 2000,
  "message": "Success.",
  "data": {
    "tourId": 1,
    "title": "Amazing Thailand Tour",
    "country": "Thailand",
    "estimateCostPerPerson": 1500.00,
    "currency": "USD",
    "overview": "...",
    "highlight": "...",
    "galleryUrls": ["url1", "url2"],
    "brochureUrl": "...",
    "itineraries": [
      {
        "day": 1,
        "title": "Arrival",
        "detail": "...",
        "images": []
      }
    ],
    "tourDetails": {
      "included": [{"text": "Guide", "iconUrl": "..."}],
      "notIncluded": ["Flights"],
      "whatToBring": "Camera, sunscreen"
    },
    "isWishlist": false
  }
}
```

## 13.3 Booking Endpoints

### POST /tour/:id/booking
Creates a new booking.

**Request:**
```json
{
  "startDate": 1735171200,
  "visitTime": 1735200000,
  "adultTickets": 2,
  "childTickets": 1,
  "infantTickets": 0,
  "bookingEmail": "user@example.com",
  "bookingFirstname": "John",
  "bookingSurname": "Doe",
  "bookingPhone": "+1234567890",
  "bookingAddress": "123 Main St"
}
```

### DELETE /tour/booking/:id
Cancels a booking.

**Response (200):**
```json
{
  "code": 2000,
  "message": "Booking cancelled successfully"
}
```

## 13.4 Profile Endpoints

### GET /user/profile
Gets current user's profile.

**Response (200):**
```json
{
  "code": 2000,
  "message": "Success.",
  "data": {
    "userId": "uuid",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "phoneNumber": "+1234567890",
    "language": "English",
    "birthday": "1990-05-15",
    "country": "USA",
    "timezone": "America/New_York",
    "address": "123 Main St",
    "profilePictureUrl": "https://..."
  }
}
```

### PUT /user/profile
Updates user profile.

**Request (partial update):**
```json
{
  "firstName": "Johnny",
  "language": "Thai"
}
```

---

# 14. Business Rules

## 14.1 User Registration Rules
1. Email must be unique across platform
2. Password minimum 8 characters
3. OTP verification required
4. Max 3 OTP requests per 15 minutes
5. Max 5 verification attempts per OTP

## 14.2 Tour Visibility Rules
1. Only tours with `display_status = true` are visible
2. Hidden tours maintain booking history
3. Popular tours based on booking count

## 14.3 Booking Rules
1. Users must be logged in
2. Start date must be in future
3. At least one ticket required
4. Price set by admin after creation
5. One booking per submission

## 14.4 Wishlist Rules
1. Requires login
2. One wishlist entry per user per tour
3. Cleared when tour is deleted

## 14.5 Price Display Rules
- **General users**: See `estimateCostPerPerson`
- **Tour agencies**: See `estimateCostPerPersonTourAgency` if available

## 14.6 Admin Rules
1. Only whitelisted emails can register
2. All admin actions logged
3. Cannot delete tours with bookings

---

# 15. Appendix

## 15.1 Supported Countries

- Thailand
- Japan
- Vietnam
- Cambodia
- Indonesia
- Malaysia
- Singapore
- Philippines
- Myanmar
- Laos
- Nepal
- India
- Sri Lanka
- Maldives
- China
- South Korea

## 15.2 Tour Categories

1. Popular
2. Sea, Beaches and Islands
3. Culture, History and Traditions
4. Nature
5. Local Experiences
6. Cities and Modernity
7. Wellness and Spirituality

## 15.3 Booking Status Flow

```
pending → confirmed → paid
    ↓         ↓
declined   declined
```

## 15.4 Rate Limits

| Action | Limit |
|--------|-------|
| OTP Generation | 3 per 15 min per email |
| OTP Verification | 5 attempts per code |
| Password Reset | 1 per hour per email |

## 15.5 File Size Limits

| File Type | Max Size |
|-----------|----------|
| Profile Avatar | 2 MB |
| Tour Images | 32 MB |
| Brochure PDF | 10 MB |

## 15.6 Contact Information

**Technical Support:**
- Email: support@nightwingteam.com
- GitHub: github.com/nightwingteam

**Emergency Contacts:**
- [Add emergency contact information]

---

**End of Documentation**

*This manual is proprietary and confidential. Unauthorized distribution is prohibited.*

*© 2025 Nightwing Team. All rights reserved.*
