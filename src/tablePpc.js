import React, {useEffect, useState} from "react";
import {fetchRequest,userInfo} from './fetchRequest.js'



function TablePpc({filterList, setFilterList, filter, setFilter, allDataArray, selectedPpc, setSelectedPpc}) {


    useEffect(() => {

        let array = fetchRequest()
        console.log(array)

        let user = userInfo()
        // console.log(user.then(e=>{return e}))

    }, [])

    function handleFilter(e) {
        const {value} = e.target;

        let fil = allDataArray.map(e=>{
            return (value == e[1].slice(0, value.length)? e: null)
        }).filter((notNull)=>{return notNull !== null})

        setFilter(value)
        setFilterList(fil)
    }

    return (
        <div className="divTable ">
            <div className="beaconMenuButton">
                <span className="beaconMenuButtonInside"></span>
                <span className="beaconMenuButtonInside"></span>
                <span className="beaconMenuButtonInside"></span>
            </div>
            <div className="searchField">
                <input onChange={(e) => {
                    handleFilter(e)
                }} type="text" placeholder="Поиск полуприцепа..." value={filter} maxLength={40}/>
            </div>

            <table className="tableBeacon">
                <thead>
                <tr>
                    <th>№</th>
                    <th>Имя полуприцепа</th>
                    <th>ID</th>
                </tr>
                </thead>
                <tbody>
                {filterList.map((e,i)=>{
                    return (
                        <tr className={selectedPpc==filterList[i]? 'selectedPPC':null} key={i} onClick={(e)=>{
                            console.log(filterList[i])
                            setSelectedPpc(filterList[i])
                        }}>
                            <td>{e[0]}</td>
                            <td>{e[1]}</td>
                            <td>{e[2]}</td>
                        </tr>
                    )
                })
                }
                </tbody>
            </table>
        </div>
    )
}

export default TablePpc;