const getSecHandAngle = (now: Date) => now.getSeconds() * 6;

const getMinHandAngle = (now: Date) => now.getMinutes() * 6;

const getHourHandAngle = (now: Date) =>
  now.getHours() * 30 + (now.getMinutes() * 6) / 12;

export { getSecHandAngle, getMinHandAngle, getHourHandAngle };
