import { FC } from 'react';
import styles from './styles/Button.module.css';

interface ButtonProps {
    onClick?: () => void,
    children: string,
    style?: string
}

const Button: FC<ButtonProps> = ({ onClick, children, style }) => {
    return (
        <button
            className={`${styles.btn} ${style ? styles[style] : styles.light}`}
            onClick={onClick}
        >
            {children}
        </button>
    );
};

export default Button;