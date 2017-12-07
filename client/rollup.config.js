import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';

export default {
    input: 'client/main.js',
    output: {
        file: 'public/bundle.js',
        format: 'iife'
    },
    sourceMap: 'inline',
    plugins: [
        resolve({ browser: true }),
        babel({ exclude: 'node_modules/**' }),
        replace({
          'process.env.NODE_ENV': JSON.stringify('production')
        }),
        commonjs(),
    ],
};