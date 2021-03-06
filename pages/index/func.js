var monthDays;

function dayInList(day, list){
  var length = list.length;
  for (var i = 0; i < length; ++i){
    if (day == Number(list[i])){
      return true;
    }
  }
  return false;
}

function generateCalendar(firstDayIndex, year, month, day, monthEvents){
  var container = [];
  var key = 0;
  if (year % 4 == 0) {
    monthDays = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  } else {
    monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  }
  var currentDay = 1 - firstDayIndex;
  for (var v = 0; v < 6; ++v){
    var newRow = [];
    for (var h = 0; h < 7; ++h){
      var newDate = { date: "", style: "", key: key, event: false};
      if (currentDay > monthDays[month - 1]){
        newRow.push(newDate);
        ++key;
      } else {
        if (currentDay > 0) {
          newDate.date = currentDay;
        } else {
          newDate.date = "";
        }
        if (currentDay == day) {
          newDate.style = "border: 1rpx solid #000000; background: #000000; color: #FFFFFF;";
        } else if (dayInList(currentDay, monthEvents)) {
          newDate.style = "border: 1rpx solid #0074D6;"
          newDate.event = true;
        } else {
          newDate.style = ""
          newDate.event = false;
        }
        newRow.push(newDate);
        ++currentDay;
        ++key;
      }
    }
    container.push(newRow);
  }
  if (container[5][0].date == ""){
    container.pop();
  }
  return container;
}

function updateCalendar(firstDayIndex, year, month, day, container, monthEvents){
  if (container.length >= 6){
    container.pop;
  }
  if (year % 4 == 0) {
    monthDays = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  } else {
    monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  }
  var currentDay = 1 - firstDayIndex;
  for (var v = 0; v < 5; ++v){
    for (var h = 0; h < 7; ++h){
      if (currentDay > 0){
        container[v][h].date = currentDay;
      } else {
        container[v][h].date = "";
      }
      if (currentDay == day){
        container[v][h].style = "border: 1rpx solid #000000; background: #000000; color: #FFFFFF;";
      } else if (dayInList(currentDay, monthEvents)){
        container[v][h].style = "border: 1rpx solid #0074D6;"
        container[v][h].event = true;
      } else {
        container[v][h].style = "";
        container[v][h].event = false;
      }
      ++currentDay;
      if (currentDay > monthDays[month - 1]) break;
    }
  }
  if (currentDay <= monthDays[month - 1]) {
    var newline = [];
    for (var i = 0; i < 7; ++i){
      if (currentDay <= monthDays[month - 1]){
        if (currentDay == day){
          newline.push({ date: currentDay, style: "border: 1rpx solid #000000; background: #000000; color: #FFFFFF;", key: (34 + i + 1)})
        } else {
          newline.push({ date: currentDay, style: "", key: (34 + i + 1), event: false})
        }
      } else {
        newline.push({ date: "", style: "", key: (34 + i + 1), event: false})
      }
      ++currentDay;
    }
    container.push(newline);
  }
  return container;
}

function dateSelect(firstDayIndex, month, day, key, monthDates){
  var length = monthDates.length;
  var currentDay = 1 - firstDayIndex;
  var currentMonthDays = monthDays[month - 1];
  var dateSelected = 0;
  if (key < firstDayIndex){
    return {monthDates, dateSelected};
  } else if (key >= firstDayIndex + currentMonthDays){
    return {monthDates, dateSelected};
  }
  for (var v = 0; v < length; ++v){
    for (var h = 0; h < 7; ++h){
      if (currentDay > currentMonthDays){
        break;
      }
      if (monthDates[v][h].key != key){
        if (currentDay == day && day != -1){
          monthDates[v][h].style = "border: 1rpx solid #000000;"
        } else {
          if (monthDates[v][h].event){
            monthDates[v][h].style = "border: 1rpx solid #0074D6;"
          } else {
            monthDates[v][h].style = "";
          }
        }
      } else if (monthDates[v][h].key == key){
        if (currentDay == day && day != -1){
          monthDates[v][h].style = "border: 1rpx solid #000000; background: #000000; color: #FFFFFF;";
        } else {
          monthDates[v][h].style = "background: #000000; color: #FFFFFF;";
        }
        dateSelected = monthDates[v][h].date;
      }
      ++currentDay;
    }
  }
  return {monthDates, dateSelected};
}

module.exports = {
  //updateCalendar: updateCalendar,
  dateSelect: dateSelect,
  generateCalendar: generateCalendar

}