/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
    content: [
        "./public/*.html",
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    safelist: [
        'max-w-sm',
        'max-w-md',
        'max-w-lg',
        'max-w-xl',
        'max-w-2xl',
        'max-w-3xl',
        'max-w-4xl',
        'max-w-5xl',
        'max-w-6xl',
        'max-w-7xl',
        'max-w-full',
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Poppins', ...defaultTheme.fontFamily.sans]
            },
            fontSize: {
                xxs: ['.5rem', '.75rem']
            }
        },
    },
    plugins: [
        require('@tailwindcss/forms')
    ]
}