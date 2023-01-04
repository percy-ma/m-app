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
  const [todayWeatherStatus, setTodayWeatherStatus] = useState({});
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
    if (result) {
      setTodayWeatherStatus(result[0]);
      setSevenDaysWeather([...result]);
    }
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
  
  const [hourWeatherLeft, setHourWeatherLeft] = useState(0)
  const [moveActive, setMoveActive] = useState(false)
  const [startPosition, setStartPosition] = useState(0)
  const [mouseX, setMouseX] = useState(0)
  const mouseDown = (e) => {
    setMoveActive(true)
    setMouseX(e.clientX)
  }
  const mouseMove = (e) => {
    if(moveActive) {
      let distance = startPosition + (e.clientX - mouseX)
      
      if(distance < 0) {
        console.log(hourWeatherLeft, e.clientX, mouseX, distance)
        setHourWeatherLeft(distance)
      }
      
    }
    
  }
  const mouseUp = (e) => {
    setStartPosition(hourWeatherLeft)
    setMoveActive(false)
  }

  useEffect(() => {
    getData();
    // getEcharts();
  }, []);

  // useEffect(() => {
  //   getEcharts(sevenDaysWeather);
  // }, [sevenDaysWeather]);

  return (
    <div className="weather-container card">
      <div>
        {nowWeather && (
          <div className="now-weather-box card weather-box">
            <span className="temp">{nowWeather.temp}°C</span>
            <div>{todayWeatherStatus.tempMin}°C / {todayWeatherStatus.tempMax}°C</div>
            <div>
              <i className={`icon qi-${nowWeather.icon}`}></i>
              <span className="text">{nowWeather.text}</span>
            </div>
            <span className="location">
              {city.name}, {city.adm2}, {city.adm1}
            </span>
            <span className="datetime">{dayjs().format('DD MMM, YYYY')}</span>
          </div>
        )}
        {tfHoursWeather.length > 0 && (
          <div className="multi-hours-box card weather-box">
            <div onMouseDown={mouseDown} onMouseUp={mouseUp} onMouseMove={mouseMove} style={{left: hourWeatherLeft+'px'}}>
              {tfHoursWeather.map((houritem) => (
                <div className="multi-hours-item" key={houritem.fxTime}>
                  <span>{dayjs(houritem.fxTime).format('HH:mm')}</span>
                  <span>{houritem.temp}°C</span>
                  <i className={`qi-${houritem.icon}`}></i>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <div>
        {sevenDaysWeather.length > 0 && (
          <div className="multi-days-box card weather-box">
            {sevenDaysWeather.map((dayitem) => (
              <div
                className="multi-days-item"
                key={dayitem.fxDate}
                onClick={() => getDayDetailWeather(dayitem)}
              >
                <i className={`qi-${dayitem.iconDay}`}></i>
                <div>
                  <span>{dayitem.tempMin}°C</span>/
                  <span>{dayitem.tempMax}°C</span>
                </div>
                <span>{dayjs(dayitem.fxDate).format('ddd')}</span>
                <span>{dayjs(dayitem.fxDate).format('MMM/DD')}</span>
              </div>
            ))}
          </div>
        )}
        {nowWeather && (
          <div className="weather-status-box card weather-box">
            <div>Humidity: {nowWeather.humidity}%</div>
            <div>windDir: {nowWeather.windDir}</div>
            <div>windScale: {nowWeather.windScale}km/h</div>
            <div>Visibility: {nowWeather.vis}km</div>
            <div>Feels Like: {nowWeather.feelsLike}°C</div>
            <div>UV Index: {todayWeatherStatus.uvIndex}</div>
            <div>Sunrise: {todayWeatherStatus.sunrise}</div>
            <div>Sunset: {todayWeatherStatus.sunset}</div>
          </div>
        )}
      </div>
      {/* <div
        id="seven-days-chart"
        style={{ width: '400px', height: '200px' }}
      ></div> */}
    </div>
  );
};

export default Weather;

const SemiCircle = () => {
  return (
    <div className='box0'>
      {/* <div className='progress-circle'></div>
      <div className='progress-rotate'>
        <div className='progress-dot'></div>
      </div>
      <div className='progress-inner-circle'></div> */}
      <div className='box1'></div>
      <div className='box2'></div>
      <div className='box3'><span className='dot'></span></div>
    </div>
    
    // <div className='circular-content'>
    //   <div className='circulars'>
    //     <div className='ring'><div className='double-circle'></div></div>
    //   </div>
    // </div>
  )
}

  let getEcharts = (weatherData) => {
    let minTempList = [];
    let maxTempList = [];
    let dateList = [];
    if (weatherData) {
      for (let i = 0; i < weatherData.length; i++) {
        dateList.push(dayjs(weatherData[i].fxDate).format('YY/DD'));
        minTempList.push(weatherData[i].tempMin);
        maxTempList.push(weatherData[i].tempMax);
      }
      let weatherChart = echarts.init(
        document.getElementById('seven-days-chart')
      );
      weatherChart.setOption({
        animation: false,
        xAxis: {
          data: dateList,
          position: 'top',
          axisLine: { show: false },
          axisTick: { show: false },
        },
        yAxis: {
          axisLine: { show: false },
          axisTick: { show: false },
          axisLabel: { show: false },
          splitLine: { show: false },
        },
        series: [
          {
            data: maxTempList,
            type: 'line',
            stack: 'max',
            label: {
              show: true,
              position: 'top',
            },
          },
          {
            data: minTempList,
            type: 'line',
            stack: 'min',
            label: {
              show: true,
              position: 'bottom',
            },
          },
        ],
      });
    }
  };

  
