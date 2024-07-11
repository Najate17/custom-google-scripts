function removeEvents() {
  var calendar = CalendarApp.getCalendarById(CDE_REPORTING_SUITE_RUN_PLANNING_CALENDAR_ID);
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var ui = SpreadsheetApp.getUi();

  removeEvents_of_team(calendar, spreadsheet, ui, REPORTING_SUITE);
}

function removeEvents_of_team(calendar, spreadsheet, ui, team_parameter) {
  var sheet_values = spreadsheet.getSheetByName(team_parameter.active_sheet_name).getDataRange().getValues();
  start_date = sheet_values[2][team_parameter.starting_column];
  end_date = sheet_values[2][sheet_values[2].length - 1].getNextWeekDate();

  var reporting_suite_result = ui.alert("Do you want to remove " + team_parameter.team + "'s run events from " + start_date.format() + " to " + end_date.format() + " ?", ui.ButtonSet.YES_NO);

  if (reporting_suite_result == ui.Button.YES) {
    var events = calendar.getEvents(start_date, end_date, {search: team_parameter.team});
    ui.alert('Number of events for '+ team_parameter.team +': ' + events.length);

    if(events.length > 0) {
      for(var counter = 0; counter < events.length ; counter++){
        events[counter].deleteEvent();
      }
    }
  }
}

