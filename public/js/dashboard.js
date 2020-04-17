$(document).ready(function () {
  console.log(entries)
  $('select[name="searchType"]').change(function (e) { 
    e.preventDefault();
    $('input[name="searchTerm"]').attr('placeholder', 'Enter ' + $('select[name="searchType"] > option:selected').text())
  });

  $('.search-area > i').click(function (e) { 
    search();
  });
  
  $('.search-area > input').keyup(function (e) { 
    if(e.keyCode == 13) search();
  });
  
  function search() {
    if ($('.search-area > input').val() !== '') {
      window.location.href = '/search?searchType=' + $('select[name="searchType"]').val() + '&searchTerm=' + $('.search-area > input').val();
    }
  }
});