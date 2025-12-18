import type React from "react"
import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

export const metadata: Metadata = {
  title: "NGBAG - Quality Bags Store in Delhi | Backpacks, Totes & Travel Bags",
  description:
    "Discover premium quality bags at NGBAG (New Generations Bag) in New Delhi. Shop backpacks, totes, messenger bags, travel bags, and laptop bags. Located at Sidipura, New Rohtak Road. Contact: 9220774381",
  keywords: [
    "bags store Delhi",
    "NGBAG",
    "New Generations Bag",
    "backpacks Delhi",
    "travel bags",
    "laptop bags",
    "messenger bags",
    "tote bags",
    "leather bags",
    "Sidipura bags",
    "New Rohtak Road shopping",
    "quality bags India",
    "buy bags online Delhi",
    "bag shop near me",
    "Central Delhi bags",
  ],
  authors: [{ name: "NGBAG - New Generations Bag" }],
  creator: "NGBAG",
  publisher: "NGBAG",
  formatDetection: {
    email: false,
    address: true,
    telephone: true,
  },
  metadataBase: new URL("https://catalog.newgeebags.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "NGBAG - Quality Bags Store in Delhi | New Generations Bag",
    description:
      "Discover premium backpacks, totes, messenger bags, travel bags and laptop bags at NGBAG in New Delhi. Visit our store at Sidipura, New Rohtak Road!",
    url: "https://catalog.newgeebags.com",
    siteName: "NGBAG - New Generations Bag",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "NGBAG - Quality Bags Store in Delhi",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NGBAG - Quality Bags Store in Delhi",
    description:
      "Discover premium backpacks, totes, messenger bags, travel bags and laptop bags at NGBAG in New Delhi.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "@id": "https://catalog.newgeebags.com",
              name: "NGBAG - New Generations Bag",
              image: "https://catalog.newgeebags.com/og-image.jpg",
              description:
                "Quality bags store in Delhi offering backpacks, totes, messenger bags, travel bags, and laptop bags.",
              url: "https://catalog.newgeebags.com",
              telephone: ["+919220774381", "+917982230815"],
              address: {
                "@type": "PostalAddress",
                streetAddress: "Shop No. 2, 8771/14-B, Ground Floor, New Rohtak Road, Near Indian Gas, Sidipura",
                addressLocality: "New Delhi",
                addressRegion: "Delhi",
                postalCode: "110005",
                addressCountry: "IN",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: "28.6519",
                longitude: "77.1867",
              },
              openingHoursSpecification: [
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                  opens: "10:00",
                  closes: "20:00",
                },
              ],
              priceRange: "₹₹",
              sameAs: ["https://instagram.com/ngbag", "https://facebook.com/ngbag"],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "NGBAG - New Generations Bag",
              url: "https://catalog.newgeebags.com",
              potentialAction: {
                "@type": "SearchAction",
                target: "https://catalog.newgeebags.com/?search={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
      </head>
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
