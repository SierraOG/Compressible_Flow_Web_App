import React, {useState} from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import axios from "axios";
import Results from './Results';
import { Button, Dropdown } from 'semantic-ui-react'

const options = [
  { key: 'mach1n', value: 'mach1n', text: 'Normal component of incoming mach number' },
  { key: 'beta', value: 'beta', text: 'Shock wave angle β' },
  { key: 'thetaweak', value: 'thetaweak', text: 'Shock turn angle θ (weak)' },
  { key: 'thetastrong', value: 'thetastrong', text: 'Shock turn angle θ (strong)' },
]

const validationSchema = yup.object().shape({
  gamma: yup.number()
  .typeError('γ must be a number')
  .required('γ is required')
  .min(0)
  .nullable()
  .transform((value, originalValue) => originalValue.trim() === "" ? 1.4: value),
  mach1: yup.number()
  .typeError('mach1 must be a number')
  .required('mach1 is required')
  .min(0)
  .nullable()
  .transform((value, originalValue) => originalValue.trim() === "" ? 2: value),
  // inputType: yup.string()
  // .required(),
  inputValue: yup.number()
  .typeError('input must be a number')
  .min(0)
  .required('input is required')
});

export default function ObliqueForm() {
  const [compData, setData] = useState({ 
    'gamma': 1.4, 
    'mach1': 2, 
    'mach2': '', 
    'm1n': '',
    'm2n': '',
    'theta': '',
    'beta': '',
    'p02p01': '', 
    'rho2rho1':'', 
    't2t1': '', 
    'p2p1': '', 
    });

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
      .get(`https://cors-anywhere.herokuapp.com/https://compflow.herokuapp.com/oblique/${values.gamma}/${values.mach1}/${values.inputType}/${values.inputValue}`)
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

      <h4>Mach1 value</h4>
      <div data-testid = 'mach1' style = {{'marginBottom': '3%'}}>
        {/* {errors.mach1 && <p>{errors.mach1}</p>} */}
        <input type="mach1" name="mach1" placeholder="2"
          ref={register}/>
          {errors.mach1 && errors.mach1.message}
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