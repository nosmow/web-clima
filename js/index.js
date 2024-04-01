const API_KEY = '0b8e358f5f95b03bf1e0893b83eb2df1'
let descriptionWeather = ''
let iconWeather = ''

const fetchData = position => {
    const {latitude, longitude} = position.coords
    fetch(`https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${latitude}&lon=${longitude}&appid=${API_KEY}`)
    .then(response => response.json())
    .then(data => setWeatherData(data))

    console.log(position)
}

const setWeatherData = data => {
    console.log(data)

    let weatherMain = data.weather[0].main
    descriptionWeather = data.weather[0].description
    iconWeather = data.weather[0].icon

    const weatherData = {
        location: data.name + ", " + data.sys.country, 
        weather: weatherMain + ", " + descriptionWeather,
        humidity: data.main.humidity,
        windspeed: (data.wind.speed * 3.6).toFixed(1),
        temperature: (data.main.temp).toFixed(0),
        date: getDate()
    }

    

    console.log(iconWeather)

    insertData(weatherData)

    cleanUp()
}

const insertData = (weatherData) => {
    let text = ''
    let grade = ''

    Object.keys(weatherData).forEach(key => {

        if (key == 'humidity') {
            grade = '%'
        } else if (key == 'windspeed') {
            grade = ' Km/h'
        } else if (key == 'temperature') {
            grade = '°C'
        }

        document.getElementById(key).textContent = text + weatherData[key] + grade

        text = ''
        grade = ''
    })

    document.getElementById('mi-image').src = `../img/${iconWeather}.png`
}

const cleanUp = () => {
    let container = document.getElementById('container')
    let loader = document.getElementById('loader')
    let figuraFondo = document.getElementById('figura-fondo')

    loader.style.display = 'none'
    container.style.display = 'flex'
    figuraFondo.style.display = 'initial'
}

const getDate = () => {
    var fecha = new Date();
  
    // Días de la semana y meses en español
    var diasSemana = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var meses = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  
    // Obtén el día de la semana, el día del mes y el mes
    var diaSemana = diasSemana[fecha.getDay()];
    var diaMes = fecha.getDate();
    var mes = meses[fecha.getMonth()];
  
    // Construye la cadena formateada
    var fechaFormateada = diaSemana + ', ' + diaMes+ " " + mes + ", " + fecha.getFullYear();
  
    // Devuelve la fecha formateada
    return fechaFormateada;
}


const changeColor = () => {
    var fecha = new Date()
    var hora = fecha.getHours()
    var elementosDeTexto = document.querySelectorAll('body *:not(script)')

    if (hora >= 19) {
        document.getElementById('loader-l').style.color = '#FFFFFF'

        document.body.style.background = 'linear-gradient(180deg, rgb(35, 35, 35) 18%, rgb(39, 58, 92) 51%, rgb(62, 133, 255) 100%)'
        
        document.getElementById('card-weather').style.background = 'rgba(27, 27, 27, 0.7)'

        document.getElementById('card-weather').style.boxShadow = '10px 10px 16px -13px rgba(255,255,255,0.3)'

        document.getElementById('mi-image').style.filter = 'drop-shadow(0 2px 5px rgba(255, 255, 255, 0.7))'

        elementosDeTexto.forEach(function(elemento) {
            elemento.style.color = 'white'  
        });
    }
    
}

const onLoad = () => {
    changeColor()
    navigator.geolocation.getCurrentPosition(fetchData)
    
}
