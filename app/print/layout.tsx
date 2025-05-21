import type { Metadata } from 'next'
import { SideBarPrint } from '@/app/ui/SideBarPrint'

export const metadata: Metadata = {
  title: 'Impressão | FUNAC',
  description: 'Página para imprimir termo de comparecimento',
}

export default function PrintLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <body className="flex ">
        <SideBarPrint />
        <main className="flex-1 overflow-y-auto p-8 bg-white ">{children}</main>
      </body>
    </html>
  )
}
