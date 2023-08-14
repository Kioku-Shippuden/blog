import React from 'react';
import Logo from './Logo';
import Search from './Search';
import Alert from './Alert';
import CreateContent from './CreateContent';
import ManageProfile  from './ManageProfile';
import './style/Navigator.scss';

function Navigator() {
  return (
    <div className='navigator-component'>
      <div className='logo-search-component'>
        <Logo />
        <Search />
      </div>
      <CreateContent />
      <Alert />
      <ManageProfile />
    </div>
  )
}

export default Navigator