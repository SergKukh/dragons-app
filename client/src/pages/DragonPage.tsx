import { FC, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import DragonInfo from '../components/DragonInfo';
import { chevronLeftIcon, favIcon, UnfavIcon } from '../components/UI/icons';
import Loader from '../components/UI/Loader';
import { useAction, useAppSelector } from '../hooks/redux';
import { IDragon } from '../models/IDragon';
import { RouteNames } from '../router';
import { fetchDragon, getOneStoragedDragon } from '../utils/data';
import styles from './styles/DragonPage.module.css';

const DragonPage: FC = () => {
    const { id } = useParams();
    const [dragon, setDragon] = useState<IDragon | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const { favourites } = useAppSelector(state => state.dragonsReducer);
    const { addFavouriteDragon, deleteFavouriteDragon } = useAction();

    useEffect(() => {
        if (!id) {
            return;
        }
        const storaged = getOneStoragedDragon(id);
        if (storaged) {
            setDragon(storaged);
        } else {
            setIsLoading(true);
        }
        fetchInformation();
    }, []);

    const fetchInformation = async () => {
        if (!id) return;
        const data = await fetchDragon(id);
        setDragon(data);
        setIsLoading(false);
    }

    if (isLoading) return <div className='center'><Loader /></div>

    return (
        <div className={styles.container}>
            {dragon &&
                <>
                    <div className={styles.nav}>
                        <Link className={styles.backtolist} to={RouteNames.DRAGON_LIST}>
                            {chevronLeftIcon()} Back to list
                        </Link>
                        {favourites.includes(dragon.id)
                            ?
                            <div onClick={() => deleteFavouriteDragon(dragon.id)}>{UnfavIcon()} Remove from favourites</div>
                            :
                            <div onClick={() => addFavouriteDragon(dragon.id)}>{favIcon()} Add to favourites</div>}
                    </div>
                    <DragonInfo dragon={dragon} />
                </>}
        </div >
    );
};

export default DragonPage;