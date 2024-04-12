# Vinci2Learn

## Getting Started

## Installation

First, clone the repository:

```bash
git clone 
```

Then, install the dependencies:

```bash
npm install
# or
pnpm install
```

## Configuration

Create a `.env.local` with the following command:
```bash
cp .env .env.local
```

Set the environment variables in the `.env.local` file.
You need to specify the following environment variables:
- `NEXTAUTH_URL=`: The URL of the NextAuth.js server.
- `NEXTAUTH_SECRET=`: The secret key for the NextAuth.js server.

## Docker

Run the following command to start the database:
```bash
docker-compose up
```

## Development

First, run database migrations and seed the database:
```bash
npx prisma migrate dev
```

```bash
npm run seed
```

Then, run the development server:

```bash
npm run dev
# or
pnpm dev
```


First, run the development server:

```bash
npm run dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.



