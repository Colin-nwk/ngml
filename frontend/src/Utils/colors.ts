const colors = {
  nnpc: {
    50:'#D2F69E',
    100: '#00af50',
    200: '#226844',
    300: '#004010',
    400: '#E9E500',
    500: '#EC0000',
    600: '#FEF3D5',
    700: '#FAD180',
    800: '#EF643D',
    900: '#FFEDD5',
    950: '#FB7185',
    

    // 600: '#FFFADA',
    // 700: '#808080'
  },
  dark: {
    50:'#ffffff',
    100: '#EAEEF2',
    200: '#49526A',
    500: '#050505',
  },
  nnpcdark: {
    50:'#EAEEF2',
    100: '#808080',
    200: '#49526A',
    300: '#e8e9eb',
    400: '#9CA3AF',
    500: '#4B5563',
  },
  nnpcmediumgreen: {
    50: '#f2fbf6',
    100: '#e1f7ea',
    200: '#c4eed8',
    300: '#95e0b8',
    400: '#60c892',
    500: '#3aad71',
    600: '#2b8e5a',
    700: '#226844',
    800: '#22593d',
    850: '#e8e9eb',
    900: '#1d4a34',
    950: '#0b281a',
  },
  nnpcdarkgreen: {
    50: '#eefff0',
    100: '#d8ffe0',
    200: '#b4fec2',
    300: '#79fc92',
    400: '#38f05d',
    500: '#0ed938',
    600: '#05b428',
    700: '#088d24',
    800: '#0c6f22',
    900: '#0c5b1e',
    950: '#004010',
  },
  nnpclightgreen: {
    50: '#eefff5',
    100: '#d7ffe9',
    200: '#b2ffd4',
    300: '#76ffb3',
    400: '#33f58b',
    500: '#09de6a',
    600: '#00af50',
    700: '#049145',
    800: '#0a713a',
    900: '#0a5d32',
    950: '#00341a',
  },
  nnpcred: {
    50: '#fff0f0',
    100: '#ffdddd',
    200: '#ffc0c0',
    300: '#ff9494',
    400: '#ff5757',
    500: '#ff2323',
    600: '#ec0000',
    700: '#d70000',
    800: '#b10303',
    900: '#920a0a',
    950: '#500000',
  },
  nnpcyellow: {
    50: '#fcffe7',
    100: '#f5ffc1',
    200: '#f0ff86',
    300: '#efff41',
    400: '#f6ff0d',
    500: '#e9e500',
    600: '#d1bb00',
    700: '#a68802',
    800: '#896a0a',
    900: '#74560f',
    950: '#442e04',
  },
};

type ColorName = keyof typeof colors;
type ColorShade = keyof typeof colors.nnpc;

// const useColor = (colorName: ColorName, colorShade: ColorShade) => {
//   return colors[colorName][colorShade] as string;
// };

const getColorShades = (colorName: ColorName) => {
  return colors[colorName];
};

const getColorNames = () => {
  return Object.keys(colors) as ColorName[];
};

const getShadeNames = (colorName: ColorName) => {
  return Object.keys(colors[colorName]) as unknown as ColorShade[];
};

export default colors;
export { getColorNames, getColorShades, getShadeNames };

