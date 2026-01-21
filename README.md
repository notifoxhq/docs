[![Build and Deploy Docs](https://github.com/notifoxhq/docs/actions/workflows/docs.yaml/badge.svg)](https://github.com/notifoxhq/docs/actions/workflows/docs.yaml)

# Notifox Documentation

This website is built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

## Prerequisites

- Node.js >= 20.0
- npm

## Installation

```bash
npm install
```

## Local Development

```bash
npm start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

## Build

```bash
npm run build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

You can test the production build locally:

```bash
npm run serve
```

## Deployment

Deployment is automated via GitHub Actions. When changes are pushed to the `main` branch, the workflow will:

1. Build the documentation site
2. Deploy to AWS S3
3. Invalidate CloudFront cache

### Required GitHub Secrets

The following secrets must be configured in the repository settings:

- `AWS_ACCESS_KEY_ID` - AWS access key for S3 and CloudFront access
- `AWS_SECRET_ACCESS_KEY` - AWS secret key
- `AWS_S3_BUCKET` - S3 bucket name for hosting the docs
- `AWS_CLOUDFRONT_DISTRIBUTION_ID` - CloudFront distribution ID for cache invalidation

### Manual Deployment

You can also trigger the deployment workflow manually from the GitHub Actions tab using the "workflow_dispatch" event.
