import React, { useState, useMemo, useCallback } from 'react';
import { startOfMonth, endOfMonth, startOfWeek, isSameMonth, addMonths, addDays, format } from 'date-fns';
import { convertUTCtoLocalTime, convertUTCtoLocalDate, getDefaultDateTime } from '../utils/dateFormatting';
import useMenu from '../hooks/useMenu'; 
import Menu from './Menu';
import { getDefaultFieldValue } from '../utils/fieldFormatting';

const Calendar = ({list, onClick = null}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const {
    menuOpen,
    menuPosition,
    menuOptions,
    selectedItem,
    openMenuWithItem,
    handleMenuClose,
  } = useMenu();

  const handlePrevMonth = () => {
    setCurrentMonth(prevMonth => addMonths(prevMonth, -1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(prevMonth => addMonths(prevMonth, 1));
  };

  const itemMap = useMemo(() => {
    console.log("Generating item map");
    const map = {};
    list.forEach(item => {
      const localDate = convertUTCtoLocalDate(item.date);

      const localTime = convertUTCtoLocalTime(item.date);
      const time = localTime.split(':');
      const hour = time[0];
      const minute = time[1];

      let status = 'present';
      if (hour > 9 || (hour === 9 && minute > 45)) {
        status = 'late';
      }      
    
      map[localDate] = {
        record: item,
        status: status,
      };
    });
    console.table(map);
    return map;
  }, [list]);

  const itemRecord = useCallback((day) => {
    const formattedDate = format(day, 'yyyy-MM-dd');
    if (itemMap[formattedDate]) console.log("Day matches");
    return itemMap[formattedDate] || null;
  }, [itemMap]);

  const colorCurrentDay = useCallback((day, monthStart,) => {
    const dayItem = itemRecord(day);


    if (!isSameMonth(day, monthStart)) {
        return 'bg-transparent text-gray-300 hover:bg-gray-50'; // Non-current month styling
    } else if (dayItem) {
          if (dayItem.status === 'late') {
            return 'bg-yellow-300 text-gray-700 hover:bg-yellow-500'; // Yellow background for late days
          } else if (dayItem.status === 'present') {
            return 'bg-green-500 text-white hover:bg-green-600'; // Green background for present days
          }
    } else {
      return 'bg-transparent text-gray-700 hover:bg-gray-100'; // Default styling for other days
    }
  }, [itemRecord]);

  const handleItemClick = useCallback((day, event) => {
    if (!onClick) return;

    console.log(day);

    let item = itemRecord(day);
    if (item) {
      console.log("I can edit or delete this item!");
    } else {
      console.log("I can add an item!");
      const defaultDateTime = getDefaultDateTime(format(day, 'yyyy-MM-dd'));
      const newDate = new Date(defaultDateTime);
      console.log(newDate);
      item = {
        record: {
          date: newDate.toISOString(),
          isClockedIn: getDefaultFieldValue('checkbox'),
        },
        status: 'absent',
      };
    }
    openMenuWithItem(item.record, event);
  }, [onClick, itemRecord, openMenuWithItem]);

  const calendar = useMemo(() => {
    console.log("Generating calendar");
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);
    const weekStart = startOfWeek(monthStart);

    const days = [];
    let day = weekStart;
    
    ///Takes in list of records -> If list item .date corresponds to current day, color that day green
    while (day <= monthEnd) {
      let weekDays = [];
      for (let j = 0; j < 7; j++) {

        const currentDay = day;

        weekDays.push(
          <td key={currentDay} className="text-center align-middle h-14">
            <button 
              className={`btn btn-icon inline-block pt-1 w-10 h-10 m-auto rounded-md ${colorCurrentDay(day, monthStart)}`}
              onClick={(event) => handleItemClick(currentDay, event)}
            >
              {format(currentDay, 'd')}
            </button>
          </td>
        );
        day = addDays(currentDay, 1); // Move to the next day
      }
      days.push(
      <tr className='divide-x divide-gray-200 divide-solid' key={day}>
          {weekDays}
      </tr>);
    }
    return days;
    // eslint-disable-next-line
  }, [currentMonth]);

  const handleMenuClick = (option) => {
    console.log("Menu clicked!");
    console.log(option);
    console.log(selectedItem);
    handleMenuClose();  
    onClick(option, selectedItem)
  }

  return (
    <>
    <div className="max-w-full flex-grow flex flex-col justify-center">
      <div className="flex justify-between mb-4">
        <button className="btn btn-icon" onClick={handlePrevMonth}>
        <span class="material-icons-outlined align-middle">arrow_back</span>
          
        </button>
        <span className="flex text-2xl font-bold text-center items-center">{format(currentMonth, 'MMMM yyyy')}</span>
        <button className="btn btn-icon" onClick={handleNextMonth}>
          <span class="material-icons-outlined align-middle">arrow_forward</span>
          
        </button>
      </div>
      <table className="table-auto w-full h-96">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 rounded-tl-lg">Sun</th>
            <th className="py-2">Mon</th>
            <th className="py-2">Tue</th>
            <th className="py-2">Wed</th>
            <th className="py-2">Thu</th>
            <th className="py-2">Fri</th>
            <th className="py-2 rounded-tr-lg">Sat</th>
          </tr>
        </thead>
        <tbody className="divide-solid divide-y divide-gray-200">
          {calendar}
        </tbody>
      </table>
    </div>

    <Menu 
      isOpen={menuOpen}
      position={menuPosition}
      onClick={handleMenuClick}
      onClose={handleMenuClose}
      options={menuOptions}
    />
    </>
  );
};

export default Calendar;