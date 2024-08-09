import React from 'react';
import ApexCharts from 'react-apexcharts';

const JobApplicationStats = ({ data }) => {
    const options = {
        chart: {
            type: 'bar',
            height: 350
        },
        xaxis: {
            categories: data.jobTitles
        },
        plotOptions: {
            bar: {
                horizontal: false
            }
        },
        colors: ['#FF4560'],
        dataLabels: {
            enabled: true
        },
        grid: {
            show: true
        },
        title: {
            text: 'Job Application Statistics',
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
            name: 'Applications',
            data: data.applicationCounts
        }
    ];

    return (
        <div className="p-4 bg-white shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
            <ApexCharts options={options} series={series} type="bar" height={350} />
        </div>
    );
};

export default JobApplicationStats;
