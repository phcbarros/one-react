import {useMutation} from '@tanstack/react-query'
import {formatDistanceToNow} from 'date-fns'
import {ptBR} from 'date-fns/locale/pt-BR'
import {ArrowRight, Search, X} from 'lucide-react'
import {useState} from 'react'

import {cancelOrder} from '@/api/cancel-order'
import type {GetOrdersResponse} from '@/api/get-orders'
import {OrderStatus} from '@/components/order-status'
import {Dialog, DialogTrigger} from '@/components/ui/dialog'
import {queryClient} from '@/lib/react-query'

import {Button} from '../../../components/ui/button'
import {TableCell, TableRow} from '../../../components/ui/table'
import {OrderDetails} from './order-details'

export type OrderTableRowProps = {
  order: {
    orderId: string
    createdAt: string
    status: 'pending' | 'canceled' | 'processing' | 'delivering' | 'delivered'
    customerName: string
    total: number
  }
}

export function OrderTableRow({order}: Readonly<OrderTableRowProps>) {
  const [isDetailOpen, setIsDetailOpen] = useState(false)

  const {mutateAsync: cancelOrderFn} = useMutation({
    mutationFn: cancelOrder,
    async onSuccess(_, {orderId}) {
      const ordersLitCached = queryClient.getQueriesData<GetOrdersResponse>({
        queryKey: ['orders'],
      })

      // biome-ignore lint/complexity/noForEach: <explanation>
      ordersLitCached.forEach(([cacheKey, cacheData]) => {
        if (!cacheData) {
          return
        }

        queryClient.setQueryData<GetOrdersResponse>(cacheKey, {
          ...cacheData,
          orders: cacheData.orders.map((order) => {
            if (order.orderId === orderId) {
              return {
                ...order,
                status: 'canceled',
              }
            }
            return order
          }),
        })
      })
    },
  })

  return (
    <TableRow>
      <TableCell>
        <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="xs">
              <Search className="h-3 w-3" />
              <span className="sr-only">Detalhes do pedido</span>
            </Button>
          </DialogTrigger>
          <OrderDetails orderId={order.orderId} open={isDetailOpen} />
        </Dialog>
      </TableCell>
      <TableCell className="font-mono text-sm font-medium">
        {order.orderId}
      </TableCell>
      <TableCell className="text-muted-foreground">
        {formatDistanceToNow(new Date(order.createdAt), {
          addSuffix: true,
          locale: ptBR,
        })}
      </TableCell>
      <TableCell>
        <OrderStatus status={order.status} />
      </TableCell>
      <TableCell className="font-medium">{order.customerName}</TableCell>
      <TableCell className="font-medium">
        {(order.total / 100).toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        })}
      </TableCell>
      <TableCell>
        <Button variant="outline" size="xs">
          <ArrowRight className="mr-2 w-3 h-3" />
          Aprovar
        </Button>
      </TableCell>
      <TableCell>
        <Button
          disabled={!['pending', 'processing'].includes(order.status)}
          onClick={() => cancelOrderFn({orderId: order.orderId})}
          variant="ghost"
          size="xs">
          <X className="mr-2 w-3 h-3" />
          Cancelar
        </Button>
      </TableCell>
    </TableRow>
  )
}
