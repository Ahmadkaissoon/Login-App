import React, { useState } from 'react'
import './LoginForm.css'
import { useForm } from 'react-hook-form'
import { DevTool } from '@hookform/devtools'
import {user_icon , password_icon , email_icon} from './pics'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from "yup"


const schema = yup .object({
    name : yup.string().required("name is not required"),
    email : yup.string().email("email format in not valid").required("email is not required"),
    password : yup.string().required("password is not correct"),
})

type formval = {
    name : string ,
    email : string ,
    password : string,
}

export const LoginForm = () => {
    const [login,setlogin] = useState("Log in")
    const logform = useForm<formval> ({
        defaultValues :{
            name : "" ,
            email : "" ,
            password : "" ,
        },
        resolver:yupResolver(schema)
    }) 

    const { register,control,handleSubmit,formState } = logform ;
    const {errors} = formState ;
    const onsubmit = (data : formval) => {
        console.log("submited" , data)
    }
  return (
    <div className='container'>
      <form onSubmit={handleSubmit(onsubmit)}>
        <div className='header'>
            <h1>{login}</h1>
            <div className='line'></div>
        </div>
        <div className='inputs'>
            {
                login==="Log in"?
                <div></div>:
                <><div className='input'>
                  <img src={user_icon} alt="name" />
                  <input type="text" id='name' placeholder='UserName' {...register("name")} />
                </div><p>{errors.name?.message}</p></>
            }
            <div className='input'>
                <img src={email_icon} alt="email" />
                <input type="email" id='email' placeholder='E-mail' {...register("email")}/>
            </div>
                <p>{errors.email?.message}</p>
            <div className='input'>
                <img src={password_icon} alt="password" />
                <input type="password" id='password' placeholder='Password' {...register("password")}/>
            </div>
                <p>{errors.password?.message}</p>
        </div>
        {
            login==="Sign up"
            ?<div></div>
            :<div className="forget-pass">Forget Your Password ? <span>Click Here .</span> </div>
        }
        <div className='btns'>
            <button className={login==="Sign up"?"btn_gray":"btn"} onClick={
            ()=>{
                    login==="sign up"
                    ?setlogin("Log in")
                    :setlogin("Log in")}}>
            log in</button>
            <button className={login==="Log in"?"btn_gray":"btn"} onClick={
                ()=>{
                    login==="log in"
                    ?setlogin("Sign up")
                    :setlogin("Sign up")}}>
            sign up</button>
        </div>
      </form>
      <DevTool control={control}/>
    </div>
  )
}

export default LoginForm
