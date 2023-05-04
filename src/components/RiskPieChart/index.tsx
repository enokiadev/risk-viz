import { PIE_CHART_COLORS, RADIAN } from "@/constants"
import { CustomLabel, IRiskPieChart } from "@/interfaces"
import { FC } from "react"
import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from "recharts"


const RiskPieChart: FC<IRiskPieChart> = (props) => {
  const renderCustomizedLabel = (values: CustomLabel) => {
    const { cx, cy, midAngle, innerRadius, outerRadius, percent } = values
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5
    const x = cx + radius * Math.cos(-midAngle * RADIAN)
    const y = cy + radius * Math.sin(-midAngle * RADIAN)

    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} className="text-[10px]" dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    )
  }

  return <>
    <h2 className='font-bold mt-20'>Risk rating chart</h2>
    <ResponsiveContainer width={380} height='70%'>
      <PieChart width={500} height={700}>
        <Legend layout="vertical" />
        <Pie
          data={props.data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={150}
          fill="#8884d8"
          dataKey="value">
          {props.data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={PIE_CHART_COLORS[index % PIE_CHART_COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  </>
}

export default RiskPieChart 