require("core-js/stable");
require("regenerator-runtime/runtime");

const path = require("path");
const register = require("@babel/register");

const runRegister = register.default || register;

runRegister({
    configFile: path.join(__dirname, "babel.config.js")
});
