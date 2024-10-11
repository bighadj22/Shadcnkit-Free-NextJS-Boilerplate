# ShadcnKit: Next.js Open Source Boilerplate

![ShadcnKit Logo](https://utfs.io/f/xCtsHZ5BWJ2zVXs18oexAX2p9Lswv4ng7eoRHBPrjzlGVdOK)

ShadcnKit is a powerful, open-source starter kit for building modern web applications with Next.js. This free version includes essential features to jumpstart your project development.

## Features

- **⚡ Next.js**: Built on the latest version of Next.js with App Router
- **🔐 Authentication**: Integrated Logto for secure user management
- **📧 Email Service**: Resend integration for transactional emails
- **👑 User Roles**: Admin user role system for access control
- **🌍 Internationalization**: i18n support for multi-language applications
- **☁️ Cloudflare Pages**: Easy deployment and hosting
- **🎨 UI Components**: Customizable components powered by shadcn/ui
- **📊 Dashboard**: Admin dashboard for user management and analytics
- **📱 Responsive Design**: Mobile-friendly interface
- **🔍 SEO Optimized**: Built-in SEO best practices
- **🚀 Performance Focused**: Optimized for speed and efficiency

## Getting Started

### Prerequisites

- Node.js 16.x or later
- npm or yarn
- A Cloudflare account
- A Logto account
- A Resend account

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/shadcnkit.git
   cd shadcnkit
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up environment variables:
   Copy the `.env.example` file to `.env.local` and fill in your credentials:
   ```
   cp .env.example .env.local
   ```

4. Run the development server:
   ```
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Configuration

### Logto Setup

1. Create a Logto application and note down the App ID and App Secret.
2. Add the Logto credentials to your `.env.local` file.

### Resend Setup

1. Sign up for a Resend account and get your API key.
2. Add the Resend API key to your `.env.local` file.

### Cloudflare Pages Setup

1. Connect your GitHub repository to Cloudflare Pages.
2. Set up your build configuration in Cloudflare Pages dashboard.

### Internationalization

1. Add your translations to the `messages` directory.
2. Use the translation functions in your components as demonstrated in the example files.

## Usage

### Admin Dashboard

Access the admin dashboard at `/dashboard` after logging in with an admin account.

### User Roles

User roles are managed through the admin dashboard. By default, there are two roles:
- User
- Admin

### API Routes

Protected API routes are available under `/api/`. These routes require authentication.


## Support

For support, please open an issue in the GitHub repository or contact us at support@shadcnkit.com.

## Acknowledgements

- [Next.js](https://nextjs.org/)
- [Logto](https://logto.io/)
- [Resend](https://resend.com/)
- [Cloudflare Pages](https://pages.cloudflare.com/)
- [shadcn/ui](https://ui.shadcn.com/)

---

Built with ❤️ by the ShadcnKit Team