const messageMapper = data => {
  const {
    errors,
    fuelLevel,
    fuelConsumption,
    fuelRange,
    rideTime,
    mileage,
    speed,
    rpm,
    oilTemperature,
    oilPressure,
    tyresPressure,
    position,
  } = data;

  const statsForBar = {
    fuelLevel,
    fuelConsumption,
    fuelRange,
    rideTime,
    mileage,
    position,
  };

  const statsForTruck = {
    speed,
    rpm,
    oilTemperature,
    oilPressure,
    tyresPressure,
  };

  return { statsForTruck, statsForBar, errors, position };
};

export default messageMapper;
