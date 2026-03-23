import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  ReferenceLine,
  Label,
} from "recharts";

const data = [
  { date: "2023", vnindex: 1100 },
  { date: "03/2023", vnindex: 950 },
  { date: "06/2023", vnindex: 1150 },
  { date: "09/2023", vnindex: 1050 },
  { date: "2024", vnindex: 1180 },
  { date: "03/2024", vnindex: 1280 },
  { date: "06/2024", vnindex: 1190 },
  { date: "09/2024", vnindex: 1290 },
  { date: "02/01/2025", vnindex: 1477, expectation: 1616.75 },
];

const VNIndexChart = () => (
   <div className="bg-[#1a1a1a] rounded-2xl p-4 h-full shadow-inner text-white relative border border-yellow-400/30 select-none">
    <div className="flex justify-between items-center mb-3 flex-shrink-0">
      <h2 className="flex items-center text-2xl font-extrabold text-yellow-400 tracking-wide">VNIndex Và Kỳ Vọng</h2>
        <span className="text-gray-400 cursor-pointer text-lg">ⓘ</span>
         <div className="flex items-center space-x-4">
        <div className="flex items-center">
          <span className="w-4 h-1 bg-[#4ade80] rounded mr-2"></span>
          <span className="text-sm">VN Index</span>
        </div>
        <div className="flex items-center">
          <span className="w-4 h-1 bg-[#4a90e2] rounded mr-2"></span>
          <span className="text-sm">Kỳ Vọng</span>
        </div>
      </div>
      </div>

    <ResponsiveContainer width="100%" height="90%">
      <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid stroke="#333" strokeDasharray="3 3" />

        <XAxis
          dataKey="date"
          stroke="#555"
          tick={{ fill: "#999", fontSize: 12 }}
          tickFormatter={(tick) => {
            if (tick === "02/01/2025") return "02/01/2025";
            if (tick.length === 4) return tick;
            return "";
          }}
          padding={{ left: 20, right: 20 }}
        />

        <YAxis
          stroke="#555"
          tick={{ fill: "#999", fontSize: 12 }}
          domain={[900, 1700]}
          tickCount={7}
          orientation="right"
          tickLine={false}
          axisLine={false}
          mirror={true}
        />

        <Tooltip
          contentStyle={{
            backgroundColor: "#222",
            border: "1px solid #444",
            borderRadius: "5px",
          }}
          itemStyle={{ color: "#fff" }}
          labelStyle={{ color: "#fff" }}
          formatter={(value, name) => {
            if (name === "vnindex") return [`${value.toFixed(2)}`, "VN Index"];
            if (name === "expectation")
              return [`${value.toFixed(2)}`, "Kỳ vọng 12 tháng"];
            return value;
          }}
        />

        <Line
          type="monotone"
          dataKey="vnindex"
          stroke="#4ade80"
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 6, fill: "#4ade80", stroke: "#fff", strokeWidth: 2 }}
        />

        <Line
          type="monotone"
          dataKey="expectation"
          stroke="#4a90e2"
          strokeWidth={2}
          strokeDasharray="5 5"
          dot={false}
          activeDot={{ r: 6, fill: "#4a90e2", stroke: "#fff", strokeWidth: 2 }}
        />

        <ReferenceLine
          x="02/01/2025"
          stroke="#999"
          strokeDasharray="3 3"
          ifOverflow="extendDomain"
        >
          <Label
            value="02/01/2025"
            position="top"
            fill="#999"
            fontSize={12}
          />
        </ReferenceLine>

        {/* Gắn nhãn dữ liệu cuối cùng (bên phải biểu đồ) */}
        <Label
          value="1,528.19"
          position="insideRight"
          offset={-45}
          fill="#4ade80"
          fontSize={14}
        />
        <Label
          value="1,477.00"
          position="insideRight"
          offset={-25}
          fill="#999"
          fontSize={14}
        />
        <Label
          value="1,412.85"
          position="insideRight"
          offset={-5}
          fill="#999"
          fontSize={14}
        />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

export default VNIndexChart;
