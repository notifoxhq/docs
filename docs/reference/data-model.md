---
sidebar_position: 1
---

# Data Model

This document describes the core objects and concepts in Notifox and how they relate to each other.

**This is the primary reference for understanding Notifox's object model.** It defines all core concepts including accounts, API tokens, audiences, alerts, and channels with precise types, formats, and relationships.

## Core Objects

### Account
Your Notifox account is the top-level container for all resources.

**Properties:**
- **Balance**: Prepaid balance in USD used to pay for alerts
- **API Tokens**: Authentication credentials for API access (up to 10 per account)
- **Audiences**: Named contacts that can receive alerts (up to 15 per account)

**Where to find it:** [Console Account page](https://console.notifox.com/?view=account)

### API Token
An API token (also called API key) is used to authenticate API requests.

**Type:** String (secret, shown only once when created)

**Format:** Alphanumeric string, typically 40+ characters

**Properties:**
- **Token ID**: Unique identifier (visible in dashboard)
- **Created Date**: When the token was created
- **Masked Value**: First and last few characters (for security)

**Where to create:** [Console API Tokens page](https://console.notifox.com/?view=token)

**Usage:** Include in `Authorization: Bearer <token>` header for all API requests

**Limits:** Maximum of 10 API tokens per account

### Audience
An audience is a **named identifier (slug)** that maps to verified contact methods (at most one phone number and/or one email address).

**Type:** String (slug/identifier)

**Format:** 
- Letters, numbers, hyphens, and underscores
- No spaces
- Case-sensitive
- Examples: `joe`, `oncall`, `dev-team`, `support_team`

**Properties:**
- **Name**: The audience identifier (e.g., `"joe"`, `"oncall"`)
- **Phone Number**: One verified phone number (for SMS alerts), or none
- **Email Address**: One verified email address (for email alerts), or none
- **Verification Status**: Whether each contact method is verified

**Where to create:** [Console Audiences page](https://console.notifox.com/?view=audiences)

**Important:** 
- An audience is **not** a user ID, email address, or phone number
- It's a **slug/identifier** you choose that represents a contact
- An audience can have **at most one phone number** and **at most one email address**
- An audience can have just a phone number, just an email address, or both
- You must verify at least one contact method (phone or email) before sending alerts to that channel
- **Console-only management**: Audiences can only be created and managed through the web console. There is no API endpoint for creating, updating, or deleting audiences. You must use the [Notifox console](https://console.notifox.com/?view=audiences) for all audience management operations.

**Example:**
```json
{
  "name": "joe",
  "phone_number": "+15551234567",
  "email_address": "joe@example.com",
  "phone_verified": true,
  "email_verified": true
}
```

### Alert
An alert is a message sent through the Notifox API to a specific audience via a chosen channel.

**Type:** Object/Request

**Properties:**
- **audience** (required): String - The audience identifier/slug (e.g., `"joe"`, `"oncall"`)
- **alert** (required): String - The message content
- **channel** (required): String - Either `"sms"` or `"email"`

**Response Properties:**
- **message_id**: UUID - Unique identifier for the sent alert
- **parts**: Integer - Number of SMS parts (1-5 for SMS, always 1 for email)
- **cost**: Float - Cost in USD
- **currency**: String - Always `"USD"`
- **encoding**: String - `"GSM-7"`, `"UCS-2"` (SMS), or `"UTF-8"` (email)
- **characters**: Integer - Character count

**Example Request:**
```json
{
  "audience": "joe",
  "channel": "sms",
  "alert": "Server is down!"
}
```

### Channel
A channel is the delivery method for an alert.

**Types:**
- **`sms`**: SMS text message
  - Cost: $0.025 per part
  - Max length: 765 characters (5 parts, 5 × 153 = 765)
  - Requires: Verified phone number on the audience
  - Best for: Urgent, time-sensitive alerts

- **`email`**: Email message
  - Cost: $0.001 per email
  - Max length: 50,000 characters
  - Requires: Verified email address on the audience
  - Best for: Detailed reports, logs, non-urgent notifications

**Important:** 
- You must specify the channel when sending an alert
- The audience must have a verified contact method for the chosen channel
- You can configure both channels on the same audience and choose per-message

## Relationships

```
Account
├── API Tokens (1-10)
├── Audiences (1-15)
│   ├── Phone Number (0 or 1, verified)
│   └── Email Address (0 or 1, verified)
└── Balance (USD)

Alert Request
├── Uses: API Token (for authentication)
├── Targets: Audience (by slug/identifier)
├── Delivers via: Channel (sms or email)
└── Requires: Verified contact method matching channel
```

## Workflow

1. **Create Account** → Get access to console
2. **Add Funds** → Prepay balance for alerts
3. **Create API Token** → Get authentication credential
4. **Create Audience** → Choose a slug/identifier (e.g., `"joe"`)
5. **Verify Contact Methods** → Add and verify phone number and/or email
6. **Send Alert** → Use API with audience slug, channel, and message

## Key Concepts

### Audience vs Contact Method
- **Audience**: The identifier/slug you use in API calls (e.g., `"joe"`)
- **Contact Method**: The actual phone number or email address that receives alerts
- One audience can have at most one phone number and at most one email address
- An audience can have just a phone, just an email, or both
- The audience name is what you reference in API calls, not the contact method

### Verification
- All contact methods (phone numbers and email addresses) must be verified before use
- Verification ensures you own/control the contact method
- Unverified contact methods cannot receive alerts
- **Verification process**:
  - **Phone numbers**: You receive a 6-digit code via SMS. Enter this code in the Notifox console to verify ownership.
  - **Email addresses**: You receive a 6-digit code via email. Enter this code in the Notifox console to verify ownership.
- Verification must be completed in the console—you cannot verify contact methods via API
- This verification step is required for SMS compliance and ensures you actually own the phone number or email address

### Channel Selection
- You choose the channel (`sms` or `email`) when sending each alert
- The audience must have a verified contact method for the chosen channel
- You can send SMS to an audience with only email configured (will fail)
- You can send email to an audience with only phone configured (will fail)
- Best practice: Configure both phone and email on audiences for maximum flexibility

## Related Reference Documentation

* [Alerts API Reference](/docs/reference/alerts-api) - Complete API documentation, request/response formats, error codes
* [SMS Parts Reference](/docs/reference/parts) - Understanding SMS parts, encoding, character limits, and cost calculation
