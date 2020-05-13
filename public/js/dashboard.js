/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
$(document).ready(function() {
  if (searchType !== '') {
    $('.select-option select').val(searchType);
  }

  $('select[name="searchType"]').change(function(e) {
    e.preventDefault();
    $('input[name="searchTerm"]').attr('placeholder', 'Enter ' + $('select[name="searchType"] > option:selected').text());
  });

  $('.search-area > i').click(function(e) {
    search();
  });

  $('.search-area > input').keyup(function(e) {
    if (e.keyCode == 13) search();
  });

  function search() {
    if ($('.search-area > input').val() !== '') {
      window.location.href = '/search?searchType=' + $('select[name="searchType"]').val() + '&searchTerm=' + $('.search-area > input').val();
    }
  }

  $('.journey-parent').click(function (e) { 
    e.preventDefault();
    window.location.href = '/track/' + $(this).attr('data-id');
  });

  $('.btn-download-csv').click(function (e) { 
    e.preventDefault();
    if (entries.length > 0) {
      const entriesList = entries.map(function (ent) {return ent._id});
      fetch('/downloadcsv', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(entriesList)
      })
    }
  });

  $('.mailShipment').click(function (e) { 
    e.preventDefault();
    e.stopPropagation();
    var shipmentId = $(this).attr('data-id');
    var fetchUrl = '/mailshipment/' + shipmentId;
    fetch(fetchUrl);
  });
});
