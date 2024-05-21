import {zodResolver} from '@hookform/resolvers/zod'
import {DialogClose, DialogDescription} from '@radix-ui/react-dialog'
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query'
import {useForm} from 'react-hook-form'
import {toast} from 'sonner'
import * as z from 'zod'

import {
  getManagedRestaurant,
  type GetManagedRestaurantResponse,
} from '@/api/get-managed-restaurant'
import {updateProfile} from '@/api/update-profile'

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
  description: z.string().min(1, 'A descrição é obrigatória').nullable(),
})

type StoreProfileSchema = z.infer<typeof storeProfileFormSchema>

export function StoreProfileDialog() {
  const queryClient = useQueryClient()

  const {data: managedRestaurant} = useQuery({
    queryKey: ['managed-restaurant'],
    queryFn: getManagedRestaurant,
    staleTime: Number.POSITIVE_INFINITY,
  })

  const {
    register,
    handleSubmit,
    formState: {isSubmitting},
  } = useForm<StoreProfileSchema>({
    resolver: zodResolver(storeProfileFormSchema),
    values: {
      // observar as alterações nos dados
      name: managedRestaurant?.name ?? '',
      description: managedRestaurant?.description ?? '',
    },
  })

  function updateManagedRestaurantCache({
    name,
    description,
  }: StoreProfileSchema) {
    const cached = queryClient.getQueryData<GetManagedRestaurantResponse>([
      'managed-restaurant',
    ])

    if (cached) {
      queryClient.setQueryData<GetManagedRestaurantResponse>(
        ['managed-restaurant'],
        {
          ...cached,
          name,
          description,
        },
      )
    }

    return {cached}
  }

  const {mutateAsync: updateProfileFn} = useMutation({
    mutationFn: updateProfile,
    onMutate({name, description}) {
      const {cached} = updateManagedRestaurantCache({name, description})

      return {previousProfile: cached}
    },
    onError(_, __, context) {
      if (context?.previousProfile) {
        updateManagedRestaurantCache(
          context.previousProfile as StoreProfileSchema,
        )
      }
    },
  })

  /**
   * interface otimista quando atualiza a interface sem esperar a resposta do backend
   * usado em cenários onde a resposta do backend tem grandes chances de darem sucesso
   * caso dê erro informa que deu erro e retorna para o estado anterior
   */
  async function handleUpdateProfile(data: StoreProfileSchema) {
    try {
      await updateProfileFn({
        name: data.name,
        description: data.description,
      })

      console.log(data)
      toast.success('Perfil atualizado com sucesso!')
    } catch (error) {
      toast.error('Falha ao atualizar perfil, tente novamente!')
    }
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Perfil da loja</DialogTitle>
        <DialogDescription>
          Atualize as informações do seu estabelecimento visíveis ao seu cliente
        </DialogDescription>
      </DialogHeader>

      <form onSubmit={handleSubmit(handleUpdateProfile)}>
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
          <DialogClose asChild>
            <Button variant="ghost" type="button">
              Cancelar
            </Button>
          </DialogClose>
          <Button variant="success" type="submit" disabled={isSubmitting}>
            Salvar
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  )
}
