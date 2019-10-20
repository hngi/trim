// handle modal click

$(document).on("click", "#clipCount", function () {
  getChartInfo(event, 'device');
  var myClipId = $(this).data('clip');
  console.log(myClipId)
  $("#getChartId").data['clip'] = (myClipId);
  // As pointed out in comments, 
  // it is unnecessary to have to manually call the modal.
  // $('#addBookDialog').modal('show');
});
    
    
    // Load charts
function showDeviceChart({ byDevice }) { // retrieve metrics for the selected url
  var dataItems = [];

  for (let device of byDevice) {
    dataItems.push([device._id, device.count]);
  };

  var chartCanvas = document.getElementById('device');
  google.charts.load('current', {
    'packages': ['corechart']
  });
  google.charts.setOnLoadCallback(drawChart);

  // Draw the chart and set the chart values
  function drawChart() {
    var data = google.visualization.arrayToDataTable([
      ['Device', 'Clicks'],
      ...dataItems
    ]);

    // Optional; add a title and set the width and height of the chart
    var options = {
      'title': 'Clicks by device',
      'width': 450,
      'height': 350
    };

    // Display the chart inside the <div> element with id="piechart"
    var chart = new google.visualization.PieChart(chartCanvas);
    chart.draw(data, options);
    chartCanvas.className = '';
  }
}


function getChartInfo(event, divElement) {
  const urlShortenId = event.target.dataset.clip;

  fetch(`/metrics/${urlShortenId}`)
  .then(res => res.json())
  .then(data => { 
    if (divElement === 'device') {
      showDeviceChart(data.payload)
    } else {
      showLocationChart(data.payload)
    }
   }) //Be sure to handle error response from the server.
  .catch(console.error); //If the browser fails to communicate with the server, handle such errors here.
}


// Load charts
function showLocationChart({ byLocation }) { // retrieve metrics for the selected url
  var dataItems = [];

  for (let location of byLocation) {  // get chart for location
    dataItems.push([location._id, location.count]);
  };

  var chartCanvas = document.getElementById('location');
  google.charts.load('current', {
    'packages': ['corechart']
  });
  google.charts.setOnLoadCallback(drawChart);

  // Draw the chart and set the chart values
  function drawChart() {
    var data = google.visualization.arrayToDataTable([
      ['Location', 'Clicks'],
      ...dataItems
    ]);

    // Optional; add a title and set the width and height of the chart
    var options = {
      'title': 'Clicks by location',
      'width': 450,
      'height': 350
    };

    // Display the chart inside the <div> element with id="piechart"
    var chart = new google.visualization.PieChart(chartCanvas);
    chart.draw(data, options);
    chartCanvas.className = '';
  }
}