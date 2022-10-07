import {fetchRequestObject} from './fetchRequest.js'
import {useEffect, useState} from "react";

function TablePpc({filterList, setFilterList, filter, setFilter,
                      setPlacemarks, mapRef,idState, setIdState,
                      getLocalData, setInfo}) {

    const [tableClicked, setTableClicked] = useState(true)
    const [errorMessage, setErrorMessage] = useState(false)

    useEffect(() => {

        setTimeout(() => {
            if(localStorage['selectedPPC'] !== undefined){
                let promise = fetchRequestObject(localStorage['selectedPPC'])
                promise.then(e=>{
                    // записать координаты в массив
                    let array = [e.pos.y, e.pos.x]
                    let message = [e.pos.y, e.pos.x, e.nm, e.lmsg.p.pwr_ext, e.pos.t]
                    // Переместить карту в эти координаты
                    mapRef.current.panTo(array, {
                        delay: 1000
                    });

                    // Установить координаты точки и обновить ключ
                    setInfo(e)
                    setPlacemarks(array)
                    setIdState(idState+1)

                    let scroll = document.getElementsByClassName('selectedPPC')[0]
                    scroll.scrollIntoView({block: "center", behavior: "smooth"});
                })
                    .catch(error=>{
                        setTimeout(() => {
                            console.log('Ошибка повторная загрузка', )
                            let promiseError = fetchRequestObject(localStorage['selectedPPC'])
                            promiseError.then(e=>{
                                if(!e){
                                    alert('Не удалось загрузить станок')
                                    return 0
                                }
                                // записать координаты в массив
                                let array = [e.pos.y, e.pos.x]
                                let message = [e.pos.y, e.pos.x, e.nm, e.lmsg.p.pwr_ext, e.pos.t]
                                // Переместить карту в эти координаты
                                mapRef.current.panTo(array, {
                                    delay: 1000
                                });

                                // Установить координаты точки и обновить ключ
                                setInfo(e)
                                setPlacemarks(array)
                                setIdState(idState+1)

                                let scroll = document.getElementsByClassName('selectedPPC')[0]
                                scroll.scrollIntoView({block: "center", behavior: "smooth"});
                            })
                        },2000)
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
                    let message = [e.pos.y, e.pos.x, e.nm, e.lmsg.p.pwr_ext, e.pos.t]

                    // Переместить карту в эти координаты
                    mapRef.current.panTo(array, {
                        delay: 1000
                    });

                    setInfo(e)
                    setPlacemarks(array)
                    setIdState(idState+1)
                })
                    .catch(error=>{
                        setTimeout(() => {
                            console.log('Ошибка повторная загрузка', )
                            let promiseError = fetchRequestObject(localStorage['selectedPPC'])
                            promiseError.then(e=>{
                                // записать координаты в массив
                                if(!e){
                                    alert('Не удалось загрузить станок')
                                    return 0
                                }
                                let array = [e.pos.y, e.pos.x]
                                let message = [e.pos.y, e.pos.x, e.nm, e.lmsg.p.pwr_ext, e.pos.t]

                                // Переместить карту в эти координаты
                                mapRef.current.panTo(array, {
                                    delay: 1000
                                });

                                // Установить координаты точки и обновить ключ
                                setInfo(e)
                                setPlacemarks(array)
                                setIdState(idState+1)

                                let scroll = document.getElementsByClassName('selectedPPC')[0]
                                scroll.scrollIntoView({block: "center", behavior: "smooth"});
                            })
                        },2000)
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

            <table className={tableClicked? "tableBeacon": "tableBeacon tableNoPointer"}>
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
                            onClick={(e)=>{
                                // let table = document.querySelector('.tableBeacon')

                                setTableClicked(false)
                                // e.target.classList.add('loadingPPC');
                                // e.target.classList.add('tableNoPointer');

                                setTimeout(()=>{
                                    // e.target.classList.remove('loadingPPC');
                                    setTableClicked(true)
                                }, 1000)

                                // получить координаты ппц
                                let promise = fetchRequestObject(filterList[i][2])

                                localStorage['selectedPPC'] = filterList[i][2]
                                promise.then(p=>{

                                    // записать координаты в массив
                                    let array = [p.pos.y, p.pos.x]

                                    let message = [p.pos.y, p.pos.x, p.nm, p.lmsg.p.pwr_ext, p.pos.t]

                                    setIdState(idState+1)
                                    setInfo(p)
                                    setPlacemarks(array)

                                    // Переместить карту в эти координаты
                                    mapRef.current.panTo(array, {
                                        delay: 1000
                                    });



                                    if(e.target.querySelectorAll('td')[1].innerHTML == 'Не удалось инициализировать полуприцеп'){
                                        e.target.querySelectorAll('td')[1].innerHTML = p.nm
                                    }

                                })
                                    .catch(error=>{
                                        e.target.classList.add('errorPPC');
                                        e.target.querySelectorAll('td')[1].innerHTML = 'Не удалось инициализировать полуприцеп'
                                        setErrorMessage(true)
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