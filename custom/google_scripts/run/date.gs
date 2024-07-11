Date.prototype.getWeek = function(sheet_name) {
  var onejan = new Date(sheet_name,0,1);
  return Math.ceil((((this - onejan) / 86400000) + onejan.getDay()+1)/7);
}

Date.prototype.getNextWeekDate = function() {
  return new Date(this.getTime() + WEEK_IN_MILLISECOND);
}

Date.prototype.format = function() {
  return Utilities.formatDate(this, 'Europe/Paris', 'dd-MM-yyyy');
}