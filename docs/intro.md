---
sidebar_position: 1
---

# What is Notifox?

Notifox is a simple alert service designed for developers who need to send notifications to themselves or their team. Send alerts via **SMS** or **Email** with a single API call. Built for alerts and monitoring, not mass marketing.

## The Problem: Why Traditional Notification Services Are Overkill

As a developer, you just need to get notified when something happens:
- Server goes down
- API rate limit is hit
- Database backup completes
- Deployment finishes

But most notification platforms are built for marketing teams, not developers:

* **Enterprise-focused**: Most services are designed for sending thousands of messages to customers, with complex setup, minimum commitments, and enterprise contracts.

* **Single-channel limitations**: Many services only support one channel (SMS or email), forcing you to use multiple providers for different use cases.

* **Expensive and complex**: Traditional SMS providers require carrier verification, campaign registration, and number leasing, costing $18-24 before you send your first message.

* **Over-engineered**: You don't need marketing features, campaign management, or enterprise infrastructure for simple alerts to yourself and your team.

You need a simple, affordable way to send notifications across multiple channels without jumping through enterprise hoops or paying for features you'll never use.

## What Notifox Is

Notifox is a **developer-focused multi-channel notification platform** that lets you send alerts to verified recipients (yourself and teammates) with a single API call:

* **Multiple channels**: Send alerts via SMS ($0.025/part) for urgent notifications, or Email ($0.001/email) for detailed reports. Choose the right channel for each alert.

* **No setup friction**: Since you're only sending to verified recipients, we handle all the complexity. No carrier verification, no number leasing, no campaigns.

* **Usage-based pricing**: Pay only for what you send: SMS at $0.025 per part, Email at $0.001 per email. No monthly fees, no minimums, no hidden costs.

* **Simple verification**: Add recipients by verifying phone numbers and email addresses. Up to 15 verified recipients per account.

* **Built for developers**: Designed specifically for sending critical notifications and alerts, not mass marketing campaigns.

* **Easy channel switching**: The same API works for both channels. Switch between SMS and email with a single parameter change.

## What Notifox Isn't

* **Not a mass marketing platform**: You can only send to verified recipients (up to 15). Not suitable for sending messages to customers, users, or unverified numbers.

* **Not a replacement for Twilio**: If you need to send to unverified numbers, create marketing campaigns, or send thousands of messages, Twilio or AWS SNS are better fits.

* **Not an enterprise notification platform**: We focus on simplicity for solo developers and small teams, not enterprise-scale notification infrastructure.

## The Solution

Notifox eliminates the barriers that make traditional notification services expensive and complicated:

```bash
# Send via SMS for urgent alerts
curl -X POST https://api.notifox.com/alert \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "audience": "joe",
    "channel": "sms",
    "alert": "Server is down!"
  }'

# Or send via Email for detailed reports
curl -X POST https://api.notifox.com/alert \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "audience": "joe",
    "channel": "email",
    "alert": "Deployment completed successfully. Details: ..."
  }'
```

**No carrier registration. No number leasing. No monthly fees. Just simple, affordable multi-channel notifications.**

## Key Features

* **Zero setup friction**: Create an account, add a payment method, verify recipients, and start sending. No carrier approvals or complex configurations needed.

* **Multi-channel support**: SMS for urgent, time-sensitive alerts. Email for detailed reports, logs, and non-critical updates. Choose the right channel per message.

* **Transparent pricing**: SMS at $0.025/part, Email at $0.001/email. Calculate costs before sending. No surprises, no minimums.

* **Simple API**: One endpoint for all channels, clear documentation, and SDKs for Python and Go.

* **Reliable delivery**: Built on proven infrastructure with automatic retries and global reach.

* **Developer-friendly**: RESTful API, comprehensive docs, interactive console for testing, and easy channel switching.

## Perfect For

* Solo developers monitoring servers and services
* Small teams sending alerts to on-call engineers
* Automated systems notifying developers of critical events
* Anyone who needs simple, affordable multi-channel notifications without enterprise complexity

## Quick Start

1. **Sign up** at [console.notifox.com](https://console.notifox.com)
2. **Get your API token** from the dashboard
3. **Add funds** to your account (minimum $5)
4. **Verify recipients** by adding audiences and confirming phone numbers and/or email addresses
5. **Send your first alert** using the API, SDK, or interactive console

Get started in minutes, not days. No carrier verification, no campaigns, no enterprise sales calls. Just simple, multi-channel notifications that work.

## Reference Documentation

For complete API and technical documentation:

* **[Data Model](/docs/reference/data-model)** - Complete overview of accounts, API tokens, audiences, alerts, channels, and how they relate. Essential for understanding core concepts.
* **[Alerts API Reference](/docs/reference/alerts-api)** - Complete API documentation: endpoints, request/response formats, error codes, rate limits, and examples.
* **[SMS Parts Reference](/docs/reference/parts)** - Understanding SMS parts, encoding (GSM-7 vs UCS-2), character limits, and cost calculation.

These reference pages provide detailed technical information for both humans and AI assistants.
