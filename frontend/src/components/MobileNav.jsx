import { useContext, useState } from 'react'
import Drawer from 'react-modern-drawer'
import { Link } from 'react-router-dom'
import { CreateContextApi } from '../context/MyContextApi'
import { useSelector } from 'react-redux'


const MobileNav = ({ data }) => {
    const context = useContext(CreateContextApi);
    const { mobileNavOpen, setMobileNavOpen } = context;
    const toggleDrawer = () => {
        if (mobileNavOpen) {
            setMobileNavOpen(false)
        }
        else {
            setMobileNavOpen(true)
        }
    }

    return (
        <div className="mobile-nav-wrapper">
            <button onClick={toggleDrawer} className='burger-menu-btn'>
                <img src='/burger-menu.svg' alt='menu' />
            </button>
            <Drawer
                open={mobileNavOpen}
                onClose={toggleDrawer}
                direction='left'
                className='mobile-menu-wrapper'>
                <ul>
                    <li className='mob-logo list-style-none'>
                        <Link to={"/"}><img src="/logos/logo_transparent.png" className="brand-logo" alt="logo" /></Link>
                    </li>
                    {data?.map((item) => {
                        return (
                            <li key={item.id} className="list-style-none"><Link to={item.url}>{item.title}</Link></li>
                        )
                    })}
                </ul>

            </Drawer>
        </div>
    )
}

export default MobileNav;