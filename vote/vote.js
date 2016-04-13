var userip;

console.log("Your IP is :", userip);
function checkRadio() {
var r = document.getElementsByName("your_vote");
var c = -1

for(var i=0; i < r.length; i++){
   if(r[i].checked) {
      c = i; 
   }
}
if (c == -1) alert("please select radio");
}
$(document).ready(function() {
    $('#test-form').bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },        
        fields: {
            first_name: {
             message: 'The first name is not valid',
                validators: {
                    notEmpty: {
                        message: 'The first name is required and cannot be empty'
                    },
                    stringLength: {
                        min: 1,
                        max: 30,
                        message: 'The first name must be more than 1 and less than 30 characters long'
                    },
                    regexp: {
                        regexp: /^[A-z]+$/,
                        message: 'The first name can only accept alphabetical input'
                    },
                }
            },
            last_name: {
                message: 'Last Name is not valid',
                validators: {
                    notEmpty: {
                        message: 'Last Name is required and cannot be empty'
                    },
                    stringLength: {
                        min: 1,
                        max: 30,
                        message: 'Last Name must be more than 1 and less than 30 characters long'
                    },
                    regexp: {
                        regexp: /^[A-z]+$/,
                        message: 'Last Names can only consist of alphabetical characters'
                    },
                }
            },
            gender: {
                validators: {
                    notEmpty: {
                        message: 'Gender is required and cannot be empty'
                    },
                    stringLength: {
                        min: 1,
                        max: 20,
                        message: 'Gender must be more than 1 and less than 20 characters long'
                    },
                    regexp: {
                        regexp: /^[A-z]+$/,
                        message: 'Last Names can only consist of alphabetical characters'
                    },
                }
            },
            age: {
                validators: {
                    notEmpty: {
                        message: 'Age is required and cannot be empty'
                    },
                    stringLength: {
                        min: 1,
                        max: 2,
                        message: 'Gender must be a number between 1 and 99'
                    },
                    regexp: {
                        regexp: /^[0-9]+$/,
                        message: 'Age can only be numbers'
                    },
                }
            },
            cell_number: {
                validators: {
                    stringLength: {
                        min: 11,
                        max: 11,
                        message: 'Cell Number must be a 9 digits area code and number'
                    },
                    regexp: {
                        regexp: /^[0-9]+$/,
                        message: 'Cell Number can only be numbers'
                    },
                }
            },
            email_address: {
                validators: {
                    notEmpty: {
                        message: 'Please enter an Email'
                    },
                    emailAddress: {
                        message: 'The email address is not a valid'
                    }
                }
            }
        }
    })
    .on('success.form.bv', function(e) {
        // Prevent form submission
        e.preventDefault();

        // Get the form instance
        var $form = $(e.target);

        // Get the BootstrapValidator instance
        var bv = $form.data('bootstrapValidator');

        // Use Ajax to submit form data
        var url = 'https://script.google.com/macros/s/AKfycbwcYgaF2tk_-k1nt436LNUBCRBd4YzBXKsC4a2_EiPePquW_Xg/exec';
        var redirectUrl = 'success-page.html';
        // show the loading 
        $('#postForm').prepend($('<span></span>').addClass('glyphicon glyphicon-refresh glyphicon-refresh-animate'));
        var jqxhr = $.post(url, $form.serialize(), function(data) {
            console.log("Success! Data: " + data.statusText);
            $(location).attr('href',redirectUrl);
        })
        .fail(function(data) {
            console.warn("Error! Data: " + data.statusText);
            // HACK - check if browser is Safari - and redirect even if fail b/c we know the form submits.
            if (navigator.userAgent.search("Safari") >= 0 && navigator.userAgent.search("Chrome") < 0) {
                //alert("Browser is Safari -- we get an error, but the form still submits -- continue.");
                $(location).attr('href',redirectUrl);                
            }
        });
    });
});

var inputArray = [];

$('#postForm').on('click', function() {

  $('input[type="text"], input[type="number"]').each(function() {
    inputArray.push($(this).val()); 
    inputArray.splice(5,1);   
  });

  checkRadio();

  console.log(inputArray);

});