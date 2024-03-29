import terser from '@rollup/plugin-terser';
export default {
    input: "src/index.js",
    output: {
        file: "dist/accordion.min.js",
        format: "cjs"
    },
    plugins: [
        terser()
    ]
}
