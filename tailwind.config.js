/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}"
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter'],
            },
            colors: {
                primary: '#F5F2F2'
            },
            backgroundColor: {
                yellow: '#FFDB63',
                darkYellow: '#FFDB69'
            }
        },
    },
    plugins: [],
}