import {Poppins, Instrument_Sans } from "next/font/google";
import "./globals.css";

export const poppins = Poppins({ weight: "400", subsets: ['latin'] });
export const instrumentSans = Instrument_Sans({ weight: ["700", "400"], subsets: ['latin'] })

export const metadata = {
  title: "DvidPiLabs learn.",
  description: "Helping teachers with AI, one by one.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${poppins.className} antialiased bg-black text-cornflower-50`}
      >
        {children}
      </body>
    </html>
  );
}
