export const metadata = {
  title: 'Syllablast',
  description: 'Syllablast is a word puzzle game where you need to rearrange syllables to form words.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
