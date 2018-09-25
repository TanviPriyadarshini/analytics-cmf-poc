import React, { Component } from 'react'
import styled from 'styled-components'
import {
    LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
    PieChart, Pie, Legend, Sector, Cell
} from 'recharts';

import { Container } from '../sharedComponents/commonStyles'

import { Card } from 'antd'

// data
import uvData from '../utils/sampleactivityData.json';
import completionData from '../utils/completionRateObject.json';
import recordsData from '../utils/retinad-data.json';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
const RADIAN = Math.PI / 180;

const ScrollChartWrap = styled.div`
    width: inherit;
    overflow-x: scroll;
    overflow-y: hidden;
`

const ChartWrap = styled.div`
    width: 100%;
    min-height: 250px;
`

const uvChartData = uvData
    .filter(activity => activity < 500)
    // TODO: convert the index into timeStamp
    .map((activity, index) => ({ index: index / 100, activity: parseFloat(activity.toFixed(2)) }))

const completionChartData = Object.keys(completionData)
    .map(perc => ({
        timestamp: perc + `%`,
        completion: completionData[perc] || 0
    }))

const recordsdataObject = {}
const locations = recordsData.map(rec => rec._id)


locations.forEach(l => { recordsdataObject[l] = recordsdataObject[l] ? recordsdataObject[l] + 1 : 1 })
const recordsChartData = Object.keys(recordsdataObject)
    .map(location => ({
        value: recordsdataObject[location] || 0,
        name: location
    }))

console.log({ recordsChartData })

class AnalyticsPage extends Component {
    render() {
        return (
            <Container>
                <Card title="Activity Chart">
                    <ScrollChartWrap>
                        <LineChart width={uvChartData.length * 5} height={250} data={uvChartData}>
                            {/* <XAxis /> */}
                            <YAxis />
                            <Tooltip />
                            <Line
                                activeDot={{ r: 1 }}
                                type="monotone" dataKey="activity" stroke="#8884d8"
                            />
                        </LineChart>
                    </ScrollChartWrap>
                </Card>
                <br />
                <br />
                <Card title="Completion Rate">
                    <ChartWrap>
                        <LineChart width={850} height={250} data={completionChartData}>
                            <XAxis dataKey="timestamp" />
                            <YAxis />
                            <Tooltip />
                            <Line
                                activeDot={{ r: 1 }}
                                type="monotone" dataKey="completion" stroke="#8884d8"
                            />
                        </LineChart>
                    </ChartWrap>
                </Card>
                <br />
                <br />
                <Card title="Location Insights">
                    <ChartWrap>
                        <PieChart width={800} height={400}>
                            <Pie
                                // dataKey={'freq'}
                                data={recordsChartData} cx={500} cy={200}
                                innerRadius={40} outerRadius={80} fill="#82ca9d"
                            />
                            <Tooltip />
                            <Legend verticalAlign="center" align="right" height={36} />
                        </PieChart>
                    </ChartWrap>
                </Card>
            </Container>
        )
    }
}

export default AnalyticsPage