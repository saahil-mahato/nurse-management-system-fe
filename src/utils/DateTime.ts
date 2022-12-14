export const timestampToTime = (timestamp: number) => {
  const time = new Date(timestamp);

  return time
    .getHours()
    .toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false })
    .concat(
      ' : ',
      time
        .getMinutes()
        .toLocaleString('en-US', {
          minimumIntegerDigits: 2,
          useGrouping: false,
        }),
    );
};

export const timestampToDate = (timestamp: number) => {
  const date = new Date(timestamp);

  return date
    .getFullYear()
    .toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false })
    .concat(
      '/',
      date
        .getMonth()
        .toLocaleString('en-US', {
          minimumIntegerDigits: 2,
          useGrouping: false,
        }),
      '/',
      date
        .getDate()
        .toLocaleString('en-US', {
          minimumIntegerDigits: 2,
          useGrouping: false,
        }),
    );
};

export const dateToTimestamp = (date: string) => {
  const timestamp = Date.parse(date);

  return timestamp;
};
