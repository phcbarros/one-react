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

interface CyclesState {
  cycles: Cycle[]
  activeCycleId: string | null
}

export function CyclesContextProvider({
  children,
}: Readonly<CyclesContextProviderProps>) {
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)
  const [cyclesState, dispatch] = useReducer(
    (state: CyclesState, action: any) => {
      console.log(action)
      console.log(state)
      if (action.type === 'ADD_NEW_CYCLE') {
        return {
          ...state,
          cycles: [...state.cycles, action.payload.newCycle],
          activeCycleId: action.payload.newCycle.id,
        }
      }

      if (action.type === 'INTERRUPT_CURRENT_CYCLE') {
        return {
          ...state,
          cycles: state.cycles.map((cycle) => {
            if (cycle.id === state.activeCycleId) {
              return {...cycle, interruptedDate: new Date()}
            }
            return cycle
          }),
          activeCycleId: null,
        }
      }

      return state
    },
    {
      cycles: [],
      activeCycleId: null,
    },
  )

  const {cycles, activeCycleId} = cyclesState
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

    dispatch({type: 'ADD_NEW_CYCLE', payload: {newCycle}})
    setAmountSecondsPassed(0)
  }

  function interruptCurrentCycle() {
    dispatch({type: 'INTERRUPT_CURRENT_CYCLE', payload: null})
  }

  function resetActiveCycle() {
    //setActiveCycleId(null)
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
