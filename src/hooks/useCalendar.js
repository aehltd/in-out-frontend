import { addMonths } from "date-fns";
import { useState } from "react"

const useCalendar = () => {
    const [currentMonth, setCurrentMonth] = useState(new Date());

    const handlePrevMonth = () => {
        setCurrentMonth((prevMonth) => addMonths(prevMonth, -1));
    }

    const handleNextMonth = () => {
        setCurrentMonth((prevMonth) => addMonths(prevMonth, 1));
    }

    return {
        currentMonth,
        handlePrevMonth,
        handleNextMonth,
    }
}

export default useCalendar;
