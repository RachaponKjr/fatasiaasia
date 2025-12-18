# Fantasia Asia - Database Schema Reference
## Complete Database Documentation

**Version:** 1.0  
**Last Updated:** December 2025

---

# Table of Contents

1. [Overview](#1-overview)
2. [Entity Relationship Diagram](#2-entity-relationship-diagram)
3. [Tables Reference](#3-tables-reference)
4. [Indexes](#4-indexes)
5. [Constraints](#5-constraints)
6. [Common Queries](#6-common-queries)
7. [Performance Tips](#7-performance-tips)

---

# 1. Overview

## 1.1 Database Engine
- **Engine:** PostgreSQL 15+
- **Hosting:** DigitalOcean Managed Database
- **Character Set:** UTF-8
- **Collation:** en_US.UTF-8

## 1.2 Schema Summary

| Table | Description | Est. Rows |
|-------|-------------|-----------|
| users | User accounts | ~10,000 |
| user_profiles | User profile data | ~10,000 |
| tours | Tour packages | ~100 |
| bookings | Tour bookings | ~5,000 |
| wishlists | User wishlists | ~20,000 |
| otp_verifications | OTP codes | ~1,000 |
| password_reset_tokens | Reset tokens | ~500 |
| backoffice_users | Admin accounts | ~10 |

---

# 2. Entity Relationship Diagram

```
┌─────────────────────┐       ┌─────────────────────┐
│       users         │       │   backoffice_users  │
├─────────────────────┤       ├─────────────────────┤
│ user_id (PK)        │       │ admin_id (PK)       │
│ email               │       │ email               │
│ password_hash       │       │ password_hash       │
│ user_type           │       │ first_name          │
│ created_at          │       │ last_name           │
│ updated_at          │       │ is_active           │
└──────────┬──────────┘       │ created_at          │
           │                  │ updated_at          │
           │                  └─────────────────────┘
           │
    ┌──────┴───────┬────────────────────┐
    │              │                    │
    ▼              ▼                    ▼
┌─────────────┐  ┌─────────────┐  ┌─────────────┐
│user_profiles│  │  bookings   │  │  wishlists  │
├─────────────┤  ├─────────────┤  ├─────────────┤
│profile_id(PK│  │booking_id(PK│  │wishlist_id  │
│user_id (FK) │  │user_id (FK) │  │user_id (FK) │
│first_name   │  │tour_id (FK) │  │tour_id (FK) │
│last_name    │  │start_date   │  │created_at   │
│phone_number │  │visit_time   │  └──────┬──────┘
│language     │  │adult_tickets│         │
│birthday     │  │child_tickets│         │
│country      │  │infant_ticket│         │
│timezone     │  │booking_email│         │
│address      │  │booking_fname│         │
│profile_pic  │  │booking_sname│         │
│created_at   │  │booking_phone│         │
│updated_at   │  │booking_addr │         │
└─────────────┘  │booking_stat │         │
                 │total_price  │         │
                 │currency     │         │
                 │payment_url  │         │
                 │payment_ref  │         │
                 │booking_ref  │         │
                 │created_at   │         │
                 │updated_at   │         │
                 └──────┬──────┘         │
                        │                │
                        ▼                ▼
                 ┌─────────────────────────┐
                 │         tours           │
                 ├─────────────────────────┤
                 │ tour_id (PK)            │
                 │ title                   │
                 │ country                 │
                 │ est_cost_per_person     │
                 │ est_cost_agency         │
                 │ currency                │
                 │ overview                │
                 │ highlight               │
                 │ gallery_urls            │
                 │ brochure_url            │
                 │ itineraries             │
                 │ tour_details            │
                 │ display_status          │
                 │ created_at              │
                 │ updated_at              │
                 └─────────────────────────┘
```

---

# 3. Tables Reference

## 3.1 users

Core user account table.

```sql
CREATE TABLE users (
    user_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    user_type VARCHAR(50) NOT NULL DEFAULT 'general_user',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_type ON users(user_type);
```

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| user_id | UUID | No | gen_random_uuid() | Primary key |
| email | VARCHAR(255) | No | - | Unique email address |
| password_hash | VARCHAR(255) | No | - | bcrypt hashed password |
| user_type | VARCHAR(50) | No | 'general_user' | User type (general_user, tour_agency) |
| created_at | TIMESTAMPTZ | No | NOW() | Account creation time |
| updated_at | TIMESTAMPTZ | No | NOW() | Last update time |

## 3.2 user_profiles

Extended user profile information.

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
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(user_id)
);

CREATE INDEX idx_profiles_user ON user_profiles(user_id);
```

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| profile_id | SERIAL | No | auto | Primary key |
| user_id | UUID | Yes | - | References users(user_id) |
| first_name | VARCHAR(100) | Yes | - | User's first name |
| last_name | VARCHAR(100) | Yes | - | User's last name |
| phone_number | VARCHAR(20) | Yes | - | Contact phone |
| language | VARCHAR(50) | Yes | 'English' | Preferred language |
| birthday | DATE | Yes | - | Date of birth |
| country | VARCHAR(100) | Yes | - | Country of residence |
| timezone | VARCHAR(50) | Yes | - | User's timezone |
| address | TEXT | Yes | - | Full address |
| profile_picture_url | TEXT | Yes | - | Avatar URL |
| created_at | TIMESTAMPTZ | No | NOW() | Creation time |
| updated_at | TIMESTAMPTZ | No | NOW() | Last update |

## 3.3 tours

Tour packages.

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

CREATE INDEX idx_tours_country ON tours(country);
CREATE INDEX idx_tours_display ON tours(display_status);
CREATE INDEX idx_tours_created ON tours(created_at DESC);
```

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| tour_id | SERIAL | No | auto | Primary key |
| title | VARCHAR(255) | No | - | Tour title |
| country | VARCHAR(100) | No | - | Destination country |
| estimate_cost_per_person | TEXT | Yes | - | Price for general users |
| estimate_cost_per_person_tour_agency | TEXT | Yes | - | Price for agencies |
| currency | VARCHAR(10) | Yes | 'USD' | Currency code |
| overview | TEXT | Yes | - | Full description |
| highlight | TEXT | Yes | - | Tour highlights |
| gallery_urls | TEXT[] | Yes | - | Array of image URLs |
| brochure_url | TEXT | Yes | - | PDF brochure URL |
| itineraries | JSONB | Yes | - | Day-by-day itinerary |
| tour_details | JSONB | Yes | - | Included/excluded items |
| display_status | BOOLEAN | Yes | FALSE | Show on website |
| created_at | TIMESTAMPTZ | No | NOW() | Creation time |
| updated_at | TIMESTAMPTZ | No | NOW() | Last update |

### itineraries JSONB Structure
```json
[
  {
    "day": 1,
    "title": "Arrival Day",
    "detail": "Description of activities...",
    "images": ["url1", "url2"]
  }
]
```

### tour_details JSONB Structure
```json
{
  "included": [
    {"text": "Professional guide", "iconUrl": "https://..."}
  ],
  "notIncluded": ["International flights", "Travel insurance"],
  "whatToBring": "Comfortable shoes, camera, sunscreen"
}
```

## 3.4 bookings

Tour bookings.

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

CREATE INDEX idx_bookings_user ON bookings(user_id);
CREATE INDEX idx_bookings_tour ON bookings(tour_id);
CREATE INDEX idx_bookings_status ON bookings(booking_status);
CREATE INDEX idx_bookings_created ON bookings(created_at DESC);
CREATE INDEX idx_bookings_payment_ref ON bookings(payment_ref);
```

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| booking_id | SERIAL | No | auto | Primary key |
| user_id | UUID | Yes | - | References users |
| tour_id | INTEGER | Yes | - | References tours |
| start_date | DATE | No | - | Tour start date |
| visit_time | TIME | Yes | - | Pickup/meeting time |
| adult_tickets | INTEGER | Yes | 0 | Number of adults |
| child_tickets | INTEGER | Yes | 0 | Number of children |
| infant_tickets | INTEGER | Yes | 0 | Number of infants |
| booking_email | VARCHAR(255) | No | - | Contact email |
| booking_firstname | VARCHAR(100) | No | - | First name |
| booking_surname | VARCHAR(100) | No | - | Last name |
| booking_phone | VARCHAR(20) | No | - | Phone number |
| booking_address | TEXT | Yes | - | Address |
| booking_status | VARCHAR(50) | Yes | 'pending' | Status |
| total_price | DECIMAL(10,2) | Yes | 0 | Final price |
| currency | VARCHAR(10) | Yes | 'USD' | Currency |
| payment_url | TEXT | Yes | - | Omise payment link |
| payment_ref | TEXT | Yes | - | Omise link ID |
| booking_ref | VARCHAR(100) | Yes | - | Booking reference |
| created_at | TIMESTAMPTZ | No | NOW() | Creation time |
| updated_at | TIMESTAMPTZ | No | NOW() | Last update |

### Booking Status Values
- `pending` - Awaiting admin confirmation
- `confirmed` - Admin confirmed, payment pending
- `paid` - Payment completed
- `declined` - Booking rejected
- `cancelled` - User cancelled

## 3.5 wishlists

User tour wishlists.

```sql
CREATE TABLE wishlists (
    wishlist_id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES users(user_id) ON DELETE CASCADE,
    tour_id INTEGER REFERENCES tours(tour_id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(user_id, tour_id)
);

CREATE INDEX idx_wishlists_user ON wishlists(user_id);
CREATE INDEX idx_wishlists_tour ON wishlists(tour_id);
```

## 3.6 otp_verifications

OTP codes for registration.

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

CREATE INDEX idx_otp_email ON otp_verifications(email);
CREATE INDEX idx_otp_expires ON otp_verifications(expires_at);
```

## 3.7 password_reset_tokens

Password reset tokens.

```sql
CREATE TABLE password_reset_tokens (
    token_id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES users(user_id),
    token VARCHAR(64) NOT NULL UNIQUE,
    expires_at TIMESTAMPTZ NOT NULL,
    used BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_reset_token ON password_reset_tokens(token);
CREATE INDEX idx_reset_user ON password_reset_tokens(user_id);
```

## 3.8 backoffice_users

Admin accounts.

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

CREATE INDEX idx_admin_email ON backoffice_users(email);
```

---

# 4. Indexes

## 4.1 Primary Indexes

| Table | Index | Columns |
|-------|-------|---------|
| users | users_pkey | user_id |
| user_profiles | user_profiles_pkey | profile_id |
| tours | tours_pkey | tour_id |
| bookings | bookings_pkey | booking_id |
| wishlists | wishlists_pkey | wishlist_id |

## 4.2 Secondary Indexes

| Table | Index | Columns | Purpose |
|-------|-------|---------|---------|
| users | idx_users_email | email | Lookup by email |
| bookings | idx_bookings_status | booking_status | Filter by status |
| bookings | idx_bookings_created | created_at DESC | Sort by newest |
| tours | idx_tours_country | country | Filter by country |
| tours | idx_tours_display | display_status | Active tours |

---

# 5. Constraints

## 5.1 Foreign Keys

| Table | Column | References | On Delete |
|-------|--------|------------|-----------|
| user_profiles | user_id | users(user_id) | CASCADE |
| bookings | user_id | users(user_id) | SET NULL |
| bookings | tour_id | tours(tour_id) | SET NULL |
| wishlists | user_id | users(user_id) | CASCADE |
| wishlists | tour_id | tours(tour_id) | CASCADE |
| password_reset_tokens | user_id | users(user_id) | CASCADE |

## 5.2 Unique Constraints

| Table | Columns | Description |
|-------|---------|-------------|
| users | email | One account per email |
| user_profiles | user_id | One profile per user |
| wishlists | (user_id, tour_id) | One wishlist entry per user/tour |
| backoffice_users | email | One admin per email |

## 5.3 Check Constraints

```sql
-- Booking must have at least one ticket
ALTER TABLE bookings 
ADD CONSTRAINT chk_tickets 
CHECK (adult_tickets + child_tickets + infant_tickets > 0);

-- Valid booking status
ALTER TABLE bookings 
ADD CONSTRAINT chk_status 
CHECK (booking_status IN ('pending', 'confirmed', 'paid', 'declined', 'cancelled'));

-- Non-negative prices
ALTER TABLE bookings 
ADD CONSTRAINT chk_price 
CHECK (total_price >= 0);
```

---

# 6. Common Queries

## 6.1 User Queries

```sql
-- Get user with profile
SELECT u.*, p.first_name, p.last_name, p.phone_number
FROM users u
LEFT JOIN user_profiles p ON u.user_id = p.user_id
WHERE u.email = 'user@example.com';

-- Get user's bookings with tour info
SELECT b.*, t.title, t.country, t.gallery_urls[1] as thumbnail
FROM bookings b
JOIN tours t ON b.tour_id = t.tour_id
WHERE b.user_id = 'uuid-here'
ORDER BY b.created_at DESC;

-- Get user's wishlist
SELECT t.*
FROM wishlists w
JOIN tours t ON w.tour_id = t.tour_id
WHERE w.user_id = 'uuid-here' AND t.display_status = TRUE
ORDER BY w.created_at DESC;
```

## 6.2 Tour Queries

```sql
-- Get visible tours with booking count (for popularity)
SELECT t.*, COUNT(b.booking_id) as booking_count
FROM tours t
LEFT JOIN bookings b ON t.tour_id = b.tour_id
WHERE t.display_status = TRUE
GROUP BY t.tour_id
ORDER BY booking_count DESC, t.created_at ASC;

-- Get popular tours (top 4)
SELECT t.*, COUNT(b.booking_id) as booking_count
FROM tours t
LEFT JOIN bookings b ON t.tour_id = b.tour_id
WHERE t.display_status = TRUE
GROUP BY t.tour_id
ORDER BY booking_count DESC, t.created_at ASC
LIMIT 4;

-- Get tours by country
SELECT * FROM tours
WHERE country = 'Thailand' AND display_status = TRUE
ORDER BY created_at DESC;
```

## 6.3 Booking Queries

```sql
-- Get pending bookings (admin)
SELECT b.*, t.title as tour_title, 
       CONCAT(up.first_name, ' ', up.last_name) as client_name
FROM bookings b
JOIN tours t ON b.tour_id = t.tour_id
LEFT JOIN users u ON b.user_id = u.user_id
LEFT JOIN user_profiles up ON u.user_id = up.user_id
WHERE b.booking_status = 'pending'
ORDER BY b.created_at DESC;

-- Get booking by payment ref (for webhook)
SELECT * FROM bookings
WHERE payment_ref = 'link_test_123';

-- Update booking status
UPDATE bookings
SET booking_status = 'paid', updated_at = NOW()
WHERE booking_id = 123;
```

## 6.4 Analytics Queries

```sql
-- Bookings per month
SELECT 
    DATE_TRUNC('month', created_at) as month,
    COUNT(*) as booking_count,
    SUM(total_price) as revenue
FROM bookings
WHERE booking_status = 'paid'
GROUP BY DATE_TRUNC('month', created_at)
ORDER BY month DESC;

-- Popular destinations
SELECT country, COUNT(*) as tour_count
FROM tours
WHERE display_status = TRUE
GROUP BY country
ORDER BY tour_count DESC;

-- User registration trend
SELECT 
    DATE_TRUNC('week', created_at) as week,
    COUNT(*) as new_users
FROM users
GROUP BY DATE_TRUNC('week', created_at)
ORDER BY week DESC
LIMIT 12;
```

---

# 7. Performance Tips

## 7.1 Query Optimization

1. **Use Indexes** - Always query by indexed columns
2. **Limit Results** - Use LIMIT for large tables
3. **Select Specific Columns** - Avoid SELECT *
4. **Use JOINs Wisely** - Prefer single queries over N+1

## 7.2 Common Optimizations

```sql
-- ❌ Bad: N+1 queries
for each booking:
    SELECT * FROM tours WHERE tour_id = ?

-- ✅ Good: Single JOIN
SELECT b.*, t.title, t.thumbnail
FROM bookings b
JOIN tours t ON b.tour_id = t.tour_id;
```

## 7.3 Monitoring Queries

```sql
-- Check slow queries
SELECT query, calls, total_time/1000 as total_seconds
FROM pg_stat_statements
ORDER BY total_time DESC
LIMIT 10;

-- Check table sizes
SELECT relname, pg_size_pretty(pg_total_relation_size(relid))
FROM pg_stat_user_tables
ORDER BY pg_total_relation_size(relid) DESC;
```

---

**End of Database Schema Reference**

*© 2025 Nightwing Team*
