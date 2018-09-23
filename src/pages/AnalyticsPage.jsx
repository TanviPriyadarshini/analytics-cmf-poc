import React, { Component } from 'react'
import styled from 'styled-components'
import { LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';

import { Container } from '../sharedComponents/commonStyles'

import { Card } from 'antd'

// data
import uvData from '../utils/sampleactivityData.json';

const ChartWrap = styled.div`
    width: inherit;
    overflow-x: scroll;
    overflow-y: hidden;
`

const data = uvData
    .filter(activity => activity < 500)
    // TODO: convert the index into timeStamp
    .map((activity, index) => ({ index: index / 100, activity: parseFloat(activity.toFixed(2)) }))

console.log({ data })
class AnalyticsPage extends Component {
    render() {
        return (
            <Container>
                <Card title="Activity Chart">
                    <ChartWrap>
                        <LineChart width={data.length * 5} height={250} data={data}>
                            {/* <XAxis /> */}
                            <YAxis />
                            <Tooltip />
                            <Line
                                activeDot={{ r: 1 }}
                                type="monotone" dataKey="activity" stroke="#8884d8"
                            />
                        </LineChart>
                    </ChartWrap>
                </Card>
            </Container>
        )
    }
}

export default AnalyticsPage