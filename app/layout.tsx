import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

const GA_ID = "G-5YPTTXEFHM";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: "갖고 싶은 선물 있어?? 내가 사줄게!!",
  description: "친구한테 선물 두 개 보여주고 하나 골라보라 그래봐",
  openGraph: {
    title: "갖고 싶은 선물 있어?? 내가 사줄게!!",
    description: "친구한테 선물 두 개 보여주고 하나 골라보라 그래봐",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        {children}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}');
          `}
        </Script>
      </body>
    </html>
  );
}
