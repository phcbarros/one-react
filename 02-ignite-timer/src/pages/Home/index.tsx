import {createContext, useState} from 'react'
import {HandPalm, Play} from 'phosphor-react'
import {FormProvider, useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import * as zod from 'zod'
import {NewCycleForm as Form} from './components/NewCycleForm'
import {Countdown} from './components/Countdown'

import {
  HomeContainer,
  StartCountdownButtonBase,
  StopCountdownButton,
} from './styles'

// controlled = formulários simples com poucos campos em uma interface simples (login), tem maior fluidez, monitora o valor digitado em tempo real, exemplo usar useState
// uncontrolled = formulários complexos com muitos campos, tem menor fluidez, não monitora o valor digitado em tempo real, exemplo usar eventos para atualizar os valores

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod
    .number()
    .min(5, 'O ciclo precisa ser de no mínimo 5 minutos')
    .max(60, 'O ciclo precisa ser de no máximo 60 minutos'),
})

type NewCycleForm = zod.infer<typeof newCycleFormValidationSchema> // precisa converter para o ts entender

interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}

interface CyclesContextType {
  // cycles: Cycle[]
  activeCycle: Cycle | undefined
  activeCycleId: string | null
  amountSecondsPassed: number
  markCurrentCycleAsFinished: () => void
  setSecondsPassed: (seconds: number) => void
  // createNewCycle: (data: NewCycleForm) => void
  // interruptCurrentCycle: () => void
}

export const CyclesContext = createContext({} as CyclesContextType)

export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  const newCycleForm = useForm<NewCycleForm>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })

  const {handleSubmit, watch, reset} = newCycleForm

  function handleCreateNewCycle(data: NewCycleForm) {
    const newCycle: Cycle = {
      id: String(new Date().getTime()),
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }

    setCycles((state) => [...state, newCycle]) // alteração do estado dependeu do seu estado atual
    setActiveCycleId(newCycle.id)
    setAmountSecondsPassed(0)

    reset() // limpa o formulário para os valores iniciais definidos no defaultValues
  }

  function handleInterruptCycle() {
    setCycles((state) =>
      state.map((cycle) =>
        cycle.id === activeCycleId
          ? {...cycle, interruptedDate: new Date()}
          : cycle,
      ),
    )
    setActiveCycleId(null)
  }

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  const task = watch('task')
  const isSubmitDisabled = !task

  /**
   * Props Drilling => Quando temos MUITAS propriedades APENAS para comunicação entre componentes
   * Context API => Permite compartilharmos informações entre VÁRIOS componentes ao mesmo tempo
   */

  function markCurrentCycleAsFinished() {
    setCycles((state) =>
      state.map((cycle) =>
        cycle.id === activeCycleId
          ? {...cycle, finishedDate: new Date()}
          : cycle,
      ),
    )
  }

  function setSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds)
  }

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
        <CyclesContext.Provider
          value={{
            activeCycle,
            activeCycleId,
            amountSecondsPassed,
            markCurrentCycleAsFinished,
            setSecondsPassed,
          }}>
          <FormProvider {...newCycleForm}>
            <Form />
          </FormProvider>
          <Countdown />
        </CyclesContext.Provider>

        {activeCycle ? (
          <StopCountdownButton type="button" onClick={handleInterruptCycle}>
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
