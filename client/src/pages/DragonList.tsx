import { FC, useState, useEffect } from 'react';
import DragonsService from '../api/DragonsService';
import DragonListItem from '../components/DragonListItem';
import Loader from '../components/UI/Loader';
import { IDragon } from '../models/IDragon';
import styles from './styles/DragonList.module.css';
import PullToRefresh from 'react-simple-pull-to-refresh';

const DragonList: FC = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [dragons, setDragons] = useState([] as IDragon[]);

    useEffect(() => {
        fetchDragons();
    }, []);

    const fetchDragons = async () => {
        const response = await DragonsService.getAll();
        setDragons(response);
        setIsLoading(false);
    }

    if (isLoading) return <div className='center'><Loader /></div>

    return (
        <div className={styles.container}>
            <PullToRefresh onRefresh={fetchDragons}>
                <div className={styles.list}>
                    {dragons.map(dragon =>
                        <DragonListItem
                            dragon={dragon}
                            key={dragon.id}
                        />
                    )}
                </div>
            </PullToRefresh>
        </div>
    );
};

export default DragonList;