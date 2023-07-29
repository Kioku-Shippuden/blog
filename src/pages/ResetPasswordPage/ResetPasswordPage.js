import React, { Fragment, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './ResetPasswordPage.scss';
import Backgound from '../../components/BackgroundComponent/Backgound';

function ResetPasswordPage() {
  const [isTypeEmail, setIsTypeEmail] = useState(true);
  const [isNotExitEmail, setIsNotExitEmail] = useState(true);
  const [isNotMatchPass, setIsNotMatchPass] = useState(true);
  const [isTypeNewPassword, setIsTypeNewPassword] = useState(false);
  const navigate = useNavigate();
  const navigateSignIn = () => {
    navigate('/sign_in');
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
                <input type="text" name="name" />
              </div>
            </div>
            <div className='send-btn'>Send</div>
            {
              isNotExitEmail === true &&
              <div className='message'>We can not find your Email in our system. Please check again!</div>
            }
            <div className='footer' onClick={navigateSignIn}>&lt; Back to sign in page</div>
          </Fragment>
        }
        {
          isTypeNewPassword === true &&
          <Fragment>
            <div className='header'>Reset you passworld</div>
            <div className='infor-box'>
              <div className='box-element'>
                <div className='title'>New Password:</div>
                <div className='input'>
                  <input type="text" name="name" />
                </div>
              </div>
              <div className='box-element'>
                <div className='title'> Confirm Password:</div>
                <div className='input'>
                  <input type="text" name="name" />
                </div>
              </div>
            </div>
            {
              isNotMatchPass === true &&
              <div className='message'>Passwords are not the same. Please re-enter!</div>
            }
            <div className='send-btn'>Update</div>
            <div className='footer' onClick={navigateSignIn}>&lt; Back to sign in page</div>
          </Fragment>
        }
      </div>
    </div>
  )
}

export default ResetPasswordPage