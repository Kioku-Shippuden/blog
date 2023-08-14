import React from 'react'
import './style/SignInOption.scss'
import { useNavigate } from 'react-router-dom';

function SignInOption(props) {
  const {displayAccountOption} = props;
  const navigate = useNavigate();
  const navigateSignUp = () => {
    navigate('/sign_up');
  }
  const navigateForgotPass = () => {
    navigate('/reset_password');
  }
  return (
    <div className='sign-in-options'>
      <div className='header'>Welcome back</div>
      <div className='body'>
        <div className='option'>
          <div className='image'>
            <img src="/google-logo.png" alt="google option" />
          </div>
          <div className='text'>Sign in with Google</div>
        </div>
        <div className='option'>
          <div className='image'>
            <img src="/facebook-logo.png" alt="facebook option" />
          </div>
          <div className='text'>Sign in with Facebook</div>
        </div>
        <div className='option' onClick={displayAccountOption}>
          <div className='image'>
            <img src="/account-logo.png" alt="account option" />
          </div>
          <div className='text'>Sign in with Account</div>
        </div>
      </div>
      <div className='footer'>
        <div className='element'>
          <div>No account? &nbsp;</div>
          <div className='highlight' onClick={navigateSignUp}>Create one</div>
        </div>
        <div className='element'>
          <div>Forgot password or trouble signning in? &nbsp;</div>
          <div className='highlight' onClick={navigateForgotPass}>Change password</div>
        </div>
      </div>
    </div>
  )
}

export default SignInOption