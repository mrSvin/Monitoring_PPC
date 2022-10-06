import React, {useEffect} from "react";
import {YMaps, Map, Clusterer, Placemark} from "react-yandex-maps";
import iconPpc from "./images/ppc.png"
import iconEnergy from "./images/energy.png"
import iconMap from "./images/map.png"
import iconTime from "./images/time.png"


const YandexMap = ({placemarks, info, mapRef, idState}) => {

    function msToTimeDays(duration) {
        let date = 1000

        let seconds = parseInt((duration / 1000) % 60),
            minutes = parseInt((duration / (1000 * 60)) % 60),
            hours = parseInt((duration / (1000 * 60 * 60)) % 24);
        let days = parseInt((duration / (1000 * 60 * 60 * 24)) % date);

        seconds = (seconds)? seconds + 'сек': ''

        if(days > 0) {
            return (hours)? days + "д." + hours + "ч.":days + "д."
        } else if(hours==0){
            return minutes + "мин." + seconds
        } else if(minutes==0){
            return hours + "ч." + seconds
        } else if(minutes !== 0 && hours !== 0) {
            return hours + "ч." + minutes + "мин."
        }
        else return seconds
    }


    useEffect(() => {
        //здесь происходит обращение к api с параметром bounds
        //  fetchMarks().then((data) => {
        //      console.log('setPlacemarks',data)
        //       setPlacemarks(data[1].coords)
        //  });
    }, []);


    return (

        <div className='map'>
            <YMaps>
                <Map
                    defaultState={{center:placemarks, zoom: 8}}
                    width="100%"
                    height="600px"
                    instanceRef={mapRef}
                    type='yandex#hybrid'
                    modules={[
                        "multiRouter.MultiRoute",
                        "coordSystem.geo",
                        "geocode",
                        "util.bounds"
                    ]}
                >
                    <Clusterer
                        options={{
                            clusterIconLayout: "default#pieChart",
                            clusterIconPieChartRadius: 25,
                            clusterIconPieChartCoreRadius: 10,
                            clusterIconPieChartStrokeWidth: 1,
                            clusterDisableClickZoom: true,
                            clusterHideIconOnBalloonOpen: false,
                            geoObjectHideIconOnBalloonOpen: false
                        }}
                    >
                        <Placemark
                            className = 'letRotate'
                            key={idState}
                            geometry={placemarks}
                            properties={{
                                balloonContentBody: `<b>${info[2]}</b><br>
                                                         <img src=${iconMap} class="energyIcon"><p class="energyParagraph">${!isNaN(info[1])?(info[1].toFixed(2)):info[1]} - ${!isNaN(info[0])?(info[0].toFixed(2)):info[0]}</p><br>
                                                         <img src=${iconEnergy} class="energyIcon"><p class="energyParagraph">${info[3]}V</p><br>
                                                         <img src=${iconTime} class="energyIcon"><p class="energyParagraph">${msToTimeDays(new Date().getTime()-info[4]*1000)}</p>`
                            }}
                            options={{
                                iconLayout: "default#image",
                                iconImageHref: iconPpc,
                                iconImageSize: [70, 60],
                            }}
                        />

                    </Clusterer>
                </Map>
            </YMaps>

        </div>
    );
};

export default YandexMap;
