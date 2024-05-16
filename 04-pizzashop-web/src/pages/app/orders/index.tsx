import {Helmet} from 'react-helmet-async'

import {Pagination} from '@/components/pagination'
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {OrderTableRow} from '@/pages/app/orders/order-table-row'

import {OrderTableFilters} from './order-table-filters'

export function Orders() {
  return (
    <>
      <Helmet title="Pedidos" />
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Pedidos</h1>

        <div className="space-y-2.5 ">
          <OrderTableFilters />

          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[64px]" />
                  <TableHead className="w-[280px]">Identificador</TableHead>
                  <TableHead className="w-[180px]">Realizado há</TableHead>
                  <TableHead className="w-[140px]">Status</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead className="w-[140px]">Total do pedido</TableHead>
                  <TableHead className="w-[164px]" />
                  <TableHead className="w-[132px]" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {Array.from({length: 10}).map((_, i) => (
                  <OrderTableRow key={i} />
                ))}
              </TableBody>
            </Table>
          </div>

          <Pagination pageIndex={0} totalCount={105} perPage={10} />
        </div>
      </div>
    </>
  )
}
