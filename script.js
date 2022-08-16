const divClima = document.getElementById("divClima")
const formClima = document.getElementById("formClima")
const API_KEY = "fbac85ea61f419c1fc02a7f7e497bdbb";



formClima.addEventListener("submit", (e) => {
    e.preventDefault()

    const datForm = new FormData(e.target)
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${datForm.get("ciudad")},${datForm.get("provincia")},${datForm.get("pais")} &appid=${API_KEY}`)

        .then(response => response.json())
        .then(data => {
            let { lat, lon, name, state, country } = data[0]

            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`)

                .then(response => response.json())
                .then(({ main, weather }) => {
                    let { feels_like, humidity, pressure, temp } = main
                    let desClima = weather[0].description
                    divClima.innerHTML = `
        <div>
            <h2>Clima en: ${name}</h2>
            <p>Provincia: ${state}</p>
            <p>Pais: ${country}</p>
            <p>Temperatura: ${temp} °C</p>
            <p>Sensacion Termica: ${feels_like} °C</p>
            <p>Humedad: ${humidity}%</p>
            <p>Presion: ${pressure}hPa</p>
            <p>Descripcion: ${desClima}</p>

        </div>
        `
                })
        })

})