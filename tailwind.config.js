export default {
    content: [
      "./index.html",
      "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          primary: 'var(--primary-color)',
          primaryBlack:'var(--primary-black-color)',
          secoundaryBlack:'var(--secondary-black-color)',
          primaryBlue:'var(--primary-blue-color)',
          primaryGreen:'var(--primary-green-color)',
          primarySlate:'var(--primary-slate-color)',
        },
      },

    },
    plugins: [],
  }