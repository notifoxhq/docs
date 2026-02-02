---
sidebar_position: 2
---

# Create an API key

An **API key** is a secret string used to authenticate all requests to the Notifox API.

**Important:** 
- API keys are secrets: treat them like passwords
- Each key is shown only once when created
- You can create up to 10 API keys per account
- Keys don't expire unless you delete them

## Creating an API key

To create an API key, visit the [API Keys](https://console.notifox.com/?view=key) tab in the Notifox console.

Then click on "Create API Key" to generate an API Key.

![create key](./images/api-key-2.png)

This will generate an API key for you.

:::danger
Do <strong>NOT</strong> share this key with anyone. Anyone with access to this key can use the API to send alerts on your behalf.
:::

Copy the key by pressing the copy icon on the right. Once you press the blue button, you will not be able to retrieve the API key from the Notifox dashboard, so save it in a secure location.

![generated key](./images/api-key-3.png)

You are now ready to use your Notifox API key!

:::tip
All Notifox SDKs try reading from the `NOTIFOX_API_KEY` environment variable when initializing the client. Set the environment variable so you don't have to hard-code the API key!

```bash
export NOTIFOX_API_KEY='your-key-here'
```
:::

## Viewing Your API Keys

You can view all your existing API keys in the [API Keys](https://console.notifox.com/?view=key) tab. For security reasons, keys are displayed in a masked format (showing only the first and last few characters). The full key is only shown once when you create it.

## Key Limits

* **Maximum of 10 API keys per account**: If you need to create a new key and have reached the limit, delete an unused key first. If your use-case requires a higher limit, please contact [support@notifox.com](mailto:support@notifox.com).
* Each key can be used independently: Create separate keys for different applications or environments (production, staging, development).

## Deleting an API key

If you want to delete an API key (because it was compromised, or no longer needed), go to the [API Keys](https://console.notifox.com/?view=key) tab in the Notifox console and click on the trash icon in the row of the key you want to delete.

Keep in mind that once you delete an API key, it can no longer be used. Any requests made with a deleted API key will return a `401 Not Authorized` status code.

![delete api key](./images/api-key-4.png)

## Best Practices

* **Store keys securely**: Never commit API keys to version control. Use environment variables or secret management tools.
* **Rotate keys regularly**: Periodically delete old keys and create new ones, especially if you suspect a key may have been compromised.
* **Use different keys for different environments**: Create separate keys for production, staging, and development to better track usage and limit blast radius if one is compromised.
* **Don't share keys**: API keys grant full access to send alerts from your account. Only share keys with trusted team members who need API access.
* **Delete unused keys**: Remove keys that are no longer in use to reduce your attack surface.

## Reference Documentation

For more details about API keys and authentication:
* [Data Model](/docs/reference/data-model) - Overview of API keys and other core objects
* [Alerts API Reference](/docs/reference/alerts-api) - API authentication and error handling
