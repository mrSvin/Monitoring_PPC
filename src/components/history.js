import {fetchRequestAllData, fetchRequestCountData, fetchRequestHistory} from '../js/fetchRequest.js'
import React, {useState, useEffect} from "react";
import {convertTime} from "../js/solutions";

function dayYesterday(startTime) {
    return new Date((new Date(startTime)).getTime() - 86400000).getTime()
}

function History({info}){

    const [historyState, setHistoryState] = useState({voltage:null})

    useEffect(() => {
        if(localStorage['selectedPPC'] !== undefined){
            let promise = fetchRequestHistory(localStorage['selectedPPC'], convertTime(dayYesterday(new Date)), convertTime(new Date))
            promise.then(data=>{

                if(data.voltage!==null){
                    data.voltage = JSON.parse(data.voltage)
                    data.speed = JSON.parse(data.speed)
                    data.pressuareWheels = data.pressuareWheels.map(e=>{
                        return JSON.parse(e)
                    })
                    data.loadAxle = data.loadAxle.map(e=>{
                        return JSON.parse(e)
                    })
                    data.pressuareSystem = JSON.parse(data.pressuareSystem)
                    data.possitions = JSON.parse(data.possitions)

                    data.voltage = data.voltage.x.map((e,i)=>{
                        return [e*1000, data.voltage.y[i]]
                    })
                    console.log('Парс напряжения для графика', data.voltage)
                }



                //console.log('Напряжение', data.voltage)
                console.log('Данные после ',data)
                setHistoryState(data)
            })
        }
    }, [])

    return (
        <div>
            {(info.undef !== true)?
                <HistoryData info = {info} setHistoryState={setHistoryState} historyState={historyState}/>
                : console.log('Пустой', info)
            }
        </div>
    )
}

export default History;


function HistoryData({info,setHistoryState, historyState}) {

    const [dateHistoryFrom, setDateHistoryFrom] =useState('2022-09-23 12:00')

    const [dateHistoryAfter, setDateHistoryAfter] =useState('2022-09-23 23:59')

    function newDate() {
        console.log(dateHistoryFrom, '-', dateHistoryAfter)

        if(info.undef !== true){

            let promise = fetchRequestHistory(info.id, convertTime(`${dateHistoryFrom}`), convertTime(`${dateHistoryAfter}`))
            promise.then(data=>{

                if(data.voltage!==null){
                    data.voltage = JSON.parse(data.voltage)
                    data.speed = JSON.parse(data.speed)
                    data.pressuareWheels = data.pressuareWheels.map(e=>{
                        return JSON.parse(e)
                    })
                    data.loadAxle = data.loadAxle.map(e=>{
                        return JSON.parse(e)
                    })
                    data.pressuareSystem = JSON.parse(data.pressuareSystem)
                    data.possitions = JSON.parse(data.possitions)



                    data.voltage = data.voltage.x.map((e,i)=>{
                        return [e*1000, data.voltage.y[i]]
                    })
                    console.log('Парс напряжения для графика', data.voltage)
                }

                //console.log('Напряжение', data.voltage)
                console.log('Запрос окончен ',data)
                setHistoryState(data)
            })
        }
    }

    console.log('INFO',historyState)

    return (
        <div>
            <input onChange={(e) => {
                const {value} = e.target;
                setDateHistoryFrom(value)
            }} value={dateHistoryFrom}
                   type="text"/>

            <input onChange={(e) => {
                const {value} = e.target;
                setDateHistoryAfter(value)
            }} value={dateHistoryAfter}
                   type="text"/>

            <button onClick={(e)=>{
                console.log('Начать')
                newDate()
            }}>Отчет</button>


            <div id='containerVoltage'></div>


        </div>
    )

}