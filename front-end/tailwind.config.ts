import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			berhanSky: '#C3EBFA',
  			berhanSkyLight: '#EDF9FD',
  			berhanPurple: '#CFCEFF',
  			berhanPurpleLight: '#F1F0FF',
  			berhanYellow: '#FAE27C',
  			berhanYellowLight: '#FEFCE8',
  			pinkishRed: '#FF6F61',
  			teal: '#009688',
  			charcoalGray: '#333333',
  			lightGray: '#D3D3D3',
  			softYellow: '#F6D03E',
  			deepPurple: '#6A0AD6',
  			skyBlue: '#00ADEF',
  			coral: '#FF6F61',
  			mintGreen: '#98FF98',
  			warmBeige: '#F5F5DC',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		height: {
  			'16': '3.6rem',
  			'18': '4.5rem',
  			'200': '200px',
  			'300': '300px',
  			'320': '330px',
  			'370': '370px',
  			'380': '380px',
  			'400': '400px',
  			'500': '500px',
  			'screen-minus-18': 'calc(100vh - 4.5rem)'
  		},
  		width: {
  			'18': '4.5rem',
  			'20': '5rem',
  			'160': '160px',
  			'300': '300px',
  			'320': '330px',
  			'370': '370px',
  			'380': '380px',
  			'400': '400px',
  			'500': '500px',
  			'600': '600px',
  			'623': '623.5px',
  			'700': '700px',
  			'750': '730px',
  			'800': '800px',
  			'1000': '1000px',
  			'1030': '1030px'
  		},
  		boxShadow: {
  			custom: '0 0 10px rgba(0, 0, 0, 0.2)'
  		},
  		padding: {
  			'0.75': '0.75px',
  			'1.5': '1.5px',
  			custom: '5px'
  		},
  		margin: {
  			'100': '100px',
  			'150': '150px',
  			'200': '200px',
  			'250': '250px',
  			'300': '300px',
  			'500': '500px'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
