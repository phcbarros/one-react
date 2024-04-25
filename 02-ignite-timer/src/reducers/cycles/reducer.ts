import {produce} from 'immer'
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
  | {type: ActionTypes.ADD_NEW_CYCLE; payload: {newCycle: Cycle}}
  | {type: ActionTypes.INTERRUPT_CURRENT_CYCLE}
  | {type: ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED}

export function cyclesReducer(state: CyclesState, action: CyclesAction) {
  console.log(action)
  switch (action.type) {
    case ActionTypes.ADD_NEW_CYCLE:
      // return {
      //   ...state,
      //   cycles: [...state.cycles, action.payload.newCycle],
      //   activeCycleId: action.payload.newCycle.id,
      // }
      return produce(state, (draft) => {
        draft.cycles.push(action.payload.newCycle)
        draft.activeCycleId = action.payload.newCycle.id
      })

    case ActionTypes.INTERRUPT_CURRENT_CYCLE: {
      // return {
      //   ...state,
      //   cycles: state.cycles.map((cycle) =>
      //     cycle.id === state.activeCycleId
      //       ? {...cycle, interruptedDate: new Date()}
      //       : cycle,
      //   ),
      //   activeCycleId: null,
      // }

      const currentCycleIndex = state.cycles.findIndex((cycle) => {
        return cycle.id === state.activeCycleId
      })

      if (currentCycleIndex < 0) {
        return state
      }

      return produce(state, (draft) => {
        draft.cycles[currentCycleIndex].interruptedDate = new Date()
        draft.activeCycleId = null
      })
    }

    case ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED: {
      // return {
      //   ...state,
      //   cycles: state.cycles.map((cycle) =>
      //     cycle.id === state.activeCycleId
      //       ? {...cycle, finishedDate: new Date()}
      //       : cycle,
      //   ),
      //   activeCycleId: null,
      //}

      const currentCycleIndex = state.cycles.findIndex((cycle) => {
        return cycle.id === state.activeCycleId
      })

      if (currentCycleIndex < 0) {
        return state
      }

      return produce(state, (draft) => {
        draft.cycles[currentCycleIndex].finishedDate = new Date()
        draft.activeCycleId = null
      })
    }

    default:
      return state
  }
}
