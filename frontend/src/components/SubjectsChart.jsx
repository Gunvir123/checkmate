import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register the necessary components for Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const SubjectsChart = ({ subjects }) => {
    let labels = [];
    let dataPoints = [];
    for (const subject of subjects) {
        labels.push(subject[0]);
        dataPoints.push(subject[1]);

    }
    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Attendance',
                data: dataPoints,
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Courses v/s Attendance ',
            },
        },
    };

    return <Bar data={data} options={options} />;
};

export default SubjectsChart;
