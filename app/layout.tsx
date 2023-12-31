import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import { AppProvider } from '@/app/context/context';
import './globals.css'
import { ToastContainer } from './components';

const montserrat = Montserrat({ subsets: ['latin'], weight: ['300', '400', '500', '700'] })

export const metadata: Metadata = {
  title: 'Grammatical AI',
  description: 'Your AI powered grammar assiantant for all your grammatical needs.',
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
          <ToastContainer />
        </body>
      </html>
    </AppProvider>
  )
}
