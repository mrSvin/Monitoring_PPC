import React, {useEffect} from "react";
import {fetchRequest,userInfo} from './fetchRequest.js'

function TablePpc() {

    useEffect(() => {

        let array = fetchRequest()
        console.log(array)

        let user = userInfo()
        console.log(user)

    }, [])

    return (
        <div className="divTable ">
            <div className="beaconMenuButton">
                <span className="beaconMenuButtonInside"></span>
                <span className="beaconMenuButtonInside"></span>
                <span className="beaconMenuButtonInside"></span>
            </div>
            <div className="searchField">
                <input type="text" placeholder="Поиск полуприцепа..."/>
            </div>

            <table className="tableBeacon">
                <thead>
                <tr>
                    <th>№</th>
                    <th>Название</th>
                    <th>id</th>

                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>1</td>
                    <td>Буклов А.В</td>
                    <td>1234</td>

                </tr>
                <tr>
                    <td>2</td>
                    <td>Васильев А.В</td>
                    <td>1432</td>

                </tr>
                </tbody>
            </table>
        </div>
    )
}

export default TablePpc;