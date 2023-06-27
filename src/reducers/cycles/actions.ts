import { Cycle } from './reducer'

export enum TypesAction {
  ADD_NEW_CYCLE = 'ADD_NEW_CYCLE',
  INTERRUPTED_CURRENT_CYCLE = 'INTERRUPTED_CURRENT_CYCLE',
  MARK_CURRENT_CYCLE_AS_FINISH = 'MARK_CURRENT_CYCLE_AS_FINISH',
}

export function addNewCycleAction(newCycle: Cycle) {
  return {
    type: TypesAction.ADD_NEW_CYCLE,
    payload: {
      newCycle,
    },
  }
}

export function interruptCycleAction() {
  return {
    type: TypesAction.INTERRUPTED_CURRENT_CYCLE,
  }
}

export function finishCycleAction() {
  return {
    type: TypesAction.MARK_CURRENT_CYCLE_AS_FINISH,
  }
}
