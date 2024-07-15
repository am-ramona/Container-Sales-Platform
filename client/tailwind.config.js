const plugin = require('tailwindcss/plugin')

module.exports = {
  important: true,
  purge: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    borderColor: theme => ({
      ...theme('colors'),
      DEFAULT: theme('colors.gray.200', 'currentColor'),
      'primary': '#3490dc',
      'secondary': '#ffed4a',
      'danger': '#e3342f',
    }),

    truncate: {
      lines: {
        2: '2',
        3: '3',
        4: '4'
      }
    },
    fill: theme => ({
      'red': theme('colors.red.500'),
      'green': theme('colors.green.500'),
      'blue': theme('colors.blue.500'),
      'gray': theme('colors.gray.500')
    }),
    screens: {
      xs: "320px",
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    fontFamily: {
      sans: ["Roboto", "sans-serif"],
    },
    // pseudo: { // defaults to {'before': 'before', 'after': 'after'}
    //   'before': 'before',
    //   'after': 'after',
    //   'not-first': 'not(:first-child)',
    // },

    extend: {
      screens: {
        'mdl': '790px',
        // => @media (min-width: 790px) { ... }
      },
      backgroundColor: ({
        'navy': 'rgba(5, 16, 57, 0.6)'
      }),
      maxWidth: {
        275: "275px",
        400: "400px",
        432: "432px",
        530: "530px",
        "3/4": "80%",
        "halfFull": "50%",
        85: "85%"
      },
      minWidth: {
        61.25: '61.25px'
      },
      minHeight: {
        'loader': '100px',
        10: '40px',
        containersSelection: 'calc( 100vh - 104px )'
      },
      spacing: {
        "vLine": "1px",
        3: '3px',
        xs: "6px",
        ten: '10px',
        10: "40px",
        sm: "12px",
        17: "17px",
        18: "18px",
        md: "24px",
        25.5: "25.5px",
        34: "34px",
        37: "37px",
        45: "45px",
        lg: "48px",
        15: "0.938rem",
        21: '21px',
        22: "22px",
        25: "25px",
        30: "30px",
        32: "32px",
        35: "35px",
        38: "38px",
        40: "40px",
        41: "41px",
        44: '44px',
        48: "48px",
        50: "3.125rem",
        60: "60px",
        64: '4rem',
        256: '256px',
        70: '4.375rem',
        75: '75px',
        78: '78px',
        84: '84px',
        88: "88px",
        92: "92px",
        95: '95px',
        xl: "72px",
        100: "100px",
        102: "102px",
        xxl: "120px",
        128: "128px",
        130: "130px",
        144: "36rem",
        151: "151px",
        194: "194px",
        222: '222px',
        269: "269px",
        291: "291px",
        302: "302px",
        305: "305px",
        308: "308px",
        337: "337px",
        365: "22.813rem",
        380: "380px",
        414: "414px",
        432: "432px",
        435: "435px",
        512: "512px",
        616: "616px",
        668: "668px",
        890: "890px",
        "1/10": "10%",
        "3/10": "30%",
        checkoutHeaderButtons: "68px",
        minContent: "min-content",
        maxContent: "max-content",
        containersSelection: 'calc( 100vh - 104px )'
      },
      letterSpacing: {
        tightest: '-0.29px',
        tighter: '-0.26px'
      },
      borderWidth: {
        0.5: "0.5px",
        'userIcon': '0.8px',
        '5': '5px',
        '0': '0 !important'
      },
      borderRadius: {
        "4xl": "2rem",
        "50": "50%",
        "5": "5px"
      },
      boxShadow: {
        alert: '0 0 10px #999',
        alertHover: '0 0 12px #fff',
        tableShadow: '1px 1px 3px 0px rgba(173,173,173,1)'
      },
      margin: {
        "0": "0 !important",
        "-76": "-4.75rem",
        "10": "10px !important",
        40: "40px"
      },
      padding: {
        "17": "17px",
        "25": "25px",
        "50": "50px"
      },
      inset: {
        "-3": "-3px",
        "12": "12px",
        "-7": "-7px",
        "-9": "-9px",
        "65": "65px",
        "50": "50%",
        "-58.55": "-58.55px",
        "-92": "-92px",
        "-186.2": "-186.2px"
      },
      fontSize: {
        9: "9px",
        "seemore": '17px',
        12: '12px',
        13: '13px',
        14: '14px',
        15: '15px',
        17: '17px',
        23: '23px',
        24: '24px',
        "landingPage": "45px"
      },
      colors: {
        "primary-red": "var(--primary-red)",
        "primary-blue": "var(--primary-blue)",
        "secondary-red": "var(--secondary-red)",
        "light-red": "var(--light-red)",
        "secondary-blue": "var(--secondary-blue)",
        "panel-blue": "var(--panel-blue)",
        "link-blue": "var(--link-blue)",
        "light-blue": "var(--light-blue)",
        "lighter-blue": "var(--lighter-blue)",
        "extra-light-blue": "var(--extra-light-blue)",
        "gray": "var(--gray)",
        "gray-2": "var(--gray-2)",
        "primary-gray": "var(--primary-gray)",
        "secondary-gray": "var(--secondary-gray)",
        "light-gray": "var(--light-gray)",
        "casual-gray": "var(--casual-gray)",
        "extra-light-gray": "var(--extra-light-gray)",
        "primary-black": "var(--primary-black)",
        "primary-brown": "var(--primary-brown)",
        "primary-yellow": "var(--primary-yellow)",
        "secondary-yellow": "var(--secondary-yellow)",
        "primary-green": "var(--primary-green)",
        "secondary-green": "var(--secondary-green)",
        "casual-green": "var(--casual-green)",
        "light-green": "var(--light-green)",
        "primary-orange": "var(--primary-orange)",
        "secondary-orange": "var(--secondary-orange)",
        "gray-100": "var(--gray-100)",
        "gray-200": "var(--gray-200)",
        "gray-400": "var(--gray-400)",
        "gray-500": "var(--gray-500)",
        "gray-600": "var(--gray-600)",
        "gray-700": "var(--gray-700)",
        "gray-900": "var(--gray-900)"
      },
      outline: {
        gray: '2px solid #c1c8c9',
        blue: '2px solid #04246A'
      },
      zIndex: {
        modal: 60,
        "modal-backdrop": 50,
        '1': '1',
        navbar: 40,
        "layout-header": 50,
        "desktop-sidebar": 30,
        "mobile-sidebar": 50,
        "mobile-backdrop": 40,
        alert: 50,
        full: 999999
      },
      backgroundImage: {
        // "hero-image": "url('/src/assets/images/saint-exupery_0.jpg')"
      },
      keyframes: {
        fadeinout: {
          '0%, 100%': { opacity: 0 },
          '50%': { opacity: 1 },
        }
      },
      animation: {
        'spin-slow': 'spin 2s linear infinite',
        'fadeinout': 'fadeinout 3s linear forwards'
      },
      gridTemplateColumns: {
        '25Auto': '25px auto',
        'alert': '32px auto 16px',
        'counter': '18px auto 18px',
        'modal': '1fr 16px',
        'modalHeader': 'minmax(145px, 50%) auto',
        '2ColAuto': 'auto auto',
        '2equal': '1fr 1fr',
        '3ColAuto': 'auto auto auto',
        '2FullCols': 'repeat(2, 1fr)',
        '4FullCols': 'repeat(4, 1fr)',
        'formSteps': '1fr 1px 1fr',
        'multiSelectHome': '1fr 1fr 1fr 155px',
        'multiSelect': 'repeat( 2, minmax(auto, 142px) )',
        // 'productListLayout': 'minmax(auto, 335px) minmax(auto, 751px) auto',
        'productListLayout': 'minmax(auto, 335px) auto',
        'manageAgents': 'auto 84px',
        'agentDepots': '54% auto',
        'addAgent': '200px auto',
        'pagination': '28px 28px 28px'
      },
      gridTemplateRows: {
        'confirmation': 'auto 91px auto 45px',
        '3RowsAuto': 'auto auto auto',
        '4Full': 'repeat(4, 1fr)',
        'cart': 'auto 41px',
        '2RowsAuto': 'repeat(2, auto)'
      },
      lineHeight: {
        'extra-loose': '1.1',
        20.8: "1.3rem"
      }
    },
  },

  variants: {
    extend: {
      outline: ["hover", "active"],
      borderWidth: ["hover", "focus"],
      ringColor: ['focus-visible'],
      ringWidth: ['focus-visible'],
    },
  },

  plugins: [
    require('@tailwindcss/forms'),
    require('tailwindcss-truncate-multiline')
      ()
  ],
};
