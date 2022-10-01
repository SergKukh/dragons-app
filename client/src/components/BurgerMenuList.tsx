import { FC, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../hooks/redux';
import { RouteNames } from '../router';
import styles from './styles/BurgerMenuList.module.css';

export interface ListItem {
    title: string,
    handler: () => void
}

interface BurgerMenuListProps {
    isActive: boolean,
    items: ListItem[],
    closeHandler: () => void
}

const BurgerMenuList: FC<BurgerMenuListProps> = ({ isActive, items, closeHandler }) => {
    const hide = useRef<boolean>(false);
    const { user } = useAppSelector(state => state.authReducer);
    const navigate = useNavigate();

    if (isActive && !hide.current) {
        hide.current = true;
    }

    const profileHandler = () => {
        navigate(RouteNames.PROFILE);
        closeHandler();
    }

    return (
        <div className={`${styles.container} ${isActive ? styles.active : ''} ${hide.current ? styles.hide : ''}`}>
            {items.map(item =>
                <div className={styles.item}
                    onClick={item.handler}
                    key={item.title}
                    data-testid='burger_menu_item'
                >
                    {item.title}
                </div>)}
            <div className={styles.user}>
                <div onClick={profileHandler}>{user.email}</div>
                {!user.isActivated && <div className={styles.red}>{'not activated'}</div>}
            </div>
        </div>
    );
};

export default BurgerMenuList;