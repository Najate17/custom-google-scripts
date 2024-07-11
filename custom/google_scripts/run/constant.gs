var CDE_REPORTING_SUITE_RUN_PLANNING_CALENDAR_ID = 'c_666431eaefc72509019a7f98dc3e3eb4a631a034c6177516a45686731c650c79@group.calendar.google.com';
var WEEK_IN_MILLISECOND = 1000*60*60*24*7;
var EVENT_DESCRIPTION = "\n"
+ "CDE - REPORTING SUITE - PLANNING RUN:"
+ "\n"
+ "https://docs.google.com/spreadsheets/d/11y9esw12SEwhEjALSZMPuz6xp2a1dudYGp7luVnplGU";

var TEAM_NAMES = {
  reporting_suite: 'Reporting Suite',
};

var REPORTING_SUITE = {
  team: TEAM_NAMES.reporting_suite,
  prefix_title_event: 'RUN ' + TEAM_NAMES.reporting_suite,
  event_description: TEAM_NAMES.reporting_suite + ' EVENT'  + EVENT_DESCRIPTION,
  active_sheet_name: '2024-Reporting-Suite',
  starting_column: 26//column AA start counting from 0
};
