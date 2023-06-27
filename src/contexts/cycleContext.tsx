import {
  ReactNode,
  createContext,
  useState,
  useReducer,
  useEffect,
} from 'react'
import { v4 as uuidV4 } from 'uuid'
import { CycleReducer } from '../reducers/cycles/reducer'
import {
  addNewCycleAction,
  finishCycleAction,
  interruptCycleAction,
} from '../reducers/cycles/actions'
import { differenceInSeconds } from 'date-fns'

export interface CreateCycleData {
  task: string
  minutesAmount: number
}

interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
  finishDate?: Date
}

interface cycleContextType {
  cycles: Cycle[]
  activeCycle: Cycle | undefined
  activeCycleId: string | null
  minutes: string
  seconds: string
  totalSeconds: number
  createNewCycle: (data: CreateCycleData) => void
  interruptCycle: () => void
  finishCycle: () => void
  secondsPassed: (value: number) => void
}

interface cycleContextProviderProps {
  children: ReactNode
}

export const cycleContext = createContext({} as cycleContextType)

export function CycleContextProvider({ children }: cycleContextProviderProps) {
  const [cyclesState, dispatch] = useReducer(
    CycleReducer,
    {
      cycles: [],
      activeCycleId: null,
    },
    (initialState) => {
      const storedStateAsJSON = localStorage.getItem(
        '@timer:cycles-state-1.0.0',
      )
      if (storedStateAsJSON) {
        return JSON.parse(storedStateAsJSON)
      } else {
        return initialState
      }
    },
  )

  const { cycles, activeCycleId } = cyclesState

  const activeCycle = cycles.find((item) => item.id === activeCycleId)

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(() => {
    if (activeCycle) {
      return differenceInSeconds(new Date(), new Date(activeCycle.startDate))
    } else {
      return 0
    }
  })

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0

  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0

  const minutesAmount = Math.floor(currentSeconds / 60)
  const secondsAmount = currentSeconds % 60

  const minutes = String(minutesAmount).padStart(2, '0')
  const seconds = String(secondsAmount).padStart(2, '0')

  useEffect(() => {
    const stateJSON = JSON.stringify(cyclesState)
    localStorage.setItem('@timer:cycles-state-1.0.0', stateJSON)
  }, [cyclesState])

  function createNewCycle(data: CreateCycleData) {
    const id = uuidV4()

    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }

    dispatch(addNewCycleAction(newCycle))
    setAmountSecondsPassed(0)
  }

  function interruptCycle() {
    dispatch(interruptCycleAction())
  }

  function finishCycle() {
    dispatch(finishCycleAction())
  }

  function secondsPassed(value: number) {
    setAmountSecondsPassed(value)
  }

  return (
    <cycleContext.Provider
      value={{
        activeCycle,
        activeCycleId,
        createNewCycle,
        secondsPassed,
        interruptCycle,
        finishCycle,
        minutes,
        seconds,
        totalSeconds,
        cycles,
      }}
    >
      {children}
    </cycleContext.Provider>
  )
}
