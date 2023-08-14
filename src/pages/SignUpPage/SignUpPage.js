import React, {useState} from 'react'
import Backgound from '../../components/BackgroundComponent/Backgound';
import SignUpOption from '../../components/SignUpComponent/SignUpOption';
import SignUpByEmail from '../../components/SignUpComponent/SignUpByEmail';
import './SignUpPage.scss';

function SignUpPage() {
  const [isAllOption, setIsAllOption] = useState(true);
  const [isAccountOption, setIsAccountOption] = useState(false);

  const displayAllOption = () => {
    setIsAllOption(true);
    setIsAccountOption(false);
  }

  const displayAccountOption = () => {
    setIsAllOption(false);
    setIsAccountOption(true);
  }

  return (
    <div className='sign-up-page'>
      <div className='background'>
        <Backgound />
      </div>
      <div className='sign-up-component'>
        {
          isAllOption === true &&
          <SignUpOption displayAccountOption={displayAccountOption}/>
        }
        {
          isAccountOption === true &&
          <SignUpByEmail displayAllOption={displayAllOption}/>
        }
      </div>
    </div>
  )
}

export default SignUpPage