export default {
    globals: ["expect"],
    sort: true,
    fullTrace: true,
    checkLeaks: true,
    require: ["./babel.register.cjs", "./test/01_setup.js", "./test/02_import-all.js"],
    exit: true,
    reporter: "spec"
};
