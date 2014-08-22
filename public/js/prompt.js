var Prompt = function() {
  this.playerButtons = $('.player-buttons');
  this.resetButton = $('#reset')
  this.status = $('#status');
}

Prompt.prototype.setToPreGame = function() {
  this.playerButtons.show();
  this.resetButton.hide(); 
};

Prompt.prototype.setToGameUnderway = function() {
  this.playerButtons.hide();
  this.resetButton.show();
};

Prompt.prototype.setStatusText = function(text) {
  this.status.html('<span>' + text + '</span>');
}

Prompt.prototype.loading = function() {
  this.status.html('<img src="img/ajax-loader.gif" alt="loader">')
}
