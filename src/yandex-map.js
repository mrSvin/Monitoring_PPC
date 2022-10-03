import React, {useEffect} from "react";
import {YMaps, Map, Clusterer, Placemark} from "react-yandex-maps";
import icon from "./images/ppc.png"

const YandexMap = ({placemarks, info, mapRef, idState}) => {

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
                                balloonContentBody: `<b>Имя</b>: ${info[2]}<br>
                                                         <b>Координаты</b>: ${info[1]} - ${info[0]}<br>
                                                         <b>Напряжение</b>: ${info[3]}`
                            }}
                            options={{
                                iconLayout: "default#image",
                                iconImageHref: icon,
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
