import {fetchRequestAllData, fetchRequestCountData, fetchRequestHistory} from './fetchRequest.js'
import React, {useState, useEffect} from "react";

function dayYesterday(startTime) {
    return new Date((new Date(startTime)).getTime() - 86400000).getTime()
}

function convertTime(time){
    return +(new Date(time).getTime()/1000).toFixed()
}

// function Highchart(container='containerVoltage', data){
//
//     if (data == null){
//         return 0
//     }
//
//     Highcharts.chart(container, {
//         chart: {
//             zoomType: 'x'
//         },
//         time: {
//             timezoneOffset: new Date().getTimezoneOffset()
//         },
//         title: {
//             text: 'Напряжение'
//         },
//         xAxis: {
//             type: 'datetime'
//         },
//         yAxis: {
//             title: {
//                 text: 'Напряжение'
//             }
//         },
//         legend: {
//             reversed: true
//         },
//         plotOptions: {
//             area: {
//                 fillColor: {
//                     linearGradient: {
//                         x1: 0,
//                         y1: 0,
//                         x2: 0,
//                         y2: 1
//                     },
//                     stops: [
//                         [0, Highcharts.getOptions().colors[0]],
//                         [1, Highcharts.color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
//                     ]
//                 },
//                 marker: {
//                     radius: 2
//                 },
//                 lineWidth: 1,
//                 states: {
//                     hover: {
//                         lineWidth: 1
//                     }
//                 },
//                 threshold: null
//             }
//         },
//         credits: {
//             enabled: false
//         },
//
//         series: [{
//             type: 'area',
//             name: 'Напряжение',
//             data: data
//         },]
//     });
// }

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

    const [dateHistoryFrom, setDateHistoryFrom] =useState('2022-09-23')
    const [timeHistoryFrom, setTimeHistoryFrom] =useState('12:00:00')

    const [dateHistoryAfter, setDateHistoryAfter] =useState('2022-09-23')
    const [timeHistoryAfter, setTimeHistoryAfter] =useState('23:59:00')

    function newDate() {
        console.log(dateHistoryFrom, timeHistoryFrom, '-', dateHistoryAfter, timeHistoryAfter)

        if(info.undef !== true){
            console.log(info.id, convertTime(`${dateHistoryFrom} ${timeHistoryFrom}`), convertTime(`${dateHistoryAfter} ${timeHistoryAfter}`))
            let promise = fetchRequestHistory(info.id, convertTime(`${dateHistoryFrom} ${timeHistoryFrom}`), convertTime(`${dateHistoryAfter} ${timeHistoryAfter}`))
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
                setTimeHistoryFrom(value)
            }} value={timeHistoryFrom}
                   type="text"/>
            <br/>
            <input onChange={(e) => {
                const {value} = e.target;
                setDateHistoryAfter(value)
            }} value={dateHistoryAfter}
                   type="text"/>
            <input onChange={(e) => {
                const {value} = e.target;
                setTimeHistoryAfter(value)
            }} value={timeHistoryAfter}
                   type="text"/>
            <button onClick={(e)=>{
                console.log('Начать')
                newDate()
            }}></button>

            {/*{(historyState.voltage !==null)? <div>*/}
            {/*    <p>{historyState.voltage.x}</p>*/}
            {/*    <p>{historyState.voltage.y}</p>*/}
            {/*</div>:null}*/}

            <div id='containerVoltage'></div>

            {/*{Object.keys(historyState).map((e,i)=>{*/}
            {/*    // console.log(historyState[e])*/}
            {/*    // console.log(e)*/}
            {/*    // console.log(i)*/}

            {/*    let key1 =i*2*/}
            {/*    let key2 = i*2+1*/}

            {/*    let out = []*/}

            {/*    console.log('Напряжение', historyState.voltage)*/}

            {/*    // if(e=='loadAxle'){*/}
            {/*    //     console.log('Первый')*/}
            {/*    //     out = [historyState[e].x, historyState[e].y]*/}
            {/*    // }*/}
            {/*    //*/}
            {/*    // if(e=='pressuareSystem'){*/}
            {/*    //     console.log('Второй')*/}
            {/*    //     out = [historyState[e].x, historyState[e].y]*/}
            {/*    // }*/}

            {/*    // if(e=='pressuareWheels'){*/}
            {/*    //     console.log('Третий')*/}
            {/*    // }*/}
            {/*    //*/}
            {/*    // if(e=='voltage'){*/}
            {/*    //     console.log('Четвертый')*/}
            {/*    // }*/}
            {/*    //*/}
            {/*    // if(e=='possitions'){*/}
            {/*    //     console.log('Пятый')*/}
            {/*    // }*/}
            {/*    //*/}
            {/*    // if(e=='speed'){*/}
            {/*    //     console.log('Шестой')*/}
            {/*    // }*/}

            {/*    console.log(out)*/}

            {/*    return (*/}
            {/*        <div>*/}
            {/*            <p key={key1}></p>*/}
            {/*            <p key={key2}></p>*/}
            {/*        </div>*/}
            {/*    )*/}
            {/*})}*/}
            {/*<p></p>*/}
            {/*<p></p>*/}
            {/*<p></p>*/}
            {/*<p></p>*/}
            {/*<p></p>*/}
            {/*<p></p>*/}
            {/*historyState.voltage*/}
            {/*historyState.speed*/}
            {/*historyState.pressuareWheels*/}
            {/*historyState.loadAxle*/}
            {/*historyState.pressuareSystem */}
            {/*historyState.possitions*/}

            {/*<p key={5}>Данные, {historyState}</p>*/}
        </div>
    )

}