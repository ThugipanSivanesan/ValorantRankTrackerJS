const js = require("@eslint/js");

const nodeGlobals = {
    require: "readonly",
    module: "writable",
    exports: "writable",
    process: "readonly",
    console: "readonly",
    __dirname: "readonly",
    __filename: "readonly",
    Buffer: "readonly",
    setTimeout: "readonly",
    setInterval: "readonly",
    clearTimeout: "readonly",
    clearInterval: "readonly",
};

module.exports = [
    {
        ignores: ["node_modules/**", "logs/**"],
    },
    js.configs.recommended,
    {
        files: ["**/*.js"],
        languageOptions: {
            ecmaVersion: 2023,
            sourceType: "commonjs",
            globals: nodeGlobals,
        },
        rules: {
            "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
            "no-empty": ["error", { allowEmptyCatch: true }],
        },
    },
];
