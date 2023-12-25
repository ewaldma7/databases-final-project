import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from './Navbar'
import { Theme, ThemePanel } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Databases Final Project',
  description: 'Extensive MLB Database - Top 25 Pitchers From Past 20 Years'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={inter.className}>
      <Theme appearance="light" accentColor="violet">
      <Navbar />
        {children}
        </Theme>
        </body>
    </html>
  )
}
