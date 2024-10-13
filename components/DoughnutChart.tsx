"use client"
//documentation is the 10X developer skill
//when  you use the diocumentation you become independent
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);


//you are passing a accounts
const DoughnutChart = ({ accounts }: DoughnutChartProps) => {
    const accountNames = accounts.map((a) => a.name);
    const balances = accounts.map((a) => a.currentBalance)



//this is the structure of the documentation
    const data = {
        datasets: [
            {
                label: 'Banks',
                data :[1250,100 ,2345],
                // data: balances,
                backgroundColor: ['#0747b6', '#2265d8', '#2f91fa']
            }
        ],
        // labels: accountNames
        labels :["Bank 1 ", "Bank 2 ", "Bank 3 "]
    }

    return <Doughnut
        data={data}
        options={{
            cutout: '60%',
            plugins: {
                legend: {
                    display: false
                }
            }
        }}
    />
}

export default DoughnutChart