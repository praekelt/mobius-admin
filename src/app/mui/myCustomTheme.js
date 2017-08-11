import {
    cyan700,
    grey600,
    pinkA100, pinkA200, pinkA400,
    fullWhite,
} from 'material-ui/styles/colors';
import {fade} from 'material-ui/utils/colorManipulator';
import spacing from 'material-ui/styles/spacing';

export default {
    spacing: spacing,
    fontFamily: 'Muli, sans-serif',
    borderRadius: 2,
    palette: {
        primary1Color: '#000000',
        primary2Color: '#70A2D3',
        primary3Color: '#F3F3F3',
        accent1Color: '#ec3793',
        accent2Color: '#ec3793',
        accent3Color: '#ec3793',
        textColor: '#222222',
        secondaryTextColor: fade('#222222', 0.7),
        alternateTextColor: '#FFFFFF',
        canvasColor: fullWhite,
        borderColor: fade(fullWhite, 0.3),
        disabledColor: fade('#222222', 0.3),
        pickerHeaderColor: fade(fullWhite, 0.12),
        clockCircleColor: fade(fullWhite, 0.12),
    },
};
