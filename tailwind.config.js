const { boxShadow } = require('tailwindcss/defaultTheme');
const plugin = require('tailwindcss/plugin');
const path = require('path');
module.exports = {
    future: {
        removeDeprecatedGapUtilities: true,
        purgeLayersByDefault: true
    },
    content: [
        `./components/**/*.{vue,js,ts}`,
        `./layouts/**/*.vue`,
        `./pages/**/*.vue`,
        `./composables/**/*.{js,ts}`,
        `./plugins/**/*.{js,ts}`,
        `./App.{js,ts,vue}`,
        `./app.{js,ts,vue}`,
        `./Error.{js,ts,vue}`,
        `./error.{js,ts,vue}`
    ],
    safelist: [],
    darkMode: 'class', // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                theme: 'var(--theme)',
                text: 'var(--color-text)',
                transparent: 'transparent',
                darkBg: 'var(--color-dark-bg)',
                darkFg: 'var(--color-dark-fg)',
                darkBgAccent: 'var(--color-dark-bg-accent)',
                darkBorder: 'var(--color-dark-border)',
                darkText: 'var(--color-dark-text)',
                darkTextPlaceholder: 'var(--color-dark-text-placeholder)',
            },
            boxShadow: Object.assign(boxShadow, {
                custom:
                    '8px 14px 38px rgba(39, 44, 49, 0.06), 1px 3px 8px rgba(39, 44, 49, 0.03);',
                custom2: '-8px 14px 38px rgba(39, 44, 49, 0.06), -1px 3px 8px rgba(39, 44, 49, 0.03);'
            })
        },
    },
    plugins: [
        require('@tailwindcss/line-clamp'),
        plugin(function({ addUtilities, addComponents, e, prefix, config }) {
            const obj = {};
            // obj[`.line-clamp-1`] = {
            //     'text-overflow': 'ellipsis',
            //     'white-space': 'nowrap',
            //     overflow: 'hidden'
            // };
            addUtilities(obj, {
                variants: ['responsive']
            });
        }),
    ]
}