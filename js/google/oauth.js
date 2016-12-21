function OAuth() {

  var authorized = false;

  this.authorize = function() {
      gapi.auth.authorize({
        client_id: '847560978980-gj7ac8oo7h5spk4uupdko3j865aon6hu.apps.googleusercontent.com', 
        scope: "https://www.googleapis.com/auth/spreadsheets", 
        immediate: authorized
      },
        handleAuthResult
      );
    else {
      console.log("no need to authorize")
      createConsent();
    }
  }

  var handleAuthResult = function(authResult) {
    if(authResult && !authResult.error) {
      var discoveryUrl = 'https://sheets.googleapis.com/$discovery/rest?version=v4';
        gapi.client.load(discoveryUrl).then(createConsent);
        authorized = true;
    } else {
      console.log(authResult.error);
      authorized = false;
    }
    }

  var createConsent = function() {
      gapi.client.sheets.spreadsheets.values.append({
            spreadsheetId: '1bsPVDw_DKoByu3_y8bn3pQ_VAF8Mr8QJA5pcZIZATpI',
            range: 'Sheet1!A:Z',
            valueInputOption: 'USER_ENTERED',
            values: [ [generateUUID(), new Date()] ]
          }).then(function(response) {
            console.log("Success")
          }, function(response) {
            console.log('Error: ' + response.result.error.message);
          });
    }

}