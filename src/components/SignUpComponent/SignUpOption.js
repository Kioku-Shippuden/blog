import React from 'react'
import './style/SignUpOption.scss';
import { useNavigate } from 'react-router-dom';

function SignUpOption(props) {
  const {displayAccountOption} = props;
  const navigate = useNavigate();
  const navigateSignIn = () => {
    navigate('/sign_in')
  }

  return (
    <div className='sign-up-options'>
      <div className='header'>Join with us</div>
      <div className='body'>
        <div className='option'>
          <div className='image'>
            <img src="/google-logo.png" alt="google option" />
          </div>
          <div className='text'>Sign up with Google</div>
        </div>
        <div className='option'>
          <div className='image'>
            <img src="/facebook-logo.png" alt="facebook option" />
          </div>
          <div className='text'>Sign up with Facebook</div>
        </div>
        <div className='option' onClick={displayAccountOption}>
          <div className='image'>
            <img src="/account-logo.png" alt="account option" />
          </div>
          <div className='text'>Sign up with Account</div>
        </div>
      </div>
      <div className='footer'>
        <div className='element'>
          <div>Already have an account? &nbsp;</div>
          <div className='highlight' onClick={navigateSignIn}>Sign in</div>
        </div>
      </div>
    </div>
  )
}

export default SignUpOption