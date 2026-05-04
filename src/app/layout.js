import Navbar from "@/components/shared/navbar/Navbar";
import "./globals.css";
import Footer from "@/components/shared/footer/Footer";


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}