import React from 'react'
import './style/SignInOption.scss'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'
const redirectUrl = process.env.REACT_APP_GOOGLE_AUTHORIZED_REDIRECT_URI
const googleid = process.env.REACT_APP_GOOGLE_CLIENT_ID
const getOauthGoogleUrl = () => {
  const rootUrl = 'https://accounts.google.com/o/oauth2/v2/auth'
  const options = {
    redirect_uri: redirectUrl,
    client_id: googleid,
    access_type: 'offline',
    response_type: 'code',
    prompt: 'consent',
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email',
      'openid'
    ].join(' ')
  }
  const qs = new URLSearchParams(options)
  console.log(`${rootUrl}?${qs.toString()}`)
  return `${rootUrl}?${qs.toString()}`
}

function SignInOption(props) {
  const oauthURL = getOauthGoogleUrl()
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
          <div className='text'>
              <Link to={oauthURL}>Sign in with Google</Link>
          </div>
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