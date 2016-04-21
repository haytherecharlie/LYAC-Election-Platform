var verify = (function () {

    function checkRadio() {
        var r = document.getElementsByName("your_vote");
        var s = document.getElementsByName("referendum");
        var c = -1
        var d = -1

        for (var i = 0; i < r.length; i++) {
            if (r[i].checked) {
                c = i;
            }
        }
        for (var i = 0; i < s.length; i++) {
            if (s[i].checked) {
                d = i;
            }
        }
        if (c == -1 || d == -1) {
            return false;
        }
        return true;
    }

    $(document).ready(function () {
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
                                message: 'Cell Number must be a 11 digits (1 + area code + number) with no spaces'
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
            .on('success.form.bv', function (e) {
                // Prevent form submission
                e.preventDefault();

                // Get the form instance
                var $form = $(e.target);

                // Get the BootstrapValidator instance
                var bv = $form.data('bootstrapValidator');

                // Use Ajax to submit form data
                var url = 'https://script.google.com/macros/s/AKfycbwcYgaF2tk_-k1nt436LNUBCRBd4YzBXKsC4a2_EiPePquW_Xg/exec';
                var arrayForm = makeArray();
                var redirectUrl = setURI(arrayForm);
                // show the loading
                $('#postForm').prepend($('<span></span>').addClass('glyphicon glyphicon-refresh glyphicon-refresh-animate'));
                var jqxhr = $.post(url, $form.serialize(), function (data) {
                        console.log("Success! Data: " + data.statusText);
                        $(location).attr('href', redirectUrl);
                    })
                    .fail(function (data) {
                        console.warn("Error! Data: " + data.statusText);
                        // HACK - check if browser is Safari - and redirect even if fail b/c we know the form submits.
                        if (navigator.userAgent.search("Safari") >= 0 && navigator.userAgent.search("Chrome") < 0) {
                            //alert("Browser is Safari -- we get an error, but the form still submits -- continue.");
                            $(location).attr('href', redirectUrl);
                        }
                    });
            });
    });

    function getWard() {
        var url = location.href.split('&');
        var wardNumber = url[1].split('=');
        console.log(wardNumber[1]);
        return wardNumber[1];
    }

    function getAddress() {
        var url = location.href.split('&');
        var address = url[0].split('=');
        return address[1];
    }

    function setURI(inputArray) {
        var url = 'http://votelyac.ca/verify/?' +
            'timestamp=2349234982' +
            '&your_vote=' + inputArray[6] +
            '&referendum=' + inputArray[7] +
            '&ward=' + inputArray[13];
        return url;
    }



    $('.container').prepend('<h1>LYAC Election: Ward ' + getWard() + ' Ballot</h1><hr>');

    function makeArray() {
        var inputArray = [];
        if (checkRadio() === true) {
            $('#address').val(getAddress());
            $('#ward').val(getWard());

            $('input[type="text"], input[type="number"], input[type="radio"]:checked').each(function () {
                inputArray.push($(this).val());
            });
            if (document.getElementById('email_opt').checked) {
                inputArray.push('yes');
            } else {
                inputArray.push('no');
            }
            inputArray.push("" + createVerifyCode());
            var temp = createArrayFromURI()
            for (i in temp) {
                inputArray.push(temp[i]);
            }
            return inputArray;
        }
        else if (checkRadio() === false) {
            e.preventDefault();
            $('#vote-modal').modal('show');
        }
    }

    function createVerifyCode() {
        var code = Math.round(Math.random() * 10000);
        return code;
    }

    function createArrayFromURI() {
        var url = location.href.split('?');
        var keyPair = url[1].split('&');
        var dataArray = [];
        for (i in keyPair) {
            var temp = keyPair[i].split('=');
            dataArray.push(temp[1]);
        }
        return dataArray;
    }

})();
