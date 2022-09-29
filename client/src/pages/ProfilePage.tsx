import { FC, useState, FormEvent } from 'react';
import UserService from '../api/UserService';
import ModalLayout from '../components/ModalLayout';
import Button from '../components/UI/Button';
import { sendMailIcon } from '../components/UI/icons';
import Input from '../components/UI/Input';
import { useAction, useAppSelector } from '../hooks/redux';
import styles from './styles/ProfilePage.module.css';

const ProfilePage: FC = () => {
    const { user } = useAppSelector(state => state.authReducer);
    const [email, setEmail] = useState<string>('');
    const [isEditingEmail, setIsEditingEmail] = useState<boolean>(false);
    const [modalEmail, setModalEmail] = useState<boolean>(false);
    const { setUser } = useAction();

    const sendMail = () => {
        UserService.sendmail();
    }

    const confirmEmailHandler = (e: FormEvent) => {
        e.preventDefault();
        setModalEmail(true);
    }

    const changeEmailHandler = async () => {
        setModalEmail(false);
        setEmail('');
        setIsEditingEmail(false);
        const response = await UserService.editEmail(email);
        setUser(response.data);
    }

    return (
        <div className={styles.container}>
            {!user.isActivated &&
                <div className={styles.activate}>
                    <div>Account not activated</div>
                    <div onClick={sendMail}>{sendMailIcon()} Send mail to activate</div>
                </div>}
            <div className={styles.email}>
                {!isEditingEmail && <>
                    <div>Email: {user.email}</div>
                    <Button onClick={() => setIsEditingEmail(true)}>Change email</Button> </>
                }
                {isEditingEmail &&
                    <form onSubmit={confirmEmailHandler}>
                        <Input
                            type='text'
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            placeholder='email'
                            isRequired={true}
                        />
                        <Button>Confirm email</Button>
                        <Button onClick={() => setIsEditingEmail(false)}>Back</Button>
                    </form>}
            </div>
            {modalEmail && <ModalLayout closeHandler={() => setModalEmail(false)}>
                <div className={styles.modalEmail}>
                    <p>{`Are you sure you want to change email from ${user.email} to ${email}?`}</p>
                    <div>
                        <Button onClick={changeEmailHandler}>Yes</Button>
                        <Button onClick={() => setModalEmail(false)}>No</Button>
                    </div>
                </div>
            </ModalLayout>}
        </div >
    );
};

export default ProfilePage;