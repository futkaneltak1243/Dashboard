import { useState, useRef, useEffect } from "react";
import { format, addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, isSameMonth, isSameDay } from "date-fns";

const DatePicker = () => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    const handleClickOutside = (e: MouseEvent) => {
        if (ref.current && !ref.current.contains(e.target as Node)) {
            setOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const renderDays = () => {
        const start = startOfWeek(startOfMonth(currentMonth));
        const end = endOfWeek(endOfMonth(currentMonth));
        const days = eachDayOfInterval({ start, end });

        return days.map((day) => (
            <div
                key={day.toString()}
                onClick={() => setSelectedDate(day)}
                style={{
                    padding: "10px",
                    cursor: "pointer",
                    backgroundColor: selectedDate && isSameDay(day, selectedDate) ? "#4F46E5" : undefined,
                    color: !isSameMonth(day, currentMonth) ? "#A1A1AA" : selectedDate && isSameDay(day, selectedDate) ? "white" : "black",
                    borderRadius: "4px",
                    textAlign: "center",
                }}
            >
                {format(day, "d")}
            </div>
        ));
    };

    return (
        <div style={{ position: "relative", display: "inline-block" }} ref={ref}>
            <input
                readOnly
                value={selectedDate ? format(selectedDate, "dd/MM/yyyy") : ""}
                placeholder="Select date"
                onClick={() => setOpen(!open)}
                style={{
                    padding: "10px",
                    borderRadius: "6px",
                    border: "1px solid #ccc",
                    width: "150px",
                    cursor: "pointer",
                }}
            />
            {open && (
                <div
                    style={{
                        position: "absolute",
                        top: "110%",
                        left: 0,
                        backgroundColor: "white",
                        border: "1px solid #ccc",
                        padding: "10px",
                        borderRadius: "6px",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                        display: "grid",
                        gridTemplateColumns: "repeat(7, 1fr)",
                        gap: "5px",
                        zIndex: 100,
                    }}
                >
                    <button onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}>{"<"}</button>
                    <div style={{ gridColumn: "span 5", textAlign: "center" }}>{format(currentMonth, "MMMM yyyy")}</div>
                    <button onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}>{">"}</button>
                    {renderDays()}
                </div>
            )}
        </div>
    );
};

export default DatePicker;