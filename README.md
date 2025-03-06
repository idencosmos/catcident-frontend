# Catcident Frontend

A modern web application built with Next.js, next-intl for internationalization, and Radix UI components.

## 🚀 Technologies

- **Next.js 15** - React framework with App Router
- **React 19** - JavaScript library for building user interfaces
- **TypeScript** - Strongly typed programming language
- **next-intl** - Internationalization solution
- **Radix UI** - Headless component primitives
- **Tailwind CSS** - Utility-first CSS framework
- **Docker** - Containerization platform

## 📋 Prerequisites

- Node.js 18.x or higher
- PNPM package manager
- Docker and Docker Compose (for containerization)

## 🛠️ Getting Started

### Development Setup

1. Clone the repository
```bash
git clone <repository-url>
cd catcident-frontend
```

2. Create symlink for development configuration
```bash
ln -sf docker-compose.dev.yml docker-compose.yml
```

3. Install dependencies
```bash
pnpm install
```

4. Start the development server
```bash
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser

### Using Docker for Development

```bash
# Start the development container
docker-compose up -d

# View logs
docker-compose logs -f
```

## 🏗️ Project Structure

```
catcident-frontend/
├── src/                  # Source code
│   ├── app/              # Next.js App Router
│   │   ├── [locale]/     # Internationalized routes 
│   │   └── layout.tsx    # Root layout
│   ├── components/       # React components
│   │   ├── layout/       # Layout components
│   │   ├── providers/    # Context providers
│   │   └── ui/           # UI components
│   ├── hooks/            # Custom React hooks
│   ├── i18n/             # Internationalization setup
│   └── lib/              # Utility functions
├── public/               # Static assets
└── docker-compose.yml    # Docker configuration
```

## 🌐 Internationalization

This project uses `next-intl` for internationalization support. The locale is set in the URL path (`/[locale]/...`).

## 🚢 Deployment

### Build for Production

```bash
# Build the application
pnpm build

# Start the production server
pnpm start
```

### Using Docker for Production

```bash
# Create symlink for production configuration
ln -sf docker-compose.prod.yml docker-compose.yml

# Build and start containers
docker-compose up -d --build
```

## 📄 License

This project is licensed under the terms of the [LICENSE](LICENSE) file included in the repository.
