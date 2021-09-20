import request from "request";

export const forecast = (
  long: number,
  latt: number,
  callback: (error: string | undefined, forecastData: undefined | string | {}) => any
) => {
  const key = '954830d3392632540edb28a16ce2346a&query'
  const url =
  `http://api.weatherstack.com/current?access_key=${key}=${latt},${long}&units=f`;
  

  request({ url, json: true }, (error: string, {body})=>{
    if(error){
      callback('Unable to connect to weather service!', undefined)
    }else if (body.error){
      callback('Unable to find location', undefined)
    }else {
      const value = body.current
      callback(undefined, `It is currently ${value.temperature} degrees out, it feels like ${value.feelslike} degrees out`)
    }
  });
};


export default forecast