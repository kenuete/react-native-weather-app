
export function getImageForWeather(condition: string) {
    console.log('condition s', condition)
    switch (true) {
        case /(rain|cloud|shower|thunder)/i.test(condition): return require('../assets/shower.jpg');
        case /hail/i.test(condition): return require('../assets/hail.jpg');
        default: return require('../assets/clear.jpg');
    }
}