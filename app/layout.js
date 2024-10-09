import "./globals.css";
import Provider from "./provider";
import { ClerkProvider } from "@clerk/nextjs";
import { Outfit } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";

const outfit = Outfit({ subsets: ["latin"] });


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
          className={`${outfit.className} antialiased`}
        >
          <Provider>{children}</Provider>
          <Toaster />
        </body>
      </html >
    </ClerkProvider>
  );
}
