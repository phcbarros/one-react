import {Play} from 'phosphor-react'
import {type FieldValues, useForm} from 'react-hook-form'

import {
  CountdownContainer,
  FormContainer,
  HomeContainer,
  MinutesAmountInput,
  Separator,
  StartCountdownButtonBase,
  TaskInput,
} from './styles'

// controlled = formulários simples com poucos campos em uma interface simples (login), tem maior fluidez, monitora o valor digitado em tempo real, exemplo usar useState
// uncontrolled = formulários complexos com muitos campos, tem menor fluidez, não monitora o valor digitado em tempo real, exemplo usar eventos para atualizar os valores

export function Home() {
  const {register, handleSubmit, watch} = useForm()

  function handleCreateNewCycle(data: FieldValues) {
    console.log(data)
  }

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
            {...register('minutesAmount', {valueAsNumber: true})}
          />

          <span>minutos.</span>
        </FormContainer>

        <CountdownContainer>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountdownContainer>

        <StartCountdownButtonBase type="submit" disabled={isSubmitDisabled}>
          <Play size={24} />
          Começar
        </StartCountdownButtonBase>
      </form>
    </HomeContainer>
  )
}
