import React, { useEffect, useState } from 'react'
import { usePosition } from 'use-position';


export const useLocation = (initialState) => {

    const [country, setCountry] = useState('')
    const [ciudad, setCiudad] = useState('')
    const [watch, setWatch] = useState(false)
    const [ubicacion, setUbicacion] = useState(false)



    const {
        latitude,
        longitude,
        speed,
        timestamp,
        accuracy,
        error,
    } = usePosition(true, { enableHighAccuracy: true });




    useEffect(() => {
        if (watch) {
            if (latitude !== undefined && longitude != undefined) {
                fetchUbicacion()
            }
        }else{
            setUbicacion(false)
        }

    }, [watch])

    const fetchUbicacion = () => {
        fetch(`https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&apiKey=58c34d161d7c4a8e88167cd3fa4238ab
        `)
            .then(response => response.json())
            .then(result => {
                if (result.features.length) {
                    console.log(result.features[0].properties);
                    setCountry(result.features[0].properties.country)
                    setCiudad(result.features[0].properties.city)
                    setUbicacion(true)

                    console.log(latitude, longitude)
                } else {
                    console.log("No address found");
                }
            });

    }




    return [country, ciudad, watch, setWatch,ubicacion];

}