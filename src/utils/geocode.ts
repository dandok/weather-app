import request from "request";

export const geocode = (
  address: string,
  callback: (error: string | undefined, data: undefined | {[key:string]: number}) => void
) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoiZGFuZG9rNjA5IiwiYSI6ImNrc2YwNTZjZzE1b3Iyb251ZnV2bXFqNGgifQ.W5w83pYB-jMuCOo8d0giPA&limit=1`;

  request({ url, json: true }, (error: string, {body}) => {
    // console.log(response.body);
    if (error) {
      callback('Unable to connect to location services!', undefined);
    } else if (body.features.length === 0) {
      callback('Unable to find location, try another search', undefined);
    } else {
      callback(undefined, {
        longitude: body.features[0].center[0],
        latitude: body.features[0].center[1],
        location: body.features[0].place_name,
      });
    }
  });
};

export default geocode