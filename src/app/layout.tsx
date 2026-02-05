import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { getSettings } from "@/lib/api";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({ 
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter"
});

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ["latin"],
  variable: "--font-jetbrains"
});

export const metadata: Metadata = {
  title: "Migronis Brazil | Real Estate in Santa Catarina",
  description: "Premium real estate in Brazil. Houses, apartments and land in Santa Catarina.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let settings;
  try {
    settings = await getSettings();
  } catch {
    settings = {};
  }

  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        {/* GTM */}
        {settings?.gtm_id && (
          <script
            dangerouslySetInnerHTML={{
              __html: `
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','${settings.gtm_id}');
              `,
            }}
          />
        )}
      </head>
      <body className="min-h-screen flex flex-col antialiased">
        {/* GTM noscript */}
        {settings?.gtm_id && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${settings.gtm_id}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
        )}
        
        <Header siteName={settings?.site_name} />
        <main className="flex-1">
          {children}
        </main>
        <Footer settings={settings} />
        
        {/* Chat Widget */}
        {settings?.chat_widget && (
          <div dangerouslySetInnerHTML={{ __html: settings.chat_widget }} />
        )}
      </body>
    </html>
  );
}
