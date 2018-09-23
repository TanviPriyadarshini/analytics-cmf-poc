"use strict";
const fs = require('fs');

const UV_DATA_FOLDER = '../uv_data/';
const VARIANCE = .85

const generateActivityData = data => {
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

const main = async () => {
    // Importing JSON data
    const JsonFiles = fs.readdirSync(UV_DATA_FOLDER);
    let uvDataFiles = await Promise.all(JsonFiles.map(async fileName => await require(UV_DATA_FOLDER + fileName)))

    let maxLength = 0
    uvDataFiles.forEach(JsonData => { maxLength = Math.max(maxLength, JsonData.length) })

    const sampleActivityData = generateActivityData(uvDataFiles[0])

}

main()