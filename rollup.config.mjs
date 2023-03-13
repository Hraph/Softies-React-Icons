import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import copy from 'rollup-plugin-copy';

const packages = [
    "core-icons",
    "custom-icons",
]

const configs = packages.map((pkg) => ({
    input: `packages/${pkg}/build/index.js`,
    output: [
        {
            file: `packages/${pkg}/dist/cjs/index.js`,
            format: 'cjs',
        },
        {
            dir: `packages/${pkg}/dist`,
            format: 'es',
            preserveModules: true,
        },
    ],
    external: ['react'],
    plugins: [
        resolve(),
        babel({
            exclude: 'node_modules/**',
            babelHelpers: 'bundled',
            presets: ['@babel/preset-env', '@babel/preset-react'],
        }),
        commonjs(),
        copy({
            targets: [
                { src: `packages/${pkg}/build/index.d.ts`, dest: `packages/${pkg}/dist` },
            ]
        })
    ],
}));

export default configs;