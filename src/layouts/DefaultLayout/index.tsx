import { Outlet } from 'react-router-dom'
import { Header } from '../../components/Header'
import * as H from './styles'

export function DefaultLayout() {
  return (
    <H.LayoutContainer>
      <Header />
      <Outlet />
    </H.LayoutContainer>
  )
}
