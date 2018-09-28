import React, { Component } from 'react'
import styled from 'styled-components'
import ReactPlayer from 'react-player'
import {
    LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
    PieChart, Pie, Legend, Sector, Cell
} from 'recharts';

import { Container } from '../sharedComponents/commonStyles'

import { Card, Tag, Icon } from 'antd'

// data
import uvData from '../utils/sampleactivityData.json';
import completionData from '../utils/completionRateObject.json';
import recordsData from '../utils/retinad-data.json';
import videoList from '../utils/videoList.json';
import LeftRightMetaData from '../utils/leftright-metadata.json';

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

    renderOverview = (response, heading = 'Overview') => <div>
        <h3>{heading}</h3>
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
            `Your content is too slow, many viewers are fatigued out of the experience.`
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
            `Great work! Your content is interesting and majority of the audience finished to the end!`
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
                    dataKey='value'
                    data={recordsChartData} cx={400} cy={200}
                    innerRadius={150} outerRadius={180} fill="#82ca9d"
                    paddingAngle={5}
                >
                    {
                        recordsChartData.map((entry, index) => <Cell key={index} fill={COLORS[index % COLORS.length]} />)
                    }
                </Pie>
                <Tooltip />
                <Legend align="right" height={36} />
            </PieChart>
        </ChartWrap>
    </SectionCard>

    renderHeatmapCard = () => {

        const Player = styled(ReactPlayer) `
            width: 100% !important;
            height: 75vw !important;

            position: relative;

            iframe{
                width: 100% !important;
                height: 100% !important;
            }
        `
        const CenterButton = styled.div`
            position: absolute;
            top: 50%;
            left: 50%;
            
            transform: translateX(-50%) translateY(-50%);
        `
        const PlayButton = () => <CenterButton>
            <Icon type="play-circle" height={40} width={40} theme="filled" />
        </CenterButton>

        return <SectionCard
            title={
                <SubSectionHeading>Heatmap</SubSectionHeading>
            }
        >
            {this.renderOverview(
                ` Your content make good use of peripherals but could be more engaging with more attention cues and interactive direction.`
            )}


            <Player url={`https://vimeo.com/292207203`} />
        </SectionCard>
    }

    renderFilmAnalysisCard = () => {
        const { palette } = LeftRightMetaData

        const PaletteBox = styled.div`
            display: flex;
            align-items: stretch;
            height: 120px;
            overflow-x: scroll;
            width: 100%;
            padding-bottom: .9rem;
        `

        const PaletteStrip = styled.div`
            flex: 1;
            min-width: 2px;
            background-color: ${props => `#${props.color}`};
        `

        const Category = styled(Tag) `
            margin: .3rem .4rem;
        `

        return <SectionCard
            title={
                <SubSectionHeading>Film Analysis</SubSectionHeading>
            }
        >
            {this.renderOverview(
                `The following are the predominant colors in each frame of your content.`,
                `Palette Overview`
            )}

            <PaletteBox>
                {palette.sort().map((color, i) => <PaletteStrip key={i} color={color} />)}
            </PaletteBox>
            <br />
            <br />
            {this.renderOverview(
                ``,
                `Tags Overview`
            )}

            {LeftRightMetaData.categories.map(category => <Category key={category}>{category}</Category>)}

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

                {this.renderFilmAnalysisCard()}
            </Container>
        )
    }
}

export default AnalyticsPage
