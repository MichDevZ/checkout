import './globals.css'

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-background">
        {children}
      </body>
    </html>
  )
}

