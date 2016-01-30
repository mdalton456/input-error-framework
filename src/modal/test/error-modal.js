'use strict';
var ErrorModal = function() {
    this.ermTestEl = element(by.css('.erm-test'));
    this.ermAlertBox = this.ermTestEl.element(by.css('[ng-click="openErm()"]'));
    this.ermModalEl = element(by.css('.erm-modal'));
    this.ermModalCloseBtn = this.ermModalEl.element(by.css('[ng-click="close()"]'));
    this.ermErrorList = element.all(by.repeater('error in errorModal.errorList'));
    this.ermAddErrorBtn = element(by.buttonText('Add Alert to Modal'));
    this.ermAddInfoBtn = element(by.buttonText('Add Info to Modal'));
    this.ermNotificationsCounter = this.ermAlertBox.element(by.css('.error-notif-num'));
    this.ermMessageContainer = this.ermAlertBox.element(by.css('.alert-text'));
};

module.exports = new ErrorModal();

