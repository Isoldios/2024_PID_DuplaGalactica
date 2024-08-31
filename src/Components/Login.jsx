import React from 'react'
import '../App.css'

export default function Login() {
  return (
    <div className='App'>
      <div className='Left-Bar'>
        <div className='Logo-Container'>
          <svg className='Container-Logo' viewBox="0 0 220 210">
            <defs>
              <path id="circlePath" d="M 110,100 m -90,0 a 90,90 0 1,1 180,0 a 90,90 0 1,1 -180,0" />
            </defs>
            <circle cx="100" cy="100" r="90" fill="#14213D" />
            <image href="/LogoGymGenius.png" x="10" y="10" height="180" width="180" />
            <text>
              <textPath href="#circlePath" className="Circle-Text">
                GymGenius GymGenius GymGenius GymGenius GymGenius GymGenius GymGenius GymGenius
              </textPath>
            </text>
          </svg>
        </div>
      </div>
      <div className='login-container'>
        <h2>Login</h2>
        <form>
          <div className="input-container">
            <label htmlFor="username">Email:</label>
            <input type="text" id="username" name="username" />
          </div>
          <div className="input-container">
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" />
          </div>
          <button type="submit" className='button_login'>Ingresar</button>
        </form>
        <div className='login-options-reset'>Reset Password</div>
        <div className='login-options-create'>Create Account</div>
      </div>
    </div>
  )
}