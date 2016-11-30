var path = require("path");

module.exports = {
    entry: "./src/app.js",
    output: {
        path: __dirname + "/js",
        filename: "bundle.js"
    },
    node : {
        console: true,
    }
}
