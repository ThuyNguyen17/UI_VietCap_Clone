import React from "react";
import Header from "../components/Header/Header";
import '../index.css';
const PlanPage = () => {
  return (
    <div className="flex h-screen app-dark">
      <div className="flex flex-col flex-1 bg-gradient-to-br from-dark via-dark to-gray-900">
        <Header />
        <main className="flex-1 p-6 overflow-auto">
              {/* AI Market Predictions */}
              <div className={`transition-all duration-1000 delay-500`}>
                <h1>Cái này nhân làm nè</h1>
              </div>
        </main>
      </div>
    </div>
  );
};

export default PlanPage;
