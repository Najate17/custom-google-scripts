function editRunPlanning(teamParameter){
  var calendar = CalendarApp.getCalendarById(CDE_REPORTING_SUITE_RUN_PLANNING_CALENDAR_ID);
  var dataSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(teamParameter.active_sheet_name);
  var allData = dataSheet.getDataRange().getValues();
  var dataWeekLine = allData[2];
  var startDate = new Date();
  var runBoy = "";

  /* on parcourt le tableau pour savoir qui gère le RUN cette semaine */
  for (var colomn = teamParameter.starting_column; colomn < allData[0].length; colomn++) {
    weekNumber = dataWeekLine[colomn].getWeek(teamParameter.active_sheet_name);
    startDate = dataWeekLine[colomn];

    runBoy = getRunBoy(allData, colomn);
    var title_event = teamParameter.prefix_title_event +': ' + runBoy;
    createOrEditEvent(calendar, startDate, title_event, teamParameter.event_description);
  }
}

function createOrEditEvent(calendar, startDate, title_event, event_description){
  var endDate = startDate.getNextWeekDate();
  var events = calendar.getEvents(startDate, endDate, {search: event_description});
  var event;
  Logger.log('Events for between ' + startDate + ' and ' + endDate);
  Logger.log(events);

  if(events.length === 0 || events === undefined){
    event = calendar.createAllDayEvent(title_event, startDate, endDate);
  } else {
    event = events[0];
    event.setTitle(title_event);
  }
  event.setDescription(event_description);
  return event;
}

function getRunBoy(allData, colomn){
  var firstLineWithName = 4;
  var runBoy = "empty";
  for (var i = firstLineWithName; i < allData.length; i++) {
    /* on cherche qui est d'astreinte */
    if (allData[i][colomn] == 1){
      runBoy = allData[i][0]
      /*Logger.log("Personne gérant le RUN: "+ runBoy);*/
      break;
    }
  }
  return runBoy;
}



