import { useState } from 'react';
import Header from '../components/Header/Header';
import DateNavigation from '../components/Dashboard/VietCapIQ/DateNavigation';
import SummaryCards from '../components/Dashboard/VietCapIQ/SummaryCards';
import ActionButtons from '../components/Dashboard/VietCapIQ/ActionButtons';
import EventTable from '../components/Dashboard/VietCapIQ/EventTable';
import { allEvents } from '../data/eventData';

// Helper để định dạng ngày
const formatDate = (dateObj) => {
  const day = String(dateObj.getDate()).padStart(2, '0');
  const month = String(dateObj.getMonth() + 1).padStart(2, '0');
  return `${day}/${month}`;
};

function EventsPage() {
  // Thay đổi ngày được chọn ban đầu thành '05/08' và tuần thành 04/08-10/08/2025
  const [selectedDate, setSelectedDate] = useState('05/08');
  // 04/08/2025 là ngày thứ Hai
  const [weekStartDate, setWeekStartDate] = useState(new Date(2025, 7, 4));

  // Tạo danh sách ngày trong tuần
  const weekDates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(weekStartDate);
    date.setDate(date.getDate() + i);
    return formatDate(date);
  });

  // Lọc sự kiện của cả tuần
  const filteredEvents = allEvents.filter((event) =>
    weekDates.includes(event.notificationDate.slice(0, 5))
  );

  // Lọc sự kiện chỉ cho ngày được chọn
  const eventsForSelectedDate = allEvents.filter(
    (event) => event.notificationDate.startsWith(selectedDate)
  );

  const goToPreviousWeek = () => {
    const newStart = new Date(weekStartDate);
    newStart.setDate(newStart.getDate() - 7);
    setWeekStartDate(newStart);
    setSelectedDate(formatDate(newStart));
  };

  const goToNextWeek = () => {
    const newStart = new Date(weekStartDate);
    newStart.setDate(newStart.getDate() + 7);
    setWeekStartDate(newStart);
    setSelectedDate(formatDate(newStart));
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-black text-gray-100 p-4">
        {/* Tiêu đề và tab */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold mr-4">Sự kiện</h1>
            <div className="flex border-b border-gray-700">
              <button className="py-2 px-4 text-white border-b-2 border-yellow-400 font-semibold">Tổng Quan</button>
              <button className="py-2 px-4 text-gray-400 hover:text-white">KOKO</button>
            </div>
          </div>
          {/* Nút giả lập cho Mở/Ngân hàng/Tải xuống */}
          <div className="flex gap-2">
            <button className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded text-sm">
              Mã
            </button>
            <button className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded text-sm">
              Ngành
            </button>
            <button className="bg-yellow-400 text-black px-3 py-1 rounded font-semibold text-sm">
              Tải xuống
            </button>
          </div>
        </div>

        <DateNavigation
          weekDates={weekDates}
          onPreviousWeek={goToPreviousWeek}
          onNextWeek={goToNextWeek}
          selectedDate={selectedDate}
          onSelectDate={setSelectedDate}
        />
        <SummaryCards
          selectedDate={selectedDate}
          onSelectDate={setSelectedDate}
          weekDates={weekDates}
        />
        <ActionButtons />
        <EventTable events={eventsForSelectedDate} selectedDate={selectedDate} />
      </div>
    </>
  );
}

export default EventsPage;