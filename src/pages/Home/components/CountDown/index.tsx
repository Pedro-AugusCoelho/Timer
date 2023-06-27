import { useContext } from 'react'
import * as C from './styles'
import { cycleContext } from '../../../../contexts/cycleContext'

export function CountDown() {
  const { minutes, seconds } = useContext(cycleContext)

  return (
    <C.CountDownContainer>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>
      <C.Separator>:</C.Separator>
      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </C.CountDownContainer>
  )
}
