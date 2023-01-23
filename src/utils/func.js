export default function CommaHandle(price) {
    let noComma = price.replaceAll(',', '');
    return Number(noComma);
}
