import React from 'react'
import { useState } from 'react'

function Auth() {
const [isLoggedIn, setIsLoggedIn] = useState(true)
const [email, setEmail] = useState(null)
const [password, setPassword] = useState(null)
const [confirmPassword, setConfirmPassword] = useState(null)
const [error, setError] = useState(null)


  const viewLoggedin = (status) => {
    setError(null)
    setIsLoggedIn(status)
  }

  const handleSubmit = async (e, endpoint) => {
    e.preventDefault()
    if(!isLoggedIn && password !== confirmPassword){
      setError('Passwords do not match')
      return
    }

   const response = await fetch(`${process.env.REACT_APP_SERVERURL}/${endpoint}`,{
      method: 'POST',
      headers: {"Content-Type": "application/json"},
      body : JSON.stringify({email, password})
    })
   const data = await response.json();
   console.log(data);
  }
  
  
  return (
    <div className='auth-container'>
      <div className='auth-container-box'>
        <form action="">
          <h2>{isLoggedIn ? "Please Log in":"Please Sign up!" }</h2>
          <input type="email" placeholder='email' />
          <input type="password" placeholder='password'/>
          {!isLoggedIn && <input type="password" placeholder='confirm password' />}
          <input type="submit" className='create' onClick={(e)=>handleSubmit(e, isLoggedIn ? "login" : "signup")} />
          {error &&<p>{error}</p>}
        </form>
        <div className="auth-options">
        <button onClick={()=>viewLoggedin(false)}>Sign up</button>
        <button onClick={()=>viewLoggedin(true)}>Log in</button>
        </div>
      </div>
    </div>
  )
}

export default Auth