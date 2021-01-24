import React, { useEffect } from 'react';
import { Pie } from "react-chartjs-2";

function PieChart(props) {
    const {voting, users, isResData, activeUser} = props;
    console.log("chart", voting)

    let dataArr = [];
    let usersArr = [];

    if (users) {usersArr = users.filter(user => user.isCommitteeMember === false)}

    if (voting && isResData) {
        for (let i = 0; i < voting.options.length; i++){
            dataArr[i] = 0;
        }

        for (const res of voting.results) {
            dataArr[voting.options.indexOf(res["vote"])] ++;
        }
        console.log("data", dataArr);
    }

    if (usersArr && voting && !isResData) {
        console.log("length", users, usersArr, usersArr.length, voting.results.length)
        dataArr[0] = voting.results.length;
        dataArr[1] = usersArr.length-voting.results.length;
    }

    function getChartData() {
        console.log("calculating chart data",voting.options);
        console.log(voting.results)
        return {
            labels: isResData ? voting.options : ["Voted", "Not Voted"],
            datasets: [
              {
                label: '# of Recipes',
                data: dataArr,
                backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                ],
                borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                ],
                borderWidth: 1,
              },
            ],
        }
    }

    return (
        <div>
            {voting && ((isResData && voting.results.length > 0) || (!isResData)) ? <Pie data={getChartData}/> : <p>No Data</p>}
        </div>
    );
}

export default PieChart;