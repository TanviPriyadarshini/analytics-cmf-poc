const fs = require('fs');

const UV_DATA_FOLDER = '../uv_data/';

const generateActivityData = data => {
    let activityData = data
        .map(([u, v], i) => {
            if (i === 0) return [0, 0];
            const [prev_u, prev_v] = data[i - 1]
            return [u - prev_u, v - prev_v]
        })
        .map(([u, v]) => ([parseFloat((u * 10000).toFixed(2)), parseFloat((v * 10000).toFixed(2))]))
        .map(([u, v]) => Math.pow(Math.pow(u, 2) + Math.pow(v, 2), .5))


    fs.writeFileSync('sampleactivityData.json', JSON.stringify(activityData, null, 2))
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