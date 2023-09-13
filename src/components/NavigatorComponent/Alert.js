import React from 'react'
import Badge from '@mui/material/Badge';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import './style/Alert.scss'

function Alert(props) {
  const {currentAlert, onClickAlertBtn} = props;

  return (
    <div className='alert-component content-text' onClick={onClickAlertBtn}>
      <Badge color="success" badgeContent={currentAlert} max={10} >
        <NotificationsNoneIcon />
      </Badge>
    </div>
  )
}

export default Alert