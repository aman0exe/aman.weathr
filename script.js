let $city = document.querySelector('#city')
let $deg = document.querySelector('#deg')
let $weather = document.querySelector('#weather')
let $minMax = document.querySelector('#minMax')
let $currentImg = document.querySelector('#currentImg')
let $hourly = document.querySelector(".hourly")
let $daily = document.querySelector('.daily')

try {
    navigator.geolocation.getCurrentPosition(function (pos) {
        let key = "2cfda1f27f8f18422038c85cc30073ad"
        let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&lang=ru&units=metric&appid=${key}`
        getData(url)
        console.log(pos.coords.latitude, pos.coords.longitude);
    });
    async function getData(url) {
        let resp = await fetch(url)
        let data = await resp.json()
        $city.textContent = data.timezone
        console.log(data)

        currentData(data.current)
        hourlyData(data.hourly)
        dailyData(data.daily)
    }
} catch (error) {
    console.log(error);
}

function currentData(current){
    console.log(current)

    $deg.textContent = current.temp.toFixed(0) + "°"
    $currentImg.setAttribute('src', 
        `https://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png`
    )
    $weather.textContent = current.weather[0].description
}

function hourlyData(hourly){
    console.log(hourly)

    let hours = hourly
    hours.forEach((element, index) => {
        let hour = new Date().getHours() + index
        $hourly.insertAdjacentHTML('beforeend', `
            <div class="hour">
                <p>${index == 0 ? 'Сейчас' : hour < 24 ? hour : hour - 24 * Math.floor(hour / 24) + ':00'}</p>
                <img src="https://openweathermap.org/img/wn/${element.weather[0].icon}@2x.png"/>
                <p>${Math.floor(element.temp) + " °"}</p>
            </div>
        `)
    })
}

function dailyData(daily){
    console.log(daily)

    let days = daily
    days.forEach((element, index) => {
        let day = new Date().getDate() + index
        $daily.insertAdjacentHTML('beforeend', `
            <div class='day'>
                <p>${index == 0 ? 'Завтра' : day < days.length ? day : day + 1}</p>
                <img src="https://openweathermap.org/img/wn/${element.weather[0].icon}@2x.png">
                <p>${element.temp.day.toFixed(0) + '°'}</p>
            </div>
        `)
        console.log(day)
    })

}