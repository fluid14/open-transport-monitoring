import format from 'date-fns/format';

const getRideTime = rideTime => {
  return format(rideTime, 'h.m');
};

export default getRideTime;
