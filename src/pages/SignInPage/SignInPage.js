import React, {useState, useEffect} from 'react'
import Body from '../../components/BodyComponent/Body';
import Backgound from '../../components/BackgroundComponent/Backgound';
import SignInOption from '../../components/SignInComponent/SignInOptionComponent/SignInOption';
import SignInByEmail from '../../components/SignInComponent/SignInByEmailComponent/SignInByEmail';
import './SignInPage.scss'

function SignInPage() {
  const [isAllOption, setIsAllOption] = useState(true);
  const [isAccountOption, setIsAccountOption] = useState(false);

  const displayAllOption = () => {
    setIsAllOption(true)
    setIsAccountOption(false)
  }

  const displayAccountOption = () => {
    setIsAllOption(false)
    setIsAccountOption(true)
  }

  return (
    <div className='sign-in-page'>
      <div className='background'>
        <Backgound />
      </div>
      <div className='sign-in-component'>
        {
          isAllOption === true &&
          <SignInOption displayAccountOption={displayAccountOption}/>
        }
        {
          isAccountOption === true &&
          <SignInByEmail displayAllOption={displayAllOption}/>
        }
      </div>
    </div>
  )
}

export default SignInPage