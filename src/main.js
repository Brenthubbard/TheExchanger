import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import Exchanger from './js/currency-service';

async function makeApiCall(usdInput, currencyChoice) {
  const response = await Exchanger.exchangeRates(usdInput, currencyChoice);
  getInputForm(usdInput, currencyChoice, response);
}
function getInputForm(usdInput, currencyChoice, response) {
  if (response.result === "success") {
    if (response.conversion_result[currencyChoice]) {
      $('.showConversion_rates').text(`Your $${usdInput} dollars is worth ${response.conversion_result} in ${currencyChoice}`);
    } else {
      return $('.results').text(`${currencyChoice} is not a valid choice. Please select a different currency.`);
  } else {
    $('.results').text(`There was an error. You encountered a ${response.statusText}please try again`);
  }
}

$(document).ready(function () {
  $("#inputForm").submit(function (event) {
    event.preventDefault();
    let usdInput = parseInt($('#usdInput').val());
    let currencyChoice = $('#currencyChoice').val();
    makeApiCall(usdInput, currencyChoice);
  });
});