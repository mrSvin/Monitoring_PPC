import {fetchRequestObject} from './fetchRequest.js'
import {useEffect} from "react";

function TablePpc({filterList, setFilterList, filter, setFilter,
                      setPlacemarks, mapRef,idState, setIdState,
                      getLocalData, setInfo}) {

    useEffect(() => {

        setTimeout(() => {
            if(localStorage['selectedPPC'] !== undefined){
                let promise = fetchRequestObject(localStorage['selectedPPC'])
                promise.then(e=>{
                    // записать координаты в массив
                    let array = [e.pos.y, e.pos.x]
                    let message = [e.pos.y, e.pos.x, e.nm, e.lmsg.p.pwr_ext]
                    // Переместить карту в эти координаты
                    mapRef.current.panTo(array, {
                        delay: 1000
                    });

                    // Установить координаты точки и обновить ключ
                    setInfo(message)
                    setPlacemarks(array)
                    setIdState(idState+1)

                    let scroll = document.getElementsByClassName('selectedPPC')[0]
                    scroll.scrollIntoView({block: "center", behavior: "smooth"});
                })
            }
            else if(localStorage['data'] !== undefined)
            {
                let local = localStorage['data'].split(',')
                let promise = fetchRequestObject(local[2])
                localStorage['selectedPPC'] = local[2]
                promise.then(e=>{
                    // записать координаты в массив
                    let array = [e.pos.y, e.pos.x]
                    let message = [e.pos.y, e.pos.x, e.nm, e.lmsg.p.pwr_ext]

                    // Переместить карту в эти координаты
                    mapRef.current.panTo(array, {
                        delay: 1000
                    });

                    setInfo(message)
                    setPlacemarks(array)
                    setIdState(idState+1)
                })
            }

        }, 1000)

    }, [])

    function handleFilter(e) {
        let allDataArray = getLocalData()
        const {value} = e.target;

        let fil = allDataArray.map(e=>{
            return (e[1].toLowerCase().includes(value.toLowerCase())? e: null)
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
                        <tr
                            className={localStorage['selectedPPC']==filterList[i][2]? 'selectedPPC':null}
                            key={i}
                            onClick={()=>{

                                // получить координаты ппц
                                let promise = fetchRequestObject(filterList[i][2])

                                localStorage['selectedPPC'] = filterList[i][2]
                                promise.then(e=>{
                                    // записать координаты в массив
                                    let array = [e.pos.y, e.pos.x]
                                    let message = [e.pos.y, e.pos.x, e.nm, e.lmsg.p.pwr_ext]


                                    // Переместить карту в эти координаты
                                    mapRef.current.panTo(array, {
                                        delay: 1000
                                    });

                                    // Установить координаты точки и обновить ключ
                                    setInfo(message)
                                    setPlacemarks(array)
                                    setIdState(idState+1)
                                })
                            }}>

                            <td>{e[0]}</td>
                            <td>{e[1]}</td>
                            <td>{e[2]}</td>
                        </tr>
                    )})
                }
                </tbody>
            </table>
        </div>
    )
}

export default TablePpc;