import React from 'react'
import { Tab, Menu, Icon } from 'semantic-ui-react'
import { NavLink } from "react-router-dom";

const Nav = props => (
	<NavLink
		exact
		{...props}
		activeClassName="active"
	/>
);

const createLabel = (iconName, labelText) => <span><Icon name={iconName} />{labelText}</span>

const welcomeLabel = createLabel("home", "Home Page")
const isenLabel = createLabel("angle double right", "Isentropic")
const normLabel = createLabel('angle double right', 'Normal Shock')
const oblLabel = createLabel('angle double right', 'Oblique Shock')
const fanLabel = createLabel('angle double right', 'Fanno Flow')
const rayLabel = createLabel('angle double right', 'Rayleigh Flow')

const panes = [
  { menuItem: <Menu.Item key='home' as={Nav} to={`/`} content={welcomeLabel} /> },
  { menuItem: <Menu.Item key='isentropic' as={Nav} to={`/isentropic`} content={isenLabel} /> },
  { menuItem: <Menu.Item key='normal' as={Nav} to={`/normalshock`} content={normLabel} /> },
  { menuItem: <Menu.Item key='oblique' as={Nav} to={`/obliqueshock`} content={oblLabel} /> },
  { menuItem: <Menu.Item key='fanno' as={Nav} to={`/fanno`} content={fanLabel} /> },
  { menuItem: <Menu.Item key='rayleigh' as={Nav} to={`/rayleigh`} content={rayLabel} /> }
]

const TabNav = () => <Tab panes={panes} renderActiveOnly={false} />

export default TabNav
