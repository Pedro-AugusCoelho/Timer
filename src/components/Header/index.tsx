import * as H from './styles'
import Logo from '../../assets/Logo.svg'
import { Timer, Scroll } from 'phosphor-react'
import { NavLink } from 'react-router-dom'

export function Header() {
  return (
    <H.HeaderContainer>
      <img src={Logo} alt="" />
      <nav>
        <NavLink to="/" title="timer">
          <Timer size={24} />
        </NavLink>

        <NavLink to="/history" title="history">
          <Scroll size={24} />
        </NavLink>
      </nav>
    </H.HeaderContainer>
  )
}
