import {ActionTypes} from './actions'

export interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}

export interface CyclesState {
  cycles: Cycle[]
  activeCycleId: string | null
}

export type CyclesAction =
  | {type: 'ADD_NEW_CYCLE'; payload: {newCycle: Cycle}}
  | {type: 'INTERRUPT_CURRENT_CYCLE'}
  | {type: 'MARK_CURRENT_CYCLE_AS_FINISHED'}

export function cyclesReducer(state: CyclesState, action: any) {
  console.log(action)
  switch (action.type) {
    case ActionTypes.ADD_NEW_CYCLE:
      return {
        ...state,
        cycles: [...state.cycles, action.payload.newCycle],
        activeCycleId: action.payload.newCycle.id,
      }

    case ActionTypes.INTERRUPT_CURRENT_CYCLE:
      return {
        ...state,
        cycles: state.cycles.map((cycle) =>
          cycle.id === state.activeCycleId
            ? {...cycle, interruptedDate: new Date()}
            : cycle,
        ),
        activeCycleId: null,
      }

    case ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED:
      return {
        ...state,
        cycles: state.cycles.map((cycle) =>
          cycle.id === state.activeCycleId
            ? {...cycle, finishedDate: new Date()}
            : cycle,
        ),
        activeCycleId: null,
      }

    default:
      return state
  }
}
