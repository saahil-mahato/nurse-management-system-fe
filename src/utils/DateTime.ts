export const timestampToTime = (timestamp: number) => {
  const time = new Date(timestamp);

  return time.getHours().toString().concat(': ', time.getMinutes().toString());
};

export const timestampToDate = (timestamp: number) => {
  const date = new Date(timestamp);

  return date
    .getFullYear()
    .toString()
    .concat('/', date.getMonth().toString(), '/', date.getDate().toString());
};

export const dateToTimestamp = (date: string) => {
  const timestamp = Date.parse(date);

  return timestamp;
};
