import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import * as echarts from 'echarts';
import 'qweather-icons/font/qweather-icons.css';
import { message } from '../../components';
import {
  fn_getCity,
  fn_getNowWeather,
  fn_get7daysWeather,
  fn_get24HoursWeather,
} from './api';
import './index.scss';

const getGeo = () => {
  let geo = window.navigator.geolocation;
  return new Promise((resolve, reject) => {
    return geo.getCurrentPosition(
      (res) => {
        let lon = res.coords.longitude;
        let lat = res.coords.latitude;
        resolve({
          lon,
          lat,
        });
      },
      (err) => {
        console.log(err);
        reject();
      }
    );
  });
};

// const isTodayOrTmr = (date) => {
//   if (dayjs().isSame(date, 'day')) {
//     return 'Today';
//   } else if (dayjs().add(1, 'day').isSame(date, 'day')) {
//     return 'Tomorrow';
//   }
//   return dayjs(date).format('ddd');
// };

const Weather = () => {
  const [city, setCity] = useState(null);
  const [nowWeather, setNowWeather] = useState(null);
  const [sevenDaysWeather, setSevenDaysWeather] = useState([]);
  const [tfHoursWeather, setTfHoursWeather] = useState([]);

  const getCity = async (location) => {
    let cityInfo = await fn_getCity(location);
    cityInfo && setCity(cityInfo);
    console.log(cityInfo);
  };
  const getNowWeather = async (location) => {
    let result = await fn_getNowWeather(location);
    result && setNowWeather(result);
  };
  const get7daysWeather = async (location) => {
    let result = await fn_get7daysWeather(location);
    result && setSevenDaysWeather([...result]);
  };
  const get24hoursWeather = async (location) => {
    let result = await fn_get24HoursWeather(location);
    result && setTfHoursWeather([...result]);
  };

  const getData = async () => {
    try {
      let location = await getGeo();
      getCity(location);
      getNowWeather(location);
      get7daysWeather(location);
      get24hoursWeather(location);
    } catch (err) {
      message.error('Get Location Failed!!');
    }
  };

  const getDayDetailWeather = (detail) => {
    console.log(detail);
  };

  useEffect(() => {
    getData();
    // getEcharts();
  }, []);

  return (
    <>
      <div className="now-weather-box weather-box">
        {nowWeather && (
          <>
            <span>{city.name}, {city.adm2}, {city.adm1}</span>
            <span className='temp'>{nowWeather.temp}°C</span>
            <i className={`qi-${nowWeather.icon}`}></i>
            <span>{nowWeather.text}</span>
            {/* <span>humidity: {nowWeather.humidity}%</span> */}
          </>
        )}
      </div>

      <div className="multi-hours-box weather-box">
        {tfHoursWeather.length > 0 &&
          tfHoursWeather.map((houritem) => (
            <div className="multi-hours-item" key={houritem.fxTime}>
              <div>{dayjs(houritem.fxTime).format('HH:mm')}</div>
              <div>{houritem.temp}°C</div>
              <i className={`qi-${houritem.icon}`}></i>
            </div>
          ))}
      </div>

      <div className="multi-days-box weather-box">
        {sevenDaysWeather.length > 0 &&
          sevenDaysWeather.map((dayitem) => (
            <div
              className="multi-days-item"
              key={dayitem.fxDate}
              onClick={() => getDayDetailWeather(dayitem)}
            >
              <div>{dayjs(dayitem.fxDate).format('ddd')}</div>
              <div>{dayjs(dayitem.fxDate).format('MM/DD')}</div>
              <div>{dayitem.tempMax}°C</div>
              <div>{dayitem.tempMin}°C</div>
              <i className={`qi-${dayitem.iconDay}`}></i>
              <i className={`qi-${dayitem.textDay}`}></i>
            </div>
          ))}
      </div>

      {/* <div
        id="seven-days-chart"
        style={{ width: '400px', height: '400px' }}
      ></div> */}
    </>
  );
};

export default Weather;

//   let getEcharts = (weatherData) => {
//     let minTempList = [];
//     let maxTempList = [];
//     let dateList = [];
//     if (weatherData) {
//       for (let i = 0; i < weatherData.length; i++) {
//         dateList.push(dayjs(weatherData[i].fxDate).format('YY/DD'));
//         minTempList.push(weatherData[i].tempMin);
//         maxTempList.push(weatherData[i].tempMax);
//       }
//       let weatherChart = echarts.init(
//         document.getElementById('seven-days-chart')
//       );
//       weatherChart.setOption({
//         animation: false,
//         xAxis: {
//           data: dateList,
//           position: 'top',
//           axisLine: { show: false },
//           axisTick: { show: false },
//         },
//         yAxis: {
//           axisLine: { show: false },
//           axisTick: { show: false },
//           axisLabel: { show: false },
//           splitLine: { show: false },
//         },
//         series: [
//           {
//             data: maxTempList,
//             type: 'line',
//             smooth: true,
//             stack: 'max',
//             label: {
//               show: true,
//               position: 'top',
//             },
//           },
//           {
//             data: minTempList,
//             type: 'line',
//             smooth: true,
//             stack: 'min',
//             label: {
//               show: true,
//               position: 'bottom',
//             },
//           },
//         ],
//       });
//     }
//   };

//   useEffect(() => {
//     getEcharts(sevenDaysWeather);
//   }, [sevenDaysWeather]);
