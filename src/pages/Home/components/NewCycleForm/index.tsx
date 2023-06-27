import { UseFormRegister } from 'react-hook-form'
import * as N from './styles'
import { NewCycleFormData } from '../..'
import { useContext } from 'react'
import { cycleContext } from '../../../../contexts/cycleContext'

interface NewCycleFormProps {
  register: UseFormRegister<NewCycleFormData>
}

export function NewCycleForm({ register }: NewCycleFormProps) {
  const { activeCycle } = useContext(cycleContext)

  return (
    <N.FormContainer>
      <label htmlFor="task">I will work on</label>
      <N.TaskInput
        id="task"
        list="task-suggestions"
        placeholder="name your project"
        disabled={!!activeCycle}
        {...register('task')}
      />

      <datalist id="task-suggestions">
        <option value="PROJETO 1" />
        <option value="PROJETO 2" />
        <option value="PROJETO 3" />
        <option value="PROJETO 4" />
        <option value="PROJETO 5" />
      </datalist>

      <label htmlFor="minutesAmount">during</label>
      <N.MinutesAmountInput
        type="number"
        id="minutesAmount"
        placeholder="00"
        step="5"
        min="5"
        max="60"
        disabled={!!activeCycle}
        {...register('minutesAmount', { valueAsNumber: true })}
      />

      <span>Minutes.</span>
    </N.FormContainer>
  )
}
