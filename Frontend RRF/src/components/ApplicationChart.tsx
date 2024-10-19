import React from 'react';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import '../styles/ApplicationChart.css';

interface ApplicationData {
  name: string;
  value: number;
}
const data: ApplicationData[] = [
  { name: 'Shortlisted', value: 942 },
  { name: 'Hired', value: 25 },
  { name: 'Rejected', value: 2452 }
];

const COLORS = ['#0088FE', '#00C49F', '#FF8042'];

const ApplicationChart: React.FC = () => {
  return (
    <div className="application-chart">
      <h3>Application Response</h3>
      <PieChart width={200} height={200}>
        <Pie
          data={data}
          cx={100}
          cy={100}
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
      <div className="application-data">
        <div>Shortlisted: 942</div>
        <div>Hired: 25</div>
        <div>Rejected: 2452</div>
      </div>
    </div>
  );
};

export default ApplicationChart;
