function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('Holidays Menu')
      .addItem('Update holidays calendar: ' + DATA_CUSTOMER.active_sheet_name, 'call_data_customer')
      .addToUi();

}

function onEdit(e) {
  // Set a comment on the edited cell to indicate when it was changed.
  const range = e.range;
  var editedValue = range.getValue();
  if (editedValue > 0) {
    range.setBackground("#e06666")
    range.setFontWeight("bold");
  }
  else {
    range.setBackground("#cfe2f3")
    range.setFontWeight("normal");
  }
}

function call_data_customer(){
  editHolidaysPlanning(DATA_CUSTOMER);
}
