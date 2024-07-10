/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class', // Enables class-based dark mode
    content: [
        './src/**/*.{js,jsx,ts,tsx}', // Adjust this according to your project structure
    ],
    theme: {
        extend: {
            fontFamily: {
                customFont: ['Brush Script MT', 'Brush Script Std', "sans-serif"],
            },
            colors: {
                'custom-hover': 'var(--customColorTwo)',
            },
        },
    },
    plugins: [],
}