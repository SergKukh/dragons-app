import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAction, useAppSelector } from '../hooks/redux';
import useMediaQuery from '../hooks/useMediaQuery';
import { RouteNames } from '../router';
import BurgerMenuList, { ListItem } from './BurgerMenuList';
import styles from './styles/Navbar.module.css';
import Button from './UI/Button';

const Navbar = () => {
    const { isAuth, isLoading, user } = useAppSelector(state => state.authReducer);
    const { logout } = useAction();
    const [isBurgerActive, setIsBurgerActive] = useState<boolean>(false);
    const matches700px = useMediaQuery('(max-width: 700px)');
    const navigate = useNavigate();

    const closeBurgerMenu = () => {
        if (isBurgerActive) {
            setIsBurgerActive(false);
        }
    }

    const favouritesHandler = () => {
        closeBurgerMenu();
        navigate(RouteNames.FAVOURITES);
    }

    const dragonsHandler = () => {
        closeBurgerMenu();
        navigate(RouteNames.DRAGON_LIST);
    }

    const logoutHandler = () => {
        closeBurgerMenu();
        logout();
    }

    const menuList: ListItem[] = [
        { title: 'Dragons', handler: dragonsHandler },
        { title: 'Favourites', handler: favouritesHandler },
        { title: 'Log out', handler: logoutHandler }
    ];

    return (
        <div className={styles.container}>
            {!isLoading &&
                <>{isAuth
                    ?
                    <>{!matches700px ?
                        <><div className={styles.barside}>
                            <Button style='dark' onClick={dragonsHandler}>Dragons</Button>
                            <Button style='dark' onClick={favouritesHandler}>Favourite</Button>
                        </div>
                            <div className={styles.barside}>
                                <div
                                    className={styles.user}
                                    onClick={() => navigate(RouteNames.PROFILE)}
                                >
                                    {user.email}
                                </div>
                                {!user.isActivated && <div className={styles.activation}>
                                    {'(not activated)'}
                                </div>}
                                <Button
                                    style='dark'
                                    onClick={logoutHandler}>
                                    Log out
                                </Button>
                            </div></>
                        :
                        <div>
                            <div
                                className={`${styles.burgerBtn} ${isBurgerActive ? styles.burgerActive : ''}`}
                                onClick={() => setIsBurgerActive(prev => !prev)}
                            >
                                <span />
                            </div>
                            <BurgerMenuList isActive={isBurgerActive} items={menuList} closeHandler={closeBurgerMenu} />
                        </div>}</>
                    :
                    <div className={styles.text}>Welcome to SpaceX Dragons</div>
                }</>
            }
        </div>
    );
};

export default Navbar;