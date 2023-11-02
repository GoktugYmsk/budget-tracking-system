import React, { useState } from "react";
import "./index.scss";

function Content() {
    const [data, setData] = useState([]);
    const [period, setPeriod] = useState("daily");

    const backendData = {
        daily: [10, 20, 15, 30, 25],
        weekly: [70, 60, 80, 75, 90],
        monthly: [300, 350, 400, 380, 420],
    };

    const handleChangePeriod = (newPeriod) => {
        setPeriod(newPeriod);
    };

    const renderChart = () => {
        const chartData = backendData[period];

        // Verileri SVG elemanlarıyla çizgi grafiği olarak oluştur
        const minX = 0;
        const maxX = chartData.length - 1;
        const minY = Math.min(...chartData);
        const maxY = Math.max(...chartData);

        const chartWidth = 500;
        const chartHeight = 300;
        const xScale = chartWidth / maxX;
        const yScale = chartHeight / (maxY - minY);

        const path = chartData.map((value, index) => {
            const x = index * xScale;
            const y = (maxY - value) * yScale;
            return `${x},${y}`;
        });

        return (
            <svg width={chartWidth} height={chartHeight}>
                <polyline
                    fill="none"
                    stroke="blue"
                    strokeWidth="2"
                    points={path.join(" ")}
                />
            </svg>
        );
    };

    return (
        <div className="container-content">
            <div className="container-content__category">Category</div>
            <div className="container-content__category__time">
                <h1>Income and Expense Chart</h1>
                <div>
                    <button onClick={() => handleChangePeriod("daily")}>Daily</button>
                    <button onClick={() => handleChangePeriod("weekly")}>Weekly</button>
                    <button onClick={() => handleChangePeriod("monthly")}>Monthly</button>
                </div>
                <div className="chart-container">{renderChart()}</div>
            </div>
        </div>
    );
}

export default Content;
