$(document).ready(function () {
  $('.table-container > table').tablesort();

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
  
  $('.btn-multiple-delete').on('click', function (e) {
    e.preventDefault();
    swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover these Entries!",
      type: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete them!",
    }).then(function (result) {
      if (result.value) {
        const deleteList = [];
        $('.data-check').each(function (index, element) {
          if ($(element).is(':checked')) {
            deleteList.push($(element).attr('data-id'));
          }
        });    
        fetch('/admin/data/deletemultiple', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(deleteList)
        }).then(function (data) {
          window.location.href = '/admin/data';
        })
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

  $('.data-check').on('click', function(e) {
    let checked = false;
    $('.data-check').each(function (index, element) {
      if ($(element).is(':checked')) {
        checked = true;
      }
    });
    if (checked) {
      $('.multiple-actions').removeClass('d-none');
    } else {
      $('.multiple-actions').addClass('d-none');
    }
  })
});