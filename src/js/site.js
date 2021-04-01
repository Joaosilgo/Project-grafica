


$('#empresa').change(function () {
  $('#subject').val('Orçamentos Gráficos ' + $(this).val());
});

(function () {
  'use strict';
  window.addEventListener('load', function () {
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.getElementsByClassName('needs-validation');
    // Loop over them and prevent submission
    var validation = Array.prototype.filter.call(forms, function (form) {
      form.addEventListener('submit', function (event) {
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add('was-validated');
      }, false);
    });
  }, false);
})();





$(document).ready(function () {
  $("#file").on("change", function (e) {
    var files = $(this)[0].files;
    if (files.length >= 2) {
      $("#label-span").text(files.length + " files ready to upload");
    }
    else if (files.length == 0) {
      $("#label-span").text(" Escolha Ficheiros");
    }
    else {
      var filename = e.target.value.split('\\').pop();
      $("#label-span").text(filename);
    }
  });
});




// Smooth scrolling using jQuery easing
$('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function () {
  if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
    var target = $(this.hash);
    target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
    if (target.length) {
      $('html, body').animate({
        scrollTop: (target.offset().top - 56)
      }, 1000, "easeInOutExpo");
      return false;
    }
  }
});



$(document).ready(function () {

  // Toolbar extra buttons 
  var btnFinish = $('<button id="send" > </button>').text('Enviar ')
    .addClass(' btn btn-info btn-sm btnfinish disabled  ')
    .append('<i  class="fas fa-paper-plane"></i>')
    .on('click', function () {
      if (!$(this).hasClass('disabled')) {
        var elmForm = $("#myForm");
        if (elmForm) {
          elmForm.validator('validate');
          var elmErr = elmForm.find('.has-error');
          if (elmErr && elmErr.length > 0) {
            alert('Ops, existe erros no formulário');
            if (navigator.vibrate) {
              console.log("vibrate");
              window.navigator.vibrate([200, 50, 200]);
            }
            return false;
          }
          else {
            alert('Ótimo! Estamos prontos para submeter o formulário');
            if (navigator.vibrate) {
              console.log("vibrate");
              window.navigator.vibrate([50, 100, 50]);
            }
            elmForm.submit();
            return false;
          }
        }
      }
    });
  var btnCancel = $('<button></button>').text('Cancelar ')
    .addClass('btn btn-secondary btn-sm')
    .append('<i class="fas fa-times"></i>')
    .on('click', function () {
      $('#smartwizard').smartWizard("reset");
      $('#myForm').find("input, textarea").val("");
      if (navigator.vibrate) {
        console.log("vibrate");
        window.navigator.vibrate([200, 50, 200]);
      }
    });

  // Smart Wizard
  $('#smartwizard').smartWizard({
    selected: 0,
    theme: 'dots',
    transitionEffect: 'fade',
    transitionSpeed: 1000,

    toolbarSettings: {
      toolbarPosition: 'bottom',
      toolbarExtraButtons: [btnFinish, btnCancel]
    },
    anchorSettings: {
      markDoneStep: true, // add done css
      markAllPreviousStepsAsDone: true, // When a step selected by url hash, all previous steps are marked done
      removeDoneStepOnNavigateBack: false, // While navigate back done step after active step will be cleared
      enableAnchorOnDoneStep: true // Enable/Disable the done steps navigation
    }
  });

  $("#smartwizard").on("leaveStep", function (e, anchorObject, stepNumber, stepDirection) {
    var elmForm = $("#form-step-" + stepNumber);
    // stepDirection === 'forward' :- this condition allows to do the form validation
    // only on forward navigation, that makes easy navigation on backwards still do the validation when going next
    if (stepDirection === 'forward' && elmForm) {
      elmForm.validator('validate');
      var elmErr = elmForm.children('.has-error');
      if (elmErr && elmErr.length > 0) {
        // Form validation failed
        return false;
      }
    }
    return true;
  });

  $("#smartwizard").on("showStep", function (e, anchorObject, stepNumber, stepDirection) {
    // Enable finish button only on last step
    if (stepNumber == 5) {
      $('.btnfinish').removeClass('disabled ');
      $('.btnfinish').addClass('btn-info');
    } else {
      $('.btnfinish').addClass('disabled')
    }
  });
});




// Can also be used with $(document).ready()
$(window).load(function () {
  $('.flexslider').flexslider({
    animation: "slide"
  });
});








