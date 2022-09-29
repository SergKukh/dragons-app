import { FC, useState } from 'react';
import styles from './styles/Carousel.module.css';

interface CarouselProps {
    images: string[]
}

const Carousel: FC<CarouselProps> = ({ images }) => {
    const [slide, setSlide] = useState(0);

    const changeSlide = (value: number) => {
        const lastItemIndex = images.length - 1;
        let nextSlide = slide + value;
        if (nextSlide < 0) nextSlide = lastItemIndex;
        if (nextSlide > lastItemIndex) nextSlide = 0;
        setSlide(nextSlide);
    }

    return (
        <div className={styles.container}>
            {images.map((image, index) =>
                <div
                    className={`${styles.slide} ${slide === index ? styles.active : ''}`}
                    key={image}
                    style={{ backgroundImage: `url(${image})` }}
                >
                </div>)}
            <div className={styles.prev} onClick={() => changeSlide(-1)}>&#10094;</div>
            <div className={styles.next} onClick={() => changeSlide(1)}>&#10095;</div>
        </div>
    );
};

export default Carousel;