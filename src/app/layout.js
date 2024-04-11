import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Vinci2Learn",
  description: "Apprendre en s'amusant",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <nav>
          <a href="/">Home</a>
          <a href="/about">About</a>
        </nav>
        {children}
      </body>
    </html>
  );
}
