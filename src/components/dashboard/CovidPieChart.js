import React, { Component } from 'react'
import { PieChart, Pie, Cell } from 'recharts'

export default class CovidPieChart extends Component {

    renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
        const RADIAN = Math.PI / 180,
            radius = innerRadius + (outerRadius - innerRadius) * 0.5,
            x = cx + radius * Math.cos(-midAngle * RADIAN),
            y = cy + radius * Math.sin(-midAngle * RADIAN)

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        )
    }

    render() {
        const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']
        let { confirmed, recovered, deaths } = this.props.data
        let data = [
            { name: 'Active Cases', value: (confirmed.value - (recovered.value + deaths.value)) },
            { name: 'Recovered', value: recovered.value },
            { name: 'Deaths', value: deaths.value }
        ]
        return (
            <PieChart width={500} height={500}>
                <Pie
                    data={data}
                    cx={200}
                    cy={200}
                    outerRadius={150}
                    fill="#8884d8"
                    dataKey="value"
                >
                    {
                        data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index+1]} />)
                    }
                </Pie>
            </PieChart>
        )
    }
}
