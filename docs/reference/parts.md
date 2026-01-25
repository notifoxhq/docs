---
sidebar_position: 1
---

# SMS Parts and Message Length

When you send an SMS alert, Notifox automatically calculates how many **parts** your message will use. Understanding parts helps you predict costs and optimize your message length.

:::tip Email alerts are simpler
Email alerts don't have parts: they're always 1 part and cost a flat $0.001 per email, with a maximum of 50,000 characters. This section is specifically about SMS.
:::

## What Are SMS Parts?

SMS messages have size limits. When your message is too long to fit in a single SMS, it gets automatically split into multiple parts. Each part is delivered as a separate SMS, and each part is billed separately.

Think of it like sending multiple text messages. If you've ever seen a long text message split into "1/3", "2/3", "3/3" on your phone, that's a multi-part message.

## How Parts Are Calculated

Notifox uses intelligent encoding to fit as much text as possible into each part. The calculation depends on what characters your message contains:

### Standard Characters (GSM-7 Encoding)

For messages using standard characters (letters, numbers, basic punctuation, and some accented characters), you get:

* **Single-part messages**: Up to 160 characters
* **Multi-part messages**: 
  * 2-part messages: First part up to 160 characters, second part up to 153 characters
  * 3+ part messages: All parts use 153 characters each
  * **Maximum 5 parts**: Exactly 765 characters (5 × 153 = 765, all parts use 153 in multipart SMS)

**Example:**
* Message with 80 characters = **1 part**
* Message with 160 characters = **1 part**
* Message with 161 characters = **2 parts** (160 + 1)
* Message with 315 characters = **3 parts** (160 + 153 + 2)

**Special Characters That Count Double:**

Some characters count as 2 characters toward the limit:
* `~` `^` `|` `{` `}` `[` `]`

For example, a message like `"Price: $100~200"` counts as 14 characters (the `~` counts as 2).

### Special Characters and Emojis (UCS-2 Encoding)

When your message contains emojis, Chinese/Japanese/Korean characters, or other special Unicode characters, Notifox uses a different encoding (UCS-2):

* **Single-part messages**: Up to 140 bytes (approximately 70 characters for most special characters)
* **Multi-part messages**: 134 bytes per part after the first part

**Example:**
* `"Hello 👋"` uses UCS-2 encoding because of the emoji
* `"你好"` (Chinese characters) uses UCS-2 encoding

**Note:** Most emojis count as 4 bytes (2 characters), so messages with emojis will use more parts.

## The "Notifox: " Prefix

Every alert you send is automatically prefixed with `"Notifox: "` before it's sent. This ensures that recipients always know where their messages originate from, which is important for transparency and trust.

This prefix is **included** in the parts calculation, so it counts toward your message length.

**Example:**
* You send: `"Server is down!"`
* Actually sent: `"Notifox: Server is down!"`
* The prefix adds 10 characters to your message

Keep this in mind when calculating message length: your 160-character message will actually be 170 characters, requiring 2 parts.

## Maximum Parts Limit

Notifox enforces a maximum of **5 parts per message**. If your message would require more than 5 parts, it will be rejected with an error.

## How Parts Determine Cost

Notifox charges **$0.025 per SMS part**. The total cost is calculated as:

```
Cost = Number of Parts × $0.025
```

**Cost Examples:**

| Parts | Cost |
|-------|------|
| 1 part | $0.025 |
| 2 parts | $0.050 |
| 3 parts | $0.075 |
| 4 parts | $0.100 |
| 5 parts | $0.125 |

The API response includes the `parts` and `cost` fields so you know exactly what you'll be charged:

```json
{
  "message_id": "123e4567-e89b-12d3-a456-426614174000",
  "parts": 2,
  "cost": 0.050,
  "currency": "USD"
}
```

## Tips for Optimizing Message Length

* **Stay under 150 characters** (accounting for the "Notifox: " prefix, you'll stay within 1 part)
* **Avoid emojis and special Unicode characters** if you want maximum character count (they trigger UCS-2 encoding)
* **Watch for special characters** like `~`, `^`, `|`, `{`, `}`, `[`, `]` that count as 2 characters
* **Test your message length** by checking the `parts` field in the API response

## Examples

### Example 1: Simple Message (1 Part)

```
Message: "Database connection failed"
Length: 27 characters + 10 ("Notifox: ") = 37 characters total
Result: 1 part, $0.025
```

### Example 2: Longer Message (2 Parts)

```
Message: "Alert: The main production server is experiencing high CPU usage and memory consumption. Please investigate immediately as this requires urgent attention."
Length: 155 characters + 10 ("Notifox: ") = 165 characters total
Result: 2 parts (160 + 5), $0.050
```

### Example 3: Longer Message (2 Parts)

```
Message: "This is a very long alert message that exceeds the single SMS limit and will be split into multiple parts when sent to the recipient. Each part costs $0.025."
Length: 181 characters + 10 ("Notifox: ") = 191 characters total
Result: 2 parts (160 + 31), $0.050
```

### Example 4: Message with Emoji (UCS-2 Encoding)

```
Message: "Alert: Server is down! 🔴"
Length: 24 characters + 10 ("Notifox: ") + emoji uses more bytes
Result: 1 part (but using UCS-2 encoding due to emoji), $0.025
```

## Related Reference Documentation

* [Data Model](/docs/reference/data-model) - Complete overview of alerts, channels, and the object model
* [Alerts API Reference](/docs/reference/alerts-api) - Complete API documentation for sending alerts