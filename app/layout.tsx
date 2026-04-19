import type { Metadata } from "next"
import { Sora } from "next/font/google"
import "./globals.css"

const sora = Sora({ subsets: ["latin"], variable: "--font-sora" })

export const metadata: Metadata = {
  title: "Dr. Ouafaa Dhaidah — Chirurgien Esthétique & Plastique, Marrakech",
  description: "Chirurgien diplômée de Paris, Virginia et Vérone. Expertise internationale en chirurgie esthétique et plastique à Gueliz, Marrakech.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${sora.variable} h-full antialiased`} suppressHydrationWarning>
      <head>
        {/* Prevent flash of wrong theme */}
        <script dangerouslySetInnerHTML={{ __html: `
          (function(){
            try {
              var t = localStorage.getItem('theme');
              if (t === 'dark' || (!t && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                document.documentElement.classList.add('dark');
              }
            } catch(e){}
          })();
        `}} />
      </head>
      <body className="min-h-full flex flex-col font-[family-name:var(--font-sora)]">{children}</body>
    </html>
  )
}
