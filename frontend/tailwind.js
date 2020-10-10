module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  }, 
  important: true,
  theme: {
     boxShadow: {
      xs: '0 0 0 1px rgba(0, 0, 0, 0.05)',
      sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      default: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
      md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
      outline: '0 0 0 3px rgba(66, 153, 225, 0.5)',
      focus: '0 0 0 3px rgba(66, 153, 225, 0.5)',
      none: 'none',
      white: '0 1px 3px 0 rgba(255, 255, 255, 0.1), 0 1px 2px 0 rgba(255, 255, 255, 0.76)'
    },
    extend: {
      height: {
        '1/2': '50vh',
        '3/4': '75vh',
        lg: '24px',
        xl: '48px',
      },
      width: {
         '1/7': '14.2857143%',
         '2/7': '28.5714286%',
         '3/7': '42.8571429%',
         '4/7': '57.1428571%',
         '5/7': '71.4285714%',
         '6/7': '85.7142857%',
      },
      colors: {
        gray: {
          '50': '#111',
        }
      }
    },
    fontFamily: {
      'sans': 'Times New Roman'
    }
  
  }
}
