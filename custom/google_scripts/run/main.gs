function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('Run Menu')
      .addItem('Update calendar: ' + REPORTING_SUITE.active_sheet_name, 'reporting_suite')
      .addItem('Remove events', 'removeEvents')
      .addToUi();
}

function reporting_suite(){
  editRunPlanning(REPORTING_SUITE);
}
