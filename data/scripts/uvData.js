const fs = require('fs');

const UV_DATA_FOLDER = '../uv_data/';

const main = async () => {
    // Importing JSON data
    const JsonFiles = fs.readdirSync(UV_DATA_FOLDER);
    let uvDataFiles = await Promise.all(JsonFiles.map(async fileName => await require(UV_DATA_FOLDER + fileName)))

    let maxLength = 0
    uvDataFiles.forEach(JsonData => { maxLength = Math.max(maxLength, JsonData.length) })

    uvDataFiles = uvDataFiles.map(uvDataJSON => uvDataFiles.map)

}

main()