---
sidebar_position: 1
---

# What is Notifox?

Notifox is a simple alert service designed for developers who need to send notifications to themselves or their team. Send alerts via **SMS** or **Email** with a single API call. Built for alerts and monitoring, not mass marketing.

## The Problem: Why Traditional SMS Services Are Overkill

As a developer, you just need to get notified when something happens:
- Server goes down
- API rate limit is hit
- Database backup completes
- Deployment finishes

But traditional SMS providers like Twilio make this unnecessarily expensive and complicated:

* **Expensive upfront costs**: Twilio requires 10DLC/RSC campaign registration ($15-20), monthly campaign fees ($2+), and number leasing costs ($1-2/month per number). You're paying $18-24 before sending your first message.

* **Complex verification process**: Before you can send SMS alerts, you need to register your business, create campaigns, and get carrier approval. This process can take days or weeks.

* **Enterprise pricing**: Most notification services are built for marketing teams sending thousands of messages, with minimum commitments and enterprise contracts.

* **Over-engineered solutions**: You don't need carrier verification, number leasing, or campaign management for simple alerts to yourself.

You need a simple, affordable way to send SMS alerts without jumping through enterprise hoops or paying for features you'll never use.

## What Notifox Is

Notifox is a **developer-focused alert service** that lets you send notifications to verified recipients (yourself and teammates) with a single API call:

* **Two channels**: Send alerts via SMS ($0.025/part) for urgent notifications, or Email ($0.001/email) for detailed reports.

* **No carrier verification required**: Since you're only sending to verified recipients, we handle the verification requirements for you.

* **No number leasing**: No monthly fees or upfront commitments. Pay only for the messages you send.

* **Usage-based pricing**: SMS at $0.025 per part, Email at $0.001 per email. No hidden fees, no minimums.

* **Simple verification**: Add recipients by verifying phone numbers and email addresses. Up to 15 verified recipients per account.

* **Built for alerts**: Designed specifically for developers sending critical notifications, not mass marketing campaigns.

## What Notifox Isn't

* **Not a mass marketing platform**: You can only send to verified recipients (up to 15). Not suitable for sending messages to customers, users, or unverified numbers.

* **Not a replacement for Twilio**: If you need to send to unverified numbers, create marketing campaigns, or send thousands of messages, Twilio or AWS SNS are better fits.

* **Not an enterprise notification platform**: We focus on simplicity for solo developers and small teams, not enterprise-scale notification infrastructure.

## The Solution

Notifox eliminates the barriers that make traditional SMS services expensive and complicated:

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

**No 10DLC registration. No number leasing. No monthly fees. Just simple, affordable SMS alerts.**

## Key Features

* **Zero setup friction**: Create an account, add a payment method, verify recipients, and start sending. No carrier approvals needed.

* **Two channels**: SMS for urgent alerts, Email for detailed notifications. Choose per-message.

* **Transparent pricing**: SMS at $0.025/part, Email at $0.001/email. Calculate costs before sending. No surprises.

* **Simple API**: One endpoint, clear documentation, and SDKs for popular languages.

* **Reliable delivery**: Built on proven infrastructure with automatic retries.

* **Developer-friendly**: RESTful API, comprehensive docs, interactive console for testing.

## Perfect For

* Solo developers monitoring servers and services
* Small teams sending alerts to on-call engineers
* Automated systems notifying developers of critical events
* Anyone who needs simple, affordable SMS notifications without enterprise complexity

## Quick Start

1. **Sign up** at [console.notifox.com](https://console.notifox.com)
2. **Get your API token** from the dashboard
3. **Add funds** to your account (minimum $5)
4. **Verify recipients** by adding audiences and confirming phone numbers and/or email addresses
5. **Send your first alert** using the API, SDK, or interactive console

Get started in minutes, not days. No carrier verification, no campaigns, no enterprise sales calls.
