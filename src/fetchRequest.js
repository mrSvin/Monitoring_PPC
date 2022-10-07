export function fetchRequestAllData() {
    let serverDomain = window.location.hostname
    serverDomain = '192.168.3.41'
    return fetch(`http://${serverDomain}:8088/api/infoData`, {method: 'GET'})
        .then((response) => response.json())
        .then((data) => {
            console.log('Запрос данных')
            let local = []
            let allDataArray = []

            data.forEach(e=>{
                local.push(e.id)
                local.push(e.name)
                local.push(e.wialon_id)
            })
            localStorage['data'] = local

            for(let i=0; i<local.length; i+=3){
                allDataArray.push([local[i],local[i+1], local[i+2]])
            }
            return allDataArray
        })
}

export function fetchRequestCountData() {
    let serverDomain = window.location.hostname
    serverDomain = '192.168.3.41'
    return fetch(`http://${serverDomain}:8088/api/countData`, {method: 'GET'})
        .then((response) => response.json())
        .then((data) => {
            return data
        })
}

export function fetchRequestHistory(id, timeBefore, timeAfter) {
    let serverDomain = window.location.hostname
    serverDomain = '192.168.3.41'
    return fetch(`http://${serverDomain}:8088/api/reportWabco/id:${id}from:${timeBefore}to:${timeAfter}`, {method: 'GET'})
        .then((response) => response.json())
        .then((data) => {
            return data
        })
}

export function fetchRequestObject(id) {
    let serverDomain = window.location.hostname
    serverDomain = '192.168.3.41'
    return fetch(`http://${serverDomain}:8088/api/infoObject/id:${id}`, {method: 'GET'})
        .then((response) => response.json())
        .then((data) => {
            return data
        })
        .catch((error)=>{
            console.log('Ошибка', error)
        })
}

export function userInfo() {
    let serverDomain = window.location.hostname
    serverDomain = '192.168.3.41'
    return fetch(`http://${serverDomain}:8080/auth/userInfo`, {
        method: 'POST'
    })
        .then((response) => response.json())
        .then((data) => {
            return data
        })
}


