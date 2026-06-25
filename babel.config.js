export default api => {
    let presets = [
        [
            "@babel/preset-env",
            {
                targets: { node: "current" }, modules: "commonjs"
            }
        ],
        [
            "@babel/preset-react",
            {
                runtime: "automatic"
            }
        ]
    ];

    let plugins = [
        "lodash",
        "@babel/plugin-transform-property-literals"
    ];

    switch (api.env()) {
        case "test": {
            plugins.push("istanbul");
            break;
        }

        case "server": {
            presets = [
                [
                    "@babel/preset-env",
                    {
                        targets: { node: "current" }, modules: "commonjs"
                    }
                ],
                [
                    "@babel/preset-react",
                    {
                        runtime: "automatic"
                    }
                ]
            ];
            break;
        }
    }

    return {
        plugins,
        presets
    };
};
