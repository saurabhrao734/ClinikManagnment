import appoinmentsData from "./appointments.data";

export const seriesData = [
    [{
        name: "age",
        data: appoinmentsData.map((item) => item.age),
    }],
    [{
        name: "gender",
        data: [
            {
                name: "male",
                y: appoinmentsData.filter((item) => item.gender.toLowerCase() === "male").length,
            },
            {
                name: "female",
                y: appoinmentsData.filter((item) => item.gender.toLowerCase() === "female").length,
            },
        ],
    }],
];

export const chartOptions = [
    {
        chart: {
            type: "bar",
            height: 900,
            toolbar: {
                show: true,
            },
        },
        plotOptions: {
            bar: {
                horizontal: true,
            },
        },
        xaxis: {
            categories: appoinmentsData.map((item) => item.name),
        },
        title: {
            text: "Age Distribution",
            align: "center",
            style: {
                fontSize: "20px",
            },
        },
    },
    {
        chart: {
            type: "pie",
            height: "max-content",
            toolbar: {
                show: false,
            },
        },
        plotOptions: {
            pie: {
                startAngle: -90,
                endAngle: 270,
            },
        },
        series: [
            {
                name: "Gender",
                data: [
                    {
                        name: "male",
                        y: appoinmentsData.filter((item) => item.gender.toLowerCase() === "male").length,
                    },
                    {
                        name: "female",
                        y: appoinmentsData.filter((item) => item.gender.toLowerCase() === "female").length,
                    },
                ],
            },
        ],
        title: {
            text: "Gender Distribution",
            align: "center",
            style: {
                fontSize: "20px",
            },
        },
    },
];