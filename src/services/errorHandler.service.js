'use strict';

angular.module('po.modals', [])
    .factory('poErrorHandler', function () {
        var errorArray = [];
        var mostRecentError = {
            type: '', message: '', timestamp: ''
        };
        var messageOverflow = false;
        var characterLimit = 70;
        var counter = -1;

        function compareObjs(a, b) {
            if (a.type === "Alert" && b.type === "Info") {
                return -1;
            }
            else if (a.type === "Info" && b.type === "Alert") {
                return 1;
            }
            else {
                if (a._id > b._id) {
                    return -1;
                }
                else if (a._id < b.id) {
                    return 1;
                }
                else {
                    return 0;
                }
            }
        }

        errorArray.addError = (function (type, message) {
            var timestamp = Date.now();
            counter++;
            errorArray.push({type: type, message: message, timestamp: timestamp, _id: counter});
            errorArray.sort(compareObjs);
            errorArray.generateMostRecentError();
            return counter;
        });
        errorArray.removeError = (function (index) {
            if (errorArray.length >= index) {
                errorArray.splice(index, 1);
            }
            errorArray.generateMostRecentError();
        });
        errorArray.removeErrorById = (function (_id) {
            var index;
            for (index in errorArray) {
                if (errorArray[index]._id === _id) {
                    errorArray.splice(index, 1);
                    break;
                }
            }
            errorArray.generateMostRecentError();
        });
        errorArray.clearArray = function () {
            errorArray = [];
        }
        errorArray.setCharacterLimit = function (limit) {
            characterLimit = limit;
        }
        errorArray.generateMostRecentError = function () {
            if (errorArray[0] != null) {
                if (errorArray[0].message.length > characterLimit) {
                    mostRecentError.message = errorArray[0].message.slice(0, characterLimit - 7) + "...";
                    messageOverflow = true;
                } else {
                    mostRecentError.message = errorArray[0].message;
                    messageOverflow = false;
                }
                mostRecentError.type = errorArray[0].type;
                mostRecentError.timestamp = errorArray[0].timestamp;
                mostRecentError._id = errorArray[0]._id;
            }
            else {
                mostRecentError = {
                    type: '', message: '', timestamp: ''
                };
            }
        }
        errorArray.getMessageOverflow = function () {
            return messageOverflow;
        }
        errorArray.getMostRecentError = function () {
            return mostRecentError;
        }
        errorArray.getMostRecent = function (type) {
            if (typeof type === 'undefined') {
                var i = 0;
                for (i in errorArray) {
                    if (errorArray[i]._id === counter) {
                        return errorArray[i]
                    }
                }
            } else {
                var maxIndex = -1, max = -1, i;
                for (i in errorArray) {
                    if (errorArray[i].type === type && max < errorArray[i]._id) {
                        maxIndex = i;
                        max=errorArray[i]._id;
                    }
                }
                if (maxIndex >= 0) {
                    return errorArray[maxIndex];
                }
            }
            return undefined;
        }
        errorArray.getNumNotifications = function () {
            return errorArray.length;
        }
        errorArray.getErrorArray = function () {
            return errorArray;
        }
        return errorArray;
    })
