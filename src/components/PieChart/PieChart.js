import React from 'react';
import { Pie } from "react-chartjs-2";

function PieChart(props) {
    const {voting, users, isResData} = props;

    let dataArr = [];
    let usersArr = [];

    // useEffect(()=> {
    //     if (users) {
    //         usersArr = users.filter(user => user.isCommitteeMember === false)
    //     }
    // }, [users])

    if (users) {usersArr = users.filter(user => user.isCommitteeMember === false && user.deleted === false)}

    if (voting && isResData) {
        for (let i = 0; i < voting.options.length; i++){
            dataArr[i] = 0;
        }

        for (const res of voting.results) {
            dataArr[voting.options.indexOf(res["vote"])] ++;
        }
    }

    if (voting && !isResData) {
        dataArr[0] = voting.results.length;
        dataArr[1] = usersArr.length-voting.results.length;
    }

    function getChartData() {
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