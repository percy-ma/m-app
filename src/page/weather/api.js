import axios from 'axios';
import { message } from '../../components';

const apikey = 'd229dd9a207f4fa5b3c030ffd2a6db36';

const api_getCity = `https://geoapi.qweather.com/v2/city/lookup`;
const api_nowWeather = `https://devapi.qweather.com/v7/weather/now`;
const api_7daysWeather = `https://devapi.qweather.com/v7/weather/7d`;
const api_24hoursWeather = `https://devapi.qweather.com/v7/weather/24h`;

export const fn_getCity = async (location) => {
  try {
    const res = await axios.get(
      `${api_getCity}?lang=en&key=${apikey}&location=${location.lon},${location.lat}`
    );
    if (res.data.code === '200') {
      console.log(res.data.location[0]);
      return res.data.location[0];
    } else {
      message.error('Get City Failed!!');
      return false;
    }
  } catch {
    message.error('Get City Failed!!');
    return false;
  }
};

export const fn_getNowWeather = async (location) => {
  try {
    const res = await axios.get(
      `${api_nowWeather}?lang=en&key=${apikey}&location=${location.lon},${location.lat}`
    );
    if (res.data.code === '200') {
      console.log(res.data.now);
      return res.data.now;
    } else {
      message.error('Get Weather Failed!!');
      return false;
    }
  } catch {
    message.error('Get Weather Failed!!');
    return false;
  }
};

export const fn_get7daysWeather = async (location) => {
  try {
    const res = await axios.get(
      `${api_7daysWeather}?lang=en&key=${apikey}&location=${location.lon},${location.lat}`
    );
    if (res.data.code === '200') {
      console.log(res.data.daily);
      return res.data.daily;
    } else {
      message.error('Get Weather Failed!!');
      return false;
    }
  } catch {
    message.error('Get Weather Failed!!');
    return false;
  }
};

export const fn_get24HoursWeather = async (location) => {
  try {
    const res = await axios.get(
      `${api_24hoursWeather}?lang=en&key=${apikey}&location=${location.lon},${location.lat}`
    );
    if (res.data.code === '200') {
      console.log(res.data.hourly);
      return res.data.hourly;
    } else {
      message.error('Get Weather Failed!!');
      return false;
    }
  } catch {
    message.error('Get Weather Failed!!');
    return false;
  }
};
