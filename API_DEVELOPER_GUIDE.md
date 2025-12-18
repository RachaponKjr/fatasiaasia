# Fantasia Asia - API Developer Guide
## Complete Reference for Backend Integration

**Version:** 1.0  
**Last Updated:** December 2025  
**API Version:** v1

---

# Table of Contents

1. [Introduction](#1-introduction)
2. [Authentication](#2-authentication)
3. [Request/Response Format](#3-requestresponse-format)
4. [User API Endpoints](#4-user-api-endpoints)
5. [Admin API Endpoints](#5-admin-api-endpoints)
6. [Webhooks](#6-webhooks)
7. [Error Handling](#7-error-handling)
8. [Rate Limiting](#8-rate-limiting)
9. [SDK Examples](#9-sdk-examples)
10. [Testing](#10-testing)
11. [Changelog](#11-changelog)

---

# 1. Introduction

## 1.1 Overview

The Fantasia Asia platform provides two RESTful APIs:

| API | Base URL | Purpose |
|-----|----------|---------|
| User API | `https://tour-user-api-27tvf.ondigitalocean.app` | Customer-facing operations |
| Admin API | `https://tour-admin-api.ondigitalocean.app` | Backoffice operations |

## 1.2 API Design Principles

- **RESTful** - Standard HTTP methods (GET, POST, PUT, DELETE)
- **JSON** - All requests and responses use JSON
- **Stateless** - Each request contains all necessary information
- **Versioned** - API version included in response

## 1.3 Environment URLs

| Environment | User API | Admin API |
|-------------|----------|-----------|
| Production | `https://tour-user-api-27tvf.ondigitalocean.app` | `https://tour-admin-api.ondigitalocean.app` |
| Development | `http://localhost:9090` | `http://localhost:9091` |

---

# 2. Authentication

## 2.1 Overview

Both APIs use JWT (JSON Web Token) for authentication.

## 2.2 Obtaining a Token

### User API Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

### Admin API Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "admin@example.com",
  "password": "adminpass123"
}
```

### Response
```json
{
  "code": 2000,
  "message": "Success.",
  "data": {
    "sessionToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

## 2.3 Using the Token

Include the token in the `Authorization` header:

```http
GET /tour/wishlist
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## 2.4 Token Structure

```json
{
  "user_id": "550e8400-e29b-41d4-a716-446655440000",
  "email": "user@example.com",
  "user_type": "general_user",
  "exp": 1703980800,
  "iat": 1703977200
}
```

## 2.5 Token Expiration

- **Expiration Time:** 1 hour from issuance
- **Error Code:** 4010 when expired
- **Action Required:** Re-authenticate to get a new token

## 2.6 Token Refresh

Currently, tokens are not refreshable. Users must re-authenticate when the token expires.

---

# 3. Request/Response Format

## 3.1 Request Headers

### Required Headers
```http
Content-Type: application/json
```

### Optional Headers
```http
Authorization: Bearer <token>
Accept-Language: en
```

## 3.2 Response Envelope

All API responses follow this structure:

```json
{
  "code": 2000,
  "message": "Success.",
  "data": { ... }
}
```

### Fields

| Field | Type | Description |
|-------|------|-------------|
| code | integer | Status code (see Error Codes) |
| message | string | Human-readable message |
| data | object/array/null | Response payload |

## 3.3 Pagination

For list endpoints, use query parameters:

```http
GET /booking?limit=20&offset=0
```

| Parameter | Default | Max | Description |
|-----------|---------|-----|-------------|
| limit | 50 | 100 | Items per page |
| offset | 0 | - | Items to skip |

## 3.4 Filtering

Query parameters for filtering:

```http
GET /tour?country=Thailand
GET /tour?isBeachTour=true
```

## 3.5 Date Formats

| Type | Format | Example |
|------|--------|---------|
| Unix Timestamp | seconds | 1735171200 |
| ISO Date | YYYY-MM-DD | 2025-12-26 |
| ISO DateTime | ISO 8601 | 2025-12-26T10:30:00Z |

---

# 4. User API Endpoints

## 4.1 Health Endpoints

### GET /readiness
Check if server is ready.

**Response:** 200 OK (empty body)

### GET /liveness
Check server health with metadata.

**Response:**
```json
{
  "hostname": "server-001",
  "version": "1.0.0",
  "commit": "abc123"
}
```

### GET /metrics
Get memory statistics.

**Response:**
```json
{
  "memory": {
    "alloc": "12.34 MB",
    "totalAlloc": "123.45 MB",
    "sysAlloc": "234.56 MB",
    "heapInuse": "12.34 MB",
    "heapIdle": "10.00 MB",
    "heapReleased": "5.00 MB",
    "stackInuse": "0.50 MB",
    "stackSys": "0.50 MB"
  }
}
```

## 4.2 Authentication Endpoints

### POST /auth/register
Initiate user registration (sends OTP).

**Request:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe"
}
```

**Validation:**
- email: required, valid email
- password: required, 8-64 characters
- firstName: required, 1-100 characters, letters/spaces/hyphens
- lastName: required, 1-100 characters, letters/spaces/hyphens

**Response:**
```json
{
  "code": 2000,
  "message": "OTP sent successfully. Please check your email to verify your account."
}
```

**Errors:**
- 400: Invalid input
- 409: Email already exists
- 429: Rate limit exceeded

### POST /auth/verify-otp
Verify OTP and complete registration.

**Request:**
```json
{
  "email": "user@example.com",
  "otpCode": "123456"
}
```

**Validation:**
- email: required, valid email
- otpCode: required, exactly 6 digits

**Response:**
```json
{
  "code": 2000,
  "message": "Account verified and registered successfully"
}
```

**Errors:**
- 400: Invalid/expired OTP
- 429: Too many attempts

### POST /auth/login
Authenticate user.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "code": 2000,
  "message": "Success.",
  "data": {
    "sessionToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Errors:**
- 401: Invalid credentials
- 404: User not found

### POST /auth/forgot-password
Request password reset.

**Request:**
```json
{
  "email": "user@example.com"
}
```

**Response:**
```json
{
  "code": 2000,
  "message": "If your email is registered, you will receive a password reset link"
}
```

### POST /auth/reset-password
Reset password with token.

**Request:**
```json
{
  "token": "64-character-hex-token",
  "newPassword": "newpassword123"
}
```

**Response:**
```json
{
  "code": 2000,
  "message": "Password reset successfully"
}
```

**Errors:**
- 400: Invalid/expired token

## 4.3 Tour Endpoints

### GET /tour
List all visible tours.

**Query Parameters:**
- `country` (optional): Filter by country

**Headers:**
- `Authorization` (optional): Include for wishlist status

**Response:**
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

### GET /tour/popular
Get top 4 popular tours.

**Response:** Same as /tour

### GET /tour/:id
Get tour details.

**Path Parameters:**
- `id`: Tour ID (integer)

**Response:**
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
    "brochureUrl": "https://...",
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

**Errors:**
- 404: Tour not found

### GET /tour/wishlist
Get user's wishlist. **[Auth Required]**

**Response:**
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
      "itinerariesDays": 7
    }
  ]
}
```

### POST /tour/:id/wishlist
Add tour to wishlist. **[Auth Required]**

**Response:**
```json
{
  "code": 2000,
  "message": "Success."
}
```

### DELETE /tour/:id/wishlist
Remove from wishlist. **[Auth Required]**

**Response:**
```json
{
  "code": 2000,
  "message": "Success."
}
```

## 4.4 Booking Endpoints

### GET /tour/booking
Get user's bookings. **[Auth Required]**

**Response:**
```json
{
  "code": 2000,
  "message": "Success.",
  "data": [
    {
      "bookingId": 1,
      "tourId": 1,
      "tourTitle": "Amazing Thailand Tour",
      "country": "Thailand",
      "thumbnail": "https://...",
      "startDate": "2025-06-15",
      "endDate": "2025-06-22",
      "duration": "7 days 6 nights",
      "totalTravellers": 3,
      "adultTickets": 2,
      "childTickets": 1,
      "infantTickets": 0,
      "totalPrice": 4500.00,
      "bookingStatus": "confirmed",
      "paymentURL": null,
      "createdAt": "2025-01-15T10:30:00Z"
    }
  ]
}
```

### POST /tour/:id/booking
Create booking. **[Auth Required]**

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

**Validation:**
- startDate: required, Unix timestamp, must be future
- visitTime: required, Unix timestamp
- At least one ticket type > 0
- bookingEmail: required, valid email
- bookingFirstname: required
- bookingSurname: required
- bookingPhone: required

**Response:**
```json
{
  "code": 2000,
  "message": "Success."
}
```

**Errors:**
- 400: Validation error, start date in past
- 404: Tour not found

### DELETE /tour/booking/:id
Cancel booking. **[Auth Required]**

**Response:**
```json
{
  "code": 2000,
  "message": "Booking cancelled successfully"
}
```

### GET /tour/past
Get past tours. **[Auth Required]**

**Response:** Same as /tour/booking

## 4.5 Profile Endpoints

### GET /user/profile
Get user profile. **[Auth Required]**

**Response:**
```json
{
  "code": 2000,
  "message": "Success.",
  "data": {
    "userId": "uuid",
    "name": "",
    "email": "user@example.com",
    "userType": "general_user",
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
Update profile. **[Auth Required]**

**Request (partial update):**
```json
{
  "firstName": "Johnny",
  "lastName": "Doe",
  "phoneNumber": "+1234567890",
  "language": "Thai",
  "birthday": "1990-05-15",
  "country": "Thailand",
  "timezone": "Asia/Bangkok",
  "address": "456 New St"
}
```

**Response:**
```json
{
  "code": 2000,
  "message": "Profile updated successfully"
}
```

### POST /user/profile/avatar
Upload avatar. **[Auth Required]**

**Request:** multipart/form-data
- `file`: Image file (max 2MB)

**Response:**
```json
{
  "code": 2000,
  "message": "Success.",
  "data": {
    "profilePictureUrl": "https://..."
  }
}
```

---

# 5. Admin API Endpoints

## 5.1 Authentication

### POST /auth/login
Same as User API.

### POST /auth/register
Register backoffice admin.

**Note:** Email must be whitelisted.

**Request:**
```json
{
  "firstName": "Admin",
  "lastName": "User",
  "email": "admin@example.com",
  "password": "adminpass123"
}
```

**Errors:**
- 403: Email not whitelisted
- 409: Email already exists

## 5.2 Tour Management

### GET /tour
List all tours. **[Auth Required]**

### GET /tour/:id
Get tour details. **[Auth Required]**

### POST /tour/create-from-urls
Create tour with URLs. **[Auth Required]**

**Request:**
```json
{
  "title": "Amazing Tour",
  "country": "Japan",
  "estimateCostPerPerson": "1000.00",
  "estimateCostPerPersonTourAgency": "800.00",
  "overview": "Description...",
  "highlight": "Highlights...",
  "brochureUrl": "https://...",
  "galleryUrls": ["https://temp/img1.jpg"],
  "itineraries": [
    {
      "day": 1,
      "title": "Day 1",
      "detail": "Activities...",
      "images": ["https://temp/day1.jpg"]
    }
  ],
  "displayStatus": true,
  "tourDetails": {
    "included": [{"text": "Guide", "iconUrl": "..."}],
    "notIncluded": ["Flights"],
    "whatToBring": "Camera"
  }
}
```

**Response:**
```json
{
  "code": 2000,
  "message": "Success.",
  "data": {
    "tourId": 123
  }
}
```

### PUT /tour/update-from-urls/:id
Update tour. **[Auth Required]**

### DELETE /tour/:id
Delete tour. **[Auth Required]**

**Errors:**
- 409: Tour has bookings

## 5.3 Booking Management

### GET /booking
List bookings. **[Auth Required]**

**Query Parameters:**
- `limit`: Items per page (default: 50)
- `offset`: Items to skip (default: 0)

**Response:**
```json
{
  "code": 2000,
  "message": "Success.",
  "data": [
    {
      "bookingId": 123,
      "status": "pending",
      "totalPrice": 1000.0,
      "currency": "USD",
      "paymentUrl": null,
      "clientEmail": "guest@example.com",
      "clientName": "John Smith",
      "tourTitle": "Japan Highlights"
    }
  ]
}
```

### POST /booking/:id/confirm
Confirm booking. **[Auth Required]**

**Request:**
```json
{
  "price": 999.99
}
```

**Response:**
```json
{
  "code": 2000,
  "message": "Success.",
  "data": {
    "paymentUrl": "https://link.omise.co/..."
  }
}
```

### DELETE /booking/:id
Delete booking. **[Auth Required]**

## 5.4 File Upload

### POST /file/upload
Upload file to storage. **[Auth Required]**

**Request:** multipart/form-data
- `file`: File to upload (max 32MB)

**Response:**
```json
{
  "code": 2000,
  "message": "Success.",
  "data": {
    "url": "https://spaces.example.com/temp/uuid.jpg"
  }
}
```

## 5.5 User Management

### POST /user/tour-agency
Create tour agency. **[Auth Required]**

**Request:**
```json
{
  "email": "agency@example.com",
  "password": "securepass123"
}
```

### GET /user/clients
List all clients. **[Auth Required]**

### PUT /user/clients/:id
Update client. **[Auth Required]**

### DELETE /user/clients/:id
Delete client. **[Auth Required]**

---

# 6. Webhooks

## 6.1 Omise Payment Webhook

### POST /payment/webhook/omise
Receives payment events from Omise.

**Request:**
```json
{
  "key": "charge.complete",
  "data": {
    "object": "charge",
    "id": "chrg_test_123",
    "status": "successful",
    "link": "link_test_123"
  }
}
```

**Processing:**
1. Validates webhook payload
2. Extracts link ID
3. Finds booking by payment_ref
4. Updates booking status to "paid"

**Response:**
```json
{
  "code": 2000,
  "message": "Success."
}
```

## 6.2 Webhook Security

- Webhooks should be from known IPs
- Implement signature verification (future)
- Log all webhook events

---

# 7. Error Handling

## 7.1 Error Response Format

```json
{
  "code": 4000,
  "message": "Error description",
  "data": null
}
```

## 7.2 Error Codes

| Code | HTTP Status | Description |
|------|-------------|-------------|
| 2000 | 200/201 | Success |
| 4000 | 400 | General failure |
| 4002 | 400 | Invalid parameter |
| 4010 | 401 | Token expired/invalid |
| 4030 | 403 | No permission |
| 4040 | 404 | Not found |
| 4090 | 409 | Conflict |
| 5001 | 500 | Database error |
| 5002 | 500 | Operation error |
| 5003 | 500 | Client error |
| 5004 | 500 | Third party error |

## 7.3 Common Errors

### Authentication Errors
```json
{
  "code": 4010,
  "message": "Failed to verify session token or token has expired."
}
```

### Validation Errors
```json
{
  "code": 4002,
  "message": "Invalid parameter request."
}
```

### Not Found Errors
```json
{
  "code": 4040,
  "message": "Tour not found"
}
```

---

# 8. Rate Limiting

## 8.1 Current Limits

| Action | Limit | Window |
|--------|-------|--------|
| OTP Generation | 3 requests | 15 minutes |
| OTP Verification | 5 attempts | per code |
| Password Reset | 1 request | per hour |

## 8.2 Rate Limit Response

```json
{
  "code": 4290,
  "message": "Too many requests. Please try again later."
}
```

---

# 9. SDK Examples

## 9.1 JavaScript/TypeScript

```typescript
// Base API Client
const API_BASE = 'https://tour-user-api-27tvf.ondigitalocean.app';

async function apiCall<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<{ code: number; message: string; data: T }> {
  const token = getAuthToken();
  
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...options.headers as Record<string, string>,
  };
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
  });
  
  return response.json();
}

// Example: Login
async function login(email: string, password: string) {
  const response = await apiCall<{ sessionToken: string }>('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
  
  if (response.code === 2000) {
    saveAuthToken(response.data.sessionToken);
  }
  
  return response;
}

// Example: Get Tours
async function getTours(country?: string) {
  const url = country ? `/tour?country=${country}` : '/tour';
  return apiCall<Tour[]>(url);
}

// Example: Create Booking
async function createBooking(tourId: number, bookingData: BookingRequest) {
  return apiCall(`/tour/${tourId}/booking`, {
    method: 'POST',
    body: JSON.stringify(bookingData),
  });
}
```

## 9.2 Python

```python
import requests
from typing import Optional, Dict, Any

class FantasiaAPI:
    def __init__(self, base_url: str = "https://tour-user-api-27tvf.ondigitalocean.app"):
        self.base_url = base_url
        self.token: Optional[str] = None
    
    def _headers(self) -> Dict[str, str]:
        headers = {"Content-Type": "application/json"}
        if self.token:
            headers["Authorization"] = f"Bearer {self.token}"
        return headers
    
    def login(self, email: str, password: str) -> Dict[str, Any]:
        response = requests.post(
            f"{self.base_url}/auth/login",
            json={"email": email, "password": password},
            headers=self._headers()
        )
        data = response.json()
        if data["code"] == 2000:
            self.token = data["data"]["sessionToken"]
        return data
    
    def get_tours(self, country: Optional[str] = None) -> Dict[str, Any]:
        url = f"{self.base_url}/tour"
        if country:
            url += f"?country={country}"
        return requests.get(url, headers=self._headers()).json()
    
    def get_tour_detail(self, tour_id: int) -> Dict[str, Any]:
        return requests.get(
            f"{self.base_url}/tour/{tour_id}",
            headers=self._headers()
        ).json()
    
    def create_booking(self, tour_id: int, booking_data: Dict) -> Dict[str, Any]:
        return requests.post(
            f"{self.base_url}/tour/{tour_id}/booking",
            json=booking_data,
            headers=self._headers()
        ).json()

# Usage
api = FantasiaAPI()
api.login("user@example.com", "password123")
tours = api.get_tours(country="Thailand")
```

## 9.3 cURL Examples

```bash
# Login
curl -X POST https://tour-user-api-27tvf.ondigitalocean.app/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password123"}'

# Get Tours
curl https://tour-user-api-27tvf.ondigitalocean.app/tour

# Get Tour Detail
curl https://tour-user-api-27tvf.ondigitalocean.app/tour/1

# Create Booking (with auth)
curl -X POST https://tour-user-api-27tvf.ondigitalocean.app/tour/1/booking \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "startDate": 1735171200,
    "visitTime": 1735200000,
    "adultTickets": 2,
    "childTickets": 0,
    "infantTickets": 0,
    "bookingEmail": "user@example.com",
    "bookingFirstname": "John",
    "bookingSurname": "Doe",
    "bookingPhone": "+1234567890"
  }'
```

---

# 10. Testing

## 10.1 Test Endpoints

Use these endpoints to verify connectivity:

```bash
# Health check
curl https://tour-user-api-27tvf.ondigitalocean.app/readiness

# Liveness with metadata
curl https://tour-user-api-27tvf.ondigitalocean.app/liveness
```

## 10.2 Test Credentials

Contact administrator for test credentials.

## 10.3 Postman Collection

Import the OpenAPI specification:
- Admin API: `tour-admin-api/openapi.yaml`

---

# 11. Changelog

## Version 1.0 (December 2025)
- Initial API release
- User authentication (register, login, password reset)
- Tour browsing and details
- Booking management
- Wishlist functionality
- Profile management
- Avatar upload
- Admin tour CRUD
- Booking confirmation with Omise
- File upload to cloud storage

---

**End of API Developer Guide**

*For support, contact: support@nightwingteam.com*
