import {useContext} from 'react'
import {CyclesContext} from '../../../../contexts/CyclesContext'
import {FormContainer, MinutesAmountInput, TaskInput} from './styles'
import {useFormContext} from 'react-hook-form'

export function NewCycleForm() {
  const {activeCycle} = useContext(CyclesContext)
  const {register} = useFormContext()

  return (
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
  )
}
