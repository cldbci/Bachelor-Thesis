
import {parseQueryStringForId} from "./parse-url-query-string.js";

/*Modify text when select county*/

var id = parseQueryStringForId() - 1;

var text = document.querySelector(".anim").textContent;
var judet = idCountiesList[id].toLowerCase().toUpperCase(0);
document.getElementById("judet").innerHTML = text.concat(judet);

id ++;


 /*--------------------------------------------------------------
# Get api data from database
--------------------------------------------------------------*/


/*Get Api age data from database*/

const getApiAge = async () => {

  const countiesListData = [];

    var url_api = "https://unemployment-rate-web-api.herokuapp.com/history/age/?county-id=";

    var selectedMonth = document.getElementById('monthBar').value;
    var selectedYear = document.getElementById('yearBar').value;

    url_api = url_api.concat(id.toString());
    url_api = url_api.concat("&month=");
    url_api = url_api.concat(selectedMonth.toString());
    url_api = url_api.concat("&year=");
    url_api = url_api.concat(selectedYear.toString());

    const postPromise = await fetch(url_api);
    const response = await postPromise.json();

    for (var key in response)
        if(key.toString() != 'month' && key.toString() != 'year'){
            countiesListData.push(response[key]);
            }           

  barPlot(countiesListData);

}

/*Get Api sex data from database*/

const getApiSex = async () => {

  const doughnutListData = [];

  var url_api = "https://unemployment-rate-web-api.herokuapp.com/history/sex/?county-id=";

  var selectedMonth = document.getElementById('monthDoughnut').value;
  var selectedYear = document.getElementById('yearDoughnut').value;

  url_api = url_api.concat(id.toString());
  url_api = url_api.concat("&month=");
  url_api = url_api.concat(selectedMonth.toString());
  url_api = url_api.concat("&year=");
  url_api = url_api.concat(selectedYear.toString());

  const postPromise = await fetch(url_api);
  const response = await postPromise.json();


      for (var key in response)
              if(key.toString() != 'month' && key.toString() != 'year'){
                  doughnutListData.push(response[key]);
              }      

  doughnutChart(doughnutListData);

}

/*Get Api sex data from database*/

const getApiAll = async () => {

  const countiesTotal = [];

   var url_api = "https://unemployment-rate-web-api.herokuapp.com/history/?county-id=";

      var selectedMonthFrom = document.getElementById('monthFrom').value;
      var selectedYearFrom = document.getElementById('yearFrom').value;
      var selectedMonthTo = document.getElementById('monthTo').value;
      var selectedYearTo = document.getElementById('yearTo').value;

      url_api = url_api.concat(id.toString());
      url_api = url_api.concat("&from-month=");
      url_api = url_api.concat(selectedMonthFrom.toString());
      url_api = url_api.concat("&from-year=");
      url_api = url_api.concat(selectedYearFrom.toString());
      url_api = url_api.concat("&to-month=");
      url_api = url_api.concat(selectedMonthTo.toString());
      url_api = url_api.concat("&to-year=");
      url_api = url_api.concat(selectedYearTo.toString());

      const postPromise = await fetch(url_api);
      const response = await postPromise.json();

      for (var key in response)
        countiesTotal.push(response[key]); 

 lineChart(countiesTotal);

}

 /*--------------------------------------------------------------
# Chart diagrams
--------------------------------------------------------------*/


/*BarPlot chart*/

let barChart;

let csvBar;

const barPlot = (dataValue) => {

  var xValues = ["under_25 age", "25_to_29 age", "30_to_39 age", "40_to_49 age", "50_to_55 age", "greater_55 age"];

  var ctx = document.getElementById('barChart').getContext('2d');

  var csvValue = [];
  var value = [];
  value.push(idCountiesList[id - 1]);
  value.push(dataValue);
  csvValue.push(value);

  csvBar = "data:text/csv;charset=utf-8," + csvValue.map(e => e.join(",")).join("\n");    

 if(barChart)
          barChart.destroy();

      barChart = new Chart(ctx, {
          type: "bar",
          data: {
            labels: xValues,
            datasets: [{
              label: idCountiesList[id - 1],
              backgroundColor: 'rgba(240,160,102,255)',
              data: dataValue,
            }]
          },
          options: {
              legend:{
                    display: true,
                    position: 'top',
              },
              tooltips:{
                  mode: 'index',
              },
              scales:{
                  xAxes: [{
                      stacked: true,
                  }],
                  yAxes: [{
                      stacked: true,
                  }]
              }
          }
        }
        );
  return barChart;

}

/*Doughnut charts*/

let chartDoughnut;

let csvDoughnut;

const doughnutChart = (dataValue) => {
  
  var csvValue = [];
  var value = [];
  value.push(idCountiesList[id - 1]);
  value.push(dataValue);
  csvValue.push(value);

  csvDoughnut= "data:text/csv;charset=utf-8," + csvValue.map(e => e.join(",")).join("\n");

  var barColors = ['rgba(254,218,109,255)','rgba(178,215,255,255)'];

  var ctx = document.getElementById('doughnutChart').getContext('2d');

  if(chartDoughnut)
    chartDoughnut.destroy();

  var xValues = ["male", "female"];

  chartDoughnut = new Chart(ctx, {
      type: "doughnut",
      data: {
      labels: xValues,
      datasets: [{
          label: idCountiesList[id - 1],
          backgroundColor: barColors,
          data: dataValue,
          }]
      },
      options: {

      }
  });

  return chartDoughnut;
}


