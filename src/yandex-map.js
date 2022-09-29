import React, {useEffect} from "react";
import {YMaps, Map, Clusterer, Placemark} from "react-yandex-maps";
import icon from "./images/ppc.png"

const YandexMap = ({placemarks, info}) => {

    // async function fetchMarks() {
    //     const requestUrl =
    //         "https://my-json-server.typicode.com/st-iv/api-test/features";
    //     const marks = await fetch(requestUrl);
    //     const data = await marks.json();
    //     return data;
    // }

    // const getBounds = () => {
    //     setBounds(mapRef.current.getBounds().toString());
    // };

    useEffect(() => {
        //здесь происходит обращение к api с параметром bounds
        // fetchMarks().then((data) => setPlacemarks(data));
    }, []);



    return (

        <div className='map'>
            <YMaps>
                <Map
                    defaultState={{center: [55.744522, 37.616378], zoom: 8}}
                    width="100%"
                    height="600px"
                    // instanceRef={mapRef}
                    // onLoad={getBounds}
                    // onBoundsChange={getBounds}
                    modules={[
                        "multiRouter.MultiRoute",
                        "coordSystem.geo",
                        "geocode",
                        "util.bounds"
                    ]}
                >
                    <Clusterer
                        options={{
                            preset: "islands#invertedVioletClusterIcons",
                            groupByCoordinates: false
                        }}
                    >
                        <Placemark
                            key={0}
                            geometry={placemarks}
                            properties={{
                                balloonContentBody: info
                            }}
                            options={{
                                iconLayout: "default#image",
                                iconImageHref: icon,

                            }}
                        />

                    </Clusterer>
                </Map>
            </YMaps>

        </div>
    );
};

export default YandexMap;
