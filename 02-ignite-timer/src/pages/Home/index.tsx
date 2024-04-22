import {useEffect, useState} from 'react'
import {HandPalm, Play} from 'phosphor-react'
import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import * as zod from 'zod'
import {differenceInSeconds} from 'date-fns'

import {
  CountdownContainer,
  FormContainer,
  HomeContainer,
  MinutesAmountInput,
  Separator,
  StartCountdownButtonBase,
  StopCountdownButton,
  TaskInput,
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

export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  const {register, handleSubmit, watch, reset} = useForm<NewCycleForm>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })

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

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0
  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0

  const minutesAmount = Math.floor(currentSeconds / 60)
  const secondsAmount = currentSeconds % 60

  const minutes = String(minutesAmount).padStart(2, '0')
  const seconds = String(secondsAmount).padStart(2, '0')

  /*
  useEffect()
  - executa quando o componente é renderizado pela primeira vez
  - executa sempre que o valor do array de dependências mudar
  - não utilizar para atualizar o estado (ex aplicar filtros)
  */

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes}:${seconds}`
    }
  }, [minutes, seconds, activeCycle])

  useEffect(() => {
    let interval: number

    if (activeCycle) {
      interval = setInterval(() => {
        const secondsDifference = differenceInSeconds(
          new Date(),
          activeCycle.startDate,
        )

        if (secondsDifference >= totalSeconds) {
          setCycles((state) =>
            state.map((cycle) =>
              cycle.id === activeCycleId
                ? {...cycle, finishedDate: new Date()}
                : cycle,
            ),
          )
          setActiveCycleId(null)
          setAmountSecondsPassed(totalSeconds)
          clearInterval(interval)
        } else {
          setAmountSecondsPassed(secondsDifference)
        }
      })
    }

    return () => {
      clearInterval(interval)
    }
  }, [activeCycle, activeCycleId, totalSeconds])

  const task = watch('task')
  const isSubmitDisabled = !task

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput
            type="text"
            id="task"
            placeholder="Dê um nome para o seu projeto"
            list="task-suggestions"
            disabled={!!activeCycle}
            {...register('task')}
          />

          <datalist id="task-suggestions">
            <option value="Backstage" />
            <option value="Kubernetes" />
            <option value="Micro Frontend" />
            <option value="C#" />
          </datalist>

          <label htmlFor="minutesAmount">durante</label>
          <MinutesAmountInput
            type="number"
            id="minutesAmount"
            min={5}
            max={60}
            step={5}
            disabled={!!activeCycle}
            {...register('minutesAmount', {valueAsNumber: true})}
          />

          <span>minutos.</span>
        </FormContainer>

        <CountdownContainer>
          <span>{minutes[0]}</span>
          <span>{minutes[1]}</span>
          <Separator>:</Separator>
          <span>{seconds[0]}</span>
          <span>{seconds[1]}</span>
        </CountdownContainer>

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
