import React, { useState, useRef } from 'react';
import { callPostApiWithoutToken } from '../../helpers/request';
import { useNavigate } from 'react-router';
import './style/SignInByEmail.scss'

function SignInByEmail(props) {
  	const {displayAllOption} = props;
	const navigate = useNavigate();

  	const userNameRef = useRef(null);
  	const passwordRef = useRef(null);
	const [showPassword, setShowPassword] = useState(false);
	const [isWrongPassword, setWrongPassword] = useState(null);
	const [displayError, setDisplayError] = useState({
		username: false,
		password: false
	})

	const validationForm = (userName, password) => {
		const validated = {
			userName: userName.length <= 0,
			password: password.length <= 0,
    	};
  
    	return validated;
	}

  	const onSubmit = async () => {
		const validated = validationForm(userNameRef.current.value, passwordRef.current.value)
		if(validated.email || validated.password) {
			setDisplayError(validated)
			return;
		}

		try {
			const apiUrl = 'http://localhost:3000/v1/api/auth/login';
			await callPostApiWithoutToken(apiUrl, {
				"username": userNameRef.current.value,
				"password": passwordRef.current.value,
			});
      		navigate('/home');
		} catch (err) {
			throw(err)
		} finally {
			setDisplayError({
				email: false,
				password: false
			})
		}
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