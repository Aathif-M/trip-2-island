/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        fontFamily: {
            serif: ['"Cormorant Garamond"', 'serif'],
            sans: ['"Quicksand"', 'sans-serif'],
        },
        extend: {
            colors: {
                primary: "#1A3628", // Deep Forest Green
                sand: "#F4F1EB",    // Warm Sand
                accent: "#C0573E",  // Terracotta
                ocean: "#244C5A",   // Ocean Blue
                gold: "#D4AF37",    // Soft Gold
            },
            flex: {
                '2': '2 2 0%'
            }
        },
    },
    plugins: [],
}
