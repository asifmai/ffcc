$(document).ready(function () {
  $('td.createdAt').each(function (index, element) {
    const dt = $(element).text();
    const newDt = moment(dt).format('DD/MM/YYYY HH:mm')
    $(element).text(newDt);
  });

  
  $('.btn-delete').on('click', function (e) {
    e.preventDefault();
    var deleteURL = $(this).attr("href");
    swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this User!",
      type: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then(function (result) {
      if (result.value) {
        window.location.href = deleteURL;
      }
    })
  });
});