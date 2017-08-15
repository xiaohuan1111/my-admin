var SING_REGEXP = /([yMdhsm])(\1)*/g ;
var DEFAULT_PATTERN = "yyyy-MM-dd";
function padding(s, len){
	var len = len - (s + '').length;
	for(var i = 0; i < len; i++){s = '0' + s;}
	return s ;
}
export default {
	formatDate: {
		format: function(data, pattern){
			pattern = pattern || DEFAULT_PATTERN;
			return pattern.replace(SING_REGEXP, function($0){
				switch($0.charAt(0)){
					case 'y' : return padding(data.getFullYear(), $0.length);
					case 'M' : return padding(data.getMonth() + 1, $0.length);
					case 'd' : return padding(data.getDate(), $0.length);
					case 'w' : return data.getDay() + 1;
					case 'h' : return padding(data.getHours(), $0.length);
					case 'm' : return padding(data.getMinutes(), $0.length);
					case 's' : return padding(data.getSeconds(), $0.length);
				}
			})
		}
	}
}