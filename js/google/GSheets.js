function GSheets(spreadsheetId) {

	this.append = function(sheet, values) {
		gapi.client.sheets.spreadsheets.values.append({
            spreadsheetId: spreadsheetId,
            range: sheet + '!A:Z',
            valueInputOption: 'USER_ENTERED',
            values: values
          }).then(function(response) {
            console.log("Success")
          }, function(response) {
            console.log('Error: ' + response.result.error.message);
          });
	}

	this.findRow = function(sheet, column, value, foundCallback, notFoundCallback) {
		gapi.client.sheets.spreadsheets.values.get({
          spreadsheetId: spreadsheetId,
          range: sheet + '!A:Z',
        }).then(function(response) {
          var range = response.result;
          if (range.values.length > 0) {
            for (i = 0; i < range.values.length; i++) {
              var row = range.values[i];
              if(row[column] === value) {
              	foundCallback(row)
              	return
              }
            }
          } else {
            console.log('No data found.');
            notFoundCallback()
          }
        }, function(response) {
          	console.log('Error: ' + response.result.error.message);
        });
	}

}