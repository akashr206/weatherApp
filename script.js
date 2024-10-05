

// function for Adding a loading screen
function addBouncer(container) {
    let cont = document.querySelector(`.${container}`)
    let bounce = document.createElement("div")
    let loading = document.createElement("div")
    loading.className = "loading"
    bounce.className = "bounce"
    cont.prepend(loading)
    loading.prepend(bounce)
}
// function for removing the loading screen
async function removeBouncer() {
    async function expand() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve()
            }, 400);
        })
    }
    let loading = document.querySelector(".loading")
    let ball = document.querySelector(".bounce")
    ball.classList.remove("bounce")
    ball.classList.add("bounce2")
    await expand()
    ball.classList.remove("bounce2")
    loading.classList.remove("loading")

}

async function weatherData(city) {
    const APIKEY = "5d8227f1161e43a189d33628240210";
    const url = `https://api.weatherapi.com/v1/current.json?key=${APIKEY}&q=${city}&aqi=no`
    let response = await fetch(url)
    let wData = await response.json()
    for (const key in wData) {
        if (key === "error") {
            return wData.error.message
        }
    }
    return wData
}

async function main(city) {

    addBouncer("container")
    let data = await weatherData(city)
    removeBouncer()
    if (typeof data === "string") {
        alert(data)
        return
    }
    console.log(data.location.name);
    if (city.toLowerCase() === data.location.name.toLowerCase()) {
        let cName = document.querySelector("header h5")
        let icon = document.querySelector(".conditionIcon img")
        let condition = document.querySelector("#condition")
        let temp = document.querySelector(".temp p span")
        let rFeelpre = document.querySelector(".realFeelPre span")
        let humiditypre = document.querySelector(".humidityPre span")
        let wSpeed = document.querySelector(".windSpeed span")
        let wDirection = document.querySelector(".windSpeed .inCircle")
        let humidity = document.querySelector(".humidity span")
        let humidProgress = document.querySelector(".humidity .inCircle")
        let pressure = document.querySelector(".pressure span")
        let rFeel = document.querySelector(".realFeel span")

        icon.setAttribute("src", data.current.condition.icon)
        condition.innerHTML = data.current.condition.text
        temp.textContent = Math.floor(data.current.temp_c)
        cName.textContent = data.location.name
        rFeelpre.textContent = Math.floor(data.current.feelslike_c)
        humiditypre.textContent = data.current.humidity
        wSpeed.textContent = data.current.wind_kph
        wDirection.setAttribute("style", `transform: rotate(${data.current.wind_degree}deg)`)
        humidity.textContent = data.current.humidity
        humidProgress.setAttribute("style", `width: ${data.current.humidity}%;height: ${data.current.humidity}%`)
        pressure.textContent = data.current.pressure_mb
        rFeel.textContent = Math.floor(data.current.feelslike_c)
    }else{
        alert("Make sure that you have entered a city name")
    }
}

let searchbar = document.querySelector(".searchbar")

searchbar.addEventListener("change", main(searchbar.value || "bengaluru"))
searchbar.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        main(searchbar.value || "bengaluru")
    }
    return
})




