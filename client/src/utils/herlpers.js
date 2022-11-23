export const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

export const endingDot = (string) => {
    return string[string.length - 1] === '.' ? '' : '.';
};