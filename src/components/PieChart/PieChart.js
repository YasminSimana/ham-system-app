import React, { useEffect, useState } from 'react';
import { Pie } from "react-chartjs-2";
import Parse from 'parse';
import UserModel from '../../models/UserModel';

function PieChart(props) {
    const {voting, isResData, activeUser} = props;
    const [usersArr, setUsersArr] = useState(null);
    console.log("chart", voting)

    let dataArr = [];
    // let usersArr = [];

    useEffect(()=> {
        async function fetchUsersData() {
            const parseUser = Parse.Object.extend('User');
            const query = new Parse.Query(parseUser);
            const community = new Parse.Object.extend('Community');
            community.id = activeUser.community;
            console.log("active user", activeUser)
            query.equalTo("community", activeUser.community);
            query.equalTo("isCommitteeMember", false);
            query.equalTo("deleted", false);
            const parseUsers = await query.find();
            setUsersArr(parseUsers.map(item => new UserModel(item)));
            console.log("users arr", usersArr);
        }

        if (voting) {
            fetchUsersData();
        }
    }, [voting])

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
        console.log("length", usersArr.length, voting.results.length)
        dataArr[0] = usersArr.length;
        dataArr[1] = voting.results.length;
    }

    function getChartData() {
        console.log("calculating chart data",voting.options);
    
        return {
            labels: isResData ? voting.options : ["Voted", "Not"],
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
            {voting ? <Pie data={getChartData}/> : null}
        </div>
    );
}

export default PieChart;