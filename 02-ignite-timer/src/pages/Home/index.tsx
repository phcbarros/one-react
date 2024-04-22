import {HandPalm, Play} from 'phosphor-react'
import {FormProvider, useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import * as zod from 'zod'
import {NewCycleForm} from './components/NewCycleForm'
import {Countdown} from './components/Countdown'

import {
  HomeContainer,
  StartCountdownButtonBase,
  StopCountdownButton,
} from './styles'
import {useContext} from 'react'
import {CyclesContext} from '../../contexts/CyclesContext'

// controlled = formulários simples com poucos campos em uma interface simples (login), tem maior fluidez, monitora o valor digitado em tempo real, exemplo usar useState
// uncontrolled = formulários complexos com muitos campos, tem menor fluidez, não monitora o valor digitado em tempo real, exemplo usar eventos para atualizar os valores

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod
    .number()
    .min(5, 'O ciclo precisa ser de no mínimo 5 minutos')
    .max(60, 'O ciclo precisa ser de no máximo 60 minutos'),
})

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema> // precisa converter para o ts entender

export function Home() {
  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })

  const {activeCycle, createNewCycle, interruptCurrentCycle} =
    useContext(CyclesContext)

  const {handleSubmit, watch} = newCycleForm

  const task = watch('task')
  const isSubmitDisabled = !task

  /**
   * Props Drilling => Quando temos MUITAS propriedades APENAS para comunicação entre componentes
   * Context API => Permite compartilharmos informações entre VÁRIOS componentes ao mesmo tempo
   */

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(createNewCycle)}>
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>
        <Countdown />

        {activeCycle ? (
          <StopCountdownButton type="button" onClick={interruptCurrentCycle}>
            <HandPalm size={24} />
            Interromper
          </StopCountdownButton>
        ) : (
          <StartCountdownButtonBase type="submit" disabled={isSubmitDisabled}>
            <Play size={24} />
            Começar
          </StartCountdownButtonBase>
        )}
      </form>
    </HomeContainer>
  )
}
