import js from "@eslint/js";
import importPlugin from "eslint-plugin-import";
import globals from "globals";

export default [
    {
        ignores: [
            "node_modules/**",
            "dist/**",
            "build/**",
            "es5/**",
            "esm/**",
            "docs/**",
            "coverage/**",
            ".nyc_output/**",
            ".serverless/**",
            ".webpack/**",
            ".dynamodb/**",
            ".idea/**"
        ]
    },
    js.configs.recommended,
    {
        files: ["**/*.js"],
        plugins: {
            import: importPlugin
        },
        languageOptions: {
            ecmaVersion: 2022,
            sourceType: "module",
            globals: {
                ...globals.node,
                ...globals.mocha,
                Promise: "readonly"
            }
        },
        settings: {
            "import/resolver": {
                node: {
                    extensions: [".js", ".jsx", ".json"]
                }
            }
        },
        rules: {
            "no-useless-escape": "warn",
            eqeqeq: "error",
            semi: "error",
            quotes: ["error", "double"],
            "import/named": "error",
            "import/export": "error",
            "import/no-mutable-exports": "error",
            "import/first": "error",
            "import/no-duplicates": "error",
            "import/no-unresolved": "error",
            "import/default": "error",
            "no-global-assign": "error"
        }
    }
];
