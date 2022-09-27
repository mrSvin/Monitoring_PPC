import React, {useRef, useEffect} from "react";
import {YMaps, Map, Clusterer, Placemark} from "react-yandex-maps";

const YandexMap = () => {
    const mapRef = useRef(null);
    const [bounds, setBounds] = React.useState([]);
    const [placemarks, setPlacemarks] = React.useState([]);

    async function fetchMarks() {
        const requestUrl =
            "https://my-json-server.typicode.com/st-iv/api-test/features";
        const marks = await fetch(requestUrl);
        const data = await marks.json();
        return data;
    }

    const getBounds = () => {
        setBounds(mapRef.current.getBounds().toString());
    };

        useEffect(() => {
            //здесь происходит обращение к api с параметром bounds
            fetchMarks().then((data) => setPlacemarks(data));
        }, [bounds]);



    return (

        <div className='map'>
            <YMaps>
                <Map
                    defaultState={{center: [55.744522, 37.616378], zoom: 8}}
                    width="100%"
                    height="600px"
                    instanceRef={mapRef}
                    onLoad={getBounds}
                    onBoundsChange={getBounds}
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
                                geometry={[55.716733, 37.589988]}
                                properties={{
                                    balloonContentBody: "Test info"
                                }}
                                options={{
                                    iconLayout: "default#image",
                                    iconImageHref:
                                        "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Font_Awesome_5_solid_map-marker-alt.svg/449px-Font_Awesome_5_solid_map-marker-alt.svg.png",

                                }}
                            />

                    </Clusterer>
                </Map>
            </YMaps>

        </div>
    );
};

export default YandexMap;
