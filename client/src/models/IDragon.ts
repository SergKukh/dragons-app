export interface IDragon {
    heat_shield: {
        material: string,
        size_meters: number,
        temp_degrees: number,
        dev_partner: string
    },
    launch_payload_mass: Mass,
    launch_payload_vol: Volume,
    return_payload_mass: Mass
    return_payload_vol: Volume,
    pressurized_capsule: {
        payload_volume: Volume
    },
    trunk: {
        trunk_volume: Volume,
        cargo: {
            solar_array: number,
            unpressurized_cargo: boolean
        }
    },
    height_w_trunk: Size,
    diameter: Size,
    first_flight: string,
    flickr_images: string[],
    name: string,
    type: string,
    active: boolean,
    crew_capacity: number,
    sidewall_angle_deg: number,
    orbit_duration_yr: number,
    dry_mass_kg: number,
    dry_mass_lb: number,
    thrusters: Thruster[],
    wikipedia: string,
    description: string,
    id: string
}

interface Mass {
    kg: number,
    lb: number
}

interface Volume {
    cubic_meters: number,
    cubic_feet: number
}

interface Size {
    meters: number,
    feet: number
}

interface Thruster {
    type: string,
    amount: number,
    pods: number,
    fuel_1: string,
    fuel_2: string,
    isp: number,
    thrust: {
        kN: number,
        lbf: number
    }
}