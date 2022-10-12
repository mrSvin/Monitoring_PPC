import {serverDomain} from "./vars"

export function fetchRequestAllData() {

    return fetch(`http://${serverDomain}:8088/api/infoData`, {method: 'GET'})
        .then((response) => response.json())
        .then((data) => {
            let local = []
            let allDataArray = []

            data.forEach(e=>{
                local.push(e.cnm)
                local.push(e.nm)
                local.push(e.id)
                if (e.pos != null) {
                    local.push(e.pos.t)
                } else {
                    local.push(0)
                }


            })
            localStorage['data'] = local

            for(let i=0; i<local.length; i+=4){
                allDataArray.push([local[i],local[i+1], local[i+2], local[i+3]])
            }
            return allDataArray
        })
}

export function fetchRequestCountData() {

    return fetch(`http://${serverDomain}:8088/api/countData`, {method: 'GET'})
        .then((response) => response.json())
        .then((data) => {
            return data
        })
}

export function fetchRequestHistory(id, timeBefore, timeAfter) {

    return fetch(`http://${serverDomain}:8088/api/reportWabco/id:${id}from:${timeBefore}to:${timeAfter}`, {method: 'GET'})
        .then((response) => response.json())
        .then((data) => {
            return data
        })
}

export function fetchRequestObject(id) {

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

    return fetch(`http://${serverDomain}:8080/auth/userInfo`, {
        method: 'POST'
    })
        .then((response) => response.json())
        .then((data) => {
            return data
        })
}


