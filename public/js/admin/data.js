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
      text: "You will not be able to recover this Entry!",
      type: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then(function (result) {
      if (result.value) {
        window.location.href = deleteURL;
      }
    })
  });

  $('.btn-details').click(function (e) { 
    e.preventDefault();
    $('#details-modal .modal-body').html('')
    const entryId = $(this).attr('data-id');
    const entry = entries.find(en => en._id == entryId);
    $('#details-modal .modal-header h5').text(`Details for ${entry.details['Booking No'] || entry.details['Job No']}`)
    for (const key in entry.details) {
      const html = `<p><span style="width: 400px; display: inline-block">${key}:</span><strong>${entry.details[key]}</strong></p>`
      $(html).appendTo('#details-modal .modal-body');
    }
    $('#details-modal').modal('show')
  });
});