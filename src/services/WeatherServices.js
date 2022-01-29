const _apiUrl = "https://api.openweathermap.org/data/2.5/";
const _apiKey = "968bf686befc7eb9525f00e78039278d";

const WeatherServices = () => {
  const getCurrentWeather = async (id) => {
    const response = await fetch(
      `${_apiUrl}weather?id=${id}&lang=ru&units=metric&appid=${_apiKey}`
    )
      .then((res) => res.json())
      .then((res) => transformCurrentWeather(res));

    return await response;
  };

  const transformCurrentWeather = (data) => {
    return {
      temp:
        data.main.temp > 0
          ? "+" + Math.round(data.main.temp)
          : Math.round(data.main.temp),
      feels:
        data.main.feels_like > 0
          ? "+" + Math.round(data.main.feels_like)
          : Math.round(data.main.feels_like),
      humidity: data.main.humidity + "%",
      pressure: Math.round(data.main.pressure * 0.75) + " мм рт. ст.",
      name: data.name,
      description: !data.weather[0].description
        ? data.weather[0].description
        : data.weather[0].description[0].toUpperCase() +
          data.weather[0].description.slice(1),
      icon: data.weather[0].icon,
      wind: data.wind.speed + " м/с",
      sunrise: data.sys.sunrise,
      sunset: data.sys.sunset,
    };
  };

  const getDailyWeather = async (id) => {
    const response = await fetch(
      `${_apiUrl}forecast?id=${id}&cnt=40&lang=ru&units=metric&appid=${_apiKey}`
    )
      .then((res) => res.json())
      .then((res) => transformDailyWeahter(res));

    return await response;
  };

  const transformDailyWeahter = (data) => {
    const nextDaysWeahters = getNextDaysWeathers(data);
    const daysObj = sortDailyWeather(nextDaysWeahters);
    let daysArr = [];
    for (let key in daysObj) {
      daysArr = [...daysArr, filterNightAndDayForecast(daysObj[key])];
    }
    const { daytimeTemps, nighttimeTemps } = sortTemps(daysArr);
    const { dIcons, nIcons } = sortIcons(daysArr);
    const { dDescriptions, nDescriptions } = sortDescriptions(daysArr);

    const helpFunc = (value) => {
      const max = Math.floor(Math.max.apply(null, value));
      const min = Math.floor(Math.min.apply(null, value));

      return { max, min };
    };

    const datesArr = Object.values(daysObj);

    let dates = [];

    for (let i = 0; i < datesArr.length; i++) {
      dates = [...dates, datesArr[i][0].dt_txt];
    }

    const uniqueDates = Array.from(new Set(dates.map(JSON.stringify)))
      .map(JSON.parse)
      .map((elem) => {
        return new Date(elem);
      });

    return {
      dates: {
        days: uniqueDates.map((elem) => {
          switch (elem.getDay()) {
            case 0:
              return "вс";
            case 1:
              return "пн";
            case 2:
              return "вт";
            case 3:
              return "ср";
            case 4:
              return "чт";
            case 5:
              return "пт";
            case 6:
              return "сб";
          }
        }),
        datemonth: uniqueDates.map((elem) => {
          return (
            (elem.getDate() < 10 ? "0" + elem.getDate() : elem.getDate()) +
            "." +
            (elem.getMonth() < 10
              ? "0" + (elem.getMonth() + 1)
              : elem.getMonth() + 1)
          );
        }),
      },

      dayTimeForecasts: {
        dmax: daytimeTemps.map((elem) => {
          return helpFunc(elem).max;
        }),
        dmin: daytimeTemps.map((elem) => {
          return helpFunc(elem).min;
        }),
        dIcons: dIcons.map((item) => {
          return item[item.length - 1];
        }),
        dDescriptions: dDescriptions.map((item) => {
          return item[item.length - 1];
        }),
      },
      nightTimeForecasts: {
        nmax: nighttimeTemps.map((elem) => {
          return helpFunc(elem).max;
        }),
        nmin: nighttimeTemps.map((elem) => {
          return helpFunc(elem).min;
        }),
        nIcons: nIcons.map((item) => {
          return item[item.length - 1];
        }),
        nDescriptions: nDescriptions.map((item) => {
          return item[item.length - 1];
        }),
      },
      daysObj,
    };
  };

  const sortIcons = (icons) => {
    const dIcons = icons.map((item) => {
      return item.daytimeForecast.map((elem) => {
        return elem.weather[0].icon;
      });
    });
    const nIcons = icons.map((item) => {
      return item.nighttimeForecast.map((elem) => {
        return elem.weather[0].icon;
      });
    });
    return { dIcons, nIcons };
  };

  const sortDescriptions = (descriptions) => {
    const dDescriptions = descriptions.map((item) => {
      return item.daytimeForecast.map((elem) => {
        return elem.weather[0].description;
      });
    });
    const nDescriptions = descriptions.map((item) => {
      return item.nighttimeForecast.map((elem) => {
        return elem.weather[0].description;
      });
    });
    return { dDescriptions, nDescriptions };
  };

  const sortTemps = (temps) => {
    const daytimeTemps = temps.map((item) => {
      return item.daytimeForecast.map((elem) => {
        return elem.main.temp;
      });
    });
    const nighttimeTemps = temps.map((item) => {
      return item.nighttimeForecast.map((elem) => {
        return elem.main.temp;
      });
    });

    return { daytimeTemps, nighttimeTemps };
  };

  const getNextDaysWeathers = (data) => {
    const index = data.list.filter((item) => {
      const rightDay = new Date(item.dt_txt).getDay();
      const today = new Date().getDay();
      if (rightDay !== today) return item;
    });
    return index;
  };

  const sortDailyWeather = (data) => {
    let today = new Date();
    let days = [];
    for (let i = 1; i <= 5; i++) {
      today.setDate(today.getDate() + 1);
      days = [...days, today.getDay()];
    }

    const rightDay = (value) => {
      return new Date(value.dt_txt).getDay();
    };

    const day1 = data.filter((item) => {
      if (rightDay(item) === days[0]) {
        return item;
      }
    });
    const day2 = data.filter((item) => {
      if (rightDay(item) === days[1]) {
        return item;
      }
    });
    const day3 = data.filter((item) => {
      if (rightDay(item) === days[2]) {
        return item;
      }
    });
    const day4 = data.filter((item) => {
      if (rightDay(item) === days[3]) {
        return item;
      }
    });
    const day5 = data.filter((item) => {
      if (rightDay(item) === days[4]) {
        return item;
      }
    });

    return { day1, day2, day3, day4, day5 };
  };

  const filterNightAndDayForecast = (data) => {
    const nighttimeForecast = data.filter((item) => {
      if (item.sys.pod === "n") {
        return item;
      }
    });

    const daytimeForecast = data.filter((item) => {
      if (item.sys.pod === "d") {
        return item;
      }
    });

    return { nighttimeForecast, daytimeForecast };
  };

  return { getCurrentWeather, getDailyWeather };
};

export default WeatherServices;
