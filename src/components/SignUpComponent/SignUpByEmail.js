import React from 'react'
import './style/SignUpByEmail.scss';

function SignUpByEmail(props) {
  const {displayAllOption} = props;
  return (
    <div className='sign-up-email'>
      <div className='header'>Sign up with email</div>
      <div className='sub-header'>
        <div>Enter your information to</div>
        <div>create an account</div>
      </div>
      <div className='infor-box'>
        <div className='box-element'>
          <div className='title'>Email:</div>
          <div className='input'>
            <input type="text" name="name" />
          </div>
        </div>
        <div className='box-element'>
          <div className='title'>Username:</div>
          <div className='input'>
            <input type="text" name="name" />
          </div>
        </div>
        <div className='box-element'>
          <div className='title'>Date of births:</div>
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
        <div className='box-element'>
          <div className='title'>Confirm:</div>
          <div className='input'>
            <input type="text" name="name" />
          </div>
        </div>
      </div>
      <div className='sign-in-btn'>Sign up</div>
      <div className='footer' onClick={displayAllOption}>&lt; All sign up options</div>
    </div>
  )
}

export default SignUpByEmail