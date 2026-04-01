import { useState, useRef, useEffect } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import gsap from 'gsap';

const daysOfWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export default function CustomDatePicker({ value, onChange, placeholder = "Select dates", className = "" }) {
    const [isOpen, setIsOpen] = useState(false);
    
    // View date defaults to startDate, endDate, or today
    const [viewDate, setViewDate] = useState(value?.startDate ? new Date(value.startDate) : new Date());
    
    const containerRef = useRef(null);
    const popoverRef = useRef(null);
    const gridRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (containerRef.current && !containerRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        if (isOpen) {
            gsap.fromTo(popoverRef.current,
                { opacity: 0, y: 10, scale: 0.95, display: 'none' },
                { opacity: 1, y: 0, scale: 1, display: 'block', duration: 0.4, ease: 'back.out(1.5)' }
            );
            if (value?.startDate) setViewDate(new Date(value.startDate));
        } else {
            gsap.to(popoverRef.current, {
                opacity: 0, y: 10, scale: 0.95, duration: 0.2, ease: 'power2.in',
                onComplete: () => {
                    if (popoverRef.current) popoverRef.current.style.display = 'none';
                }
            });
        }
    }, [isOpen, value]);

    const handlePrevMonth = () => {
        gsap.fromTo(gridRef.current, { x: 20, opacity: 0 }, { x: 0, opacity: 1, duration: 0.3 });
        setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1));
    };

    const handleNextMonth = () => {
        gsap.fromTo(gridRef.current, { x: -20, opacity: 0 }, { x: 0, opacity: 1, duration: 0.3 });
        setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1));
    };

    const handleDateClick = (dateObj) => {
        if (!value?.startDate || (value.startDate && value.endDate)) {
            // First click (or reset): set start date, clear end date
            onChange({ startDate: dateObj, endDate: null });
        } else if (value.startDate && !value.endDate) {
            // Second click: set end date
            if (dateObj < value.startDate) {
                // If clicked date is before start date, swap them
                onChange({ startDate: dateObj, endDate: value.startDate });
            } else {
                onChange({ startDate: value.startDate, endDate: dateObj });
            }
            // Auto close after selecting the full range
            setTimeout(() => setIsOpen(false), 300);
        }
    };

    const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
    const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

    const renderCalendarDays = () => {
        const year = viewDate.getFullYear();
        const month = viewDate.getMonth();
        const daysInMonth = getDaysInMonth(year, month);
        const firstDay = getFirstDayOfMonth(year, month);
        
        const days = [];
        // Empty slots
        for (let i = 0; i < firstDay; i++) {
            days.push(<div key={`empty-${i}`} className="h-8 w-8"></div>);
        }
        
        // Days
        for (let d = 1; d <= daysInMonth; d++) {
            const dateObj = new Date(year, month, d);
            dateObj.setHours(0,0,0,0);
            
            const startNode = value?.startDate ? new Date(value.startDate).setHours(0,0,0,0) : null;
            const endNode = value?.endDate ? new Date(value.endDate).setHours(0,0,0,0) : null;
            const current = dateObj.getTime();

            const isStart = current === startNode;
            const isEnd = current === endNode;
            const inRange = startNode && endNode && current > startNode && current < endNode;
            const isToday = current === new Date().setHours(0,0,0,0);

            let buttonClasses = "h-8 w-8 flex items-center justify-center text-sm font-sans transition-colors relative z-10 rounded-full ";
            let wrapperClasses = "relative h-8 w-8 flex items-center justify-center ";

            if (isStart || isEnd) {
                buttonClasses += "bg-accent text-sand font-bold shadow-md";
            } else if (inRange) {
                buttonClasses += "bg-accent/20 text-accent font-medium hover:bg-accent/30";
            } else if (isToday) {
                buttonClasses += "border border-accent text-accent hover:bg-sand";
            } else {
                buttonClasses += "hover:bg-sand text-primary/80 hover:text-primary";
            }

            days.push(
                <div key={d} className={wrapperClasses}>
                    <button
                        type="button"
                        onClick={() => handleDateClick(dateObj)}
                        className={buttonClasses}
                    >
                        {d}
                    </button>
                </div>
            );
        }
        return days;
    };

    const formatDate = (date) => new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    const formattedValue = value?.startDate 
        ? `${formatDate(value.startDate)}${value.endDate ? ` - ${formatDate(value.endDate)}` : ' - (End Date)'}` 
        : '';

    return (
        <div ref={containerRef} className={`relative w-full ${className}`}>
            <div 
                className="bg-sand/30 border border-primary/10 rounded-lg px-4 py-3 flex justify-between items-center cursor-pointer hover:border-accent transition-colors"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className={formattedValue ? "text-primary text-sm" : "text-primary/50"}>
                    {formattedValue || placeholder}
                </span>
                <CalendarIcon className="w-5 h-5 text-primary/70 shrink-0 ml-2" />
            </div>

            <div 
                ref={popoverRef}
                className="absolute top-full left-0 mt-2 bg-white border border-primary/10 rounded-2xl shadow-xl shadow-primary/10 z-50 p-4 w-72"
                style={{ display: 'none' }}
            >
                {/* Header */}
                <div className="flex justify-between items-center mb-4">
                    <button type="button" onClick={handlePrevMonth} className="p-1 hover:bg-sand rounded-full text-primary/70 transition-colors">
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <div className="font-semibold text-primary font-sans">
                        {months[viewDate.getMonth()]} {viewDate.getFullYear()}
                    </div>
                    <button type="button" onClick={handleNextMonth} className="p-1 hover:bg-sand rounded-full text-primary/70 transition-colors">
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>

                {/* Days of week */}
                <div className="grid grid-cols-7 gap-y-1 mb-2">
                    {daysOfWeek.map(day => (
                        <div key={day} className="text-center text-xs font-semibold text-primary/50 font-sans">
                            {day}
                        </div>
                    ))}
                </div>

                {/* Calendar Grid */}
                <div ref={gridRef} className="grid grid-cols-7 gap-y-1 justify-items-center">
                    {renderCalendarDays()}
                </div>
            </div>
        </div>
    );
}
