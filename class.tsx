export function zeroPad(num, numZeros) {
    var n = Math.abs(num);
    var zeros = Math.max(0, numZeros - Math.floor(n).toString().length );
    var zeroString = Math.pow(10,zeros).toString().substr(1);
    if( num < 0 ) {
        zeroString = '-' + zeroString;
    }

    return zeroString+n;
}

export enum Weekday {
    Sunday,
    Monday,
    Tuesday,
    Wednesday,
    Thursday,
    Friday,
    Saturday,
}

export function weekdayToString(day: Weekday) {
    switch (day) {
        case Weekday.Sunday:
            return "Domingo";
            break;
        case Weekday.Monday:
            return "Segunda";
            break;
        case Weekday.Tuesday:
            return "Terça";
            break;
        case Weekday.Wednesday:
            return "Quarta";
            break;
        case Weekday.Thursday:
            return "Quinta";
            break;
        case Weekday.Friday:
            return "Sexta";
            break;
        case Weekday.Saturday:
            return "Sábado";
            break;
    
        default:
            break;
    }
    return "";
}

export class Hour {
    hour: number;
    minutes: number;
    constructor(hour: number, minutes: number) {
        this.hour = hour;
        this.minutes = minutes;
    }

    toString() : string {
        return `${this.hour}:${this.minutes}`;
    }
}

export class DayHour {
    day: Weekday
    time: Hour
    constructor(day: Weekday, time: Hour) {
        this.day = day;
        this.time = time;
    }

    toString() : string {
        return `${weekdayToString(this.day)}, ${this.time.toString()}`;
    }
}

export class DayHourInterval {
    begin: DayHour;
    end: DayHour;

    constructor(begin: DayHour, end: DayHour) {
        this.begin = begin;
        this.end = end;
    }

    toString() : string {
        return `${this.begin.toString()} - ${this.end.toString()}`;
    }

    inDate(date: Date): boolean {
        return date.getDay() == this.begin.day && 
            ((date.getHours() > this.begin.time.hour) ||
            (date.getHours() == this.begin.time.hour && date.getMinutes() >= this.begin.time.minutes)) && 
            ((date.getHours() < this.end.time.hour) || (date.getHours() == this.end.time.hour && date.getMinutes() <= this.end.time.minutes));
    }
}

export class Class {
    static currentId: number = 0;

    id: number;
    name: String;
    intervals: DayHourInterval[];
    gpsEnabled: boolean;
    misses: number;
    maxMisses: number;
    presences: Date[];
    region: {
        latitude: number,
        longitude: number,
        latitudeDelta: number,
        longitudeDelta: number
    };
    delta: Number;
    constructor(name: String, intervals: DayHourInterval[] = [], gpsEnabled: boolean = false, misses: number = 0, maxMisses: number = 0, region: {
        latitude: number,
        longitude: number,
        latitudeDelta: number,
        longitudeDelta: number,
    } = {
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        }) {
        this.name = name;
        this.intervals = intervals;
        this.gpsEnabled = gpsEnabled;
        this.misses = misses;
        this.maxMisses = maxMisses;
        this.region = region;
        this.id = Class.currentId;
        this.delta = 0.01;
        this.presences = [];

        Class.currentId += 1;
    }

    addPresence(date: Date) {
        this.presences = this.presences.concat(date);
    }
}