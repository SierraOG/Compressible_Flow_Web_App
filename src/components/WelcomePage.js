import React, {useState, useEffect, useRef} from 'react'
import axios from 'axios'
import { List } from 'semantic-ui-react'

export default function WelcomePage() {

  return <section className="welcome-page">
    <header>
      <h1>Compressible aerodynamics calculator page</h1>
      <p>This calculator is intended to provide fast and convenient calculations for different compressible aerodynamics relations. The calculator works for Isentropic Flow, Normal Shock, Oblique Shock, Fanno Flow, and Rayleigh Flow problems. The relations are taken from standard aerodynamics texts and implemented in <a href="https://github.com/SierraOG/CompressibleFlowCalculator">Java</a> and <a href="https://github.com/SierraOG/Compressible_Flow_Web_App">Javascript</a> by Sierra Obermoeller-Gilmer. </p> 
      <h4>Notes:</h4>
      <List as='ul'>
        <List.Item as='li'>'0' refers to stagnation or total conditions</List.Item>
        <List.Item as='li'>'*' refers to sonic conditions</List.Item>
        <List.Item as='li'>All angles are in degrees</List.Item>
      </List>
    </header>
  </section>

}
