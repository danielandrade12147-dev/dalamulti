import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DALA MULTIMARCAS | Moda masculina",
  description: "Jeans, tactel e camisetas. Faça seu pedido pelo WhatsApp.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
