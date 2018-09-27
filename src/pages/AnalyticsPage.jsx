import React, { Component } from 'react'
import styled from 'styled-components'
import Vimeo from 'react-vimeo'
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
import videoList from '../utils/videoList.json';

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

const VideoMainCardHeader = styled.div`
    display: flex;
    align-items: baseline;

    h1{
        margin: 0
    }

    small{
        opacity: .5;
        margin-left: 1rem;
        cursor: pointer;
    }
    small:hover{
        text-decoration: underline;
    }    
`

const SectionCard = styled(Card) `
    margin-bottom: 1.5rem;
`

const SubSectionHeading = styled.h2`
    margin: 0;
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

class AnalyticsPage extends Component {

    renderMainCard = videoMetadata => {

        const CardHeader = <VideoMainCardHeader>
            <h1>{videoMetadata.title}</h1>
            <small>[#{videoMetadata.id}]</small>
        </VideoMainCardHeader>

        return <SectionCard title={CardHeader}>
            <p>
                {videoMetadata.description}
            </p>
        </SectionCard>
    }

    renderOverview = response => <div>
        <h3>Overview</h3>
        <p>{response}</p>
    </div>

    renderAnalyticsCard = () => {

        const Point = styled.div`
            margin: 1rem;
            
            strong{
                display: block;
            }
        `

        const analysisPoints = [
            {
                heading: `renderAnalyticsCard`,
                result: `asdfnas asdh aosda sdjnasi fpoas fpas dohasudgask`
            }
        ]

        const AnalysisPoint = ({ heading, result }) => <Point>
            <strong>{heading}</strong>
            {result}
        </Point>

        return <SectionCard title="Basic Analysis">
            {analysisPoints.map(point => <AnalysisPoint {...point} />)}
        </SectionCard>
    }


    renderActivityChartCard = () => <SectionCard
        title={
            <SubSectionHeading>Activity Chart</SubSectionHeading>
        }
    >
        {this.renderOverview(
            `Lorem ipsum dolor sit amet, pro errem virtute ornatus an. 
            In legimus deterruisset mel. Quo te labitur dissentias, cum simul necessitatibus ad, 
            timeam scriptorem ad vel. No pro odio natum eripuit, liber homero vel cu, his unum dolorum ut`
        )}
        <ScrollChartWrap>
            <LineChart width={uvChartData.length * 5} height={250} data={uvChartData}>
                <YAxis />
                <Tooltip />
                <Line
                    activeDot={{ r: 1 }}
                    type="monotone" dataKey="activity" stroke="#8884d8"
                />
            </LineChart>
        </ScrollChartWrap>
    </SectionCard>

    renderCompletionChartCard = () => <SectionCard
        title={
            <SubSectionHeading>Completion Rate</SubSectionHeading>
        }
    >
        {this.renderOverview(
            `Lorem ipsum dolor sit amet, pro errem virtute ornatus an. 
            In legimus deterruisset mel. Quo te labitur dissentias, cum simul necessitatibus ad, 
            timeam scriptorem ad vel. No pro odio natum eripuit, liber homero vel cu, his unum dolorum ut`
        )}
        <ChartWrap>
            <LineChart width={850} height={250} data={completionChartData}>
                <XAxis dataKey="timestamp" />
                <YAxis label={{ value: 'No. of users', angle: -90, position: 'insideStart' }} />
                <Tooltip />
                <Line
                    activeDot={{ r: 1 }}
                    type="monotone" dataKey="completion" stroke="#8884d8"
                />
            </LineChart>
        </ChartWrap>
    </SectionCard>

    renderLocationInsightsCard = () => <SectionCard
        title={
            <SubSectionHeading>Location Insights</SubSectionHeading>
        }
    >
        <ChartWrap>
            <PieChart width={800} height={400}>
                <Pie
                    data={recordsChartData} cx={400} cy={200}
                    innerRadius={150} outerRadius={180} fill="#82ca9d"
                    paddingAngle={5}
                >
                    {
                        recordsChartData.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]} />)
                    }
                </Pie>
                <Tooltip />
                <Legend align="right" height={36} />
            </PieChart>
        </ChartWrap>
    </SectionCard>

    renderHeatmapCard = () => {
        const Player = styled(Vimeo) `
            width: 100%;
            height: ${window.innerWidth * .55}px;
        `

        return <SectionCard
            title={
                <SubSectionHeading>Heatmap</SubSectionHeading>
            }
        >
            {this.renderOverview(
                `Lorem ipsum dolor sit amet, pro errem virtute ornatus an. 
        In legimus deterruisset mel. Quo te labitur dissentias, cum simul necessitatibus ad, 
        timeam scriptorem ad vel. No pro odio natum eripuit, liber homero vel cu, his unum dolorum ut`
            )}


            <Player videoId={`292207203`} />
        </SectionCard>
    }

    render() {
        const videoId = this.props.match.params.id;

        const videoMetadata = videoList.find(({ id }) => id == videoId)

        return (
            <Container>
                {this.renderMainCard(videoMetadata)}

                {this.renderHeatmapCard()}
                {/* {this.renderAnalyticsCard()} */}

                {this.renderActivityChartCard()}

                {this.renderCompletionChartCard()}

                {this.renderLocationInsightsCard()}
            </Container>
        )
    }
}

export default AnalyticsPage
