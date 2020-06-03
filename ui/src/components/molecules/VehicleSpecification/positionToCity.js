import axios from 'axios';
import config from 'config.json';

const positionToCity = (position, setState, setCityError) => {
  axios
    .get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${position[1]},${position[0]}.json?access_token=${config.mapboxApiKey}`,
    )
    .then(response => {
      const { features } = response.data;
      const city = features[2].text;
      setState(city);
    })
    .catch(error => {
      console.log(error);
      setCityError(error);
    });
};

export default positionToCity;
