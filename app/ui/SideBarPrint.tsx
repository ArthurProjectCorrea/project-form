'use client'

export function SideBarPrint() {
  return (
    <aside className="w-48 h-full bg-gray-100 p-4 print:hidden flex flex-col items-center justify-between fixed" >
      <div>
        <button
          onClick={() => window.print()}
          className="w-full mb-2 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Imprimir
        </button>
        <button
          onClick={() => {
            // NÃO apagar o localStorage, só ir para o formulário
            window.location.href = '/form'
          }}
          className="w-full mb-2 bg-yellow-600 text-white py-2 px-4 rounded hover:bg-yellow-700"
        >
          Editar
        </button>
        <button
          onClick={() => {
            localStorage.removeItem('print-data')
            window.location.href = '/form'
          }}
          className="w-full bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700"
        >
          Finalizar
        </button>
      </div>
      <p className="text-xs text-gray-500">© FUNAC 2025</p>
    </aside>
  )
}