/*Line chart*/

let chartLine;

let csvLine;

const lineChart = (dataValue) => {

  var xValues = [];
  var dataList = [];

  console.log(dataValue);

  for(var key in dataValue)
      {
          var value;
          value = dataValue[key]['month'].toString();
          value = value.concat("_");
          value = value.concat(dataValue[key]['year'].toString());   
          xValues.push(value);
          dataList.push(dataValue[key]['unemployed']);
      }    

  var value = [];    
  var csvValue = [];
  value.push(idCountiesList[id - 1]);
  value.push(dataList);
  csvValue.push(value);   
  
  csvLine = "data:text/csv;charset=utf-8," + csvValue.map(e => e.join(",")).join("\n");    

  var ctx = document.getElementById('lineChart').getContext('2d');

  if(chartLine)
      chartLine.destroy();

  chartLine = new Chart(ctx, {
          type: "line",
          data: {  
          labels: xValues,
          datasets: [{
              label: idCountiesList[id - 1],
              data: dataList,
              borderColor: 'rgba(239,107,107,255)',
              fill: false
          }]
      },
          options: {
              tooltips:{
                  mode: 'index',
              },
              legend: {display: true},
          }
      });

  return chartLine;
}


/*--------------------------------------------------------------
# Download buttons
--------------------------------------------------------------*/


/*Download CSV*/

document.getElementById("download-data-bar").addEventListener("click", function(){
  downloadBarCSV();
});

function downloadBarCSV(){
  var encodedUri = encodeURI(csvBar);
  var link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "my_data_bar.csv");
  document.body.appendChild(link); // Required for FF
  link.click();   
}

document.getElementById("download-data-doughnut").addEventListener("click", function(){
  downloadDoughnutCSV();
});

function downloadDoughnutCSV(){
  var encodedUri = encodeURI(csvDoughnut);
  var link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "my_data_doughnut.csv");
  document.body.appendChild(link); // Required for FF
  link.click();   
}


document.getElementById("download-data-line").addEventListener("click", function(){
  downloadLineCSV();
});

function downloadLineCSV(){
  var encodedUri = encodeURI(csvLine);
  var link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "my_data_line.csv");
  document.body.appendChild(link); // Required for FF
  link.click();   
}

/*Download PDF buttons*/

document.getElementById('download-chart-bar').addEventListener("click" , downloadPDF1);

function downloadPDF1() {
var newCanvas = document.querySelector('#barChart');

  //create image from dummy canvas
var newCanvasImg = newCanvas.toDataURL("image/jpeg", 1.0);

  //creates PDF from img
var doc = new jsPDF('landscape');
doc.setFontSize(20);
  doc.setFillColor('#FFFFFF');
doc.text(15, 15, "Super Cool Chart");
doc.addImage(newCanvasImg, 'JPEG', 10, 10, 280, 150 );
doc.save('new-barChart.pdf');
}

document.getElementById('download-chart-doughnut').addEventListener("click" , downloadPDF2);

function downloadPDF2() {
var newCanvas = document.querySelector('#doughnutChart');

  //create image from dummy canvas
var newCanvasImg = newCanvas.toDataURL("image/jpeg", 1.0);

  //creates PDF from img
var doc = new jsPDF('landscape');
doc.setFontSize(20);
  doc.setFillColor('#FFFFFF');
doc.text(15, 15, "Super Cool Chart");
doc.addImage(newCanvasImg, 'JPEG', 10, 10, 280, 150 );
doc.save('new-doughnutMaleChart.pdf');
}

document.getElementById('download-chart-line').addEventListener("click" , downloadPDF4);

function downloadPDF4() {
var newCanvas = document.querySelector('#lineChart');

  //create image from dummy canvas
var newCanvasImg = newCanvas.toDataURL("image/jpeg", 1.0);

  //creates PDF from img
var doc = new jsPDF('landscape');
doc.setFontSize(20);
  doc.setFillColor('#FFFFFF');
doc.text(15, 15, "Super Cool Chart");
doc.addImage(newCanvasImg, 'JPEG', 10, 10, 280, 150 );
doc.save('new-lineChart.pdf');
}



/*--------------------------------------------------------------
# Chart display
--------------------------------------------------------------*/



 function barChartDisplay(){

  document.getElementById('monthBar').addEventListener('change' , getApiAge);

  document.getElementById('yearBar').addEventListener('change', getApiAge);

}

function doughnutChartDisplay(){

  document.getElementById('monthDoughnut').addEventListener('change' , getApiSex);

  document.getElementById('yearDoughnut').addEventListener('change' , getApiSex);

}

function lineChartDisplay(){

  document.getElementById('monthFrom').addEventListener('change' , getApiAll);

  document.getElementById('yearFrom').addEventListener('change' , getApiAll);

  document.getElementById('monthTo').addEventListener('change' , getApiAll);

  document.getElementById('yearTo').addEventListener('change' , getApiAll);

}

getApiAge();
getApiSex();
getApiAll();

barChartDisplay();
doughnutChartDisplay();
lineChartDisplay();