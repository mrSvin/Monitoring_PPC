import React, {useEffect, useRef, useState} from "react";
import { createRoot } from 'react-dom/client'
import {fetchRequestCountData,fetchRequestAllData, userInfo} from './fetchRequest.js'

import YandexMap from "./yandex-map.js";
import TablePpc from './tablePpc.js'

import "./styles.css";

const App = () => {

    const [filterList, setFilterList] = useState([])
    const [filter, setFilter] = useState('')
    const mapRef = useRef(null);

    let allDataArray = []

    function getLocalData(){
        let allDataArray = []

        let local = localStorage['data'].split(',')

        for(let i=0; i<local.length; i+=3){
            allDataArray.push([local[i],local[i+1], local[i+2]])
        }
        return allDataArray

    }

    useEffect(() => {
        let count = fetchRequestCountData()
        count.then(e=>{
            if(localStorage['data'] !== undefined){
                allDataArray = getLocalData()
                if(e !== allDataArray.length){
                    console.log('Обновление данных')
                    let promise = fetchRequestAllData(allDataArray)
                    promise.then(e=>{
                        allDataArray = e
                        console.log('Новые данные:',allDataArray)
                        setFilterList(allDataArray)
                    })
                } else {
                    console.log('Локальные данные:',allDataArray)
                    setFilterList(allDataArray)
                }
            }
            else {
                console.log('Первая загрузка данных')
                let promise = fetchRequestAllData(allDataArray)
                promise.then(e=>{
                    allDataArray = e
                    console.log('Данные:',allDataArray)
                    setFilterList(allDataArray)
                })

            }
        })
    }, [])


    const [placemarks, setPlacemarks] = useState([51.651713, 46.036361]);
    const [info, setInfo] = useState('test info!')
    const [idState, setIdState] = useState(0)


    return (
        <div className='main-app'>
            <div className='pagePpc'>
                <div className='flex'>
                    <YandexMap placemarks={placemarks} info={info} mapRef={mapRef} idState={idState}/>
                    <div className='reportPPC'></div>
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
};


createRoot(document.getElementById('root')).render(<App/>)
