# ShadcnKit: Next.js Open Source Boilerplate

## Table of Contents

1. [Introduction](#introduction)
2. [Features](#features)
3. [Prerequisites](#prerequisites)
4. [Installation](#installation)
5. [Configuration](#configuration)
6. [Database Setup](#database-setup)
7. [Authentication](#authentication)
8. [Email Integration](#email-integration)
9. [Blog Functionality](#blog-functionality)
10. [Internationalization](#internationalization)
11. [Deployment](#deployment)
12. [Contributing](#contributing)
13. [License](#license)

## 1. Introduction

ShadcnKit is an open-source Next.js boilerplate designed to accelerate your web application development. It integrates with Cloudflare's D1 database and Pages hosting, Logto for authentication, and Resend for email functionality. This kit provides a solid foundation for building scalable and feature-rich web applications.

## 2. Features

- Next.js 13+ with App Router
- Cloudflare D1 database integration with Drizzle ORM
- Cloudflare Pages hosting
- Logto authentication
- Resend email functionality
- Internationalization support (i18n)
- Blog system with dynamic routing
- Customizable UI components powered by shadcn/ui

## 3. Prerequisites

Before you begin, ensure you have accounts and access to the following services:

- [Cloudflare](https://www.cloudflare.com/) account
- [Logto](https://logto.io/) account
- [Resend](https://resend.com/) account
- Node.js (version 14 or higher)

## 4. Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/shadcnkit.git
   cd shadcnkit
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

## 5. Configuration

### Environment Variables

Create a `.env` file in the root directory and add the following variables:

```env
# Logto
LOGTO_ENDPOINT=your_logto_endpoint
LOGTO_APP_ID=your_logto_app_id
LOGTO_APP_SECRET=your_logto_app_secret
LOGTO_BASE_URL=your_app_base_url
LOGTO_COOKIE_SECRET=your_cookie_secret

# Resend
RESEND_API_KEY=your_resend_api_key

NEXT_PUBLIC_SITE_URL=your_site_url
```

### Cloudflare Setup

1. Create a D1 database in your Cloudflare account.
2. Note down the database name and ID.
3. Update the `wrangler.toml` file with your D1 database information.

### Logto Setup

1. Create a new application in your Logto account.
2. Configure the redirect URIs for your application.
3. Copy the App ID, App Secret, and Endpoint to your `.env` file.

### Resend Setup

1. Create a Resend account and generate an API key.
2. Add the API key to your `.env` file.

## 6. Database Setup

ShadcnKit uses Drizzle ORM for database operations with Cloudflare D1.



## 7. Authentication

ShadcnKit uses Logto for authentication. Implement sign-in and sign-out functionality using the provided functions in `app/actions/auth.ts`.

## 8. Email Integration

Use Resend for email functionality:

```typescript
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const { data, error } = await resend.emails.send({
  from: 'Your App <notify@yourdomain.com>',
  to: ['user@example.com'],
  subject: 'Welcome to Your App!',
  text: 'Welcome to Your App! We're excited to have you on board.',
});
```

## 9. Blog Functionality

To add new articles:

1. Create a new markdown file in `app/content/articles/`.
2. Add the article metadata to `app/content/article.ts`.

## 10. Internationalization

To add or modify translations:

1. Edit the JSON files in the `messages/` directory.
2. Use the `useTranslations` hook in your components to access translations.

## 11. Deployment

To deploy ShadcnKit to Cloudflare Pages:

1. Push your code to a GitHub repository.
2. Create a new Pages project in the Cloudflare dashboard.
3. Connect your GitHub repository and configure the build settings.
4. Add your environment variables in the Cloudflare Pages dashboard.
5. Deploy your site.

## 12. Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 13. License

This project is open source and available under the [MIT License](LICENSE).