import React from "react";

export function Calendar() {

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
            <button onClick={(e) => {
                console.log('Начать')
                newDate()
            }}>Отчет
            </button>


            <div id='containerVoltage'></div>


        </div>
    )

}


export default Calendar;