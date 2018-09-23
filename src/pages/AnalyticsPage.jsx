import React, { Component } from 'react'
import { LineChart, PieChart } from 'react-chartkick'
import Chart from 'chart.js'

class AnalyticsPage extends Component {
    render() {
        return (
            <div>
                <LineChart data={{ "2017-05-13": 2, "2017-05-14": 5 }} />
            </div>
        )
    }
}

export default AnalyticsPage