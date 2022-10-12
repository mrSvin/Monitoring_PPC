import React, {useEffect, useRef, useState} from "react";
import {fetchRequestAllData, fetchRequestCountData} from "../js/fetchRequest";
import YandexMap from "../js/yandex-map";
import History from "./history";
import TablePpc from "./tablePpc";
import ReportPpc from "./reportPpc";
import Header from "./header"
import {getLocalData} from "../js/solutions"

import "../css/styles.css";


function Main() {
    const [filterList, setFilterList] = useState([])
    const [filter, setFilter] = useState('')
    const mapRef = useRef(null);

    let allDataArray = []

    const [placemarks, setPlacemarks] = useState([51.651713, 46.036361]);
    const [info, setInfo] = useState({
        undef: true,
        nm: 0,
        lmsg: {
            p: {pwr_ext: 0}
        },
        pos: {
            x: 0,
            y: 0,
            pos: {t: 0}
        },
    })

    const [idState, setIdState] = useState(0)

    let [buttonpage, setButtonPage] = useState("now")
    let menuSelect;

    useEffect(() => {

        let promise = fetchRequestAllData(allDataArray)
        promise.then(e => {
            allDataArray = e
            setFilterList(allDataArray)
        })


    }, [])

    if (buttonpage == 'now') {
        menuSelect = ['menuSelect', 'menuNoSelect'];
    } else {
        menuSelect = ['menuNoSelect', 'menuSelect'];
    }

    return (
        <div className='main-app'>

            <Header/>

            <div className='pagePpc'>
                <div className='flex'>

                    <div className="menuButtons">
                        <div className={menuSelect[0]} onClick={() => setButtonPage("now")}>ТЕКУЩЕЕ СОСТОЯНИЕ</div>
                        <div className={menuSelect[1]} onClick={() => setButtonPage("history")}>ИСТОРИЯ</div>
                    </div>

                    {(buttonpage == 'now') ?
                        <div>
                            <YandexMap placemarks={placemarks} info={info} mapRef={mapRef} idState={idState}/>
                            <ReportPpc info={info}/>
                        </div>
                        :
                        <div>
                            <History info={info}/>
                            <YandexMap placemarks={placemarks} info={info} mapRef={mapRef} idState={idState}/>

                        </div>
                    }
                </div>

                <TablePpc filterList={filterList} setFilterList={setFilterList}
                          filter={filter} setFilter={setFilter}
                          setPlacemarks={setPlacemarks}
                          mapRef={mapRef} idState={idState}
                          setIdState={setIdState} getLocalData={getLocalData}
                          setInfo={setInfo}/>
            </div>
        </div>
    );
}

export default Main;