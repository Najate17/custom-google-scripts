function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('Holidays Menu')
      .addItem('Update holidays calendar: ' + DATA_CUSTOMER.active_sheet_name, 'call_data_customer')
      .addToUi();

}

function call_data_customer(){
  editHolidaysPlanning(DATA_CUSTOMER);
}
