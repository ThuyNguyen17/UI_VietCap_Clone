import React from "react";
import VNIndexChart from "../components/Dashboard/VietCapIQ/VNIndexChart";
import TopForecastStocks from "../components/Dashboard/VietCapIQ/TopForecastStocks";
import ForecastTable from "../components/Dashboard/VietCapIQ/ForecastTable";
import RatingStructure from "../components/Dashboard/Home/RatingStructure";
import Header from "../components/Header/Header";

const ForecastPage = () => {
  return (
    <>
      <Header />
      <div className="bg-black min-h-screen text-white p-6 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex flex-col h-[440px]">
            <VNIndexChart />
          </div>
          <div className="flex flex-col h-[440px] overflow-hidden">
            <RatingStructure />
          </div>
          <div className="flex flex-col h-[440px]">
            <TopForecastStocks />
          </div>
        </div>

        {/* Table section */}
        <ForecastTable />
      </div>
    </>
  );
};

export default ForecastPage;
