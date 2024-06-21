import React, { useState, useMemo } from 'react';
import { startOfMonth, endOfMonth, startOfWeek, isSameMonth, addMonths, addDays, format } from 'date-fns';
import { convertUTCtoLocalTime, convertUTCtoLocalDate } from '../utils/dateFormatting';

const Calendar = ({list, onClick}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const weekStart = startOfWeek(monthStart);

  const handlePrevMonth = () => {
    setCurrentMonth(prevMonth => addMonths(prevMonth, -1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(prevMonth => addMonths(prevMonth, 1));
  };

  const itemMap = useMemo(() => {
    const map = {};
    list.forEach(item => {
      const localDate = convertUTCtoLocalDate(item.date);
      map[localDate] = item;
    });
    console.table(map);
    return map;
  }, [list]);

  let days = [];
  let day = weekStart;

  const itemRecord = (day) => {
    const formattedDate = format(day, 'yyyy-MM-dd');
    if (itemMap[formattedDate]) console.log("Day matches");
    return itemMap[formattedDate] || null;
  }

  const colorCurrentDay = (day, monthStart) => {
    const record = itemRecord(day);
    const dayStatus = statusCheck(record);

    if (!isSameMonth(day, monthStart)) {
        return 'bg-transparent text-gray-300'; // Non-current month styling
    } else {
        switch (dayStatus) {
            case 'late':
                console.log(dayStatus)
                return 'bg-yellow-300 text-gray-700'; // Yellow background for late days
            case 'present':
                console.log(dayStatus)
                return 'bg-green-500 text-white'; // Green background for present days
            default:
                return 'bg-transparent text-gray-700'; // Default styling for other days
        }
    }
  }

  const statusCheck = (record) => {
    if (record) {
      //Determine lateness
      const localTime = convertUTCtoLocalTime(record.date);
      const time = localTime.split(':');
      const hour = time[0];
      const minute = time[1];

      if (hour > 9 || (hour === 9 && minute > 45)) {
          return 'late';
      } else {
          return 'present';
      }
    } else {
        return 'absent';
    }
  }

  const handleItemClick = (day) => {
    console.log(format(day, 'yyyy-MM-dd'));
    const record = itemRecord(day);
      if (record) {
        console.log("I can edit or delete this item!");
      } else {
        console.log("I can add an item!");
      }
  }

  ///Takes in list of records -> If list item .date corresponds to current day, color that day green
  while (day <= monthEnd) {
    let weekDays = [];
    for (let j = 0; j < 7; j++) {

      const currentDay = day;

      weekDays.push(
        <td key={currentDay} className="text-center align-middle">
          <div 
            className={`inline-block pt-1 w-8 h-8 m-auto rounded-md ${colorCurrentDay(day, monthStart)}`}
            onClick={() => handleItemClick(currentDay)}
          >
            {format(currentDay, 'd')}
          </div>
        </td>
      );
      day = addDays(currentDay, 1); // Move to the next day
    }
    days.push(
    <tr key={day}>
        {weekDays}
    </tr>);
  }

  return (
    <div className="m-4 max-w-md flex-grow flex flex-col justify-center">
      <div className="flex justify-between">
        <button onClick={handlePrevMonth}>Prev</button>
        <span>{format(monthStart, 'MMMM yyyy')}</span>
        <button onClick={handleNextMonth}>Next</button>
      </div>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th>Sun</th>
            <th>Mon</th>
            <th>Tue</th>
            <th>Wed</th>
            <th>Thu</th>
            <th>Fri</th>
            <th>Sat</th>
          </tr>
        </thead>
        <tbody>
          {days}
        </tbody>
      </table>
    </div>
  );
};

export default Calendar;