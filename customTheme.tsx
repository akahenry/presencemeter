import color from 'color';
import { DefaultTheme } from 'react-native-paper';

// DefaultTheme para referência:

// const DefaultTheme: Theme = {
//   dark: false,
//   roundness: 4,
//   colors: {
//     primary: '#6200ee',
//     accent: '#03dac4',
//     background: '#f6f6f6',
//     surface: white,
//     error: '#B00020',
//     text: black,
//     onSurface: '#000000',
//     disabled: color(black).alpha(0.26).rgb().string(),
//     placeholder: color(black).alpha(0.54).rgb().string(),
//     backdrop: color(black).alpha(0.5).rgb().string(),
//     notification: pinkA400,
//   },
//   fonts: configureFonts(),
//   animation: {
//     scale: 1.0,
//   },
// };

const CustomTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#17bebb',
  }
};

export default CustomTheme;