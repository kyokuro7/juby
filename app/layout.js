import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: { default: "Macanime", template: "%s · Macanime" },
  description: "Katalog dan jadwal anime dengan tampilan manis berwarna macaron.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>
        <header className="top">
          <div className="wrap bar">
            <Link href="/" className="logo">🧁 Macanime</Link>
            <nav>
              <Link href="/">Beranda</Link>
              <Link href="/jadwal">Jadwal</Link>
              <Link href="/daftar">Daftar</Link>
              <Link href="/cari">Cari</Link>
            </nav>
          </div>
        </header>
        <main className="wrap">{children}</main>
        <footer className="foot">
          <div className="wrap">
            Situs penggemar tidak resmi. Data diambil dari mirainime.com dan hak ciptanya
            milik pemilik aslinya.
          </div>
        </footer>
      </body>
    </html>
  );
}