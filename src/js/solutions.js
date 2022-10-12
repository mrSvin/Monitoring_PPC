export function getLocalData() {
    let allDataArray = []

    let local = localStorage['data'].split(',')

    for(let i=0; i<local.length; i+=3){
        allDataArray.push([local[i],local[i+1], local[i+2]])
    }
    return allDataArray

}

export function convertTime(time) {
    return +(new Date(time).getTime()/1000).toFixed()
}