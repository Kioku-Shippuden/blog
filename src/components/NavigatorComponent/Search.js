import React from 'react';
import './style/Search.scss';
function Search() {
  return (
    <div className='search-component'>
      <div className='search-icon tag-text'>
        <i className='fal fa-search'></i>
      </div>
      <div className='search-text'>
        <input type='text' placeholder='Search Medium'></input>
      </div>
    </div>
  )
}

export default Search