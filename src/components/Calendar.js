import React, { useState } from 'react';
import { startOfMonth, endOfMonth, startOfWeek, isSameMonth, addMonths, addDays, format } from 'date-fns';
import { convertUTCtoLocalTime, convertUTCtoLocalDate } from '../utils/dateFormatting';

const Calendar = ({list}) => {
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

  let days = [];
  let day = weekStart;

  const isCurrentDay = (day) => {
    const foundItem = list.find((item) => {
        const localDate = convertUTCtoLocalDate(item.date);
        if (format(day, 'yyyy-MM-dd') === localDate) { 
            //return the item
            return item;
        }
        return null;
    });

    if (foundItem) {
        //Determine lateness
        const localTime = convertUTCtoLocalTime(foundItem.date);
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

  const colorCurrentDay = (day, monthStart) => {
    const dayStatus = isCurrentDay(day);

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

  ///Takes in list of records -> If list item .date corresponds to current day, color that day green
  while (day <= monthEnd) {
    let weekDays = [];
    for (let j = 0; j < 7; j++) {
      weekDays.push(
        <td key={day} className="text-center align-middle">
          <div className={`inline-block pt-1 w-8 h-8 m-auto rounded-md ${colorCurrentDay(day, monthStart)}`}>
            {format(day, 'd')}
          </div>
        </td>
      );
      day = addDays(day, 1); // Move to the next day
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