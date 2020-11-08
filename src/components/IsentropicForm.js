import React, {useState} from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import axios from "axios";
import Results from './Results';
import { Button, Dropdown } from 'semantic-ui-react'

const options = [
  { key: 'mach', value: 'mach', text: 'Mach number' },
  { key: 'temp', value: 'temp', text: 'T/T0 temperature ratio' },
  { key: 'pres', value: 'pres', text: 'P/P0 pressure ratio' },
  { key: 'rho', value: 'rho', text: '\u03C1/\u03C10 density ratio' },
  { key: 'areasub', value: 'areasub', text: 'Sub A/A* area ratio' },
  { key: 'areasuper', value: 'areasuper', text: 'Super A/A* area ratio' },
  { key: 'pmangle', value: 'pmangle', text: 'PM angle' },
  { key: 'machanlge', value: 'machanlge', text: 'Mach angle' },
]

const validationSchema = yup.object().shape({
  gamma: yup.number()
  .typeError('γ must be a number')
  .required('γ is required')
  .min(0)
  .nullable()
  .transform((value, originalValue) => originalValue.trim() === "" ? 1.4: value),
  // inputType: yup.string()
  // .required(),
  inputValue: yup.number()
  .typeError('input must be a number')
  .min(0)
  .required('input is required')
});

export default function IsentropicForm() {
  const [compData, setData] = useState({ 
    'gamma': 1.4, 
    'mach': '', 
    'machangle': '', 
    'pmangle': '', 
    'ppo': '', 
    'rhorho0':'', 
    'tto': '', 
    'ppstar': '', 
    'rhorhostar': '', 
    'ttstar': '', 
    'aastar': '' });

  const [isLoading, setIsLoading] = useState(false);

  const [requestError, setReqErr] = useState("")

  const {handleSubmit, register, errors } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (values) => {
    setIsLoading(true)
    console.log(values)
    axios.defaults.headers.post['Content-Type'] ='application/json';

    axios
      .get(`https://cors-anywhere.herokuapp.com/https://compflow.herokuapp.com/isentropic/${values.gamma}/${values.inputType}/${values.inputValue}`)
      .then(res => {
        setData(res.data)
        setReqErr('')
      })
      .catch(err => {
        console.log(err); // There was an error creating the data and logs to console
        console.log(err.message)
        console.log(err.response)
        setIsLoading(false)
        setReqErr(err.response.data.detail)
      });
    }

  return (
    <>
    <form onSubmit={handleSubmit(onSubmit)}>
    <h4>Specific heat value γ</h4>
      <div data-testid = 'gamma' style = {{'marginBottom': '3%'}}>
        {/* {errors.gamma && <p>{errors.gamma}</p>} */}
        <input type="gamma" name="gamma" placeholder="1.4"
          ref={register}/>
          {errors.gamma && errors.gamma.message}
      </div>

      <div style = {{'display': 'flex', 'marginBottom': '3%', 'flexWrap': 'wrap'}}>
        <div style={{'marginRight': '5%'}}>
          <h4>Select input type</h4>
          <div data-testid = 'inputType'>
            {/* <Dropdown placeholder='Select input type' selection options={options} name='inputType' ref={register} type='inputType'/> */}
            <select name='inputType' ref={register} type='inputType'>
            {options.map(function(option) {
              return (
              <option key={option.key} value={option.value}>
                {option.text}
              </option>)
              })}
          </select>
          </div>
        </div>

        <div>
          <h4>Input value</h4>
          <div data-testid = 'inputValue'>
            {/* {errors.inputValue && <p>{errors.inputValue}</p>} */}
            <input type="inputValue" name="inputValue" placeholder="input value" 
              ref={register}/>
              {errors.inputValue && errors.inputValue.message}
          </div>
        </div>
      </div>

      <Button positive type="submit">Submit</Button>
    </form>

    <p>{requestError}</p>
    <Results compData={compData} isLoading={isLoading} setIsLoading={setIsLoading}/>
    </>
  );
};