import React from 'react';
import ApexCharts from 'react-apexcharts';

const RoleDistribution = ({ members }) => {
    const roleCounts = members.reduce((acc, member) => {
        const role = member.roleName;
        if (role) {
            acc[role] = (acc[role] || 0) + 1;
        }
        return acc;
    }, {});

    // Prepare the data for the chart
    const roles = Object.keys(roleCounts);
    const counts = Object.values(roleCounts);
    const ownerRole = 'Owner';
    const ownerCount = 1;
    const updatedRoles = [ownerRole, ...roles];
    const updatedCounts = [ownerCount, ...counts];
    const options = {
        chart: {
            type: 'pie',
            height: 350
        },
        colors: ['#008FFB', '#FF4560', '#00E396', '#775DD0'],
        dataLabels: {
            enabled: true
        },
        legend: {
            position: 'bottom'
        },
        title: {
            text: 'Role Distribution',
            style: {
                fontSize:  '20px',
                fontWeight:  'bold',
                fontFamily:  undefined,
                color:  '#263238'
            },
        },

    };

    return (
        <div className="p-4 bg-white shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
            <ApexCharts options={{ ...options, labels: updatedRoles }} series={updatedCounts} type="pie" height={350} />
        </div>
    );
};

export default RoleDistribution;
