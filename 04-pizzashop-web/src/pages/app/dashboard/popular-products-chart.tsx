import {BarChart} from 'lucide-react'
import {Cell, Pie, PieChart, ResponsiveContainer} from 'recharts'
import colors from 'tailwindcss/colors'

import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card'

const data = [
  {
    product: 'Pepperoni',
    amount: 20,
  },
  {
    product: 'Portuguesa',
    amount: 10,
  },
  {
    product: 'Mussarela',
    amount: 50,
  },
  {
    product: 'Calabresa',
    amount: 40,
  },
  {
    product: 'Baiana',
    amount: 7,
  },
  {
    product: 'Banana com chocolate',
    amount: 20,
  },
  {
    product: '4 Queijos',
    amount: 25,
  },
]

const COLORS = [
  colors.sky[500],
  colors.rose[500],
  colors.yellow[500],
  colors.violet[500],
  colors.emerald[500],
  colors.blue[500],
  colors.gray[500],
]

export function PopularProductsChart() {
  return (
    <Card className="col-span-3">
      <CardHeader className="pb-8">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-medium">
            Produtos Populares
          </CardTitle>
          <BarChart className="w-4 h-4 text-muted-foreground" />
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={240}>
          <PieChart style={{fontSize: 12}}>
            <Pie
              data={data}
              dataKey="amount"
              nameKey="product"
              cx={'50%'}
              cy={'50%'}
              innerRadius={64}
              outerRadius={86}
              zstrokeWidth={8}
              label={({
                cx,
                cy,
                midAngle,
                innerRadius,
                outerRadius,
                value,
                index,
              }) => {
                const RADIAN = Math.PI / 180
                const radius = 12 + innerRadius + (outerRadius - innerRadius)
                const x = cx + radius * Math.cos(-midAngle * RADIAN)
                const y = cy + radius * Math.sin(-midAngle * RADIAN)

                return (
                  <text
                    x={x}
                    y={y}
                    className="fill-muted-foreground text-xs"
                    textAnchor={x > cx ? 'start' : 'end'}
                    dominantBaseline="central">
                    {data[index].product.length > 12
                      ? data[index].product.substring(0, 12).concat('...')
                      : data[index].product}{' '}
                    ({value})
                  </text>
                )
              }}>
              {data.map((_, i) => {
                return (
                  <Cell
                    key={i}
                    fill={COLORS[i]}
                    className="stroke-background hover:opacity-80"
                  />
                )
              })}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
