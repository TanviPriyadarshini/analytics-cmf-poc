"use strict";
const fs = require('fs');

const UV_DATA_FOLDER = '../uv_data/';
const VARIANCE = .85

const generateActivityData = data => {

    const avg = (v) => v.reduce((a, b) => a + b, 0) / v.length;

    const smoothOut = (vector, variance) => {
        var t_avg = avg(vector) * variance;
        var ret = Array(vector.length);
        for (var i = 0; i < vector.length; i++) {
            (function () {
                var prev = i > 0 ? ret[i - 1] : vector[i];
                var next = i < vector.length ? vector[i] : vector[i - 1];
                ret[i] = avg([t_avg, avg([prev, vector[i], next])]);
            })();
        }
        return ret;
    }

    let activityData = data
        .map(([u, v], i) => {
            if (i === 0) return [0, 0];
            const [prev_u, prev_v] = data[i - 1]
            return [u - prev_u, v - prev_v]
        })
        .map(([u, v]) => ([parseFloat((u * 1000).toFixed(2)), parseFloat((v * 1000).toFixed(2))]))
        .map(([u, v]) => Math.pow(Math.pow(u, 2) + Math.pow(v, 2), .5))

    activityData = smoothOut(activityData, VARIANCE)

    fs.writeFileSync('sampleactivityData.json', JSON.stringify(activityData, null, 2))
}

const generateCompletionRate = uvDataFiles => {
    const sessionLengths = uvDataFiles.map(JsonData => JsonData.length)
    const videoLength = ((5 * 60) + 31) * 10
    const maxLength = Math.max(...sessionLengths)

    const completionRateObject = {}
    // adding defaults
    new Array(10).fill('').map((_, v) => completionRateObject[(v + 1) * 10] = 0)

    sessionLengths.forEach(points => {
        let percent = Math.floor(points * 100 / 3310)
        percent = percent - (percent % 10)

        completionRateObject[percent]++
    })

    fs.writeFileSync('completionRateObject.json', JSON.stringify(completionRateObject, null, 2))
}

const main = async () => {
    // Importing JSON data
    const JsonFiles = fs.readdirSync(UV_DATA_FOLDER);
    let uvDataFiles = await Promise.all(JsonFiles.map(async fileName => await require(UV_DATA_FOLDER + fileName)))

    uvDataFiles = uvDataFiles.filter(fileData => fileData.length < 10000)

    generateCompletionRate(uvDataFiles)

    // generateActivityData(uvDataFiles[0])
}

main()