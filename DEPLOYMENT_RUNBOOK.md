# Fantasia Asia - Deployment Runbook
## Complete Guide for Production Deployments

**Version:** 1.0  
**Last Updated:** December 2025  
**Classification:** Technical Operations

---

# Table of Contents

1. [Overview](#1-overview)
2. [Infrastructure](#2-infrastructure)
3. [Pre-Deployment Checklist](#3-pre-deployment-checklist)
4. [Deployment Procedures](#4-deployment-procedures)
5. [Environment Configuration](#5-environment-configuration)
6. [Database Operations](#6-database-operations)
7. [Rollback Procedures](#7-rollback-procedures)
8. [Monitoring & Alerts](#8-monitoring--alerts)
9. [Incident Response](#9-incident-response)
10. [Maintenance Procedures](#10-maintenance-procedures)
11. [Security Procedures](#11-security-procedures)
12. [Disaster Recovery](#12-disaster-recovery)
13. [Contacts](#13-contacts)

---

# 1. Overview

## 1.1 System Components

| Component | Technology | Hosting | Repository |
|-----------|------------|---------|------------|
| User Website | Next.js 15 | DigitalOcean App Platform | nightwingteam/fatasiaasia |
| Admin Dashboard | React + Vite | DigitalOcean App Platform | nightwingteam/eee |
| User API | Go + Gin | DigitalOcean App Platform | Lect1val/tour-user-api |
| Admin API | Go + Gin | DigitalOcean App Platform | Lect1val/tour-admin-api |
| Database | PostgreSQL | DigitalOcean Managed DB | - |
| File Storage | S3-compatible | DigitalOcean Spaces | - |

## 1.2 Deployment Strategy

- **Branch Strategy:**
  - `main` - Production deployments
  - `develop` - Staging/testing
  - `feature/*` - Feature development

- **Deployment Method:**
  - Automatic deployment on push to `main`
  - Zero-downtime rolling updates
  - Health check verification

## 1.3 Deployment Frequency

- **Production:** As needed, during low-traffic hours
- **Staging:** Continuous on develop branch
- **Emergency:** Immediate with approval

---

# 2. Infrastructure

## 2.1 Architecture Diagram

```
                           ┌─────────────────────┐
                           │   Cloudflare CDN    │
                           │   (if configured)   │
                           └──────────┬──────────┘
                                      │
                           ┌──────────▼──────────┐
                           │  DigitalOcean       │
                           │  App Platform       │
                           └──────────┬──────────┘
                                      │
        ┌─────────────────────────────┼─────────────────────────────┐
        │                             │                             │
┌───────▼───────┐           ┌────────▼────────┐           ┌────────▼────────┐
│ User Website  │           │ User API        │           │ Admin API       │
│ fatasiaasia   │           │ tour-user-api   │           │ tour-admin-api  │
│ Next.js       │           │ Go + Gin        │           │ Go + Gin        │
└───────┬───────┘           └────────┬────────┘           └────────┬────────┘
        │                            │                             │
        │                   ┌────────▼────────┐                    │
        │                   │                 │                    │
        │                   │   PostgreSQL    │◄───────────────────┤
        │                   │   Managed DB    │                    │
        │                   │                 │                    │
        │                   └─────────────────┘                    │
        │                                                          │
        │                   ┌─────────────────┐                    │
        │                   │                 │                    │
        └───────────────────► DO Spaces (S3)  ◄────────────────────┘
                            │  File Storage   │
                            │                 │
                            └─────────────────┘
```

## 2.2 Service URLs

| Service | Production URL |
|---------|----------------|
| User Website | https://fantasiaasia.com |
| Admin Dashboard | https://admin.fantasiaasia.com |
| User API | https://tour-user-api-27tvf.ondigitalocean.app |
| Admin API | https://tour-admin-api.ondigitalocean.app |

## 2.3 Resource Specifications

| Component | CPU | Memory | Instances |
|-----------|-----|--------|-----------|
| User Website | 1 vCPU | 1 GB | 1-2 |
| Admin Dashboard | 0.5 vCPU | 512 MB | 1 |
| User API | 1 vCPU | 1 GB | 1-2 |
| Admin API | 1 vCPU | 1 GB | 1 |
| Database | 2 vCPU | 4 GB | 1 (primary) |

---

# 3. Pre-Deployment Checklist

## 3.1 Code Preparation

- [ ] All tests passing
- [ ] Code review approved
- [ ] No critical security vulnerabilities
- [ ] Documentation updated
- [ ] Changelog updated
- [ ] Version number updated (if applicable)

## 3.2 Environment Preparation

- [ ] Environment variables verified
- [ ] Database migrations prepared
- [ ] Rollback plan documented
- [ ] Team notified of deployment
- [ ] Monitoring alerts reviewed

## 3.3 Communication

- [ ] Deployment scheduled in team calendar
- [ ] Stakeholders notified (if major changes)
- [ ] Support team briefed on changes

## 3.4 Backup Verification

- [ ] Database backup completed (for DB changes)
- [ ] Current deployment state documented
- [ ] Rollback commands ready

---

# 4. Deployment Procedures

## 4.1 Standard Deployment (Frontend)

### User Website (fatasiaasia)

```bash
# Step 1: Ensure on main branch
cd fatasiaasia
git checkout main
git pull origin main

# Step 2: Merge changes from develop
git merge develop

# Step 3: Push to trigger deployment
git push origin main

# Step 4: Monitor deployment in DO dashboard
# Navigate to: DigitalOcean > Apps > fatasiaasia
# Wait for "Deployed" status
```

### Admin Dashboard (eee)

```bash
# Step 1: Ensure on main branch
cd eee
git checkout main
git pull origin main

# Step 2: Merge changes from develop
git merge develop

# Step 3: Push to trigger deployment
git push origin main

# Step 4: Monitor in DO dashboard
```

## 4.2 Standard Deployment (Backend)

### User API (tour-user-api)

```bash
# Step 1: Ensure on main branch
cd tour-user-api
git checkout main
git pull origin main

# Step 2: Check for pending migrations
ls database/migrations/

# Step 3: Merge from develop
git merge develop

# Step 4: Push to deploy
git push origin main

# Step 5: Verify health endpoint
curl https://tour-user-api-27tvf.ondigitalocean.app/liveness
```

### Admin API (tour-admin-api)

```bash
# Step 1: Ensure on main branch
cd tour-admin-api
git checkout main
git pull origin main

# Step 2: Merge from develop
git merge develop

# Step 3: Push to deploy
git push origin main

# Step 4: Verify health endpoint
curl https://tour-admin-api.ondigitalocean.app/liveness
```

## 4.3 Deployment with Database Migration

**IMPORTANT:** Database migrations require extra care.

```bash
# Step 1: Backup database
pg_dump $DATABASE_URL > backup_$(date +%Y%m%d_%H%M%S).sql

# Step 2: Apply migrations
psql $DATABASE_URL -f migrations/XXX_migration_name.sql

# Step 3: Verify migration
psql $DATABASE_URL -c "SELECT * FROM schema_migrations;"

# Step 4: Deploy application code
git push origin main

# Step 5: Test new functionality
curl -X POST https://api.example.com/new-endpoint

# Step 6: Monitor for errors
# Check DO App Platform logs
```

## 4.4 Hotfix Deployment

For urgent production fixes:

```bash
# Step 1: Create hotfix branch from main
git checkout main
git pull origin main
git checkout -b hotfix/issue-description

# Step 2: Make fix and commit
git add .
git commit -m "fix: description of fix"

# Step 3: Push hotfix branch
git push origin hotfix/issue-description

# Step 4: Create PR to main (expedited review)
# Get approval from on-call engineer

# Step 5: Merge and deploy
git checkout main
git merge hotfix/issue-description
git push origin main

# Step 6: Backport to develop
git checkout develop
git merge hotfix/issue-description
git push origin develop

# Step 7: Clean up
git branch -d hotfix/issue-description
git push origin --delete hotfix/issue-description
```

## 4.5 Verification Steps

After any deployment:

```bash
# 1. Health checks
curl https://tour-user-api-27tvf.ondigitalocean.app/readiness
curl https://tour-user-api-27tvf.ondigitalocean.app/liveness
curl https://tour-admin-api.ondigitalocean.app/readiness
curl https://tour-admin-api.ondigitalocean.app/liveness

# 2. Smoke tests
# - Visit homepage
# - Browse tours
# - Check login (if auth changes)
# - Test new features

# 3. Check logs for errors
# DigitalOcean > Apps > [app] > Runtime Logs
```

---

# 5. Environment Configuration

## 5.1 User API Environment Variables

```bash
# Database
DATABASE_URL=postgresql://user:pass@host:25060/dbname?sslmode=require

# Server
PORT=8080
GIN_MODE=release
SERVER_READ_TIMEOUT=30s
SERVER_WRITE_TIMEOUT=30s

# JWT
JWT_SECRET=your-secret-key-here
JWT_EXPIRY=1h

# CORS
CORS_ALLOWED_ORIGINS=https://fantasiaasia.com,https://www.fantasiaasia.com

# SMTP
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USERNAME=your-email@gmail.com
SMTP_PASSWORD=app-specific-password
SMTP_FROM=noreply@fantasiaasia.com

# DigitalOcean Spaces
DO_SPACES_KEY=your-access-key
DO_SPACES_SECRET=your-secret-key
DO_SPACES_ENDPOINT=sgp1.digitaloceanspaces.com
DO_SPACES_BUCKET=fantasia-assets
DO_SPACES_CDN_ENDPOINT=https://fantasia-assets.sgp1.cdn.digitaloceanspaces.com

# Admin Notification
ADMIN_NOTIFICATION_EMAIL=admin@fantasiaasia.com
```

## 5.2 Admin API Environment Variables

```bash
# Database
DATABASE_URL=postgresql://user:pass@host:25060/dbname?sslmode=require

# Server
PORT=8080
GIN_MODE=release

# JWT
JWT_SECRET=your-secret-key-here
JWT_EXPIRY=1h

# CORS
CORS_ALLOWED_ORIGINS=https://admin.fantasiaasia.com

# Whitelist
WHITELIST_EMAILS=admin@fantasiaasia.com,staff@fantasiaasia.com

# Omise
OMISE_PUBLIC_KEY=pkey_...
OMISE_SECRET_KEY=skey_...

# DigitalOcean Spaces
DO_SPACES_KEY=your-access-key
DO_SPACES_SECRET=your-secret-key
DO_SPACES_ENDPOINT=sgp1.digitaloceanspaces.com
DO_SPACES_BUCKET=fantasia-assets
DO_SPACES_CDN_ENDPOINT=https://fantasia-assets.sgp1.cdn.digitaloceanspaces.com

# SMTP
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USERNAME=your-email@gmail.com
SMTP_PASSWORD=app-specific-password
```

## 5.3 Frontend Environment Variables

### User Website (fatasiaasia)
```bash
NEXT_PUBLIC_API_BASE_URL=https://tour-user-api-27tvf.ondigitalocean.app
```

### Admin Dashboard (eee)
```bash
VITE_API_URL=https://tour-admin-api.ondigitalocean.app
```

## 5.4 Updating Environment Variables

In DigitalOcean App Platform:

1. Navigate to Apps > [Your App]
2. Click "Settings"
3. Scroll to "App-Level Environment Variables"
4. Click "Edit"
5. Update values
6. Click "Save"
7. App will automatically redeploy

---

# 6. Database Operations

## 6.1 Connecting to Database

```bash
# Using psql
psql "postgresql://user:pass@db-host:25060/dbname?sslmode=require"

# Using environment variable
psql $DATABASE_URL
```

## 6.2 Common Database Commands

```sql
-- Check table sizes
SELECT relname, pg_size_pretty(pg_total_relation_size(relid))
FROM pg_catalog.pg_statio_user_tables
ORDER BY pg_total_relation_size(relid) DESC;

-- Check active connections
SELECT count(*) FROM pg_stat_activity;

-- Check slow queries
SELECT query, calls, total_time, rows
FROM pg_stat_statements
ORDER BY total_time DESC
LIMIT 10;

-- Check table row counts
SELECT schemaname, relname, n_live_tup
FROM pg_stat_user_tables
ORDER BY n_live_tup DESC;
```

## 6.3 Backup Procedures

### Manual Backup
```bash
# Full backup
pg_dump $DATABASE_URL > backup_$(date +%Y%m%d_%H%M%S).sql

# Compressed backup
pg_dump $DATABASE_URL | gzip > backup_$(date +%Y%m%d_%H%M%S).sql.gz

# Table-specific backup
pg_dump $DATABASE_URL -t tours > tours_backup.sql
```

### Automated Backups
DigitalOcean Managed Databases include:
- Daily automatic backups
- 7-day retention
- Point-in-time recovery

## 6.4 Restore Procedures

```bash
# Restore from backup
psql $DATABASE_URL < backup_file.sql

# Restore specific table
psql $DATABASE_URL -c "DROP TABLE IF EXISTS tours CASCADE;"
psql $DATABASE_URL < tours_backup.sql
```

## 6.5 Migration Management

```bash
# Apply single migration
psql $DATABASE_URL -f migrations/001_initial.sql

# Apply all migrations
for f in migrations/*.sql; do
  echo "Applying $f..."
  psql $DATABASE_URL -f "$f"
done

# Verify migrations
psql $DATABASE_URL -c "SELECT * FROM schema_migrations ORDER BY version;"
```

---

# 7. Rollback Procedures

## 7.1 Application Rollback

### DigitalOcean App Platform

1. Navigate to Apps > [Your App]
2. Click "Activity"
3. Find the last successful deployment
4. Click the three dots menu
5. Select "Rollback to this deployment"
6. Confirm rollback

### Git Rollback

```bash
# Identify the commit to rollback to
git log --oneline -10

# Revert to specific commit
git revert HEAD~1

# Or reset (CAUTION: destructive)
git reset --hard <commit-hash>
git push origin main --force

# Better approach: Create rollback commit
git revert <bad-commit-hash>
git push origin main
```

## 7.2 Database Rollback

### Transaction-based (if within transaction)
```sql
ROLLBACK;
```

### Manual Rollback
```bash
# Restore from backup
psql $DATABASE_URL < backup_before_migration.sql

# Or apply down migration
psql $DATABASE_URL -f migrations/001_initial_down.sql
```

## 7.3 Rollback Decision Tree

```
Issue Detected
     │
     ▼
Is it data corruption?
     │
     ├── Yes ─► Stop all traffic, restore DB, then redeploy previous version
     │
     └── No ──► Is it a critical bug?
                    │
                    ├── Yes ─► Rollback deployment immediately
                    │
                    └── No ──► Can hotfix be applied?
                                   │
                                   ├── Yes ─► Deploy hotfix
                                   │
                                   └── No ──► Rollback and schedule proper fix
```

---

# 8. Monitoring & Alerts

## 8.1 Health Endpoints

| Service | Health Endpoint | Expected Response |
|---------|-----------------|-------------------|
| User API | /readiness | 200 OK |
| User API | /liveness | 200 + JSON |
| Admin API | /readiness | 200 OK |
| Admin API | /liveness | 200 + JSON |

## 8.2 Key Metrics to Monitor

### Application Metrics
- Response time (p50, p95, p99)
- Error rate
- Request rate
- Active connections

### Database Metrics
- Connection count
- Query latency
- CPU usage
- Memory usage
- Disk usage

### Infrastructure Metrics
- Container CPU usage
- Container memory usage
- Network I/O

## 8.3 Logging

### Log Locations
- **DO App Platform:** Runtime Logs in dashboard
- **Database:** Query logs in Managed DB console

### Log Levels
- `ERROR` - Immediate attention required
- `WARN` - Potential issues
- `INFO` - Normal operations
- `DEBUG` - Detailed debugging (dev only)

## 8.4 Alert Thresholds

| Metric | Warning | Critical |
|--------|---------|----------|
| Error Rate | > 1% | > 5% |
| Response Time (p95) | > 2s | > 5s |
| CPU Usage | > 70% | > 90% |
| Memory Usage | > 70% | > 90% |
| DB Connections | > 50% | > 80% |
| Disk Usage | > 70% | > 90% |

---

# 9. Incident Response

## 9.1 Severity Levels

| Level | Description | Response Time | Examples |
|-------|-------------|---------------|----------|
| P1 | System down | Immediate | Complete outage, data breach |
| P2 | Major feature broken | < 1 hour | Payments failing, auth broken |
| P3 | Minor feature broken | < 4 hours | Search not working |
| P4 | Cosmetic/low impact | Next business day | UI glitch |

## 9.2 Incident Response Steps

### Step 1: Acknowledge
- Acknowledge the alert/report
- Notify the team
- Start incident timer

### Step 2: Assess
- Determine severity level
- Identify affected components
- Check recent deployments

### Step 3: Mitigate
- Apply immediate fix if possible
- Rollback if necessary
- Communicate status

### Step 4: Resolve
- Implement permanent fix
- Verify resolution
- Update monitoring

### Step 5: Post-Mortem
- Document timeline
- Identify root cause
- Create action items

## 9.3 Communication Templates

### Initial Alert
```
🚨 INCIDENT: [Brief Description]
Severity: P[1-4]
Status: Investigating
Affected: [Components]
Impact: [User impact]
Lead: [Engineer name]
Updates: Every [15/30/60] minutes
```

### Resolution
```
✅ RESOLVED: [Brief Description]
Duration: [X hours/minutes]
Root Cause: [Brief explanation]
Fix: [What was done]
Post-mortem: [Link/scheduled date]
```

---

# 10. Maintenance Procedures

## 10.1 Scheduled Maintenance

### Before Maintenance
1. Announce maintenance window (24h in advance)
2. Prepare maintenance banner
3. Backup all data
4. Test changes in staging

### During Maintenance
1. Enable maintenance mode (if applicable)
2. Perform maintenance tasks
3. Verify changes
4. Test critical functionality

### After Maintenance
1. Disable maintenance mode
2. Monitor for issues
3. Send completion notice

## 10.2 Regular Maintenance Tasks

### Daily
- [ ] Check error logs
- [ ] Verify backups completed
- [ ] Monitor resource usage

### Weekly
- [ ] Review slow queries
- [ ] Check disk usage
- [ ] Review security alerts

### Monthly
- [ ] Update dependencies (non-breaking)
- [ ] Review access permissions
- [ ] Test disaster recovery

### Quarterly
- [ ] Full dependency update
- [ ] Security audit
- [ ] Performance review
- [ ] Backup restoration test

## 10.3 Dependency Updates

```bash
# Frontend (fatasiaasia)
npm outdated
npm update

# Check for breaking changes
npm audit

# If major updates needed:
npm install package@latest

# Test thoroughly before deploying
```

---

# 11. Security Procedures

## 11.1 Secret Rotation

### JWT Secret
1. Generate new secret
2. Update in DO App Platform
3. Apps will auto-redeploy
4. All users will need to re-login

### Database Password
1. Update password in DO Managed DB
2. Update DATABASE_URL in all apps
3. Apps will auto-redeploy
4. Verify connections work

### API Keys (Omise, Spaces)
1. Generate new key in provider console
2. Update in DO App Platform
3. Verify functionality
4. Delete old key

## 11.2 Access Control

### Who Has Access
- **Infrastructure:** DevOps team only
- **Database:** DevOps + Senior developers
- **Application code:** All developers
- **Production logs:** DevOps + Support

### Removing Access
1. Remove from GitHub repository
2. Remove from DigitalOcean team
3. Rotate shared secrets
4. Audit recent activity

## 11.3 Security Incident Response

1. **Isolate** - Contain the breach
2. **Assess** - Determine scope
3. **Notify** - Alert stakeholders
4. **Remediate** - Fix vulnerability
5. **Review** - Post-incident analysis

---

# 12. Disaster Recovery

## 12.1 Recovery Objectives

| Metric | Target |
|--------|--------|
| RTO (Recovery Time Objective) | < 4 hours |
| RPO (Recovery Point Objective) | < 1 hour |

## 12.2 Disaster Scenarios

### Scenario: Database Corruption
1. Stop application traffic
2. Identify corruption extent
3. Restore from backup
4. Apply transaction logs (if available)
5. Resume traffic

### Scenario: Region Outage
1. Notify users of outage
2. Spin up services in backup region
3. Restore database from backup
4. Update DNS
5. Resume operations

### Scenario: Security Breach
1. Isolate affected systems
2. Rotate all secrets
3. Assess data exposure
4. Notify affected users
5. Implement additional security

## 12.3 Recovery Procedures

### Full Database Recovery
```bash
# 1. Get latest backup
doctl databases backups list <db-id>

# 2. Create new database from backup
doctl databases create --restore-from <backup-id>

# 3. Update connection strings
# Update DATABASE_URL in all apps

# 4. Verify data integrity
psql $DATABASE_URL -c "SELECT COUNT(*) FROM tours;"
psql $DATABASE_URL -c "SELECT COUNT(*) FROM bookings;"
```

### Application Recovery
```bash
# 1. Check current status
doctl apps list

# 2. If app is down, redeploy
doctl apps create --spec .do/app.yaml

# 3. Or rollback to last known good
doctl apps update <app-id> --rollback-deployment
```

## 12.4 DR Testing

Conduct DR tests quarterly:
1. Restore database to test environment
2. Deploy applications to test region
3. Verify all functionality
4. Document any issues
5. Update procedures as needed

---

# 13. Contacts

## 13.1 On-Call Rotation

| Role | Contact | Escalation |
|------|---------|------------|
| Primary On-Call | [Name] | [Phone/Slack] |
| Secondary On-Call | [Name] | [Phone/Slack] |
| Engineering Lead | [Name] | [Phone/Slack] |
| Operations Manager | [Name] | [Phone/Slack] |

## 13.2 Vendor Contacts

| Vendor | Support | Account |
|--------|---------|---------|
| DigitalOcean | support.digitalocean.com | [Account ID] |
| Omise | support@omise.co | [Merchant ID] |
| Domain Registrar | [Support URL] | [Account] |

## 13.3 Internal Contacts

| Team | Contact |
|------|---------|
| Development | dev@nightwingteam.com |
| Operations | ops@nightwingteam.com |
| Security | security@nightwingteam.com |
| Management | [Contact] |

---

# Appendix A: Quick Reference Commands

## Health Checks
```bash
curl https://tour-user-api-27tvf.ondigitalocean.app/liveness
curl https://tour-admin-api.ondigitalocean.app/liveness
```

## Database Connection
```bash
psql $DATABASE_URL
```

## View Logs
```bash
doctl apps logs <app-id> --follow
```

## Deploy Latest
```bash
git push origin main
```

## Emergency Rollback
```bash
# Via DO dashboard: Apps > Activity > Rollback
```

---

**End of Deployment Runbook**

*This document is confidential and for internal use only.*

*© 2025 Nightwing Team*
