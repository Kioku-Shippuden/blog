import React from 'react'
import './style/UserListPagination.scss'

function UserInforPagination(props) {
    const {userPaginationSelected, setUserPaginationSelected} = props;
    const onSelect = (name) => {
        setUserPaginationSelected(name)
    }
    return (
        <div className='user-infor-pagination'>
            <div 
                className={`pagination-element sub-title-text ${userPaginationSelected === 'home' ? 'active' : ''}`}
                onClick={() => onSelect('home')}
            >Home</div>
            <div 
                className={`pagination-element sub-title-text ${userPaginationSelected === 'list' ? 'active' : ''}`}
                onClick={() => onSelect('list')}
            >List</div>
            <div 
                className={`pagination-element sub-title-text ${userPaginationSelected === 'about' ? 'active' : ''}`}
                onClick={() => onSelect('about')}
            >About</div>
        </div>
    )
}

export default UserInforPagination