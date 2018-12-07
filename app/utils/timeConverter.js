const createAMPMTimeStamp = timestamp => {
  const date = new Date(timestamp * 1000);
  const year = date
    .getFullYear()
    .toString()
    .slice(2);
  const month = date.getMonth();
  const day = date.getDate();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours %= 12;
  hours = hours || 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? `0${minutes}` : minutes;
  const strTime = `${hours}:${minutes} ${ampm}`;
  return {
    year,
    month,
    day,
    strTime
  };
};

export default createAMPMTimeStamp;
