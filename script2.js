// let key = "2cfda1f27f8f18422038c85cc30073ad"
// let url = `https://api.openweathermap.org/data/2.5/weather?lat=${42.882004}&lon=${74.582748}&lang=ru&units=metric&appid=${key}`

let key = "2cfda1f27f8f18422038c85cc30073ad"
let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&lang=ru&units=metric&appid=${key}`

let $city = document.querySelector('#city')
let $deg = document.querySelector('#deg')
let $weather = document.querySelector('#weather')
let $minMax = document.querySelector('#minMax')

let $hourly = document.querySelector(".hourly")
let $daily = document.querySelector('.daily')

function getCurrentPosition() {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });
}
async function myFunction() {
    try {
        const pos = await getCurrentPosition();
        const latitude = pos.coords.latitude;
        const longitude = pos.coords.longitude;
        const myLoc = new Weather("L", key, latitude, longitude);
        console.log(pos.coords.latitude, pos.coords.longitude);
    } catch (error) {
        console.log(error);
    }
}


async function getData(url) {
    let resp = await fetch(url)
    let data = await resp.json()

    console.log(data)
    currentData(data.current)
    hourlyData(data.hourly)
}

function currentData(current) {
    console.log(current)
}

function hourlyData(hourly) {
    console.log(hourly)

    hours.forEach((element, index) => {
        let hour = new Date().getHours() + index
        $hourly.insertAdjacentHTML('beforeend', `
            <div class="hour">
                <p>${index == 0 ? 'Сейчас' : hour < 24 ? hour : hour - 24 * Math.floor(hour / 24)}</p>
                <img src="https://openweathermap.org/img/wn/${element.weather[0].icon}@2x.png"/>
                <p>${Math.floor(element.temp) + " °"}</p>
            </div>
        `)
    })

}


// fetch(url)
//     .then(resp => resp.json())
//     .then(data => {
//         console.log(data)
//         

//         let hours = data.hourly
//         hours.forEach((element, index) => {
//             let hour = new Date().getHours() + index
//             $hourly.insertAdjacentHTML('beforeend', `
//             <div class="hour">
//                 <p>${index  ==  0  ?  'Сейчас'  :  hour < 24  ?  hour  :  hour - 24 * Math.floor(hour/24)}</p>
//                 <img src="https://openweathermap.org/img/wn/${element.weather[0].icon}@2x.png"/>
//                 <p>${Math.floor(element.temp) + " °"}</p>
//             </div>
//             `)
//         })

//         let days = data.daily

//         days.forEach((element, index) => {
//             let day = new Date().getDay + index
//             $daily.insertAdjacentHTML('beforeend', `
//             <div class="day">
//                 <p></p>
//                 <p>${Math.floor(element.temp.day)}</p>
//             </div>`)
//         })
//     })


// let promise = new Promise(function (resolve, reject) {
//     console.log('Запрос на сервер')
//     let user = {
//         nam: 'Aman',
//         year: 15
//     }
//     if (1 == 2) {
//         resolve(user)
//     } else {
//         reject("Данные не нашли")
//     }

// })

// promise.then((data) => {
//     console.log("Данные получены")
//     console.log(data)
// })
//     .catch((error) => {
//         console.log(`Вы сделали запрос код ошибки ${error}`)
//     })



// try {
//     console.log("WOWO");
//     sum()
// }catch{
//     console.log("ERROR");
// }







console.log(getCurrentPosition())
async function getData(url) {
    let resp = await fetch(url)
    let data = await resp.json()

    console.log(data)
    totalData(data)
    currentData(data.current)
    // hourlyData(data.hourly)
}
function totalData(data){
    $city.textContent = data.timezone
    $minMax.textContent = "Макс: " + String(Math.floor(data.daily[0].temp.max) + "°") + "      " + "Мин: " + String(Math.floor(data.daily[0].temp.min) + "°")
    // $sixh.textContent = Math.floor(data.main.temp) + '°'
}
function currentData(current) {
    console.log(current)
    $deg.textContent = Math.floor(current.temp) + '°'
    $weather.textContent = current.weather[0].description
}

getData(url)