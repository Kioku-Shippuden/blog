import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../../hook/useAuthentication';
import './style/SignInByEmail.scss'

function SignInByEmail(props) {
	const {isAuthen, loginUser} = useAuth()
  	const {displayAllOption} = props;
	const navigate = useNavigate();

  	const userNameRef = useRef(null);
  	const passwordRef = useRef(null);
	const [showPassword, setShowPassword] = useState(false);
	const [displayError, setDisplayError] = useState({
		username: false,
		password: false
	})

	useEffect(() => {
		if (isAuthen) {
		  navigate('/')
		}
	}, [isAuthen])

	const validationForm = (userName, password) => {
		const validated = {
			userName: userName.length <= 0,
			password: password.length <= 0,
    	};
  
    	return validated;
	}

  	const onSubmit = async () => {
		const userName = userNameRef.current.value;
		const userPass = passwordRef.current.value;
		const validated = validationForm(userName, userPass);

		if(validated.email || validated.password) {
			setDisplayError(validated)
			return;
		}

		const userInfo = {userName, userPass};
		loginUser(userInfo);

		setDisplayError({
			email: false,
			password: false
		})
	}

  return (
    <div className='sign-in-email'>
      <div className='header'>Sign in with Account</div>
      <div className='sub-header'>
        <div>Enter your information</div>
        <div>associated with your account</div>
      </div>
      <div className='infor-box'>
        <div className='box-element'>
          <div className='title'>Username:</div>
          <div className='input'>
            <input type="text" name="name" ref={userNameRef} className={displayError.username ? 'err-border' : ''}/>
          </div>
        </div>
        {
          displayError.email &&
          <div className='err'>Please enter a valid email address.</div>	
        }
        <div className='box-element'>
          <div className='title'>Password:</div>
          <div className='input'>
            <input ref={passwordRef} type={showPassword ? 'text' : 'password'} className={displayError.password ? 'err-border' : ''}/>
          </div>
        </div>
        <div className='check-box'>
          <input type="checkbox" id="show-pass" name="show-pass" onChange={() => {setShowPassword(!showPassword)}}></input>
          <label for="show-pass">Show Password</label><br></br>
        </div>
      </div>
      <div className='sign-in-btn' onClick={onSubmit}>Sign in</div>
      <div className='footer' onClick={displayAllOption}>&lt; All sign in options</div>
    </div>
  )
}

export default SignInByEmail