import {zodResolver} from '@hookform/resolvers/zod'
import {DialogDescription} from '@radix-ui/react-dialog'
import {useQuery} from '@tanstack/react-query'
import {useForm} from 'react-hook-form'
import * as z from 'zod'

import {getManagedRestaurant} from '@/api/get-managed-restaurant'

import {Button} from './ui/button'
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog'
import {Input} from './ui/input'
import {Label} from './ui/label'
import {Textarea} from './ui/text-area'

const storeProfileFormSchema = z.object({
  name: z.string().min(1, 'O nome é obrigatório'),
  description: z.string().min(1, 'A descrição é obrigatória'),
})

type StoreProfileSchema = z.infer<typeof storeProfileFormSchema>

export function StoreProfileDialog() {
  const {data: managedRestaurant} = useQuery({
    queryKey: ['managed-restaurant'],
    queryFn: getManagedRestaurant,
  })

  const {register, handleSubmit} = useForm<StoreProfileSchema>({
    resolver: zodResolver(storeProfileFormSchema),
    values: {
      // observar as alterações nos dados
      name: managedRestaurant?.name ?? '',
      description: managedRestaurant?.description ?? '',
    },
  })

  async function handleStoreProfile(data: StoreProfileSchema) {
    console.log(data)
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Perfil da loja</DialogTitle>
        <DialogDescription>
          Atualize as informações do seu estabelecimento visíveis ao seu cliente
        </DialogDescription>
      </DialogHeader>

      <form onSubmit={handleSubmit(handleStoreProfile)}>
        <div className="space-y-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right" htmlFor="name">
              Nome
            </Label>
            <Input
              id="name"
              placeholder="Nome da loja"
              className="col-span-3"
              {...register('name')}
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right" htmlFor="description">
              Descrição
            </Label>
            <Textarea
              id="description"
              placeholder="Nome da loja"
              className="col-span-3"
              {...register('description')}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="ghost" type="button">
            Cancelar
          </Button>
          <Button variant="success" type="submit">
            Salvar
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  )
}
