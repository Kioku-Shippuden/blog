import React from 'react'
import './SignInByEmail.scss'

function SignInByEmail(props) {
  const {displayAllOption} = props;
  return (
    <div className='sign-in-email'>
      <div className='header'>Sign in with Account</div>
      <div className='sub-header'>
        <div>Enter your information</div>
        <div>associated with your account</div>
      </div>
      <div className='infor-box'>
        <div className='box-element'>
          <div className='title'>Email/ Username:</div>
          <div className='input'>
            <input type="text" name="name" />
          </div>
        </div>
        <div className='box-element'>
          <div className='title'>Password:</div>
          <div className='input'>
            <input type="text" name="name" />
          </div>
        </div>
      </div>
      <div className='sign-in-btn'>Sign in</div>
      <div className='footer' onClick={displayAllOption}>&lt; All sign in options</div>
    </div>
  )
}

export default SignInByEmail