import React from 'react';
import ApexCharts from 'react-apexcharts';

const preprocessNotificationData = (notifications) => {
    // Ensure notifications is an array
    if (!Array.isArray(notifications)) {
        console.error("Expected notifications to be an array");
        return { dates: [], series: [] };
    }

    const dates = [];
    const notificationCounts = {};

    notifications.forEach(notification => {
        const date = new Date(notification.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
        const type = notification.type;

        if (!dates.includes(date)) {
            dates.push(date);
        }

        if (!notificationCounts[date]) {
            notificationCounts[date] = {};
        }

        if (!notificationCounts[date][type]) {
            notificationCounts[date][type] = 0;
        }

        notificationCounts[date][type] += 1;
    });

    // Prepare series data
    const series = Object.keys(notificationCounts[dates[0]] || {}).map(type => {
        return {
            name: type,
            data: dates.map(date => notificationCounts[date][type] || 0)
        };
    });

    return { dates, series };
};

const NotificationTrends = ({ notifications }) => {
    // Preprocess the notifications data
    const { dates, series } = preprocessNotificationData(notifications || []);

    const options = {
        chart: {
            type: 'line',
            height: 350
        },
        xaxis: {
            categories: dates
        },
        colors: ['#546E7A', '#FF5722', '#00BCD4'],
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
        legend: {
            position: 'top',
            horizontalAlign: 'left'
        },
        title: {
            text: 'Notification Trends',
            style: {
                fontSize:  '20px',
                fontWeight:  'bold',
                fontFamily:  undefined,
                color:  '#263238'
            },
        }
    };

    return (
        <div className="p-4 bg-white shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
            <ApexCharts options={options} series={series} type="line" height={350} />
        </div>
    );
};

export default NotificationTrends;
