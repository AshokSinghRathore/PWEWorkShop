import Geolocation from 'react-native-geolocation-service';

interface Location {
  latitude: number;
  longitude: number;
}
export function getLocation(): Promise<Location> {
  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      position => {
        let {latitude, longitude} = position.coords;

        resolve({
          latitude: parseFloat(latitude.toFixed(4)),
          longitude: parseFloat(longitude.toFixed(4)),
        });
      },
      error => {
        reject(error);
      },
    );
  });
}
