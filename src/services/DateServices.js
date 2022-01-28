const transformMonth = (month) => {
  const monthName = [
    "января",
    "февраля",
    "марта",
    "апреля",
    "мая",
    "июня",
    "июля",
    "августа",
    "сентября",
    "октября",
    "ноября",
    "декабря",
  ];
  monthName.forEach((value, i) => {
    switch (month) {
      case i:
        month = value;
        break;
    }
  });
  return month;
};

const DateServices = () => {
  const now = new Date();
  const getCurrentDate = () => {
    const day = now.getDate();
    let month = transformMonth(now.getMonth());
    const today = `${day} ${month}`;

    return { today };
  };

  const transformSunTime = (unixTime) => {
    const date = new Date(unixTime * 1000);
    let hours = date.getHours();
    let minutes = "0" + date.getMinutes();

    hours = hours < 10 ? "0" + hours : hours;
    const result = hours + ":" + minutes.substr(-2);

    return result;
  };

  const transformTimeIcon = (icon) => {
    if (!icon) return;
    const newIcon =
      now.getHours() > 6 && now.getHours() < 20
        ? icon.slice(0, 2) + "d"
        : icon.slice(0, 2) + "n";
    return newIcon;
  };

  return { getCurrentDate, transformSunTime, transformTimeIcon };
};

export default DateServices;
