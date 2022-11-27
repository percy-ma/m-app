import { useState, useMemo } from 'react';
import dayjs from 'dayjs';
import { Select } from '../../components';
import './index.scss';

export default function Calendar() {
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [selectDate, setSelectDate] = useState(new Date());
  const MONTH_LIST = [
    { value: 1, text: 'January', default: month === 1 },
    { value: 2, text: 'February', default: month === 2 },
    { value: 3, text: 'March', default: month === 3 },
    { value: 4, text: 'April', default: month === 4 },
    { value: 5, text: 'May', default: month === 5 },
    { value: 6, text: 'June', default: month === 6 },
    { value: 7, text: 'July', default: month === 7 },
    { value: 8, text: 'August', default: month === 8 },
    { value: 9, text: 'Septempter', default: month === 9 },
    { value: 10, text: 'October', default: month === 10 },
    { value: 11, text: 'November', default: month === 11 },
    { value: 12, text: 'December', default: month === 12 },
  ];

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
        selectClass: dayjs(itemDay).isSame(selectDate, 'day')
          ? ' is-selected'
          : '',
        notThisMonth:
          dayjs(itemDay).month() + 1 !== month ? ' not-this-month' : '',
      });
    }
    itemDay = [year, month, 1].join('/');
    dayArr.reverse();
    for (let i = 0; i <= day_length - startWeekDay; i++) {
      dayArr.push({
        day: dayjs(itemDay).date(),
        date: itemDay,
        selectClass: dayjs(itemDay).isSame(selectDate, 'day')
          ? ' is-selected'
          : '',
        notThisMonth:
          dayjs(itemDay).month() + 1 !== month ? ' not-this-month' : '',
      });
      itemDay = dayjs(itemDay).add('1', 'd').format('YYYY/M/D');
    }

    let tempDateArr = [];
    for (let i = 0; i < month_weeks_num; i++) {
      tempDateArr.push(dayArr.splice(0, 7));
    }
    return tempDateArr;
  }, [year, month, selectDate]);

  const nextMonth = () => {
    let tempMonth = month;
    let tempYear = year;
    if (month === 12) {
      tempMonth = 1;
      tempYear++;
      setYear(tempYear);
    } else {
      tempMonth++;
    }
    setMonth(tempMonth);
  };
  const lastMonth = () => {
    let tempMonth = month;
    let tempYear = year;
    if (month === 1) {
      tempMonth = 12;
      tempYear--;
      setYear(tempYear);
    } else {
      tempMonth--;
    }
    setMonth(tempMonth);
  };
  const toToday = () => {
    setYear(new Date().getFullYear());
    setMonth(new Date().getMonth() + 1);
    setSelectDate(new Date());
  };
  const setDate = (date) => {
    setSelectDate(new Date(date));
  };
  const selectMonth = (month) => {
    setMonth(month);
  };

  return (
    <div className="calendar">
      <div className="card">
        <div className="header">
          <div className="header-text">
            <span>{year}</span>
            <span>
              <Select
                options={MONTH_LIST}
                selectValue={month}
                onChange={selectMonth}
                selectClassName="month-select"
                selectActiveClassName="month-select-active"
                optionsClassName="month-select-options"
                showArrow={false}
              />
            </span>
          </div>
          <div className="header-month-btn">
            <div className="month-btn" onClick={lastMonth}></div>
            <div className="month-btn" onClick={nextMonth}></div>
          </div>
        </div>
        {/* <button onClick={toToday}>Today</button> */}
        <div>
          {initCalendar.map((weekDateArr, key) => {
            return (
              <div className="week" key={key}>
                {weekDateArr.map((dayItem) => {
                  return (
                    <div
                      className={
                        'day' + dayItem.selectClass + dayItem.notThisMonth
                      }
                      data-date={dayItem.date}
                      key={dayItem.date}
                      onClick={() => setDate(dayItem.date)}
                    >
                      {dayItem.day}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
      <div id="select-date">{dayjs(selectDate).format('YYYY MMM DD')}</div>
    </div>
  );
}
