import React, {useRef, useState} from "react";
import { createRoot } from 'react-dom/client'

import YandexMap from "./yandex-map.js";
import TablePpc from './tablePpc.js'

import "./styles.css";

const App = () => {

    let data = [
        {id: 1, name: '860260051407897-X8ASF4С26N0000005-W', wialon_id: 25718860},
        {id: 2, name: '860260051407905', wialon_id: 25655367},
        {id: 3, name: '8602600gwergwerg00005-W', wialon_id: 25718860},
        {id: 4, name: '860260gwergewrgwer905', wialon_id: 25655367},
        {id: 5, name: '8602jetrjertje60}',wialon_id: 25655367},
        {id: 6, name: '8602jtrjeterjertj905', wialon_id: 25655367},
        {id: 7, name: '8602jterjterjertjertjterjterj05-W', wialon_id: 25718860},
        {id: 8, name: '860ertjertjertjertjertjertj5', wialon_id: 25655367},
        {id: 9, name: '860terjertjertjertjertj05-W', wialon_id: 25718860},
        {id: 10, name: '86jterjertjterjetrjertjertj905', wialon_id: 25655367},
        {id: 11, name: '860ertjertjertjertjertjertj05-W', wialon_id: 25718860},
        {id: 12, name: '86jterjertjterjertjertjetrjertj5', wialon_id: 25655367},
        {id: 13, name: '8654373457345734573457435743574355-W', wialon_id: 25718860},
        {id: 14, name: '8608465846585468546845684568546805', wialon_id: 25655367},
        {id: 15, name: '8602600514432623462346SF4С26N0000005-W', wialon_id: 25718860},
        {id: 16, name: '860432624363246234623462346234605', wialon_id: 25655367},
        {id: 17, name: '8602606243623463246h4jh46500005-W', wialon_id: 25718860},
        {id: 18, name: '860h453h543h543h543h435h43h345h05', wialon_id: 25655367},
        {id: 19, name: '86h354h435h435h34h5435h345h3453h00005-W', wialon_id: 25718860},
        {id: 20, name: '86h543h345h435h543h354h3h54h354h3405', wialon_id: 25655367},
    ]

    function getLocalData(){
        let allDataArray = []

        if (localStorage['data'] == undefined) {

            console.log('То фетч на все данные, иначе')
            allDataArray = data.map(e=>{
                return [e.id, e.name, e.wialon_id]
            })
            localStorage['data'] = allDataArray
        } else if(0){

        }
        else {
            let local = localStorage['data'].split(',')

            for(let i=0; i<local.length; i+=3){
                allDataArray.push([local[i],local[i+1], local[i+2]])
            }
        }

        return allDataArray

    }


    let allDataArray = getLocalData()


    const [filterList, setFilterList] = useState(allDataArray)
    const [filter, setFilter] = useState('')

    // const mapRef = useRef(null);
    // const [bounds, setBounds] = useState([]);

    const [placemarks, setPlacemarks] = useState([55.716733, 37.589988]);
    const [info, setInfo] = useState('test info!')
    const [selectedPpc, setSelectedPpc] = useState(filterList[0])

    return (
        <div className='main-app'>
            <div className='pagePpc'>
                <div className='flex'>
                    <YandexMap placemarks={placemarks} info={info}/>
                    <div className='reportPPC'></div>
                </div>
                <TablePpc filterList={filterList} setFilterList={setFilterList} filter={filter} setFilter={setFilter} allDataArray={allDataArray} selectedPpc={selectedPpc} setSelectedPpc={setSelectedPpc}/>
            </div>
        </div>
    );
};


createRoot(document.getElementById('root')).render(<App/>)