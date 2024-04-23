import {createContext, useReducer, useState} from 'react'

interface CreateCycleData {
  // separação de camadas, o contexto não deve ficar acoplado a interface (zod e hookforms)
  task: string
  minutesAmount: number
}

interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
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
  resetActiveCycle: () => void
}

export const CyclesContext = createContext({} as CyclesContextType)

interface CyclesContextProviderProps {
  children: React.ReactNode
}

export function CyclesContextProvider({
  children,
}: Readonly<CyclesContextProviderProps>) {
  const [cycles, dispatch] = useReducer((state: Cycle[], action: any) => {
    console.log(action)
    console.log(state)
    if (action.type === 'ADD_NEW_CYCLE') {
      return [...state, action.payload.newCycle]
    }
    return state
  }, [])

  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  function markCurrentCycleAsFinished() {
    dispatch({type: 'MARK_CURRENT_CYCLE_AS_FINISHED', payload: null})
    // setCycles((state) =>
    //   state.map((cycle) =>
    //     cycle.id === activeCycleId
    //       ? {...cycle, finishedDate: new Date()}
    //       : cycle,
    //   ),
    // )
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

    //setCycles((state) => [...state, newCycle]) // alteração do estado dependeu do seu estado atual
    dispatch({type: 'ADD_NEW_CYCLE', payload: {newCycle}})
    setActiveCycleId(newCycle.id)
    setAmountSecondsPassed(0)
  }

  function interruptCurrentCycle() {
    // setCycles((state) =>
    //   state.map((cycle) =>
    //     cycle.id === activeCycleId
    //       ? {...cycle, interruptedDate: new Date()}
    //       : cycle,
    //   ),
    // )
    dispatch({type: 'INTERRUPT_CURRENT_CYCLE', payload: null})
    setActiveCycleId(null)
  }

  function resetActiveCycle() {
    setActiveCycleId(null)
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
        resetActiveCycle,
      }}>
      {children}
    </CyclesContext.Provider>
  )
}
