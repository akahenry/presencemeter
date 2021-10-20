import 'package:flutter/material.dart';

enum Weekday {
  Sunday,
  Monday,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
  Saturday,
}

class DayHour {
  Weekday day = Weekday.Sunday;
  TimeOfDay time = TimeOfDay(hour: 0, minute: 0);

  DayHour({Weekday day = Weekday.Sunday, TimeOfDay? time}) {
    this.day = day;
    this.time = time != null ? time : TimeOfDay(hour: 0, minute: 0);
  }
}

class DayHourInterval {
  DayHour begin = DayHour();
  DayHour end = DayHour();

  DayHourInterval(this.begin, this.end);
}

class Class {
  String name;
  List<DayHourInterval> intervals = [];
  bool gpsEnabled = true;
  int misses = 0;
  int maxMisses = 0;

  Class({Key? key, required this.name, List<DayHourInterval>? intervals}) {
    this.intervals = intervals != null ? intervals : [];
  }
}
