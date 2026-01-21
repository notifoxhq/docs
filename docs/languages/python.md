---
sidebar_position: 3
---

# Python

Python SDK for [Notifox](https://notifox.com).

## Installation

```bash
pip install notifox
```

## Usage

### Basic Usage

```python
import notifox

client = notifox.NotifoxClient(api_key="your_api_key_here")

# Send via SMS
response = client.send_alert(
    audience="mike",
    alert="Database server is down!",
    channel=notifox.SMS
)
print(f"Alert sent! Message ID: {response.get('message_id')}")

# Send via Email
response = client.send_alert(
    audience="mike",
    alert="Database server is down!",
    channel=notifox.Email
)
print(f"Alert sent! Message ID: {response.get('message_id')}")
```

### Using Environment Variable

```bash
export NOTIFOX_API_KEY="your_api_key_here"
```

```python
import notifox

client = notifox.NotifoxClient()  # Reads from NOTIFOX_API_KEY
client.send_alert(audience="mike", alert="High CPU usage!")
```

### Configuration

```python
import notifox

client = notifox.NotifoxClient(
    api_key="your_api_key",
    base_url="https://api.notifox.com",
    timeout=30.0,
    max_retries=3
)
```

### Channel Options

| Constant | Description |
|----------|-------------|
| `notifox.SMS` | Send via SMS |
| `notifox.Email` | Send via Email |

## Additional Methods

### Calculate Parts

Calculate message parts without sending:

```python
resp = client.calculate_parts(alert="Hello, world!")

print(f"Parts: {resp['parts']}, Cost: ${resp['cost']}, Encoding: {resp['encoding']}")
```

## Error Handling

```python
import notifox

client = notifox.NotifoxClient(api_key="your_api_key")

try:
    response = client.send_alert(audience="admin", alert="System is running low on memory")
    print(f"Alert sent! Message ID: {response.get('message_id')}")
except notifox.NotifoxAuthenticationError:
    print("Authentication failed. Check your API key.")
except notifox.NotifoxRateLimitError:
    print("Rate limit exceeded. Please wait before sending more alerts.")
except notifox.NotifoxAPIError as e:
    print(f"API error ({e.status_code}): {e.response_text}")
except notifox.NotifoxConnectionError as e:
    print(f"Connection failed: {e}")
```

### Available Exceptions

| Exception | Description |
|-----------|-------------|
| `NotifoxError` | Base exception |
| `NotifoxAuthenticationError` | Authentication failed (401/403) |
| `NotifoxRateLimitError` | Rate limit exceeded (429) |
| `NotifoxAPIError` | General API errors |
| `NotifoxConnectionError` | Network errors |