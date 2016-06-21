function toTitleCase(str) {
    return str.replace(/\w\S*/g, function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
}

export const pruneWeather = (data) => {
    return {
        temp: {
            max: Math.round(data.main.temp_max - 273.15),
            min: Math.round(data.main.temp_min - 273.15),
            val: Math.round(data.main.temp - 273.15)
        },
        humidity: data.main.humidity,
        pressure: data.main.pressure,
        wind: data.wind,
        desc: toTitleCase(data.weather[0].description)
    }
}
