import { FC } from 'react';
import { IDragon } from '../models/IDragon';
import { formatDate } from '../utils/dates';
import styles from './styles/DragonInfo.module.css';
import Carousel from './UI/Carousel';

interface DragonInfoProps {
    dragon: IDragon
}

const DragonInfo: FC<DragonInfoProps> = ({ dragon }) => {

    const getSpecWithMassAndVol = (title: string,
        kg: number, lb: number, cm: number, cft: number) => {
        return <>
            {title}
            <ul className={styles.list}>
                <li>{`Mass: ${kg} kg / ${lb} lb`}</li>
                <li>{`Volume: ${cm} m³ / ${cft} ft³`}</li>
            </ul>
        </>
    }

    return (
        <div className={styles.dragon}>
            <div className={styles.leftside}>
                <div className={styles.carousel}>
                    <Carousel images={dragon.flickr_images} />
                </div>
                <div className={styles.title}>
                    <h2>{dragon.name}</h2>
                    <a href={dragon.wikipedia} target="_blank">Wikipedia</a>
                </div>
                <div> {dragon.description}</div>
                <div>
                    <span>{`First flight: ${formatDate(dragon.first_flight)}`}</span>
                </div>
            </div>
            <div className={styles.rightside}>
                <h3>Specifications</h3>
                <p>{`Type: ${dragon.type}`}</p>
                <p>{`Crew capacity: ${dragon.crew_capacity}`}</p>
                <p>{`Sidewall angle: ${dragon.sidewall_angle_deg} deg`}</p>
                <p>{`Orbit duration: ${dragon.orbit_duration_yr} yr`}</p>
                <p>{`Dry mass: ${dragon.dry_mass_kg} kg / ${dragon.dry_mass_lb} lb`}</p>
                <p>{`Height with trunk: ${dragon.height_w_trunk.meters} m / ${dragon.height_w_trunk.feet} ft`}</p>
                <p>{`Diameter: ${dragon.diameter.meters} m / ${dragon.diameter.feet} ft`}</p>
                {getSpecWithMassAndVol('Launch payload:', dragon.launch_payload_mass.kg, dragon.launch_payload_mass.lb,
                    dragon.launch_payload_vol.cubic_meters, dragon.launch_payload_vol.cubic_feet)}
                {getSpecWithMassAndVol('Return payload:', dragon.return_payload_mass.kg, dragon.return_payload_mass.lb,
                    dragon.return_payload_vol.cubic_meters, dragon.return_payload_vol.cubic_feet)}
                <p>{`Pressurized capsule payload volume: ${dragon.pressurized_capsule.payload_volume.cubic_meters} m³ / ${dragon.pressurized_capsule.payload_volume.cubic_feet} ft³ ft³`}</p>
                Trunk:
                <ul className={styles.list}>
                    <li>{`Volume: ${dragon.trunk.trunk_volume.cubic_meters} m³ / ${dragon.trunk.trunk_volume.cubic_feet} ft³`}</li>
                    <li>{`Cargo: solar array - ${dragon.trunk.cargo.solar_array}`
                        + `, unpressurized ${dragon.trunk.cargo.unpressurized_cargo ? '✅' : '❌'}`}</li>

                </ul>
                Thrusters:
                <ol className={styles.list}>
                    {dragon.thrusters.map((item, index) =>
                        <li key={index}>
                            {`Type: ${item.type}`} <br />
                            {`Amount: ${item.amount}`} <br />
                            {`Pods: ${item.pods}`} <br />
                            {`Fuel 1: ${item.fuel_1}`} <br />
                            {`Fuel 2: ${item.fuel_2}`} <br />
                            {`Isp: ${item.isp}`} <br />
                            {`Thrust: ${item.thrust.kN} kN / ${item.thrust.lbf} lbf`}
                        </li>)}
                </ol>
            </div>
        </div>
    );
};

export default DragonInfo;