











$(document).ready(function () {

    // Toolbar extra buttons
    var btnFinish = $('<button></button>').text('Enviar')
      .addClass('btn btn-outline-info btn-sm')

      .on('click', function () {
        if (!$(this).hasClass('disabled')) {
          var elmForm = $("#myForm");
          if (elmForm) {
            elmForm.validator('validate');
            var elmErr = elmForm.find('.has-error');
            if (elmErr && elmErr.length > 0) {
              alert('Oops we still have error in the form');
              return false;
            } else {
              alert('Great! we are ready to submit form');
              elmForm.submit();
              return false;
            }
          }
        }
      });
    var btnCancel = $('<button></button>').text('Cancelar')
      .addClass('btn btn-secondary btn-sm')
      .on('click', function () {
        $('#smartwizard').smartWizard("reset");
        $('#myForm').find("input, textarea").val("");
      });



    // Smart Wizard
    $('#smartwizard').smartWizard({
      selected: 0,
      theme: 'dots',
      transitionEffect: 'fade',
      toolbarSettings: {
        toolbarPosition: 'bottom',
        toolbarExtraButtons: [btnFinish, btnCancel]
      },
      anchorSettings: {
        markDoneStep: true, // add done css
        markAllPreviousStepsAsDone: true, // When a step selected by url hash, all previous steps are marked done
        removeDoneStepOnNavigateBack: true, // While navigate back done step after active step will be cleared
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
        $('.btn-finish').removeClass('disabled');
      } else {
        $('.btn-finish').addClass('disabled');
      }
    });

  });