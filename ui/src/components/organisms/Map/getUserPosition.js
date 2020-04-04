const getUserPosition = () => {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const userPosition = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        resolve(userPosition);
      });
    } else {
      reject(new Error('Sorry, your browser does not support HTML5 geolocation.'));
    }
  });
};

export default getUserPosition;
