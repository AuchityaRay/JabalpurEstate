import { Inter, Baloo_2} from 'next/font/google'
import './globals.css'
import PrivateRoute from '@/components/protected-route/page'
const inter = Inter({ subsets: ['latin'],  variable:'--font-inter' })
const baloo2 = Baloo_2({subsets: ['latin'], weight: '400',})
export const metadata = {
  title: 'Admin - Jabalpur Estate',
  description: 'Generated by Jabalpur Estate',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${baloo2.className}`}>
        <PrivateRoute>
        {children}
        </PrivateRoute>
        </body>
    </html>
  )
}
