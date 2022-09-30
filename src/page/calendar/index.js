import { useState, useMemo } from 'react';
import dayjs from 'dayjs';
import './index.scss'

export default function Calendar() {
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth()+1);
  const [selectDate, setSelectDate] = useState(new Date())  

  const initCalendar = useMemo(() => {
    let startDay = new Date([year, month, 1].join('/'));
    let startWeekDay = startDay.getDay();
    let lastDay = new Date(year, month, 0);
    let lastDay_getDay = lastDay.getDay();
    let lastDay_getDate = lastDay.getDate();
    let month_weeks_num = Math.ceil((lastDay_getDate + 6 - lastDay_getDay) / 7);
    let day_length = month_weeks_num * 7;

    let itemDay = [year, month, 1].join('/');
    let dayArr = [];
    for (let i = 0; i < startWeekDay; i++) {
      itemDay = dayjs(itemDay).add(-1, 'd').format('YYYY/M/D');
      dayArr.push({
        day: dayjs(itemDay).date(),
        date: itemDay,
        selectClass: dayjs(itemDay).isSame(selectDate, 'day') ? 'is-selected' : ''
      });
    }
    itemDay = [year, month, 1].join('/');
    dayArr.reverse();
    for (let i = 0; i <= day_length - startWeekDay; i++) {
      dayArr.push({
        day: dayjs(itemDay).date(),
        date: itemDay,
        selectClass: dayjs(itemDay).isSame(selectDate, 'day') ? 'is-selected' : ''
      });
      itemDay = dayjs(itemDay).add('1', 'd').format('YYYY/M/D');
    }

    let tempDateArr = [];
    for (let i = 0; i < month_weeks_num; i++) {
      tempDateArr.push(dayArr.splice(0, 7));
    }
    console.log(year, month, tempDateArr)
    return tempDateArr
  }, [year, month, selectDate]);

  const nextMonth = () => {
    let tempMonth = month
    let tempYear = year
    if(month === 12) {
        tempMonth = 1
        tempYear++
        setYear(tempYear)
    } else {
        tempMonth++
    }
    setMonth(tempMonth)
  }
  const lastMonth = () => {
    let tempMonth = month
    let tempYear = year
    if(month === 1) {
        tempMonth = 12
        tempYear--
        setYear(tempYear)
    } else {
        tempMonth--
    }
    setMonth(tempMonth)
  }
  const toToday = () => {
    setYear(new Date().getFullYear())
    setMonth(new Date().getMonth()+1)
    setSelectDate(new Date())
  }

  return (
    <div className="calendar">
      <div className="header">{year} {month}</div>
      <button onClick={toToday}>Today</button>
      <button onClick={lastMonth}>Last Month</button>
      <button onClick={nextMonth}>Next Month</button>
      <div>{
        initCalendar.map((weekDateArr, key) => {
            return <div className='week' key={key}>{
                weekDateArr.map(dayItem => {
                    return <div className={'day '+dayItem.selectClass} data-date={dayItem.date} key={dayItem.date}>
                        {dayItem.day}
                    </div>
                })
            }</div>
        })
      }</div>
    </div>
  );
}
