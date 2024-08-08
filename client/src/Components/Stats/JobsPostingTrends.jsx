import React from 'react';
import ApexCharts from 'react-apexcharts';

const JobPostingTrends = ({ data }) => {
    const options = {
        chart: {
            type: 'line',
            height: 350
        },
        xaxis: {
            categories: data.dates
        },
        stroke: {
            curve: 'smooth'
        },
        markers: {
            size: 5
        },
        tooltip: {
            enabled: true
        },
        grid: {
            show: true
        },
        colors: ['#008FFB'],
        title: {
            text: 'Job Posting Trends',
            style: {
                fontSize:  '20px',
                fontWeight:  'bold',
                fontFamily:  undefined,
                color:  '#263238'
            },
        }
    };

    const series = [
        {
            name: 'Jobs Posted',
            data: data.values
        }
    ];

    return (
        <div className="p-4 bg-white shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300 ease-in-out transform ">
            <ApexCharts options={options} series={series} type="line" height={350} />
        </div>
    );
};

export default JobPostingTrends;
