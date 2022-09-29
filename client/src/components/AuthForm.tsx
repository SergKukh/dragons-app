import { FC, FormEvent, useState } from 'react';
import { useAction, useAppSelector } from '../hooks/redux';
import Input from './UI/Input';
import styles from './styles/AuthForm.module.css';
import Button from './UI/Button';

const AuthForm: FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [repeatedPassword, setRepeatedPassword] = useState<string>('');
    const [isSignUp, setIsSignUp] = useState<boolean>(false);
    const { login, registration, setAuthError } = useAction();
    const { authError } = useAppSelector(state => state.authReducer);

    const submitHandler = (e: FormEvent) => {
        e.preventDefault();
        if (!isSignUp) {
            login(email, password);
        } else {
            if (password === repeatedPassword) {
                registration(email, password);
            } else {
                setAuthError('Passwords do not match');
            }
        }
    }

    return (
        <form className={styles.container} onSubmit={submitHandler}>
            <Input
                type='text'
                placeholder='email'
                onChange={e => setEmail(e.target.value)}
                value={email}
                isRequired={true}
            />
            <Input
                type='password'
                placeholder='password'
                onChange={e => setPassword(e.target.value)}
                value={password}
                isRequired={true}
            />
            {isSignUp &&
                <Input
                    type='password'
                    placeholder='repeat password'
                    onChange={e => setRepeatedPassword(e.target.value)}
                    value={repeatedPassword}
                    isRequired={true}
                />}
            {authError.trim().length > 0 &&
                <div className={styles.error}>
                    {authError}
                </div>}
            <div className={styles.controls}>
                <span
                    className={styles.signup}
                    onClick={() => setIsSignUp(prev => !prev)}
                >
                    {isSignUp ? 'Login' : 'Sign up'}
                </span>
                <Button>{!isSignUp ? 'Login' : 'Sign up'}</Button>
            </div>
        </form>
    );
};

export default AuthForm;