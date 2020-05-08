$(document).ready(function () {
  $('td.createdAt').each(function (index, element) {
    const dt = $(element).text();
    const newDt = moment(dt).format('DD/MM/YYYY HH:mm')
    $(element).text(newDt);
  });

  $('.btn-changepassword').click(function (e) { 
    e.preventDefault();
    const userName = $(this).attr('data-username');
    const userId = $(this).attr('data-userid');
    $('#modal-changepassword span#userName').text(userName);
    $('#modal-changepassword input#userId').val(userId);
    $('#modal-changepassword').modal('show')
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