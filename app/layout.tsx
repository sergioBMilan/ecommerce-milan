import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Milán Bicicletas",
  description: "Ecommerce de bicicletas Milán",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-white text-neutral-900">
        <header className="border-b border-neutral-200 px-6 py-4 flex items-center justify-between">
          <a href="/" className="text-xl font-bold">Milán Bicicletas</a>
          <nav className="flex gap-4 text-sm">
            <a href="/cart" className="underline">Carrito</a>
            <a href="/login" className="underline">Iniciar sesión</a>
          </nav>
        </header>
        <main className="px-6 py-8">{children}</main>
      </body>
    </html>
  );
}
