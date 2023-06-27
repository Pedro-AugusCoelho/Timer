import { useForm } from 'react-hook-form'
import { HandPalm, Play } from 'phosphor-react'
import * as H from './styles'
import { useContext, useEffect } from 'react'
import { differenceInSeconds } from 'date-fns'
import { CountDown } from './components/CountDown'
import { NewCycleForm } from './components/NewCycleForm'

import { cycleContext } from '../../contexts/cycleContext'

export interface NewCycleFormData {
  task: string
  minutesAmount: number
}

export function Home() {
  const {
    activeCycle,
    activeCycleId,
    createNewCycle,
    secondsPassed,
    interruptCycle,
    finishCycle,
    minutes,
    seconds,
    totalSeconds,
  } = useContext(cycleContext)

  const cycleHookForm = useForm<NewCycleFormData>({
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })

  const { register, handleSubmit, watch, reset } = cycleHookForm

  const task = watch('task')
  const isSubmitDisabled = !task

  useEffect(() => {
    let interval: number

    if (activeCycle) {
      interval = setInterval(() => {
        const secondsDifference = differenceInSeconds(
          new Date(),
          new Date(activeCycle.startDate),
        )

        if (secondsDifference >= totalSeconds) {
          secondsPassed(totalSeconds)
          finishCycle()
          clearInterval(interval)
        } else {
          secondsPassed(secondsDifference)
        }
      }, 1000)
    }

    return () => {
      clearInterval(interval)
    }
  }, [activeCycle, totalSeconds, activeCycleId, finishCycle, secondsPassed])

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes}:${seconds}`
    } else {
      document.title = 'TIMER'
    }
  }, [minutes, seconds, activeCycle])

  function handleCreateNewCycle(data: NewCycleFormData) {
    createNewCycle(data)
    reset()
  }

  function handleInterruptCycle() {
    interruptCycle()
  }

  return (
    <H.HomeContainer>
      <form action="" onSubmit={handleSubmit(handleCreateNewCycle)}>
        <NewCycleForm register={register} />
        <CountDown />

        {activeCycle ? (
          <H.StopCountDownBtn type="button" onClick={handleInterruptCycle}>
            <HandPalm size={24} />
            Stop
          </H.StopCountDownBtn>
        ) : (
          <H.StartCountDownBtn disabled={isSubmitDisabled} type="submit">
            <Play size={24} />
            Start
          </H.StartCountDownBtn>
        )}
      </form>
    </H.HomeContainer>
  )
}
