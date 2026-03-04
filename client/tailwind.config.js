/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#3b82f6",
                "card-dark": "#141414",
                "border-dark": "#262626",
                "surface-dark": "#141414",
                "background-dark": "#0a0a0a",
                "text-primary": "#EDEDED",
                "text-secondary": "#A1A1AA",
            },
            fontFamily: {
                sans: ["Inter", "sans-serif"],
            },
        },
    },
    plugins: [],
    safelist: [
        {
            pattern: /(bg|text|border|ring)-(indigo|emerald|orange|blue|purple|green|red)-(400|500)(\/(10|20|40))?/,
            variants: ['hover', 'focus', 'group-hover', 'group-hover/bar'],
        },
    ],
}
