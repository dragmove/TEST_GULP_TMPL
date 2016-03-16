/**
 * @name : TEST
 * @version : v0.0.0
 * @author : 
 */
if(!window.nc) window.nc = {};
if(!nc.PROJECT_NAME) nc.PROJECT_NAME = {};

(function($) {
	'use strict';

	nc.PROJECT_NAME.util = {};

	var isDefined = function(obj) {
		var flag = true;
		if(obj === null || typeof obj === 'undefined') return false;
		return flag;
	};

	var trim = function(str) {
		return str.replace(/^\s+/, '').replace(/\s+$/, '');
	};

	var getParseTmplObj = function(tmplStr) {
		var obj = {},
			splitArr = tmplStr.split('{{{');

		var str, arr;
		for(var i=0,max=splitArr.length; i<max; i++) {
			str = splitArr[i];
			if(str !== '') {
				arr = str.split('}}}');
				obj[ nc.PROJECT_NAME.util.trim(arr[0]) ] = nc.PROJECT_NAME.util.trim(arr[1]);
			}
		}
		return obj;
	};

	var parseStrPropertiesToInt = function(_obj) {
		var obj = $.extend({}, _obj);
		for(var key in obj) {
			if(obj.hasOwnProperty(key)) {
				obj[key] = parseInt(obj[key], 10);
			}
		}
		return obj;
	};

	nc.PROJECT_NAME.util.isDefined = isDefined;
	nc.PROJECT_NAME.util.trim = trim;
	nc.PROJECT_NAME.util.getParseTmplObj = getParseTmplObj;
	nc.PROJECT_NAME.util.parseStrPropertiesToInt = parseStrPropertiesToInt;
}(jQuery));
if(!window.td) window.td = {};

// normal function
td.testFunc = function() {
    return true;
};

// ajax function
td.testAjaxGetCareer = function(url, successCallback, failCallback) {
    $.ajax({
        type: 'GET',
        url: url,
        data: {},
        dataType: 'json',
        beforeSend: function() {
        },
        success: successCallback,
        error: failCallback,
    });
};

// module pattern class
td.testPerson = function() {
    var name = 'person';

    function getName() {
        return name;
    }

    return {
        getName : getName
    };
};

td.testParent = function() {
    var lastName = '',
        child = null;

    function setLastName(lastNameStr) {
        lastName = lastNameStr;
        if(child) child.setLastName(lastName);
    }
    function getLastName() {
        return lastName;
    }
    function setChild(childInstance) {
        child = childInstance;
    }

    return {
        setLastName : setLastName,
        getLastName : getLastName,
        setChild : setChild
    };
};

td.testChild = function() {
    var lastName = '';

    function setLastName(lastNameStr) {
        lastName = lastNameStr;
    }
    function getLastName() {
        return lastName;
    }

    return {
        setLastName : setLastName,
        getLastName : getLastName
    };
};