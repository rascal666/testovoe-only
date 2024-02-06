import React from 'react';
import './header.scss'

type title = {
    title: string
}
const Header = ({title}: title) => {
    return (
        <div className='header'>
            {title}
        </div>
    );
};

export default Header;