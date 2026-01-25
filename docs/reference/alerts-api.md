---
sidebar_position: 2
---

# Alerts API Reference

Complete reference for sending alerts via the Notifox API.

## Endpoint

```
POST https://api.notifox.com/alert
```

## Headers

* `Authorization`: `Bearer <your_api_token>` (required)
  * Your API token must be prefixed with "Bearer " and a space
  * Example: `Authorization: Bearer 123e4567-e89b-12d3-a456-426614174000`
* `Content-Type`: `application/json` (required)

## Request Body

The request body must be valid JSON containing:

* `audience` (string, required)
  * The name of the audience to send the alert to
  * Must match a verified audience name in your account
  * Case-sensitive (e.g., `"joe"` and `"Joe"` are different audiences)
  * **Note:** Audiences must be created and verified in the [Notifox console](https://console.notifox.com/?view=audiences) before you can send alerts to them. There is no API endpoint for creating or managing audiences.
* `alert` (string, required)
  * The message text you want to send
  * Cannot be empty
  * For SMS: Will be automatically prefixed with "Notifox: " before sending
  * For Email: A footer disclaimer is automatically appended
* `channel` (string, required)
  * The delivery channel: `"sms"` or `"email"`
  * The audience must have the corresponding contact method configured and verified

## Channel Comparison

| Feature | SMS | Email |
|---------|-----|-------|
| Cost | $0.025 per part | $0.001 per email |
| Max length | 765 chars (5 parts) | 50,000 characters |
| Rate limit | 5 per 5 minutes | 100 per 5 minutes |
| Encoding | GSM-7 or UCS-2 | UTF-8 |
| Prefix/Footer | "Notifox: " prefix | Footer disclaimer |

## Example Requests

### SMS Alert

```bash
curl -X POST https://api.notifox.com/alert \
  -H "Authorization: Bearer YOUR_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "audience": "joe",
    "channel": "sms",
    "alert": "Server is down!"
  }'
```

### Email Alert

```bash
curl -X POST https://api.notifox.com/alert \
  -H "Authorization: Bearer YOUR_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "audience": "joe",
    "channel": "email",
    "alert": "Server CPU usage exceeded 90%\n\nDetails:\n- Server: prod-web-01\n- CPU: 94%\n- Memory: 78%"
  }'
```

## Response

On success, you'll receive a `200 OK` response with a JSON body:

### SMS Response

```json
{
  "message_id": "123e4567-e89b-12d3-a456-426614174000",
  "parts": 1,
  "cost": 0.025,
  "currency": "USD",
  "encoding": "GSM-7",
  "characters": 24
}
```

### Email Response

```json
{
  "message_id": "123e4567-e89b-12d3-a456-426614174000",
  "parts": 1,
  "cost": 0.001,
  "currency": "USD",
  "encoding": "UTF-8",
  "characters": 89
}
```

### Response Fields

| Field | Description |
|-------|-------------|
| `message_id` | Unique identifier for this alert (UUID) |
| `parts` | Number of parts (1 for email, 1-5 for SMS) |
| `cost` | Cost in USD for sending this message |
| `currency` | Always "USD" |
| `encoding` | `"GSM-7"` or `"UCS-2"` for SMS, `"UTF-8"` for email |
| `characters` | Number of characters in the message |

## SMS Details

### Message Length Limits

* **Maximum parts**: 5 SMS parts
* **Auto-truncation**: Messages exceeding 5 parts are automatically truncated

**Part limits:**
* **Single-part**: Up to 160 characters (GSM-7) or 70 characters (UCS-2)
* **Multi-part**: 153 characters per additional part (GSM-7) or 67 characters (UCS-2)
* **Total maximum**: Exactly 765 characters (GSM-7) or ~335 characters (UCS-2)
  * For 5-part messages: 5 × 153 = 765 characters (all parts use 153 in multipart SMS)

See [SMS Parts and Message Length](/docs/reference/parts) for detailed information.

### SMS Prefix

All SMS alerts are automatically prefixed with `"Notifox: "` so recipients know the source.

## Email Details

### Message Length Limits

* **Maximum length**: 50,000 characters
* **Encoding**: UTF-8 (supports all Unicode characters, emojis, etc.)

### Subject Line

The email subject is automatically generated from your message:
* Uses the first line of your message
* Prefixed with "Notifox: " (e.g., "Notifox: Server is down!")
* Truncated to 78 characters per RFC 5322
* Falls back to "Notifox Alert" if the first line is empty

### Footer

A footer is automatically appended to all emails:
```
---
This is an alert triggered through Notifox. Please do not reply to this email.
If you have any questions, please contact support@notifox.com.
```

### Sender Address

All emails are sent from `alerts@notifox.com`.

## Rate Limits

| Channel | Limit |
|---------|-------|
| SMS | 5 requests per 5 minutes |
| Email | 100 requests per 5 minutes |

If you exceed these limits, you'll receive a `429 Too Many Requests` response.

## Error Responses

| Status Code | Description |
|------------|-------------|
| `400` | Bad Request - Invalid request format or validation failed |
| `401` | Unauthorized - Invalid or missing API token |
| `402` | Payment Required - Insufficient account balance |
| `429` | Too Many Requests - Rate limit exceeded |
| `500` | Internal Server Error - Server-side error occurred |

### Error Messages by Category

**Authentication (401)**
| Message | Cause |
|---------|-------|
| `Unauthorized` | Missing, invalid, or expired API token |

**Validation (400)**
| Message | Cause |
|---------|-------|
| `alert message cannot be empty` | The `alert` field is missing or empty |
| `alert message cannot be empty or only whitespace` | Message contains only spaces/newlines (email) |
| `alert message cannot be greater than 765 characters` | SMS message exceeds 765 chars (5 parts maximum) |
| `alert message cannot be greater than 50000 characters` | Email message exceeds 50,000 chars |
| `alert message contains invalid UTF-8 encoding` | Email contains invalid UTF-8 characters |
| `alert message cannot contain null bytes` | Email contains null (`\x00`) characters |
| `audience does not exist` | No audience with that name exists |
| `audience not found` | Audience exists but has no verified contact for the channel |
| `audience channel is not configured` | Audience has no phone/email for the selected channel |
| `Invalid channel type` | Channel is not `sms` or `email` |

**Balance (402)**
| Message | Cause |
|---------|-------|
| `insufficient balance` | Account balance is too low for this message |

**Rate Limiting (429)**
| Message | Cause |
|---------|-------|
| `rate limit exceeded` | Too many requests in the rate limit window |

**Server Errors (500)**
| Message | Cause |
|---------|-------|
| `internal server error` | Unexpected server error |

## SDK Usage

Instead of making raw HTTP requests, you can use Notifox SDKs for your preferred language.

### Python

```python
import notifox

client = notifox.NotifoxClient(api_key="your_api_token")

# SMS
response = client.send_alert(audience="joe", alert="Server is down!", channel=notifox.SMS)

# Email
response = client.send_alert(audience="joe", alert="Detailed report...", channel=notifox.Email)
```

### Go

```go
import "github.com/notifoxhq/notifox-go"

client, _ := notifox.NewClientFromEnv()

// SMS
resp, err := client.SendAlertWithOptions(ctx, notifox.AlertRequest{
    Audience: "joe",
    Alert:    "Server is down!",
    Channel:  notifox.SMS,
})

// Email
resp, err := client.SendAlertWithOptions(ctx, notifox.AlertRequest{
    Audience: "joe",
    Alert:    "Detailed report...",
    Channel:  notifox.Email,
})
```

SDKs handle authentication, request formatting, and error handling for you. See the [Go SDK documentation](/docs/languages/go) for more details.

## Calculate Parts Without Sending

Use the `/alert/parts` endpoint to calculate the parts, cost, encoding, and character count for a message without actually sending it. This is useful for validating message length or estimating costs before sending.

### Parts Endpoint

```
POST https://api.notifox.com/alert/parts
```

### Headers

* `Content-Type`: `application/json` (required)

**Note**: The `/alert/parts` endpoint does not require authentication. It's a utility endpoint for calculating message metrics.

### Request Body

The request body must be valid JSON containing:

* `alert` (string, required)
  * The message text you want to calculate parts for
  * Cannot be empty
  * The "Notifox: " prefix will be added automatically for the calculation

### Example Request

```bash
curl -X POST https://api.notifox.com/alert/parts \
  -H "Content-Type: application/json" \
  -d '{
    "alert": "Server is down!"
  }'
```

### Response

On success, you'll receive a `200 OK` response with a JSON body:

```json
{
  "parts": 1,
  "cost": 0.025,
  "currency": "USD",
  "encoding": "GSM-7",
  "characters": 24,
  "message": "Notifox: Server is down!"
}
```

* `parts`: Number of SMS parts this message will use (1-5)
* `cost`: Cost in USD for sending this message ($0.025 per part)
* `currency`: Always "USD"
* `encoding`: The character encoding that would be used (`"GSM-7"` or `"UCS-2"`)
* `characters`: The number of characters in the message (including the "Notifox: " prefix)
* `message`: The full message text with the "Notifox: " prefix included

### Error Responses

| Status Code | Error | Description |
|------------|-------|-------------|
| `400` | Bad Request | Invalid request format or empty alert |
| `500` | Internal Server Error | Server-side error occurred |

## Related Reference Documentation

* [Data Model](/docs/reference/data-model) - Complete overview of alerts, audiences, channels, and how objects relate
* [SMS Parts Reference](/docs/reference/parts) - Understanding SMS parts, encoding, character limits, and cost calculation
