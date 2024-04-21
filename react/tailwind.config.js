// tailwind.config.js

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontSize: {
        'h1': '3.5rem', // Domyślny rozmiar dla h1
      },
      fontWeight: {
        'h1': 'bold', // Domyślny styl czcionki dla h1
      },
      textColor: {
        'h1': '#000', // Domyślny kolor tekstu dla h1
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}
