---
sidebar_position: 2
---

# GitHub Action

Send alerts to Notifox from your GitHub Actions workflows: one step to send SMS or email to an audience.

**Source:** [github.com/notifoxhq/action](https://github.com/notifoxhq/action)  
**Marketplace:** [Notifox Alert](https://github.com/marketplace/actions/notifox-alert)

## Setup

1. Create a [Notifox account](https://notifox.com) and an [API key](https://console.notifox.com/?view=key) in the console.
2. In your GitHub repo, add a repository secret (e.g. `NOTIFOX_API_KEY`) with that key: **Settings → Secrets and variables → Actions → New repository secret**.
3. Configure [audiences](https://console.notifox.com/?view=audiences) and verify contact methods (SMS and/or email) in the Notifox console.

## Usage

### Basic (API key from env)

Use the action with your API key in an environment variable (recommended: use a GitHub secret):

```yaml
- uses: notifoxhq/action@v1
  with:
    audience: ops
    channel: email
    message: "Deploy to production completed successfully"
  env:
    NOTIFOX_API_KEY: ${{ secrets.NOTIFOX_API_KEY }}
```

### API key as input

You can pass the API key via the `api_key` input instead of `NOTIFOX_API_KEY`:

```yaml
- uses: notifoxhq/action@v1
  with:
    api_key: ${{ secrets.NOTIFOX_API_KEY }}
    audience: oncall
    channel: sms
    message: "Build failed on ${{ github.ref_name }}"
```

### On failure

Run the action only when a previous step fails:

```yaml
- name: Deploy
  run: ./deploy.sh

- name: Notify on failure
  if: failure()
  uses: notifoxhq/action@v1
  with:
    audience: ops
    channel: sms
    message: "Deploy failed; check the workflow run"
  env:
    NOTIFOX_API_KEY: ${{ secrets.NOTIFOX_API_KEY }}
```

### Multi-line message with workflow context

Use a multi-line `message` and GitHub context variables to include repo, branch, commit, author, and a link to the run. Email works well for longer messages:

```yaml
- name: Notify
  uses: notifoxhq/action@v1
  with:
    audience: mathis
    channel: email
    message: |
      Build succeeded
      Repo: ${{ github.repository }}
      Branch: ${{ github.ref_name }}
      Commit: ${{ github.sha }}
      Author: ${{ github.actor }}
      Run: ${{ github.server_url }}/${{ github.repository }}/actions/runs/${{ github.run_id }}
  env:
    NOTIFOX_API_KEY: ${{ secrets.NOTIFOX_API_KEY }}

- name: Notify on failure
  if: failure()
  uses: notifoxhq/action@v1
  with:
    audience: mathis
    channel: email
    message: |
      Build failed
      Repo: ${{ github.repository }}
      Branch: ${{ github.ref_name }}
      Commit: ${{ github.sha }}
      Author: ${{ github.actor }}
      Run: ${{ github.server_url }}/${{ github.repository }}/actions/runs/${{ github.run_id }}
  env:
    NOTIFOX_API_KEY: ${{ secrets.NOTIFOX_API_KEY }}
```

See the [example workflow](https://github.com/mathisve/notifox-action-test/blob/main/.github/workflows/main.yaml) for a full build-and-notify setup.

## Inputs

| Input     | Required | Description |
|----------|----------|--------------|
| `api_key` | No | Notifox API key. If omitted, the action uses the `NOTIFOX_API_KEY` environment variable (e.g. from secrets). |
| `audience` | Yes | **Who** receives the alert: audience slug (e.g. `ops`, `me`, `oncall`). Must exist in your [Notifox console](https://console.notifox.com/?view=audiences). |
| `channel` | Yes | **How** to deliver: `sms` or `email`. The audience must have that contact method verified. |
| `message` | Yes | **What** to send: the alert body (string). |

## Outputs

| Output      | Description |
|-------------|-------------|
| `message_id` | Set when the API returns a message ID. |

## API

The action calls the Notifox API: `POST https://api.notifox.com/alert` with Bearer authentication and a JSON body `{ "audience", "alert", "channel" }`. The `message` input is sent as the `alert` field.

## See also

* [Alerts API Reference](/docs/reference/alerts-api) for the full API and error handling
* [Sending an Alert](/docs/getting-started/alert) for the Who / How / What model (audience, channel, message)
