import React, { useState, useRef } from 'react';
import validator from 'validator';
import { useAuth } from '../../hook/useAuthentication';
import './style/SignUpByEmail.scss';

function SignUpByEmail(props) {
  const {displayAllOption} = props;

  const {registerUser} = useAuth();
  const emailRef = useRef(null);
  const userNameRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPassRef = useRef(null);
  const dateOfBirthRef = useRef(null);
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setConfirmShowPassword] = useState(false);

  const [displayError, setDisplayError] = useState({
		email: false,
    userName: false,
		password: false,
    confirmPass: false,
    dateOfBirth: false
	});

  const validationForm = (email, userName, password, confirmPass, dateOfBirth) => {
		const validated = {
      email: !validator.isEmail(email),
      userName: userName.length <= 0,
      password: password.length <= 0,
      confirmPass: confirmPass !== password,
      dateOfBirth: dateOfBirth.length <= 0
    };
  
    return validated;
	}

  const onSubmit = async () => {
    const userName = userNameRef.current.value;
    const userEmail = emailRef.current.value;
    const userPass = passwordRef.current.value;
    const userPass2 = confirmPassRef.current.value;
    const userBirth = dateOfBirthRef.current.value;
    const userInfo = { userEmail,  userName, userPass, userPass2, userBirth };
    const validated = validationForm( userEmail,  userName, userPass, userPass2, userBirth);

    if (Object.values(validated).some(error => error)) {
      setDisplayError(validated)
			return;
    }

    registerUser(userInfo);

    setDisplayError({
      email: false,
      userName: false,
      password: false,
      confirmPass: false,
      dateOfBirth: false
    });
  }

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
          <div className={displayError.email ? 'err-border ' : 'input'}>
            <input ref={emailRef}/>
          </div>
        </div>
        {
					displayError.email &&
					<div className='err'>Please enter a valid email address.</div>	
				}
        <div className='box-element'>
          <div className='title'>Username:</div>
          <div className={displayError.userName ? 'err-border ' : 'input'}>
            <input ref={userNameRef}/>
          </div>
        </div>
        {
					displayError.userName &&
					<div className='err'>Please enter a valid UserName.</div>	
				}
        <div className='box-element'>
          <div className='title'>Date of births:</div>
          <div className={displayError.dateOfBirth ? 'err-border ' : 'input'}>
            <input type="date" ref={dateOfBirthRef}/>
          </div>
        </div>
        {
					displayError.dateOfBirth &&
					<div className='err'>Please Select your date of birth.</div>	
				}
        <div className='box-element'>
          <div className='title'>Password:</div>
          <div className={displayError.password ? 'err-border ' : 'input'}>
            <input ref={passwordRef} type={showPassword ? 'text' : 'password'}/>
          </div>
        </div>
        <div className='check-box'>
          <input type="checkbox" id="show-pass" name="show-pass" onChange={() => {setShowPassword(!showPassword)}}></input>
          <label for="show-pass">Show Password</label><br></br>
        </div>
        {
					displayError.password &&
					<div className='err'>Please enter a valid Password.</div>	
				}
        <div className='box-element'>
          <div className='title'>Confirm:</div>
          <div className={displayError.confirmPass ? 'err-border ' : 'input'}>
            <input ref={confirmPassRef} type={showConfirmPassword ? 'text' : 'password'}/>
          </div>
        </div>
        <div className='check-box'>
          <input type="checkbox" id="show-pass" name="show-pass" onChange={() => {setConfirmShowPassword(!showConfirmPassword)}}></input>
          <label for="show-pass">Show Password</label><br></br>
        </div>
        {
					displayError.confirmPass &&
					<div className='err'>Password does not match.</div>	
				}
      </div>
      <div className='sign-in-btn' onClick={onSubmit}>Sign up</div>
      <div className='footer' onClick={displayAllOption}>&lt; All sign up options</div>
    </div>
  )
}

export default SignUpByEmail