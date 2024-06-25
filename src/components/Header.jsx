import React, { useEffect, useState } from 'react'
import '../css/Header.css';
import { CiSearch } from "react-icons/ci";
import { CiShoppingBasket } from "react-icons/ci";
import { CiLight } from "react-icons/ci";
import { AiFillMoon } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';

function Header() {
    const [theme, setTheme] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const root = document.querySelector("#root");
        if (theme) {
            root.style.backgroundColor = "#000";
            root.style.color = "#fff";
        } else {
            root.style.backgroundColor = "#fff";
            root.style.color = "#000";
        }
    }, [theme]);

    const changeTheme = () => {
        setTheme(!theme);
    };

    return (
        <div className='header-wrapper'>
            <div className='flex-row cpoint' onClick={() => navigate('/')}>
                <img className='logo' src={theme ? './src/images/logo-light-mode.png' : './src/images/logo-dark-mode.png'} />
                <p className='logo-text'>OKAN A.S</p>
            </div>
            <div className='search-div flex-row'>
                <input type='text' className='search-input' placeholder='Ara' />
                {/* <CiSearch className='search-icon' /> */}
                <div>
                    {theme ? <CiLight className='icon' onClick={changeTheme} /> : <AiFillMoon className='icon' onClick={changeTheme} />}

                    <CiShoppingBasket className='icon' />
                </div>

            </div>
        </div>
    )
}

export default Header