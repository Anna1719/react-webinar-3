export const generateCode = (function () {
    let counter = 0;
    return () => ++counter;
}());  