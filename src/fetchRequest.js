export function fetchRequest() {
    return fetch(`http://192.168.3.41:8088/api/infoData`, {method: 'GET'})
        .then((response) => response.json())
        .then((data) => {
            return data
        })
}

export function userInfo() {
    fetch('http://192.168.3.41:8080/api/userInfo', {
        method: 'POST'
    })
        .then((response) => response.json())
        .then((data) => {
            return data
        })
}