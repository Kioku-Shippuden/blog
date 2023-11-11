import React, { Fragment, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import { callPostApiWithoutToken } from '../../helpers/request';
import './ResetPasswordPage.scss';
import validator from 'validator';
import Backgound from '../../components/BackgroundComponent/Backgound';

const apiDomain = process.env.REACT_APP_API_DOMAIN

function ResetPasswordPage() {
  const idRef = useRef(null);
  const passRef = useRef(null);
  const emailRef = useRef(null);
  const repassRef = useRef(null);

  const [isTypeEmail, setIsTypeEmail] = useState(true);
  const [isTypeNewPass, setIsTypeNewPass] = useState(false);
  const [isTypeMailCode, setIsTypeMailCode] = useState(false);

  const [emailError, setEmailError] = useState(false);
  const [codeCheckError, setCodeCheckError] = useState(false);
  const [passCheckError, setpassCheckError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setConfirmShowPassword] = useState(false);

  const navigate = useNavigate();
  const navigateSignIn = () => {
    navigate('/sign_in');
  }

  const changeModePage = (type) => {
    if (type === 'emailInput') {
      setIsTypeEmail(true);
      setIsTypeNewPass(false);
      setIsTypeMailCode(false);
    } else if (type === 'codeInput') {
      setIsTypeEmail(false);
      setIsTypeNewPass(false);
      setIsTypeMailCode(true);
    } if (type === 'passwordInput') {
      setIsTypeEmail(false);
      setIsTypeNewPass(true);
      setIsTypeMailCode(false);
    }
  }

  const onGetCode = async () => {
    const validateEmail = !validator.isEmail(emailRef.current.value);
    if (validateEmail === true) {
      setEmailError(validateEmail);
      return;
    }

		try {
			const apiUrl = `${apiDomain}/v1/api/auth/forgot-password`;
			const reponse = await callPostApiWithoutToken(apiUrl, {
				"email": emailRef.current.value
			});
      if (reponse.status === 200) {
        setEmailError(false);
        changeModePage('codeInput');
      }
		} catch (err) {
			console.log(err)
		}
	}

  const onCheckCode = async () => {
    setCodeCheckError(true);
		try {
			const apiUrl = `${apiDomain}/v1/api/auth/forgot-password/${idRef.current.value}`;
			const reponse = await callPostApiWithoutToken(apiUrl);

      if (reponse.status === 200) {
        setCodeCheckError(false);
        changeModePage('passwordInput');
      }
		} catch (err) {
			setCodeCheckError(true);
		}
	}

  const onChangePass = async () => {
    if (passRef.current.value !== repassRef.current.value || passRef.current.value === '') {
      setpassCheckError(true);
    }
		try {
			const apiUrl = `${apiDomain}/v1/api/auth/reset-password`;
			const reponse = await callPostApiWithoutToken(apiUrl, {
        "newPassword": passRef.current.value,
        "confirmPassword": repassRef.current.value
      })
      if (reponse.status === 200) {
        setpassCheckError(false);
        navigateSignIn();
      }
		} catch (err) {
			console.log(err)
		}
	}

  return (
    <div className='reset-pass-page'>
      <div className='background'>
        <Backgound />
      </div>
      <div className='reset-pass-component'>
        {
          isTypeEmail === true &&
          <Fragment>
            <div className='header'>Enter your email</div>
            <div className='email-input-container'>
              <div className='input'>
                <input type="text" name="name" ref={emailRef}/>
              </div>
            </div>
            {
              emailError === true &&
              <div className='err'>Please enter a valid email address.</div>
            }
            <div className='send-btn' onClick={onGetCode}>Send</div>
            <div className='footer' onClick={navigateSignIn}>&lt; Back to sign in page</div>
          </Fragment>
        }
        {
          isTypeMailCode === true &&
          <Fragment>
            <div className='header'>Please enter the code you received</div>
            <div className='email-input-container'>
              <div className='input'>
                <input type="text" name="name" ref={idRef}/>
              </div>
            </div>
            {
              codeCheckError === true &&
              <div className='err'>Your Code not right!</div>
            }
            <div className='send-btn' onClick={onCheckCode}>Submit</div>
            <div className='footer' onClick={navigateSignIn}>&lt; Back to sign in page</div>
          </Fragment>
        }
        {
          isTypeNewPass === true &&
          <Fragment>
            <div className='header'>Reset you passworld</div>
            <div className='infor-box'>
              <div className='box-element'>
                <div className='title'>New Password:</div>
                <div className='input'>
                  <input name="name" ref={passRef} type={showPassword ? 'text' : 'password'}/>
                </div>
              </div>
              <div className='check-box'>
                <input type="checkbox" id="show-pass" name="show-pass" onChange={() => {setShowPassword(!showPassword)}}></input>
                <label for="show-pass">Show Password</label><br></br>
              </div>
              <div className='box-element'>
                <div className='title'> Confirm Password:</div>
                <div className='input'>
                  <input name="name" ref={repassRef} type={showConfirmPassword ? 'text' : 'password'}/>
                </div>
              </div>
              <div className='check-box'>
                <input type="checkbox" id="show-pass" name="show-pass" onChange={() => {setConfirmShowPassword(!showConfirmPassword)}}></input>
                <label for="show-pass">Show Password</label><br></br>
              </div>
            </div>
            {
              passCheckError === true &&
              <div className='message'>Passwords are not the same. Please re-enter!</div>
            }
            <div className='send-btn' onClick={onChangePass}>Update</div>
            <div className='footer' onClick={navigateSignIn}>&lt; Back to sign in page</div>
          </Fragment>
        }
      </div>
    </div>
  )
}

export default ResetPasswordPage