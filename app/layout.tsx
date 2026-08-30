import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import PublicChrome from '@/components/PublicChrome'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'YOUJIU - Premium NdFeB Magnet Manufacturer',
    template: '%s | YOUJIU',
  },
  description:
    'YOUJIU is a leading manufacturer of premium NdFeB (Neodymium Iron Boron) magnets. Sintered and bonded magnets for motors, wind energy, automotive, medical devices, and industrial automation.',
  keywords: [
    'NdFeB magnets',
    'neodymium magnets',
    'sintered NdFeB',
    'bonded NdFeB',
    'magnet manufacturer',
    'rare earth magnets',
    'YOUJIU magnets',
    'Taizhou magnet supplier',
    'high-temperature magnets',
    'magnetic assemblies',
  ],
  authors: [{ name: 'YOUJIU' }],
  openGraph: {
    title: 'YOUJIU - Premium NdFeB Magnet Manufacturer',
    description:
      'Leading manufacturer of premium NdFeB magnets for motors, wind energy, automotive, medical devices, and industrial automation.',
    type: 'website',
    locale: 'en_US',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-background text-foreground antialiased">
        <PublicChrome>{children}</PublicChrome>
      </body>
    </html>
  )
}
