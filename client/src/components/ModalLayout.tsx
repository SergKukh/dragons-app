import { FC, ReactNode } from 'react';
import styles from './styles/ModalLayout.module.css';

interface ModalLayoutProps {
    children: ReactNode,
    closeHandler: () => void
}

const ModalLayout: FC<ModalLayoutProps> = ({ children, closeHandler }) => {

    return (
        <div className={styles.container} onClick={closeHandler}>
            <div onClick={e => e.stopPropagation()}>{children}</div>
        </div>
    );
};

export default ModalLayout;