export function randomColor() {
    const ColorString = "0123456789ABCDEF";
    let code = "#";
    for (let i = 0; i < 6; i++) {
        code += ColorString[Math.floor(Math.random() * 16)];
    }
    return code;
}