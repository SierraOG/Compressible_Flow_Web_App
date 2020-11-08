import React, {useEffect} from 'react'

import { Grid, Dimmer, Loader } from 'semantic-ui-react'

const options = {
  'gamma': 'γ',
  'mach': 'Mach',
  'tto': 'T/T0',
  'ppo': 'P/P0',
  'ppstar': 'P/P*', 
  'rhorhostar': '\u03C1/\u03C1*', 
  'ttstar': 'T/T*', 
  'rhorho0': '\u03C1/\u03C10',
  'rhorhoo': '\u03C1/\u03C10',
  'aastar': 'A/A*',
  'pmangle': 'PM angle',
  'machangle': 'Mach angle',
  'mach1': 'Mach number M1',
  'mach2': 'Mach number M2', 
  'p02p01': 'P02/P01', 
  'po2po1': 'P02/P01', 
  'p1p02': 'P1/P02', 
  'p1po2': 'P1/P02', 
  'rho2rho1':'\u03C12/\u03C11', 
  't2t1': 'T2/T1', 
  'p2p1': 'P2/P1', 
  'theta': 'Turn angle θ',
  'beta': 'Wave angle β',
  'm1n': 'M1n',
  'm2n': 'M2n',
  'popostar': 'P0/P0*', 
  'uustar': 'U/U*',
  'flstard': '4fL*/D',
  'sstarsr': '(s* - s)/R',
  'totostar': 'T0/T0*', 
}

const Results = ({ compData, isLoading, setIsLoading  }) => {
    useEffect(()=>{
     setIsLoading(false)
    }, [compData])
  
  return (isLoading) ? (
    <Dimmer inverted active>
      <Loader inverted > Loading </Loader>
    </Dimmer>
  )
  : (
    <Grid columns={3} divided>
      <Grid.Row>
        {Object.keys(compData).map(function(optionName, index) {
          return (
            <Grid.Column>
            <p> <strong>{options[optionName]}:</strong> {compData[optionName]}</p>
          </Grid.Column>)
          })}
      </Grid.Row>
    </Grid>
  )
}

export default Results