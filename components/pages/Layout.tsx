import { ReactNode } from 'react'
import Footer from '@/components/pages/Footer'
import Header from '@/components/pages/Header'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  )
}
