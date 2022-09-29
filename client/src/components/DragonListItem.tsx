import { FC } from 'react';
import { Link } from 'react-router-dom';
import { IDragon } from '../models/IDragon';
import { RouteNames } from '../router';
import styles from './styles/DragonListItem.module.css';
import Carousel from './UI/Carousel';

interface DragonListItemProps {
    dragon: IDragon
}

const DragonListItem: FC<DragonListItemProps> = ({ dragon }) => {
    return (
        <div className={styles.container}>
            <div className={styles.carousel}>
                <Carousel images={dragon.flickr_images} />
            </div>
            <div className={styles.info}>
                <div className={styles.name}>
                    <Link to={RouteNames.DRAGON.replace(':id', dragon.id)}>{dragon.name}</Link>
                </div>
                <div>{dragon.description}</div>
            </div>
        </div>
    );
};

export default DragonListItem;