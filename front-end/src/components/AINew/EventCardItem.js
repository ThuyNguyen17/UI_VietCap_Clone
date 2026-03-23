import React from 'react';

const EventCardItem = ({ event }) => {
  return (
    <div className="bg-gray-700 p-3 rounded-lg mb-2 cus">
      <h4 className="text-blue-400 text-sm font-semibold mb-1">{event.title}</h4>
      <p className="text-white text-base font-bold mb-1">{event.code}</p>
      <p className="text-gray-300 text-xs mb-2">{event.details}</p>
      <div className="flex justify-between items-center text-gray-400 text-xs pt-2 border-t border-dashed border-gray-600">
        <span>Ngày thông báo: {event.announcementDate}</span>
        <span>Ngày GDKHQ: {event.exDividendDate}</span>
      </div>
    </div>
  );
};

export default EventCardItem;
