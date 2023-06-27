import { useContext } from 'react'
import { formatDistanceToNow } from 'date-fns'
import * as H from './styles'
import { cycleContext } from '../../contexts/cycleContext'

export function History() {
  const { cycles } = useContext(cycleContext)
  return (
    <H.HistoryContainer>
      <h1>My History</h1>
      <H.HistoryList>
        <table>
          <thead>
            <tr>
              <th>Task</th>
              <th>Duration</th>
              <th>Start</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {cycles.map((cycle) => {
              return (
                <tr key={cycle.id}>
                  <td>{cycle.task}</td>
                  <td>{cycle.minutesAmount} minutes</td>
                  <td>
                    {formatDistanceToNow(new Date(cycle.startDate), {
                      addSuffix: true,
                    })}
                  </td>
                  <td>
                    {cycle.finishDate && (
                      <H.Status statusColor="green">Concluded</H.Status>
                    )}

                    {cycle.interruptedDate && (
                      <H.Status statusColor="red">Interrupted</H.Status>
                    )}

                    {!cycle.interruptedDate && !cycle.finishDate && (
                      <H.Status statusColor="yellow">In progress</H.Status>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </H.HistoryList>
    </H.HistoryContainer>
  )
}
