export function getSymbolDescription(s: symbol): string {
    return s.toString().slice(7, -1);
}
