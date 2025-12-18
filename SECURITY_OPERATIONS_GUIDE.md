# Fantasia Asia - Security & Operations Guide
## Complete Security, Monitoring, and Operations Documentation

**Version:** 1.0  
**Last Updated:** December 2025  
**Classification:** CONFIDENTIAL - Internal Use Only

---

# Table of Contents

1. [Security Overview](#1-security-overview)
2. [Authentication Security](#2-authentication-security)
3. [Data Protection](#3-data-protection)
4. [API Security](#4-api-security)
5. [Infrastructure Security](#5-infrastructure-security)
6. [Access Control](#6-access-control)
7. [Incident Response](#7-incident-response)
8. [Monitoring & Alerting](#8-monitoring--alerting)
9. [Backup & Recovery](#9-backup--recovery)
10. [Compliance](#10-compliance)
11. [Security Checklist](#11-security-checklist)

---

# 1. Security Overview

## 1.1 Security Architecture

The Fantasia Asia platform implements multiple layers of security:

```
┌─────────────────────────────────────────────────────────────────┐
│                    SECURITY LAYERS                               │
├─────────────────────────────────────────────────────────────────┤
│  Layer 1: Network Security                                       │
│  • HTTPS/TLS encryption for all traffic                         │
│  • Private network for database                                  │
│  • Firewall rules on DO App Platform                            │
├─────────────────────────────────────────────────────────────────┤
│  Layer 2: Application Security                                   │
│  • JWT authentication                                            │
│  • Input validation                                              │
│  • Rate limiting                                                 │
│  • CORS policies                                                 │
├─────────────────────────────────────────────────────────────────┤
│  Layer 3: Data Security                                          │
│  • bcrypt password hashing                                       │
│  • Encrypted connections to database                             │
│  • Secure file storage with ACLs                                 │
├─────────────────────────────────────────────────────────────────┤
│  Layer 4: Operational Security                                   │
│  • Access control with whitelisting                              │
│  • Audit logging                                                 │
│  • Regular security updates                                      │
└─────────────────────────────────────────────────────────────────┘
```

## 1.2 Security Principles

1. **Defense in Depth** - Multiple security layers
2. **Least Privilege** - Minimum necessary access
3. **Fail Secure** - Default to deny
4. **Complete Mediation** - Verify every access
5. **Open Design** - Security through robust mechanisms, not obscurity

---

# 2. Authentication Security

## 2.1 Password Security

### Storage
- **Algorithm:** bcrypt
- **Cost Factor:** 10
- **Salt:** Automatically generated per password

### Requirements
- Minimum: 8 characters
- Maximum: 64 characters
- No complexity requirements (user-friendly approach)

### Implementation
```go
// Password hashing
hashedPassword, err := bcrypt.GenerateFromPassword(
    []byte(password), 
    bcrypt.DefaultCost
)

// Password verification
err := bcrypt.CompareHashAndPassword(
    []byte(storedHash), 
    []byte(password)
)
```

## 2.2 JWT Token Security

### Token Structure
```json
{
  "user_id": "uuid",
  "email": "user@example.com",
  "user_type": "general_user",
  "exp": 1703980800,
  "iat": 1703977200
}
```

### Security Parameters
| Parameter | Value | Rationale |
|-----------|-------|-----------|
| Algorithm | HS256 | Industry standard for symmetric signing |
| Expiry | 1 hour | Limits exposure if token compromised |
| Storage | HTTP-only cookie | Prevents XSS access |
| Transmission | Authorization header | Standard OAuth pattern |

### Token Validation
Every authenticated request:
1. Extract token from Authorization header
2. Verify signature using secret key
3. Check expiration time
4. Verify user exists in database
5. Proceed or reject

## 2.3 OTP Security

### Generation
- 6-digit random numeric code
- Cryptographically secure random source
- Rate limited: 3 per 15 minutes

### Expiration
- Valid for 5 minutes
- Single use only
- New OTP invalidates previous

### Attack Prevention
- Rate limiting prevents brute force
- Attempt tracking (max 5 per code)
- Account lockout after excessive failures

## 2.4 Password Reset Security

### Token Generation
- 64-character cryptographically random hex string
- 1-hour expiration
- Single use only

### Flow Security
1. Always return success (prevents email enumeration)
2. Token invalidated after use
3. New request invalidates previous tokens
4. Secure link via HTTPS

---

# 3. Data Protection

## 3.1 Data Classification

| Classification | Examples | Protection Level |
|----------------|----------|------------------|
| **Confidential** | Passwords, tokens | Encrypted, never logged |
| **Private** | User PII, booking details | Encrypted in transit, access controlled |
| **Internal** | Tour data, analytics | Standard protection |
| **Public** | Published tours | No special protection |

## 3.2 PII Handling

### Collected PII
- Email addresses
- Names
- Phone numbers
- Physical addresses
- Birthdays
- Payment information (via Omise)

### Protection Measures
1. **Encryption in Transit:** TLS 1.2+
2. **Encryption at Rest:** Database encryption
3. **Access Control:** Authentication required
4. **Data Minimization:** Collect only what's needed
5. **Retention:** Keep only as long as necessary

## 3.3 Database Security

### Connection Security
```
DATABASE_URL=postgresql://user:pass@host:25060/db?sslmode=require
```

### Access Control
- Database accessible only from DO private network
- No public internet access
- Role-based permissions in PostgreSQL

### Query Safety
- Parameterized queries throughout
- No string concatenation for SQL
- ORM/query builder prevents SQL injection

```go
// Safe: parameterized query
db.Exec(ctx, 
    "SELECT * FROM users WHERE email = $1", 
    email
)

// NEVER: string concatenation
// db.Exec(ctx, "SELECT * FROM users WHERE email = '" + email + "'")
```

## 3.4 File Storage Security

### DigitalOcean Spaces
- Private by default
- Signed URLs for temporary access
- CDN delivery for public assets

### Upload Security
- File type validation
- Size limits enforced
- Virus scanning (if configured)
- Unique filenames prevent overwriting

---

# 4. API Security

## 4.1 Input Validation

### Validation Rules
All inputs validated before processing:

```go
type RegisterRequest struct {
    Email     string `json:"email" binding:"required,email"`
    Password  string `json:"password" binding:"required,min=8,max=64"`
    FirstName string `json:"firstName" binding:"required,min=1,max=100"`
    LastName  string `json:"lastName" binding:"required,min=1,max=100"`
}
```

### Validation Types
| Type | Validation |
|------|------------|
| Email | RFC 5322 format |
| Password | Length 8-64 |
| Names | Letters, spaces, hyphens only |
| Dates | Valid format, range checking |
| IDs | Numeric, positive |
| Phone | Max 20 characters |

## 4.2 Rate Limiting

### Current Limits
| Endpoint | Limit | Window |
|----------|-------|--------|
| POST /auth/register | 3 | 15 min |
| POST /auth/verify-otp | 5 | per code |
| POST /auth/forgot-password | 1 | per hour |
| General API | 1000 | per minute |

### Implementation
Rate limiting via IP and email tracking in Redis/memory.

## 4.3 CORS Policy

### Configuration (User API)
```go
config := cors.Config{
    AllowOrigins: []string{
        "https://fantasiaasia.com",
        "https://www.fantasiaasia.com",
    },
    AllowMethods: []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
    AllowHeaders: []string{"Origin", "Content-Type", "Authorization"},
    AllowCredentials: true,
}
```

### Policy Rationale
- Only allow known frontend origins
- Credentials allowed for cookie-based auth
- Preflight requests handled automatically

## 4.4 Headers Security

### Recommended Headers
```
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Strict-Transport-Security: max-age=31536000; includeSubDomains
Content-Security-Policy: default-src 'self'
```

---

# 5. Infrastructure Security

## 5.1 Network Security

### DigitalOcean App Platform
- Automatic TLS certificate management
- DDoS protection included
- Private networking for database
- No SSH access (serverless)

### Network Architecture
```
Internet → Cloudflare (optional) → DO App Platform → Private Network → Database
```

## 5.2 Secrets Management

### Environment Variables
All secrets stored as environment variables in DO App Platform:
- DATABASE_URL
- JWT_SECRET
- OMISE_SECRET_KEY
- SMTP_PASSWORD
- DO_SPACES_SECRET

### Secret Rotation
| Secret | Rotation Frequency | Impact |
|--------|-------------------|--------|
| JWT_SECRET | Yearly or after breach | All users logged out |
| Database Password | Yearly or after breach | Brief downtime |
| Omise Keys | If compromised | Payment processing |
| SMTP Password | If compromised | Email delivery |

### Rotation Procedure
1. Generate new secret
2. Update in DO App Platform
3. Deploy (automatic)
4. Verify functionality
5. Delete old secret from any backups

## 5.3 Dependency Security

### Vulnerability Scanning
```bash
# Go dependencies
go list -m all | nancy sleuth

# Node dependencies
npm audit
```

### Update Policy
- Critical: Immediate
- High: Within 7 days
- Medium: Within 30 days
- Low: Next release cycle

---

# 6. Access Control

## 6.1 Admin Whitelist

Only whitelisted emails can register for admin access:

```bash
WHITELIST_EMAILS=admin@company.com,staff@company.com
```

### Adding Admins
1. Add email to WHITELIST_EMAILS
2. Deploy Admin API
3. User registers via /auth/register
4. Account created

### Removing Admins
1. Remove from whitelist
2. (Optional) Deactivate account in database
3. Rotate JWT secret if immediate revocation needed

## 6.2 User Types

| Type | Capabilities |
|------|--------------|
| general_user | Browse, book, wishlist, profile |
| tour_agency | Same + agency pricing |
| backoffice (admin) | Full admin dashboard access |

## 6.3 Resource Authorization

### User API
- Users can only access their own data
- user_id from JWT checked against resource

```go
// Verify ownership
if booking.UserID != tokenUserID {
    return Forbidden()
}
```

### Admin API
- All admins have full access (no role-based restrictions currently)
- Future: Implement role-based access control

---

# 7. Incident Response

## 7.1 Incident Classification

| Severity | Description | Response Time | Examples |
|----------|-------------|---------------|----------|
| P1 Critical | System down, data breach | Immediate | Complete outage, unauthorized access |
| P2 High | Major feature broken | < 1 hour | Payment failures, auth broken |
| P3 Medium | Minor feature broken | < 4 hours | Search not working |
| P4 Low | Cosmetic issues | Next business day | UI glitches |

## 7.2 Response Procedure

### Step 1: Detection & Triage
```
[ ] Alert received
[ ] Severity assessed
[ ] Incident commander assigned
[ ] Team notified
```

### Step 2: Containment
```
[ ] Affected systems identified
[ ] Traffic isolated if necessary
[ ] Evidence preserved
```

### Step 3: Remediation
```
[ ] Root cause identified
[ ] Fix developed and tested
[ ] Fix deployed
[ ] Verification complete
```

### Step 4: Recovery
```
[ ] Services restored
[ ] Users notified
[ ] Post-mortem scheduled
```

## 7.3 Security Incident Specifics

### Data Breach Response
1. **Contain:** Disable affected accounts/systems
2. **Assess:** Determine scope of exposure
3. **Notify:** Inform affected users and authorities (if required)
4. **Remediate:** Patch vulnerability, rotate secrets
5. **Review:** Conduct thorough post-mortem

### Account Compromise Response
1. Force password reset for affected accounts
2. Invalidate all sessions
3. Check for unauthorized changes
4. Notify user
5. Review access logs

---

# 8. Monitoring & Alerting

## 8.1 Key Metrics

### Application Metrics
| Metric | Warning | Critical |
|--------|---------|----------|
| Error Rate | > 1% | > 5% |
| Response Time (p95) | > 2s | > 5s |
| Request Rate Drop | > 50% | > 80% |

### Infrastructure Metrics
| Metric | Warning | Critical |
|--------|---------|----------|
| CPU Usage | > 70% | > 90% |
| Memory Usage | > 70% | > 90% |
| Disk Usage | > 70% | > 90% |
| DB Connections | > 50% | > 80% |

## 8.2 Health Checks

### Endpoints
```bash
# User API
curl https://tour-user-api-27tvf.ondigitalocean.app/readiness
curl https://tour-user-api-27tvf.ondigitalocean.app/liveness

# Admin API
curl https://tour-admin-api.ondigitalocean.app/readiness
curl https://tour-admin-api.ondigitalocean.app/liveness
```

### Automated Checks
- DigitalOcean App Platform: Built-in health checks
- Recommended: External monitoring (UptimeRobot, Pingdom)

## 8.3 Logging

### Log Levels
| Level | Usage |
|-------|-------|
| ERROR | Failures requiring attention |
| WARN | Potential issues |
| INFO | Normal operations |
| DEBUG | Detailed debugging (dev only) |

### What to Log
- All authentication attempts
- All API errors
- Booking creations
- Payment events
- Admin actions

### What NOT to Log
- Passwords (even hashed)
- Full tokens
- Credit card numbers
- Complete PII

---

# 9. Backup & Recovery

## 9.1 Backup Strategy

### Database Backups
- **Frequency:** Daily (DO Managed DB)
- **Retention:** 7 days
- **Type:** Full backup + WAL archiving
- **Location:** DigitalOcean datacenter

### File Backups
- **Storage:** DigitalOcean Spaces
- **Replication:** Within datacenter
- **Retention:** Indefinite (until deleted)

## 9.2 Recovery Procedures

### Database Recovery
```bash
# List available backups
doctl databases backups list <db-id>

# Restore from backup
doctl databases create --restore-from <backup-id>

# Update connection strings in apps
# Redeploy applications
```

### Point-in-Time Recovery
Available through DigitalOcean Managed Database console.
- Select any point within retention window
- Creates new database cluster
- Update connection strings

## 9.3 Recovery Time Objectives

| Component | RTO | RPO |
|-----------|-----|-----|
| Application | 30 min | 0 |
| Database | 2 hours | 1 hour |
| File Storage | 1 hour | 1 hour |
| Full Platform | 4 hours | 1 hour |

---

# 10. Compliance

## 10.1 Data Privacy

### PDPA (Thailand)
- User consent for data collection
- Right to access personal data
- Right to deletion (data subject request)
- Data breach notification within 72 hours

### GDPR (if serving EU users)
- Lawful basis for processing
- Data minimization
- Right to portability
- Data protection impact assessment

## 10.2 Payment Compliance

### PCI-DSS
- No card data stored (handled by Omise)
- Use Omise hosted payment pages
- Maintain secure systems

## 10.3 Security Standards

### Recommended Practices
- [ ] Regular security assessments
- [ ] Penetration testing annually
- [ ] Employee security training
- [ ] Vendor security reviews

---

# 11. Security Checklist

## 11.1 Pre-Deployment Checklist

```
[ ] All secrets in environment variables (not in code)
[ ] Debug mode disabled
[ ] Error messages don't expose internals
[ ] HTTPS enforced
[ ] CORS properly configured
[ ] Rate limiting enabled
[ ] Input validation complete
[ ] Dependencies updated
```

## 11.2 Regular Security Tasks

### Weekly
- [ ] Review error logs
- [ ] Check for failed login attempts
- [ ] Verify backup completion

### Monthly
- [ ] Review access permissions
- [ ] Check for dependency updates
- [ ] Review security alerts

### Quarterly
- [ ] Rotate non-critical secrets
- [ ] Review and update documentation
- [ ] Conduct security training
- [ ] Test disaster recovery

### Annually
- [ ] Full security assessment
- [ ] Penetration testing
- [ ] Rotate critical secrets
- [ ] Review compliance requirements

## 11.3 Incident Response Contacts

| Role | Contact | Backup |
|------|---------|--------|
| Security Lead | [Contact Info] | [Backup Contact] |
| Operations | [Contact Info] | [Backup Contact] |
| Management | [Contact Info] | [Backup Contact] |

---

# Appendix A: Security Quick Reference

## API Security Headers

```
Authorization: Bearer <token>
Content-Type: application/json
```

## Common Security Errors

| Error | Meaning | Action |
|-------|---------|--------|
| 4010 | Token expired | Re-authenticate |
| 4030 | No permission | Check authorization |
| 429 | Rate limited | Wait and retry |

## Emergency Procedures

### Force Logout All Users
1. Rotate JWT_SECRET in environment
2. Redeploy all applications
3. All existing tokens become invalid

### Disable User Account
```sql
UPDATE users SET is_active = FALSE WHERE email = 'user@example.com';
```

### Block IP Address
Configure in DigitalOcean App Platform or Cloudflare.

---

**End of Security & Operations Guide**

*This document is CONFIDENTIAL and for internal use only.*

*© 2025 Nightwing Team*
