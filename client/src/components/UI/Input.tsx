import React, { FC, useState } from 'react';
import { hideIcon, showIcon } from './icons';
import styles from './styles/Input.module.css';

interface InputProps {
    type: string,
    value: any,
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    placeholder?: string,
    isRequired?: boolean
}

const Input: FC<InputProps> = ({ type, value, onChange, placeholder, isRequired }) => {
    const [show, setShow] = useState<boolean>(false);

    return (
        <div className={styles.container}>
            <input
                className={`${styles.element} ${type === 'password' ? styles.password : ''}`}
                type={type === 'password' ? show ? 'text' : type : type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={isRequired}
            />
            {type === 'password' &&
                <div onClick={() => setShow(prev => !prev)}>
                    {show ? hideIcon() : showIcon()}
                </div>}
        </div>
    );
};

export default Input;