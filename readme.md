[![Netlify Status](https://api.netlify.com/api/v1/badges/d9ddb621-0ef6-48e8-878f-c26c9ab76e72/deploy-status)](https://app.netlify.com/sites/glittering-travesseiro-c3f77e/deploys)

# Scorm Tool UI

## Description

A simple UI for the Scorm Tool.

## Installation

```bash
npm install
```

## Usage

For development, run:

```bash
npm run dev
```

For staging, run:

```bash
npm run staging
```

For production, run:

```bash
npm run build
```

### Environment Variables

Some environment variables are required for the application to run. These are:

- VITE_API_URL - The URL of the API to connect to.
- VITE_AUTH_DOMAIN - The Auth0 domain to use.
- VITE_AUTH_CLIENT_ID - The Auth0 client ID to use.
- VITE_AUTH_AUDIENCE - The Auth0 audience to use.
- VITE_AUTH_CALLBACK_URL - The Auth0 callback URL to use.

### TODO

- Add note about deployment with Netlify
- Add better description
