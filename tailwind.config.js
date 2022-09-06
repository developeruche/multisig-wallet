module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    colors: {
      // primary: '#080808',
      // base: '#1F1C17',
      // base90: '#1C1916',
      // base80: '#181614',
      // base70: '#100F0E',
      white: '#ffffff',
    },
    // fontFamily: {
    //   primary: ['DM Sans', 'sans-serif'],
    //   secondary: ['Poppins', 'sans-serif'],
    // },
    extend: {
      boxShadow: {
        '2xl': '0px 4px 48px rgba(32, 51, 160, 0.08)',
      },
      animation: {
        spin: 'spin 2s linear infinite',
      },
    },
  },
  plugins: [],
}
