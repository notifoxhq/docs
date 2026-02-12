---
sidebar_position: 5
---

# Sending an Alert

Now that you have an account, API key, and verified audience, you're ready to send your first alert!

## What Are Alerts?

An **alert** is a message you send through the Notifox API to a specific audience via a chosen channel.

To send an alert, you answer three questions: **Who** (the audience), **How** (the channel), and **What** (the message). The API maps those to three required fields:

| Question | API field | Meaning |
|----------|-----------|---------|
| **Who** | `audience` | The recipient: an audience slug (e.g. `"joe"`, `"oncall"`). See [Creating an Audience](./audience.md). |
| **How** | `channel` | The delivery method: `"sms"` or `"email"`. |
| **What** | `alert` | The message content (string). |

Notifox supports two channels:

* **SMS** - Text messages sent to verified phone numbers
* **Email** - Emails sent to verified email addresses

They're perfect for:
* Notifying yourself or your team about server issues
* Sending critical system alerts
* Getting notified about important events in your application

For a complete overview of how alerts, audiences, channels, and other objects relate, see the [Data Model](/docs/reference/data-model) reference.

## Choosing a Channel

When sending an alert, you can specify the `channel` parameter:

| Channel | Cost | Max Length | Best For |
|---------|------|------------|----------|
| `sms` | $0.025/part | 765 chars (5 parts) | Urgent, time-sensitive alerts |
| `email` | $0.001/email | 50,000 chars | Detailed alerts, logs, reports |

**Note:** The channel you choose must be configured for the audience. For example, if you want to send an email, the audience must have a verified email address.

## Your First Alert

### Using the Console (Easiest Way)

The easiest way to send your first alert is using the Interactive Send feature in the Notifox console. You answer the same three questions (Who, How, What) and the console builds the API call for you:

1. Navigate to the [Send](https://console.notifox.com/?view=send) tab in your Notifox console
2. **Who:** Choose an Audience from the dropdown (e.g. `test`)
3. **How:** Select a Channel (SMS or Email)
4. **What:** Type your Alert message in the text area
5. In **API Key**, click **Generate temporary key** to get a key valid for 5 minutes, or use the link to [create a live API key](https://console.notifox.com/?view=key) if you prefer
6. Copy the **Generated Command** (the curl with `$NOTIFOX_API_KEY`) or use it as reference

![Interactive Send: audience, channel, alert, API key (temp or live), and generated curl command](./images/interactive-send-1.png)

This is perfect for testing and sending quick alerts without writing any code. The console shows you the curl command so you can copy it for use in your own scripts.

### Sending an SMS

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

The recipient will receive an SMS: **"Notifox: Server is down!"**

Response:
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

### Sending an Email

```bash
curl -X POST https://api.notifox.com/alert \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "audience": "joe",
    "channel": "email",
    "alert": "Server CPU usage exceeded 90%\n\nDetails:\n- Server: prod-web-01\n- CPU: 94%\n- Memory: 78%"
  }'
```

The recipient will receive an email with:
* **Subject**: Auto-generated from the first line (e.g., "Notifox: Server CPU usage exceeded 90%")
* **Body**: Your full message with a footer disclaimer

Response:
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

## Response Fields

| Field | Description |
|-------|-------------|
| `message_id` | Unique identifier for your alert (UUID) |
| `parts` | Number of parts (always 1 for email, 1-5 for SMS) |
| `cost` | Cost in USD |
| `currency` | Always "USD" |
| `encoding` | `"GSM-7"` or `"UCS-2"` for SMS, `"UTF-8"` for email |
| `characters` | Number of characters in your message |

## Using an SDK

If you're using Python or Go, you can use the Notifox SDKs for a simpler experience:

### Python

```python
import notifox

client = notifox.NotifoxClient(api_key="your_api_key")

# Send SMS
response = client.send_alert(
    audience="joe",
    alert="Server is down!",
    channel=notifox.SMS
)

# Send Email
response = client.send_alert(
    audience="joe",
    alert="Detailed error report...",
    channel=notifox.Email
)
```

### Go

```go
package main

import (
    "context"
    "github.com/notifoxhq/notifox-go"
)

func main() {
    client, _ := notifox.NewClient() // Reads from NOTIFOX_API_KEY
    ctx := context.Background()
    
    // Send SMS
    resp, _ := client.SendAlert(ctx, notifox.AlertRequest{
        Audience: "joe",
        Alert:    "Server is down!",
        Channel:  notifox.SMS,
    })
    
    // Send Email
    resp, _ := client.SendAlert(ctx, notifox.AlertRequest{
        Audience: "joe",
        Alert:    "Detailed error report...",
        Channel:  notifox.Email,
    })
}
```

The SDKs handle all the HTTP details for you. See the [Languages](/docs/languages/python) section for SDK documentation.

## Next Steps

Now that you can send alerts, you might want to learn about:
* [How SMS parts and costs work](/docs/reference/parts) - Understanding SMS parts and pricing
* [Complete API reference](/docs/reference/alerts-api) - Detailed documentation for all options and error handling
* [Language SDKs](/docs/languages/python) - Using Notifox with Python, Go, and other languages