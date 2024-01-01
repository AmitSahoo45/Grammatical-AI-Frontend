import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import { AppProvider } from '@/app/context/context';
import dynamic from 'next/dynamic';

const ToastContainer = dynamic(() => import('@/app/components/ToastContainer'), { ssr: false })
const Footer = dynamic(() => import('@/app/components/Footer'), { ssr: false })

import { Analytics } from '@vercel/analytics/react';
import './globals.css'

const montserrat = Montserrat({ subsets: ['latin'], weight: ['300', '400', '500', '700'] })

export const metadata: Metadata = {
  title: 'Grammatical AI',
  description: 'Your AI powered grammar assiantant for all your grammatical needs.',
  creator: 'Amit Kumar Sahoo',
  keywords: 'grammar, english, english grammar, grammar assistant, grammar helper, grammar ai, grammatical assistant',
  openGraph: {
    images: 'https://grammaticalai.vercel.app/api/og'
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AppProvider>
      <html lang="en">
        <body className={montserrat.className}>
          {children}
          <Footer />
          <Analytics />
          <ToastContainer />
        </body>
      </html>
    </AppProvider>
  )
}
