import './globals.css'
import { GoogleTagManager } from '@next/third-parties/google'

export const metadata = {
  title: 'CruzeiroGomas',
  description: 'Soluciones en pisos industriales y comerciales',
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
        <GoogleTagManager gtmId="GTM-KCFBMWX2" />
      <body className="min-h-screen w-full flex items-center justify-center bg-background">
        <main className="w-full h-full flex-1">
          {children}
        </main>
      </body>
    </html>
  )
}
