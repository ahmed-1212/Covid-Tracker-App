import React, {useState, useEffect} from 'react';
import style from './Chart.module.sass'

import {Line, Bar} from 'react-chartjs-2'
import {fetchDailyData} from '../../api/index';

const Chart = ({data: {confirmed, recovered, deaths}, country}) => {
    const [dailyData, setDataDaily] = useState([]);

    useEffect(() => {
        const fetchAPI = async () => {
            setDataDaily(await fetchDailyData());
        }

        fetchAPI();
    }, [])


    const lineChart = (
        dailyData.length ? (
            <Line 
                data={{
                    labels: dailyData.map(({date}) => date),
                    datasets: [{
                        data: dailyData.map(({confirmed}) => confirmed),
                        label: 'Infected',
                        borderColor: '#3333ff',
                        fill: true
                    }, {
                        data: dailyData.map(({deaths}) => deaths),
                        label: 'Deaths',
                        borderColor: 'red',
                        backgroundColor: 'rgba(255, 0, 0, .5)',
                        fill: true
                    }]
                }}
            />

        ) : null
    )

    const barChart = (
        confirmed ? 
        (
        <Bar 
            data={{
                labels: ['Infected', 'Recovered', 'Deaths'],
                datasets: [{
                    label: 'Pepole',
                    backgroundColor: ['rgba(0, 0, 255, .5)', 'rgba(0, 255, 0, .5)', 'rgba(255, 0, 0, .5)'],
                    data: [confirmed.value, recovered.value, deaths.value]
                }]
            }}
            options={{
                legends: {display: false},
                title: {display: true, text: `Current state of ${country}`}
            }}
        />
        ) : null
    )

    
    return (
        <div className={style.container}>
            {country ? barChart : lineChart}
        </div>
    )
}

export default Chart;