import { FC, useRef, useState, useEffect } from 'react';
import DragonInfo from '../components/DragonInfo';
import { UnfavIcon } from '../components/UI/icons';
import { useAction, useAppSelector } from '../hooks/redux';
import { IDragon } from '../models/IDragon';
import { fetchDragon } from '../utils/data';
import styles from './styles/Favourites.module.css';

const Favourites: FC = () => {
    const { favourites } = useAppSelector(state => state.dragonsReducer);
    const paginationIndex = useRef<number>(0);
    const [dragons, setDragons] = useState<IDragon[]>([]);
    const observeElement = useRef(null);
    const observer = useRef<IntersectionObserver>();
    const { deleteFavouriteDragon } = useAction();

    useEffect(() => {
        connectObserverPagination();
    }, [])

    const fetchDragons = async () => {
        if (favourites.length > paginationIndex.current) {
            const id = favourites[paginationIndex.current];
            if (id) {
                const dragon = await fetchDragon(id);
                if (dragon) {
                    setDragons(prev => [...prev, dragon]);
                    paginationIndex.current += 1;
                    connectObserverPagination();
                }
            }
        }
    }

    const connectObserverPagination = () => {
        if (observer.current) observer.current.disconnect();
        const callback = function (entries: IntersectionObserverEntry[], observer: IntersectionObserver) {
            if (entries[0].isIntersecting) {
                fetchDragons();
            }
        };
        observer.current = new IntersectionObserver(callback);
        if (observeElement.current) {
            observer.current.observe(observeElement.current);
        }
    }

    const removeHandler = (id: string) => {
        deleteFavouriteDragon(id);
        setDragons(prev => prev.filter(dragon => dragon.id !== id));
    }

    return (
        <div className={styles.container}>
            {dragons.map(dragon =>
                <div key={dragon.id} className={styles.item}>
                    <div
                        className={styles.remove}
                        onClick={removeHandler.bind(null, dragon.id)}
                    >
                        {UnfavIcon()} Remove from favorites
                    </div>
                    <DragonInfo dragon={dragon} />
                </div>)}
            <div className={styles.observe} ref={observeElement}></div>
        </div>
    );
};

export default Favourites;