import React from 'react';
import './index.scss'

const RenderChart = ({ backendData, period }) => {
    const chartData = backendData[period];
    const maxX = chartData.length - 1;
    const maxY = Math.max(...chartData.map((data) => data.amount));

    const chartWidth = 500;
    const chartHeight = 300;
    const xScale = chartWidth / maxX;
    const yScale = chartHeight / maxY;

    const path = chartData.map((data, index) => {
        const x = index * xScale;
        const y = chartHeight - data.amount * yScale;
        return `${x},${y}`;
    });

    return (
        <div className="chart-container">
            <svg width={chartWidth} height={chartHeight}>
                <polyline
                    fill="none"
                    stroke="blue"
                    strokeWidth="2"
                    points={path.join(" ")}
                />
            </svg>
        </div>
    );
};

export default RenderChart;
