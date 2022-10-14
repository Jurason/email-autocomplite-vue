const fetch = require('node-fetch')
const USERS_QUANTITY = 11

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}


export const loadUser = async () => {
    const randomUserIndex = getRandomInt(1, USERS_QUANTITY)

    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${randomUserIndex}`).then(response => response.json())

    if(!Object.keys(response).length){
        console.log('The number of requests is exceeded ')
        return
    }

    return response
}
