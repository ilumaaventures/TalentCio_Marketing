export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#ea7c00',
          hover: '#d47000',
          light: '#fff6ee',
          soft: 'rgba(234, 124, 0, 0.12)',
        },
        ink: '#282828',
        bodyText: '#444444',
        mutedText: '#6c757d',
        lightBg: '#f5f2ef',
        darkBg: '#060606',
        darkSurface: '#252525',
      },
      fontFamily: {
        heading: ['"Nunito Sans"', 'sans-serif'],
        body: ['"Nunito Sans"', 'sans-serif'],
        nav: ['"Nunito Sans"', 'sans-serif'],
        sans: ['"Nunito Sans"', 'sans-serif'],
      },
      borderRadius: {
        'strive-card': '20px',
        'strive-pill': '50px',
      },
      boxShadow: {
        'strive-card': '0 5px 15px rgba(0, 0, 0, 0.05)',
        'strive-card-hover': '0 15px 35px rgba(234, 124, 0, 0.12)',
        'strive-feature': '0 10px 30px rgba(0, 0, 0, 0.06)',
      }
    }
  },
  plugins: []
};

