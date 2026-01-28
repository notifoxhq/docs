---
sidebar_position: 1
---

# Introduction

Notifox is a developer-first notification platform that provides SMS and Email alerts through a single, simple API. Built for solo developers and small teams who need operational alerts without enterprise complexity.

## Key Features

**Unified API**: Send SMS and Email through the same endpoint - just change the channel parameter. No need to manage separate services or APIs.

**Zero Setup Friction**: No carrier verification (10DLC), no number leasing, no monthly fees. Get started in minutes, not days.

**Usage-Based Pricing**: Pay only for what you send: $0.025 per SMS, $0.001 per Email. No minimums, no hidden costs.

Perfect for operational alerts: cron job monitoring, CI/CD notifications, error tracking, uptime checks, deploy notifications, and incident alerts. Built for reliability with 99.9% uptime SLA and automatic retries.

## Quick Example

```bash
curl -X POST https://api.notifox.com/alert \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "audience": "joe",
    "channel": "sms",
    "alert": "Server is down!"
  }'
```

## Getting Started

1. **Sign up** at [console.notifox.com](https://console.notifox.com)
2. **Get your API token** from the dashboard
3. **Add funds** to your account (or use promo code `launch10`)
4. **Verify recipients** by adding audiences
5. **Send your first alert**

**Pricing**: SMS at $0.025/part, Email at $0.001/email. No monthly fees, no minimums.
