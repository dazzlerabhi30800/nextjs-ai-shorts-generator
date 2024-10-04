import localFont from "next/font/local";
import "./globals.css";
import Provider from "./provider";
import { ClerkProvider } from "@clerk/nextjs";
import { Outfit } from "next/font/google";

const outfit = Outfit({ subsets: ["latin"] });

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

export const metadata = {
  title: "Ai Short Generator",
  description:
    "This web app is created by Abhishek Choudhary, a Frontend Developer with almost 2.5yrs of experience. You can generate short videos for social media account using AI with this web app.",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          // className={`${geistSans.variable} antialiased`}
          className={`${outfit.className} antialiased`}
        >
          <Provider>{children}</Provider>
        </body>
      </html>
    </ClerkProvider>
  );
}
