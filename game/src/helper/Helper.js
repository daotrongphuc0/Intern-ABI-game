


export class Helper {
    static randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    static getScreenWidth() {
        const val = window.innerWidth
        return val
    }
    static getScreenHeight() {
        const val = window.innerHeight
        return val
    }
}