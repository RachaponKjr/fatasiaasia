# Fantasia Asia - Admin User Guide
## Complete Guide for Backoffice Administrators

**Version:** 1.0  
**Last Updated:** December 2025

---

# Table of Contents

1. [Introduction](#1-introduction)
2. [Logging In](#2-logging-in)
3. [Dashboard Overview](#3-dashboard-overview)
4. [Managing Tours](#4-managing-tours)
5. [Managing Bookings](#5-managing-bookings)
6. [Managing Clients](#6-managing-clients)
7. [File Management](#7-file-management)
8. [Account Settings](#8-account-settings)
9. [Common Tasks](#9-common-tasks)
10. [Troubleshooting](#10-troubleshooting)

---

# 1. Introduction

## 1.1 What is the Admin Dashboard?

The Admin Dashboard is your central control panel for managing all aspects of the Fantasia Asia tour booking platform. From here, you can:

- Create and edit tour packages
- View and manage customer bookings
- Confirm bookings and send payment links
- Manage client accounts
- Upload images and files
- Monitor platform activity

## 1.2 Browser Requirements

For the best experience, we recommend:
- Google Chrome (latest version)
- Mozilla Firefox (latest version)
- Microsoft Edge (latest version)
- Safari 14+

## 1.3 Accessing the Dashboard

The Admin Dashboard is accessible at:
- **Production:** `https://admin.fantasiaasia.com`
- **Development:** `http://localhost:5173`

---

# 2. Logging In

## 2.1 Login Process

1. Navigate to the Admin Dashboard URL
2. Enter your email address
3. Enter your password
4. Click "Login"

## 2.2 First-Time Registration

If you are a new administrator:

1. Your email must be on the whitelist (contact your system administrator)
2. Click "Register" on the login page
3. Enter your:
   - First Name
   - Last Name
   - Email Address
   - Password (minimum 8 characters)
4. Click "Register"
5. You will be logged in automatically

## 2.3 Forgot Password

If you forgot your password:

1. Click "Forgot Password" on the login page
2. Enter your email address
3. Check your email for the reset link
4. Click the link (valid for 1 hour)
5. Enter your new password
6. Log in with your new password

## 2.4 Logout

To logout:
1. Click your profile icon in the top right
2. Select "Logout"
3. You will be redirected to the login page

---

# 3. Dashboard Overview

## 3.1 Navigation

The left sidebar contains:
- **Overview** - Dashboard home with statistics
- **Tours** - Tour management
- **Bookings** - Booking management
- **Clients** - Client management
- **Hotels** - Hotel management (future feature)
- **Invoices** - Invoice management (future feature)
- **Settings** - Account settings

## 3.2 Overview Page

The Overview page displays:

### Quick Stats Cards
- **Total Tours** - Number of tours in the system
- **Total Bookings** - Number of bookings received
- **Total Clients** - Number of registered users
- **Revenue** - Total confirmed revenue

### Recent Activity
Shows the latest:
- New bookings
- Client registrations
- Tour updates

### Quick Actions
- Create New Tour
- View Pending Bookings
- Add New Client

---

# 4. Managing Tours

## 4.1 Viewing Tours

1. Click "Tours" in the sidebar
2. View the tour grid/list
3. Use filters to narrow results:
   - Search by title
   - Filter by country
   - Filter by status

## 4.2 Creating a New Tour

### Step 1: Click "Add Tour"
Located at the top right of the Tours page.

### Step 2: Basic Information Tab

Fill in the following fields:

| Field | Required | Description |
|-------|----------|-------------|
| Title | Yes | Tour name (e.g., "Amazing Thailand Adventure") |
| Country | Yes | Select from dropdown |
| Price (General) | No | Cost per person for regular users |
| Price (Agency) | No | Discounted price for tour agencies |
| Currency | No | Currency code (default: USD) |
| Overview | No | Detailed description (supports rich text) |
| Highlights | No | Key tour highlights |
| Brochure URL | No | Link to PDF brochure |
| Display Status | No | Toggle to show/hide on website |

### Step 3: Gallery Tab

1. Click "Upload Images" or drag and drop
2. Upload multiple images
3. First image becomes thumbnail
4. Reorder by dragging
5. Delete unwanted images

**Image Guidelines:**
- Recommended size: 1920x1080px
- Formats: JPG, PNG, WebP
- Max file size: 32MB each

### Step 4: Itinerary Tab

Add day-by-day activities:

1. Click "Add Day"
2. Enter:
   - Day number
   - Day title (e.g., "Arrival in Bangkok")
   - Day description
   - Day images (optional)
3. Repeat for each day
4. Reorder days by dragging

### Step 5: Tour Details Tab

Add included/excluded items:

**What's Included:**
1. Click "Add Item"
2. Enter text (e.g., "Professional guide")
3. Select icon (optional)
4. Add more items as needed

**What's Not Included:**
1. Click "Add Item"
2. Enter text (e.g., "International flights")

**What to Bring:**
- Enter free text description

### Step 6: Save Tour

1. Review all information
2. Set "Display on Website" if ready to publish
3. Click "Save Tour"

## 4.3 Editing a Tour

1. Find the tour in the list
2. Click the three-dot menu (⋮)
3. Select "Edit"
4. Make changes
5. Click "Save Changes"

## 4.4 Toggling Display Status

To show/hide a tour on the website:

1. Find the tour
2. Click the toggle switch
3. Green = Visible, Gray = Hidden

**Note:** Hidden tours retain all data and bookings.

## 4.5 Deleting a Tour

1. Find the tour
2. Click the three-dot menu (⋮)
3. Select "Delete"
4. Confirm deletion

**Important:** Tours with existing bookings cannot be deleted. You must delete all bookings first.

---

# 5. Managing Bookings

## 5.1 Viewing Bookings

1. Click "Bookings" in the sidebar
2. View all bookings in a table
3. Filter by status:
   - All
   - Pending
   - Confirmed
   - Paid
   - Declined

## 5.2 Understanding Booking Status

| Status | Color | Meaning |
|--------|-------|---------|
| Pending | Yellow | New booking, awaiting your action |
| Confirmed | Blue | You set a price, payment link sent |
| Paid | Green | Customer completed payment |
| Declined | Red | Booking was rejected |

## 5.3 Confirming a Booking

When a new booking arrives:

1. Click on the booking to view details
2. Review:
   - Customer information
   - Tour details
   - Number of travelers
   - Requested dates
3. Set the final price
4. Click "Confirm Booking"
5. System will:
   - Generate payment link via Omise
   - Send email to customer
   - Update status to "Confirmed"

## 5.4 Declining a Booking

If you cannot fulfill a booking:

1. Click on the booking
2. Click "Decline"
3. Enter reason (optional)
4. Confirm
5. Customer will be notified

## 5.5 Viewing Booking Details

Click on any booking to see:

- **Customer Info:**
  - Name
  - Email
  - Phone
  - Address

- **Tour Info:**
  - Tour title
  - Start date
  - Visit time

- **Traveler Details:**
  - Adult count
  - Child count
  - Infant count
  - Total travelers

- **Payment Info:**
  - Total price
  - Currency
  - Payment URL (if confirmed)
  - Payment status

## 5.6 Deleting a Booking

1. Click on the booking
2. Click "Delete"
3. Confirm deletion

**Warning:** This action cannot be undone.

---

# 6. Managing Clients

## 6.1 Viewing Clients

1. Click "Clients" in the sidebar
2. View client list with:
   - Avatar
   - Name
   - Email
   - User type
   - Registration date

## 6.2 Client Types

| Type | Description |
|------|-------------|
| general_user | Regular customer |
| tour_agency | Travel agency partner (gets special pricing) |

## 6.3 Creating a Client

1. Click "Add Client"
2. Enter:
   - Name (First and Last)
   - Email address
   - Phone number
   - Password (or leave blank to auto-generate)
3. Click "Create"

## 6.4 Creating a Tour Agency Account

To give a partner agency access to special pricing:

1. Click "Add Tour Agency"
2. Enter:
   - Agency email
   - Password
3. Click "Create"

The agency can now login and see discounted prices.

## 6.5 Editing a Client

1. Find the client
2. Click "Edit"
3. Update information
4. Click "Save"

## 6.6 Deleting a Client

1. Find the client
2. Click "Delete"
3. Confirm

**Note:** Clients with bookings cannot be deleted.

---

# 7. File Management

## 7.1 Uploading Files

Files can be uploaded in:
- Tour Gallery
- Tour Itinerary
- Tour Details (icons)

## 7.2 Supported File Types

| Use Case | Formats | Max Size |
|----------|---------|----------|
| Tour Images | JPG, PNG, WebP | 32 MB |
| Icons | PNG, SVG | 1 MB |
| Brochures | PDF | 10 MB |

## 7.3 Image Guidelines

For best results:

**Gallery Images:**
- Resolution: 1920x1080px minimum
- Aspect ratio: 16:9 recommended
- Quality: High (80%+)

**Thumbnails:**
- First gallery image is used
- Should be eye-catching
- Clear, colorful photos work best

**Itinerary Images:**
- Should relate to that day's activities
- Can be smaller (800x600px minimum)

---

# 8. Account Settings

## 8.1 Accessing Settings

1. Click "Settings" in the sidebar
2. Or click your profile icon

## 8.2 Profile Settings

Update your:
- First Name
- Last Name
- Email (view only)
- Profile Picture

## 8.3 Changing Password

1. Go to Settings
2. Click "Change Password"
3. Enter current password
4. Enter new password
5. Confirm new password
6. Click "Update"

## 8.4 Notification Settings

Configure:
- Email notifications for new bookings
- Daily summary emails
- Alert preferences

---

# 9. Common Tasks

## 9.1 Daily Workflow

### Morning
1. Login to dashboard
2. Check Overview for new activity
3. Review pending bookings
4. Respond to inquiries

### Throughout Day
1. Confirm bookings as reviewed
2. Monitor for payment completions
3. Update tour information as needed

### End of Day
1. Review confirmed bookings
2. Prepare for next day
3. Check client registrations

## 9.2 Processing a New Booking

1. ✅ Receive booking notification
2. ✅ Review customer details
3. ✅ Check availability for requested dates
4. ✅ Calculate final price
5. ✅ Confirm booking in system
6. ✅ Verify payment link was sent
7. ✅ Monitor for payment completion

## 9.3 Creating a New Tour

1. ✅ Gather all tour information
2. ✅ Prepare high-quality images
3. ✅ Write compelling descriptions
4. ✅ Create day-by-day itinerary
5. ✅ List inclusions and exclusions
6. ✅ Set competitive pricing
7. ✅ Upload and preview
8. ✅ Enable display when ready

## 9.4 Updating Tour Pricing

1. Find the tour
2. Click Edit
3. Update price fields
4. Save changes
5. New price shows immediately

## 9.5 Running a Promotion

To discount a tour:

1. Edit the tour
2. Lower the price temporarily
3. Update overview to mention promotion
4. Set an end date reminder
5. Revert when promotion ends

---

# 10. Troubleshooting

## 10.1 Login Issues

**Problem:** Can't log in

**Solutions:**
1. Check email is correct
2. Check password (case-sensitive)
3. Clear browser cache
4. Try password reset
5. Contact administrator if whitelisted

## 10.2 Image Upload Issues

**Problem:** Images won't upload

**Solutions:**
1. Check file size (max 32MB)
2. Check file format (JPG, PNG, WebP)
3. Try a different browser
4. Clear browser cache
5. Check internet connection

## 10.3 Booking Confirmation Issues

**Problem:** Payment link not generating

**Solutions:**
1. Check Omise is configured
2. Verify price is entered
3. Try again
4. Contact technical support

## 10.4 Tour Not Showing on Website

**Problem:** Tour created but not visible

**Solutions:**
1. Check "Display on Website" is ON
2. Wait 1-2 minutes for cache to clear
3. Hard refresh the website (Ctrl+Shift+R)
4. Check tour has at least one image

## 10.5 Slow Performance

**Problem:** Dashboard is slow

**Solutions:**
1. Close other browser tabs
2. Clear browser cache
3. Check internet connection
4. Try a different browser
5. Report to technical support

## 10.6 Getting Help

For technical issues:
- Email: support@nightwingteam.com
- Check system status
- Create a support ticket

For urgent issues:
- Contact your system administrator
- Use emergency support line

---

# Quick Reference Card

## Keyboard Shortcuts

| Action | Shortcut |
|--------|----------|
| Save | Ctrl+S |
| New Tour | Ctrl+N |
| Search | Ctrl+F |
| Dashboard | Ctrl+D |

## Status Colors

| Color | Meaning |
|-------|---------|
| 🟢 Green | Active/Paid/Success |
| 🟡 Yellow | Pending/Warning |
| 🔵 Blue | Confirmed/Info |
| 🔴 Red | Declined/Error |
| ⚪ Gray | Inactive/Draft |

## Contact

- **Technical Support:** support@nightwingteam.com
- **Documentation:** [Link to docs]
- **Emergency:** [Emergency contact]

---

*This guide is proprietary. For internal use only.*

*© 2025 Fantasia Asia. All rights reserved.*
