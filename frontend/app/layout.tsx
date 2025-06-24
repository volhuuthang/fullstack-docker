import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Fullstack Docker App',
  description: 'A fullstack application with Docker',
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