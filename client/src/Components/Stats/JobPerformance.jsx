import React from 'react';
import ApexCharts from 'react-apexcharts';

const JobPerformance = ({ data }) => {
    const options = {
        chart: {
            type: 'area',
            height: 350
        },
        xaxis: {
            categories: data.dates
        },
        colors: ['#00E396'],
        stroke: {
            curve: 'smooth'
        },
        dataLabels: {
            enabled: false
        },
        grid: {
            show: true
        }
    };

    const series = [
        {
            name: 'Application Rate',
            data: data.rates
        }
    ];

    return (
        <div className="p-4 bg-white shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
            <h2 className="text-xl font-semibold mb-4">Job Performance</h2>
            <ApexCharts options={options} series={series} type="area" height={350} />
        </div>
    );
};

export default JobPerformance;
