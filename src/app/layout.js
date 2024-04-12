import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "@/app/components/NavBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Vinci2Learn",
  description: "Apprendre en s'amusant",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
    <body className={inter.className}>
    <NavBar />
    <main>
      {children}
    </main>
    </body>
    </html>
  );
}
