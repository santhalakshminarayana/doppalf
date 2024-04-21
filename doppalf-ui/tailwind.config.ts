import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: 'selector',
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      'lg': {'max': '1800px'},
      'md': {'max': '1280px'},
      'sm': {'max': '560px'},
    },
    colors: {
      'seasalt': { DEFAULT: '#f9f9f9', 100: '#323232', 200: '#646464', 300: '#969696', 400: '#c8c8c8', 500: '#f9f9f9', 600: '#fbfbfb', 700: '#fcfcfc', 800: '#fdfdfd', 900: '#fefefe' }, 
      'rich_black': { DEFAULT: '#010c13', 100: '#000204', 200: '#000508', 300: '#01070c', 400: '#010a10', 500: '#010c13', 600: '#064870', 700: '#0b83cd', 800: '#45b2f5', 900: '#a2d8fa' }, 
      'pistachio': { DEFAULT: '#95d387', 100: '#193313', 200: '#316525', 300: '#4a9838', 400: '#69c055', 500: '#95d387', 600: '#abdca0', 700: '#c0e5b8', 800: '#d5edcf', 900: '#eaf6e7' }, 
      'jasmine': { DEFAULT: '#ffdc74', 100: '#4a3800', 200: '#957000', 300: '#dfa800', 400: '#ffca2b', 500: '#ffdc74', 600: '#ffe391', 700: '#ffeaac', 800: '#fff1c8', 900: '#fff8e3' }, 
      'bright_pink': { DEFAULT: '#f55c7a', 100: '#3f0410', 200: '#7f0820', 300: '#be0c30', 400: '#f11d47', 500: '#f55c7a', 600: '#f77d95', 700: '#f99db0', 800: '#fbbeca', 900: '#fddee5' }, 
      'light_sky_blue': { DEFAULT: '#9cd2f7', 100: '#062f4b', 200: '#0c5e95', 300: '#128de0', 400: '#51b1f1', 500: '#9cd2f7', 600: '#b0dbf9', 700: '#c4e4fa', 800: '#d7edfc', 900: '#ebf6fd' },
      'tomato': { DEFAULT: '#f96a4d', 100: '#3f0c02', 200: '#7e1905', 300: '#bd2507', 400: '#f6350f', 500: '#f96a4d', 600: '#fa8871', 700: '#fba695', 800: '#fcc4b8', 900: '#fee1dc' },

      'dark_rich_black': { DEFAULT: '#000814', 100: '#000204', 200: '#000308', 300: '#00050c', 400: '#000710', 500: '#000814', 600: '#002f76', 700: '#0056d8', 800: '#3b89ff', 900: '#9dc4ff' }, 
      'dark_mint_cream': { DEFAULT: '#f6fff8', 100: '#006416', 200: '#00c82b', 300: '#2dff5a', 400: '#91ffa9', 500: '#f6fff8', 600: '#f7fff9', 700: '#f9fffa', 800: '#fbfffc', 900: '#fdfffd' }, 
      'dark_pistachio': { DEFAULT: '#96d388', 100: '#193313', 200: '#316525', 300: '#4a9838', 400: '#69c055', 500: '#96d388', 600: '#abdca0', 700: '#c0e5b8', 800: '#d5edcf', 900: '#eaf6e7' }, 
      'dark_jasmine': { DEFAULT: '#ffdc74', 100: '#4a3800', 200: '#957000', 300: '#dfa800', 400: '#ffca2b', 500: '#ffdc74', 600: '#ffe391', 700: '#ffeaac', 800: '#fff1c8', 900: '#fff8e3' }, 
      'dark_bright_pink': { DEFAULT: '#f55c7a', 100: '#3f0410', 200: '#7f0820', 300: '#be0c30', 400: '#f11d47', 500: '#f55c7a', 600: '#f77d95', 700: '#f99db0', 800: '#fbbeca', 900: '#fddee5' }, 
      'dark_uranian_blue': { DEFAULT: '#b4def9', 100: '#06334f', 200: '#0d679f', 300: '#159aec', 400: '#64bcf2', 500: '#b4def9', 600: '#c3e5fa', 700: '#d2ebfb', 800: '#e1f2fd', 900: '#f0f8fe' }, 
      'dark_tomato': { DEFAULT: '#f85a3a', 100: '#3b0c02', 200: '#761704', 300: '#b12306', 400: '#ec2f09', 500: '#f85a3a', 600: '#f97b62', 700: '#fb9c89', 800: '#fcbdb0', 900: '#feded8' },

      'sidebar_icon_bg': "#FFE7E3",
      'dark_sidebar_icon_bg': "#DCD5D3",
    },
    extend: {
      fontFamily: {
        'tilt-neon': ['var(--font-tilt-neon)'],
      },
      maxWidth: {
        70: '70%',
      },
    },
  },
  plugins: [],
};
export default config;