function editHolidaysPlanning(teamParameter){
  var calendar = CalendarApp.getCalendarById(DATA_CUSTOMER_HOLIDAYS_PLANNING_CALENDAR_ID);
  Logger.log('Calendar :' + calendar)
  var dataSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(teamParameter.active_sheet_name);
  var allData = dataSheet.getDataRange().getValues();

  var firstLineWithTeammate = 4;
  for(var j = teamParameter.starting_column; j < allData[0].length; j++) {
    current_date = allData[2][j]
     Logger.log(current_date)
    events = retrieveEventsForSpecificDate(current_date, calendar)

    for (var i = firstLineWithTeammate; i < allData.length - 1; i++) {
         Logger.log("Value in sheet " + allData[i][j])
        var current_teammate = allData[i][0]
        var event_title = current_teammate + " OFF: " + allData[i][j] + ' day';
        Logger.log("Processing in progress with this title " + event_title)
        // Case when calendar is empty
        if(events.length === 0 || events === undefined){
          // Holidays have been setted by the current teammate
          if(allData[i][j] > 0) {
             // Logger.log("No events found but holidays for current date " + current_date)
              event = calendar.createAllDayEvent(event_title, current_date);
            //  Logger.log("Event created with this title " + event_title + " for this date " + current_date)
          }
        }
        else {
          //Logger.log("events found for current date " + current_date)
          events_filter_for_current_teammate = findEventForSpecificTeammate(events, current_teammate)
          if (allData[i][j] > 0){
            if (events_filter_for_current_teammate.length > 0) {
                updateEvent(events_filter_for_current_teammate, event_title, teamParameter.event_description)
            }
            else {
              event = calendar.createAllDayEvent(event_title, current_date);
              //Logger.log("Event created with this title " + event_title + " for this date " + current_date)
            }
          }
          else if (events_filter_for_current_teammate.length > 0) {
            // Case when calendar contains event for the current teammate but the sheet contains no holidays
            removeEvents(events_filter_for_current_teammate)
          }
        }

    }
  }
}

function updateEvent(events, event_title, event_description) {
  events.forEach(function(event) {
    event.setTitle(event_title);
    event.setDescription(event_description);
    //Logger.log('Event updated with this title: ' + event_title);
  });
}

function removeEvents(events){
  events.forEach(function(event) {
    event.deleteEvent();
   // Logger.log('Event deleted: ' + event.getId());
  });
}

function findEventForSpecificTeammate(events, teammate){
  return events.filter(function(event) {
   // Logger.log('Event found for teammate : ' + event.getTitle());
    return event.getTitle().includes(teammate);
  });
}

function retrieveEventsForSpecificDate(current_date, calendar) {
  // Set the time range for the entire day
  var startTime = new Date(current_date);
  startTime.setHours(0, 0, 0, 0); // Start of the day

  var endTime = new Date(current_date);
  endTime.setHours(23, 59, 59, 999); // End of the day

  var events = calendar.getEvents(startTime, endTime);

  //Logger.log("Events found in calendar " + events.length)

  return events;
}

