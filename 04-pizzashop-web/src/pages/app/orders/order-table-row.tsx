import {useMutation} from '@tanstack/react-query'
import {formatDistanceToNow} from 'date-fns'
import {ptBR} from 'date-fns/locale/pt-BR'
import {ArrowRight, Search, X} from 'lucide-react'
import {useState} from 'react'

import {approveOrder} from '@/api/approve-order'
import {cancelOrder} from '@/api/cancel-order'
import {deliveryOrder} from '@/api/deliver-order'
import {dispatchOrder} from '@/api/dispatch-order'
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

  /**
   *
   * Percorre todas as queries com a chave orders e atualiza o cache de acordo
   */
  function updateOrderStatusOnCache(orderId: string, status: OrderStatus) {
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
              status,
            }
          }
          return order
        }),
      })
    })
  }

  const {mutateAsync: cancelOrderFn, isPending: isCancelingOrder} = useMutation(
    {
      mutationFn: cancelOrder,
      async onSuccess(_, {orderId}) {
        updateOrderStatusOnCache(orderId, 'canceled')
      },
    },
  )

  const {mutateAsync: approveOrderFn, isPending: isApprovingOrder} =
    useMutation({
      mutationFn: approveOrder,
      async onSuccess(_, {orderId}) {
        updateOrderStatusOnCache(orderId, 'processing')
      },
    })

  const {mutateAsync: dispatchOrderFn, isPending: isDispatchingOrder} =
    useMutation({
      mutationFn: dispatchOrder,
      async onSuccess(_, {orderId}) {
        updateOrderStatusOnCache(orderId, 'delivering')
      },
    })

  const {mutateAsync: deliverOrderFn, isPending: isDeliveringOrder} =
    useMutation({
      mutationFn: deliveryOrder,
      async onSuccess(_, {orderId}) {
        updateOrderStatusOnCache(orderId, 'delivered')
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
        {order.status === 'pending' && (
          <Button
            variant="outline"
            size="xs"
            onClick={() => approveOrderFn({orderId: order.orderId})}
            disabled={isApprovingOrder}>
            <ArrowRight className="mr-2 w-3 h-3" />
            Aprovar
          </Button>
        )}

        {order.status === 'processing' && (
          <Button
            variant="outline"
            size="xs"
            onClick={() => dispatchOrderFn({orderId: order.orderId})}
            disabled={isDispatchingOrder}>
            <ArrowRight className="mr-2 w-3 h-3" />
            Em entrega
          </Button>
        )}

        {order.status === 'delivering' && (
          <Button
            variant="outline"
            size="xs"
            onClick={() => deliverOrderFn({orderId: order.orderId})}
            disabled={isDeliveringOrder}>
            <ArrowRight className="mr-2 w-3 h-3" />
            Entregue
          </Button>
        )}
      </TableCell>
      <TableCell>
        <Button
          disabled={
            !['pending', 'processing'].includes(order.status) ||
            isCancelingOrder
          }
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
