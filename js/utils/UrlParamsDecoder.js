var UrlParamsDecoder = function(url) {
	var PARAM_POSITION = 1;
	var KEY_POSITION = 0;
	var VALUE_POSITION = 1

	var params = decode()

	this.valueOf = function(paramKey) {
		return params[paramKey]
	}

	this.hasParams = function() {
		return !jQuery.isEmptyObject(params)
	}

	this.hasParam = function(paramKey) {
		return !jQuery.isEmptyObject(params) && params[paramKey] !== undefined
	}

	function decode() {
		var decodedParams = {}
		var urlParts = url.split(/\?(.+)/)
		console.log(urlParts)
		if(urlParts.length > 1) {
			var paramPartOfUrl = urlParts[PARAM_POSITION];
			var paramKeyValuePairs = paramPartOfUrl.split('&')
			for(var i = 0; i < paramKeyValuePairs.length; i++) {
				var keyValuePair = paramKeyValuePairs[i].split('=')
				decodedParams[keyValuePair[KEY_POSITION]] = keyValuePair[VALUE_POSITION]	
			}
		}
		return decodedParams
	}
}