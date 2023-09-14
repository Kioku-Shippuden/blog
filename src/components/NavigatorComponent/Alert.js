import Badge from '@mui/material/Badge';
import React, {useEffect, useState} from 'react'
import { useAlert } from '../../hook/useAlert';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import './style/Alert.scss'

function Alert(props) {
  const {onClickAlertBtn} = props;
  const { alertState, setAlertState } = useAlert();
  const [currentAlert, setCurrentAlert] = useState(0);

  useEffect(
    () => {
      setCurrentAlert(alertState);
    }, [alertState]
  )

  return (
    <div className='alert-component content-text' onClick={() => {
      setAlertState(0);
      onClickAlertBtn();
    }}>
      <Badge color="success" badgeContent={currentAlert} max={10} >
        <NotificationsNoneIcon />
      </Badge>
    </div>
  )
}

export default Alert