import {createContext, useReducer, useState} from 'react'
import {ActionTypes, cyclesReducer, type Cycle} from '../reducers/cycles'

interface CreateCycleData {
  // separação de camadas, o contexto não deve ficar acoplado a interface (zod e hookforms)
  task: string
  minutesAmount: number
}

export interface CyclesContextType {
  cycles: Cycle[]
  activeCycle: Cycle | undefined
  activeCycleId: string | null
  amountSecondsPassed: number
  markCurrentCycleAsFinished: () => void
  setSecondsPassed: (seconds: number) => void
  createNewCycle: (data: CreateCycleData) => void
  interruptCurrentCycle: () => void
}

export const CyclesContext = createContext({} as CyclesContextType)

interface CyclesContextProviderProps {
  children: React.ReactNode
}

export function CyclesContextProvider({
  children,
}: Readonly<CyclesContextProviderProps>) {
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)
  const [cyclesState, dispatch] = useReducer(cyclesReducer, {
    cycles: [],
    activeCycleId: null,
  })

  const {cycles, activeCycleId} = cyclesState
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  function markCurrentCycleAsFinished() {
    dispatch({type: ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED, payload: null})
  }

  function setSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds)
  }

  function createNewCycle(data: CreateCycleData) {
    const newCycle: Cycle = {
      id: String(new Date().getTime()),
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }

    dispatch({type: ActionTypes.ADD_NEW_CYCLE, payload: {newCycle}})
    setAmountSecondsPassed(0)
  }

  function interruptCurrentCycle() {
    dispatch({type: ActionTypes.INTERRUPT_CURRENT_CYCLE, payload: null})
  }

  return (
    <CyclesContext.Provider
      value={{
        cycles,
        activeCycle,
        activeCycleId,
        amountSecondsPassed,
        markCurrentCycleAsFinished,
        setSecondsPassed,
        createNewCycle,
        interruptCurrentCycle,
      }}>
      {children}
    </CyclesContext.Provider>
  )
}
