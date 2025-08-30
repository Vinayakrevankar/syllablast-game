import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Syllablast - Word Puzzle Game',
  description: 'Syllablast is an engaging word puzzle game where you rearrange syllables to form words. Challenge your vocabulary and problem-solving skills!',
  keywords: 'word puzzle, syllables, vocabulary, brain game, educational game',
  authors: [{ name: 'Syllablast Team' }],
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    title: 'Syllablast - Word Puzzle Game',
    description: 'Rearrange syllables to form words in this engaging puzzle game',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Syllablast - Word Puzzle Game',
    description: 'Rearrange syllables to form words in this engaging puzzle game',
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#3b82f6',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}
