'use strict';

var TestRun = require('../../TestRun');
const assert = require('assert');
var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve(path.join('Data', 'Configuration.js'));
var configuration = require(filePath);
var api = null;
var constUtility = require(path.resolve((path.join('Utility', 'ConstantUtility.js'))));

var obj = new loadFileData();

function loadFileData() {
    var count = 0;
    var resArr = [];
    var inputData = [];
    var sync = false;
    var assertMessage = [];

    var configObject = new configuration();
    api = new cybersourceRestApi.PaymentInstrumentsApi(configObject);
    // Call Back Function 
    var callback = function (error, data, response) {

        if (error) {
            resArr[count] = 'Fail:' + response.status;
            assertMessage[count] = response.body.errors[0].message;
            count++;
        } else {
            try {
                if (data.state != constUtility.statusActive) {
                    resArr[count] = 'Assertion Failed:' + response.status;
                    assertMessage[count] = constUtility.messageActive;
                }
                else if (data.id == null) {
                    resArr[count] = 'Assertion Failed:' + response.status;
                    assertMessage[count] = constUtility.messageNullTokenId;
                } else {
                    // Testing- Change Assertion 
                    assert.equal(inputData['tokenId'], data['id']);
                    resArr[count] = 'Pass:' + response.status;
                    assertMessage[count] = inputData['message']
                }
                count++;
            } catch (ex) {
                if((ex.name).indexOf("AssertionError") > -1)
                 {
                 resArr[count] = 'Assertion Failed-' + response.status;
                 assertMessage[count] = inputData['message'];
                 }
                 else
                 {
                resArr[count] = 'Assertion Failed:' + response.status;
                assertMessage[count]=ex.message;
                }
                count++;
            }
        }

        sync = false;
    };

    // File Reading 
    var csv = require("fast-csv");
    var i = 0;
    var index = 0;
    var testId = [];
    var requestData = [];
    // Testing- Change File heasers and File name
    var csvStream = csv.fromPath(path.join('QaScripts', 'CSV_Files', 'TMS', 'CoreServices', 'UpdatePaymentInstrument.csv'),
        { headers: true });

    // Fetch Data From Input File 
    csvStream.on("data", function (data) {
        inputData = data;
        sync = true;
        testId[index] = data['testCaseId'];
        index++;

        var card = new cybersourceRestApi.Tmsv1paymentinstrumentsCard();
        card.expirationMonth = '08';
        card.expirationYear = '2022';
        card.type = 'visa';

        var billTo = new cybersourceRestApi.Tmsv1paymentinstrumentsBillTo();
        billTo.firstName = 'John';
        billTo.lastName = 'Deo';
        billTo.company = 'require(\'cybersource-rest-client\');';
        billTo.address1 = '12 Main Street';
        billTo.address2 = '20 My Street';
        billTo.locality = 'Foster City';
        billTo.administrativeArea = 'CA';
        billTo.postalCode = '90200';
        billTo.country = 'US';
        billTo.email = 'john.smith@example.com';
        billTo.phoneNumber = '555123456';

        var instrumentIdentifierCard = new cybersourceRestApi.Tmsv1instrumentidentifiersCard();
        instrumentIdentifierCard.number = '4111111111111111';
        var instrumentIdentifier = new cybersourceRestApi.Tmsv1paymentinstrumentsInstrumentIdentifier();
        instrumentIdentifier.card = instrumentIdentifierCard;

        var request = new cybersourceRestApi.Body3();
        request.card = card;
        request.billTo = billTo;
        request.instrumentIdentifier = instrumentIdentifier;

        var profileId = data['profileId'];
        var tokenId = data['tokenId'];
        api.tmsV1PaymentinstrumentsTokenIdPatch(profileId, tokenId, request, callback);
        while (sync) {
            require('deasync').sleep(100);
        }

    });
    // Load Data to OutPut File
    csvStream.on("end", function () {

        TestRun.WriteOutData(resArr, testId, 'UpdatePaymentInstrument',assertMessage);
    });
}