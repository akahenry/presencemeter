export enum Weekday {
    Sunday,
    Monday,
    Tuesday,
    Wednesday,
    Thursday,
    Friday,
    Saturday,
}

export class Hour {
    hour: number;
    minutes: number;
    constructor(hour: number, minutes: number) {
        this.hour = hour;
        this.minutes = minutes;
    }
}

export class DayHour {
    day: Weekday
    time: Hour
    constructor(day: Weekday, time: Hour) {
        this.day = day;
        this.time = time;
    }
}

export class DayHourInterval {
    begin: DayHour;
    end: DayHour;

    constructor(begin: DayHour, end: DayHour) {
        this.begin = begin;
        this.end = end;
    }
}

export class Class {
    name: String;
    intervals: DayHourInterval[];
    gpsEnabled: boolean;
    misses: number;
    maxMisses: number;
    region: Object;
    id: number;

    static currentId: number = 0;

    constructor(name: String, intervals: DayHourInterval[], gpsEnabled: boolean, misses: number, maxMisses: number, region: Object) {
        this.name = name;
        this.intervals = intervals;
        this.gpsEnabled = gpsEnabled;
        this.misses = misses;
        this.maxMisses = maxMisses;
        this.region = region;
        this.id = Class.currentId;
        
        Class.currentId += 1;
    }
}