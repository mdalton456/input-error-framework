'use strict';

describe('Error Modal', function() {
    var page;

    beforeEach(function() {
        browser.get('/#/components');
        page = require('./error-modal');
        page.ermAddErrorBtn.click();
        page.ermAddErrorBtn.click();
        page.ermAddInfoBtn.click();
    });

    it('should display all the errors in the error modal', function(done) {
        page.ermAlertBox.click().then(function() {
            browser.wait(protractor.ExpectedConditions.presenceOf(page.ermModalEl), 30000, 'Modal never appeared');
            browser.executeScript("$('.erm-modal').removeClass('fade');");
            page.ermErrorList.then(function (errorList) {
                var arrayLength = errorList.length;
                element.all(by.css('.error-row')).then(function (rows) {
                    var errorRows = rows.length;
                    expect(errorRows).toEqual(arrayLength);
                    done();
                });
            });
        });
    });

    it ('Should have a cross icon in the banner', function() {
        page.ermAlertBox.click().then(function() {
            browser.wait(protractor.ExpectedConditions.presenceOf(page.ermModalEl), 30000, 'Modal never appeared');
            browser.executeScript("$('.erm-modal').removeClass('fade');");
            expect(browser.isElementPresent(page.ermModalCloseBtn)).toBe(true);
        });
    });

    it('should close the error if the errors close button is clicked', function(done) {
        page.ermAlertBox.click().then(function() {
            browser.wait(protractor.ExpectedConditions.presenceOf(page.ermModalEl), 30000, 'Modal never appeared');
            browser.executeScript("$('.erm-modal').removeClass('fade');");
            page.ermErrorList.then(function (errorList) {
                errorList[2].element(by.id('error2')).then(function (error2) {
                    var error2link = error2.element(by.css('a'));
                    error2link.click();
                    page.ermErrorList.then(function (errorListNew) {
                        var arrayLength = errorListNew.length;
                        expect(arrayLength).toEqual(2);
                        done();
                    });
                });
            });
        });
    });

    it('should close the modal on clicking the modals cross icon', function () {
        page.ermAlertBox.click().then(function() {
            browser.wait(protractor.ExpectedConditions.presenceOf(page.ermModalEl), 30000, 'Modal never appeared');
            browser.executeScript("$('.erm-modal').removeClass('fade');");
            page.ermModalCloseBtn.click().then(function () {
                browser.wait(protractor.ExpectedConditions.stalenessOf(page.ermModalEl), 30000, 'Modal never disappeared');
                expect(page.ermModalEl.isPresent()).toBe(false);
            });
        });
    });

    it('should add an error if an error is added to the errorList', function(done) {
        page.ermAlertBox.click().then(function() {
            browser.wait(protractor.ExpectedConditions.presenceOf(page.ermModalEl), 30000, 'Modal never appeared');
            browser.executeScript("$('.erm-modal').removeClass('fade');");
            page.ermErrorList.then(function (errorList) {
                var arrayLength = errorList.length;
                expect(arrayLength).toEqual(3);
                done();
            });
        });
    });
});

describe('Alert panel notification check', function() {
    var page;

    beforeEach(function() {
        browser.get('/#/components');
        page = require('./error-modal');
        page.ermAddErrorBtn.click();
        page.ermAddErrorBtn.click();
        page.ermAddInfoBtn.click();
    });

    it('should display the number of notifications in the alert box', function() {
        expect(page.ermNotificationsCounter.getText()).toEqual('3');
    });

    it('should display the most recent error in the alert panel', function() {
        //checks for the subString present in the Info message but not the Error button
        expect(page.ermMessageContainer.getText(' metus elit at sapien. Curabitur nec sagittis ipsum. ').isPresent()).toBe(true);
    });
});