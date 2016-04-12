LocalStore = (function () {

    var form = $('#auto-comp');
    var voteContainer = $('#vote-container');
    var wardData = null;
    var ward;

    function wardFinder() {

        $.ajax({
            url: './wards.geojson',
            dataType: 'json',
            success: function load(d) {
                wardData = d;
            }
        });
        
        var defaultBounds = new google.maps.LatLngBounds(
        new google.maps.LatLng(42.774235,-81.570954),
        new google.maps.LatLng(43.173135,-80.880189));
        
        var options = {
            types: [],
            componentRestrictions: {country: 'CA'},
            bounds: defaultBounds
        };
        
        var autocomplete = new google.maps.places.Autocomplete(document.getElementById('auto-comp'), options);
        
        google.maps.event.addListener(autocomplete, 'place_changed', function() {
            var place = autocomplete.getPlace();
            
            if (typeof place === 'undefined' || !place.geometry) {
                $('.modal-body').append('<h4>It doesn\'t look like your address is in the London voting area, please ensure you entered it correctly.</h4><button id="close-modal" class="button">Close</button>');
            } else {          
                var polys = L.geoJson(wardData);
                var pt = new Array();
                pt[1] = place.geometry.location.lat();
                pt[0] = place.geometry.location.lng();
                var layer = leafletPip.pointInLayer(pt, polys, true);
                if (layer.length > 0) {
                    ward = layer[0].feature.properties.WARDS;
                    switch(ward){
                        case '1':
                            $('.modal-body').append('LYAC Election: Ward ' + ward + ' Ballot<hr>' +
                                'Voter Information<hr>' +
                                '<form class="form-horizontal" role="form" id="ward-1">' +
                                '<input type="text" class="form-control" name="FirstName" placeholder="First Name"/>' +
                                '<input type="text" class="form-control" name="LastName" placeholder="Last Name"/>' +
                                '<input type="text" class="form-control" name="Gender" placeholder="Gender"/>' +
                                '<input type="text" class="form-control" name="Age" placeholder="Age"/>' +
                                '<input type="text" class="form-control" name="CellPhoneNumber" placeholder="Cell Phone Number"/>' +
                                '<input type="text" class="form-control" name="Email" placeholder="Email Address"/> <hr>' +
                                'Your Vote<hr>' +
                                '<table class="table table-striped"><tbody>' +
                                '<tr><td id="one"><input type="radio" class="radio" name="Candidate" /></td><td id="two"> <h5>Justin Trudeau</h5></tr>' +
                                '<tr><td id="one"><input type="radio" class="radio" name="Candidate" /></td><td id="two"> <h5>Stephen Harper</h5></tr>' +
                                '<tr><td id="one"><input type="radio" class="radio" name="Candidate" /></td><td id="two"> <h5>Paul Martin</h5></tr>' +
                                '<tr><td id="one"><input type="radio" class="radio" name="Candidate" /></td><td id="two"> <h5>Jean Cretien</h5></tr>' +
                                '<tr><td id="one"><input type="radio" class="radio" name="Candidate" /></td><td id="two"> <h5>Kim Campbell</h5></tr>' +
                                '<tr><td id="one"><input type="radio" class="radio" name="Candidate" /></td><td id="two"> <h5>Brian Mulrooney</h5></tr>' +
                                '<tr><td id="one"><input type="radio" class="radio" name="Candidate" /></td><td id="two"> <h5>John Turner</h5></tr>' +
                                '<tr><td id="one"><input type="radio" class="radio" name="Candidate" /></td><td id="two"> <h5>Pierre Trudeau</h5></tr>' +
                                '<tr><td id="one"><input type="radio" class="radio" name="Candidate" /></td><td id="two"> <h5>Joe Clark</h5></tr>' +
                                '<tr><td id="one"><input type="radio" class="radio" name="Candidate" /></td><td id="two"> <h5>Lester B Pearson</h5></tr>' +
                                '<tr><td id="one"><input type="radio" class="radio" name="Candidate" /></td><td id="two"> <h5>John Definbaker</h5></tr>' +
                                '</tbody></table>' +
                                'Referendum Question<hr>' +
                                '<input type="text" class="Referendum" name="Referendum" placeholder="Referendum"/> <hr>' +
                                '<table class="table"><tbody><tr><td><input type="checkbox" class="checkbox" name="EmailOptIn"/></td><td> LYAC has permission to send me emails about the election results and other LYAC news</td></tr>' +
                                '<tr><td><input type="checkbox" class="checkbox" name="TrustMyVote"/> </td><td> I am who I say I am. I am voting in the area where I live or go to school. I am casting my vote fairly and not under pressure. I have provided accurate contact information. The LYAC should trust my vote.</td></tr></tbody></table> ' +
                                '<button type="submit" class="btn btn-default" id="postForm">Submit</button>' +
                                '</form>'
                                );
                            $('.modal-footer').append('');
                            break;
                        case '2':
                               $('.modal-body').append('LYAC Election: Ward ' + ward + ' Ballot<hr>' +
                                'Voter Information<hr>' +
                                '<input type="text" class="form-control" name="FirstName" placeholder="First Name"/>' +
                                '<input type="text" class="form-control" name="LastName" placeholder="Last Name"/>' +
                                '<input type="text" class="form-control" name="Gender" placeholder="Gender"/>' +
                                '<input type="text" class="form-control" name="Age" placeholder="Age"/>' +
                                '<input type="text" class="form-control" name="CellPhoneNumber" placeholder="Cell Phone Number"/>' +
                                '<input type="text" class="form-control" name="Email" placeholder="Email Address"/> <hr>' +
                                'Your Vote<hr>' +
                                '<table class="table table-striped"><tbody>' +
                                '<tr><td id="one"><input type="radio" class="radio" name="Candidate" /></td><td id="two"> <h5>Justin Trudeau</h5></tr>' +
                                '<tr><td id="one"><input type="radio" class="radio" name="Candidate" /></td><td id="two"> <h5>Stephen Harper</h5></tr>' +
                                '<tr><td id="one"><input type="radio" class="radio" name="Candidate" /></td><td id="two"> <h5>Paul Martin</h5></tr>' +
                                '<tr><td id="one"><input type="radio" class="radio" name="Candidate" /></td><td id="two"> <h5>Jean Cretien</h5></tr>' +
                                '<tr><td id="one"><input type="radio" class="radio" name="Candidate" /></td><td id="two"> <h5>Kim Campbell</h5></tr>' +
                                '<tr><td id="one"><input type="radio" class="radio" name="Candidate" /></td><td id="two"> <h5>Brian Mulrooney</h5></tr>' +
                                '<tr><td id="one"><input type="radio" class="radio" name="Candidate" /></td><td id="two"> <h5>John Turner</h5></tr>' +
                                '<tr><td id="one"><input type="radio" class="radio" name="Candidate" /></td><td id="two"> <h5>Pierre Trudeau</h5></tr>' +
                                '<tr><td id="one"><input type="radio" class="radio" name="Candidate" /></td><td id="two"> <h5>Joe Clark</h5></tr>' +
                                '<tr><td id="one"><input type="radio" class="radio" name="Candidate" /></td><td id="two"> <h5>Lester B Pearson</h5></tr>' +
                                '<tr><td id="one"><input type="radio" class="radio" name="Candidate" /></td><td id="two"> <h5>John Definbaker</h5></tr>' +
                                '</tbody></table>'
                                );
                            $('.modal-footer').append('' +
                                '<table class="table"><tbody><tr><td><input type="checkbox" class="checkbox" name="EmailOptIn"/></td><td> LYAC has permission to send me emails about the election results and other LYAC news</td></tr>' +
                                '<tr><td><input type="checkbox" class="checkbox" name="TrustMyVote"/> </td><td> I am who I say I am. I am voting in the area where I live or go to school. I am casting my vote fairly and not under pressure. I have provided accurate contact information. The LYAC should trust my vote.</td></tr></tbody></table> ' +
                                '<button type="submit" class="btn btn-default" id="postForm">Submit</button>'
                                );
                            break;
                        case '3':
                               $('.modal-body').append('LYAC Election: Ward ' + ward + ' Ballot<hr>' +
                                'Voter Information<hr>' +
                                '<input type="text" class="form-control" name="FirstName" placeholder="First Name"/>' +
                                '<input type="text" class="form-control" name="LastName" placeholder="Last Name"/>' +
                                '<input type="text" class="form-control" name="Gender" placeholder="Gender"/>' +
                                '<input type="text" class="form-control" name="Age" placeholder="Age"/>' +
                                '<input type="text" class="form-control" name="CellPhoneNumber" placeholder="Cell Phone Number"/>' +
                                '<input type="text" class="form-control" name="Email" placeholder="Email Address"/> <hr>' +
                                'Your Vote<hr>' +
                                '<table class="table table-striped"><tbody>' +
                                '<tr><td id="one"><input type="radio" class="radio" name="Candidate" /></td><td id="two"> <h5>Justin Trudeau</h5></tr>' +
                                '<tr><td id="one"><input type="radio" class="radio" name="Candidate" /></td><td id="two"> <h5>Stephen Harper</h5></tr>' +
                                '<tr><td id="one"><input type="radio" class="radio" name="Candidate" /></td><td id="two"> <h5>Paul Martin</h5></tr>' +
                                '<tr><td id="one"><input type="radio" class="radio" name="Candidate" /></td><td id="two"> <h5>Jean Cretien</h5></tr>' +
                                '<tr><td id="one"><input type="radio" class="radio" name="Candidate" /></td><td id="two"> <h5>Kim Campbell</h5></tr>' +
                                '<tr><td id="one"><input type="radio" class="radio" name="Candidate" /></td><td id="two"> <h5>Brian Mulrooney</h5></tr>' +
                                '<tr><td id="one"><input type="radio" class="radio" name="Candidate" /></td><td id="two"> <h5>John Turner</h5></tr>' +
                                '<tr><td id="one"><input type="radio" class="radio" name="Candidate" /></td><td id="two"> <h5>Pierre Trudeau</h5></tr>' +
                                '<tr><td id="one"><input type="radio" class="radio" name="Candidate" /></td><td id="two"> <h5>Joe Clark</h5></tr>' +
                                '<tr><td id="one"><input type="radio" class="radio" name="Candidate" /></td><td id="two"> <h5>Lester B Pearson</h5></tr>' +
                                '<tr><td id="one"><input type="radio" class="radio" name="Candidate" /></td><td id="two"> <h5>John Definbaker</h5></tr>' +
                                '</tbody></table>'
                                );
                            $('.modal-footer').append('' +
                                '<table class="table"><tbody><tr><td><input type="checkbox" class="checkbox" name="EmailOptIn"/></td><td> LYAC has permission to send me emails about the election results and other LYAC news</td></tr>' +
                                '<tr><td><input type="checkbox" class="checkbox" name="TrustMyVote"/> </td><td> I am who I say I am. I am voting in the area where I live or go to school. I am casting my vote fairly and not under pressure. I have provided accurate contact information. The LYAC should trust my vote.</td></tr></tbody></table> ' +
                                '<button type="submit" class="btn btn-default" id="postForm">Submit</button>'
                                );
                            break;
                        case '4':
                               $('.modal-body').append('LYAC Election: Ward ' + ward + ' Ballot<hr>' +
                                'Voter Information<hr>' +
                                '<input type="text" class="form-control" name="FirstName" placeholder="First Name"/>' +
                                '<input type="text" class="form-control" name="LastName" placeholder="Last Name"/>' +
                                '<input type="text" class="form-control" name="Gender" placeholder="Gender"/>' +
                                '<input type="text" class="form-control" name="Age" placeholder="Age"/>' +
                                '<input type="text" class="form-control" name="CellPhoneNumber" placeholder="Cell Phone Number"/>' +
                                '<input type="text" class="form-control" name="Email" placeholder="Email Address"/> <hr>' +
                                'Your Vote<hr>' +
                                '<table class="table table-striped"><tbody>' +
                                '<tr><td id="one"><input type="radio" class="radio" name="Candidate" /></td><td id="two"> <h5>Justin Trudeau</h5></tr>' +
                                '<tr><td id="one"><input type="radio" class="radio" name="Candidate" /></td><td id="two"> <h5>Stephen Harper</h5></tr>' +
                                '<tr><td id="one"><input type="radio" class="radio" name="Candidate" /></td><td id="two"> <h5>Paul Martin</h5></tr>' +
                                '<tr><td id="one"><input type="radio" class="radio" name="Candidate" /></td><td id="two"> <h5>Jean Cretien</h5></tr>' +
                                '<tr><td id="one"><input type="radio" class="radio" name="Candidate" /></td><td id="two"> <h5>Kim Campbell</h5></tr>' +
                                '<tr><td id="one"><input type="radio" class="radio" name="Candidate" /></td><td id="two"> <h5>Brian Mulrooney</h5></tr>' +
                                '<tr><td id="one"><input type="radio" class="radio" name="Candidate" /></td><td id="two"> <h5>John Turner</h5></tr>' +
                                '<tr><td id="one"><input type="radio" class="radio" name="Candidate" /></td><td id="two"> <h5>Pierre Trudeau</h5></tr>' +
                                '<tr><td id="one"><input type="radio" class="radio" name="Candidate" /></td><td id="two"> <h5>Joe Clark</h5></tr>' +
                                '<tr><td id="one"><input type="radio" class="radio" name="Candidate" /></td><td id="two"> <h5>Lester B Pearson</h5></tr>' +
                                '<tr><td id="one"><input type="radio" class="radio" name="Candidate" /></td><td id="two"> <h5>John Definbaker</h5></tr>' +
                                '</tbody></table>'
                                );
                            $('.modal-footer').append('' +
                                '<table class="table"><tbody><tr><td><input type="checkbox" class="checkbox" name="EmailOptIn"/></td><td> LYAC has permission to send me emails about the election results and other LYAC news</td></tr>' +
                                '<tr><td><input type="checkbox" class="checkbox" name="TrustMyVote"/> </td><td> I am who I say I am. I am voting in the area where I live or go to school. I am casting my vote fairly and not under pressure. I have provided accurate contact information. The LYAC should trust my vote.</td></tr></tbody></table> ' +
                                '<button type="submit" class="btn btn-default" id="postForm">Submit</button>'
                                );
                            break;
                        case '5':
                               $('.modal-body').append('LYAC Election: Ward ' + ward + ' Ballot<hr>' +
                                'Voter Information<hr>' +
                                '<input type="text" class="form-control" name="FirstName" placeholder="First Name"/>' +
                                '<input type="text" class="form-control" name="LastName" placeholder="Last Name"/>' +
                                '<input type="text" class="form-control" name="Gender" placeholder="Gender"/>' +
                                '<input type="text" class="form-control" name="Age" placeholder="Age"/>' +
                                '<input type="text" class="form-control" name="CellPhoneNumber" placeholder="Cell Phone Number"/>' +
                                '<input type="text" class="form-control" name="Email" placeholder="Email Address"/> <hr>' +
                                'Your Vote<hr>' +
                                '<table class="table table-striped"><tbody>' +
                                '<tr><td id="one"><input type="radio" class="radio" name="Candidate" /></td><td id="two"> <h5>Justin Trudeau</h5></tr>' +
                                '<tr><td id="one"><input type="radio" class="radio" name="Candidate" /></td><td id="two"> <h5>Stephen Harper</h5></tr>' +
                                '<tr><td id="one"><input type="radio" class="radio" name="Candidate" /></td><td id="two"> <h5>Paul Martin</h5></tr>' +
                                '<tr><td id="one"><input type="radio" class="radio" name="Candidate" /></td><td id="two"> <h5>Jean Cretien</h5></tr>' +
                                '<tr><td id="one"><input type="radio" class="radio" name="Candidate" /></td><td id="two"> <h5>Kim Campbell</h5></tr>' +
                                '<tr><td id="one"><input type="radio" class="radio" name="Candidate" /></td><td id="two"> <h5>Brian Mulrooney</h5></tr>' +
                                '<tr><td id="one"><input type="radio" class="radio" name="Candidate" /></td><td id="two"> <h5>John Turner</h5></tr>' +
                                '<tr><td id="one"><input type="radio" class="radio" name="Candidate" /></td><td id="two"> <h5>Pierre Trudeau</h5></tr>' +
                                '<tr><td id="one"><input type="radio" class="radio" name="Candidate" /></td><td id="two"> <h5>Joe Clark</h5></tr>' +
                                '<tr><td id="one"><input type="radio" class="radio" name="Candidate" /></td><td id="two"> <h5>Lester B Pearson</h5></tr>' +
                                '<tr><td id="one"><input type="radio" class="radio" name="Candidate" /></td><td id="two"> <h5>John Definbaker</h5></tr>' +
                                '</tbody></table>'
                                );
                            $('.modal-footer').append('' +
                                '<table class="table"><tbody><tr><td><input type="checkbox" class="checkbox" name="EmailOptIn"/></td><td> LYAC has permission to send me emails about the election results and other LYAC news</td></tr>' +
                                '<tr><td><input type="checkbox" class="checkbox" name="TrustMyVote"/> </td><td> I am who I say I am. I am voting in the area where I live or go to school. I am casting my vote fairly and not under pressure. I have provided accurate contact information. The LYAC should trust my vote.</td></tr></tbody></table> ' +
                                '<button type="submit" class="btn btn-default" id="postForm">Submit</button>'
                                );
                            break;
                        case '6':
                               $('.modal-body').append('LYAC Election: Ward ' + ward + ' Ballot<hr>' +
                                'Voter Information<hr>' +
                                '<input type="text" class="form-control" name="FirstName" placeholder="First Name"/>' +
                                '<input type="text" class="form-control" name="LastName" placeholder="Last Name"/>' +
                                '<input type="text" class="form-control" name="Gender" placeholder="Gender"/>' +
                                '<input type="text" class="form-control" name="Age" placeholder="Age"/>' +
                                '<input type="text" class="form-control" name="CellPhoneNumber" placeholder="Cell Phone Number"/>' +
                                '<input type="text" class="form-control" name="Email" placeholder="Email Address"/> <hr>' +
                                'Your Vote<hr>' +
                                '<table class="table table-striped"><tbody>' +
                                '<tr><td id="one"><input type="radio" class="radio" name="Candidate" /></td><td id="two"> <h5>Justin Trudeau</h5></tr>' +
                                '<tr><td id="one"><input type="radio" class="radio" name="Candidate" /></td><td id="two"> <h5>Stephen Harper</h5></tr>' +
                                '<tr><td id="one"><input type="radio" class="radio" name="Candidate" /></td><td id="two"> <h5>Paul Martin</h5></tr>' +
                                '<tr><td id="one"><input type="radio" class="radio" name="Candidate" /></td><td id="two"> <h5>Jean Cretien</h5></tr>' +
                                '<tr><td id="one"><input type="radio" class="radio" name="Candidate" /></td><td id="two"> <h5>Kim Campbell</h5></tr>' +
                                '<tr><td id="one"><input type="radio" class="radio" name="Candidate" /></td><td id="two"> <h5>Brian Mulrooney</h5></tr>' +
                                '<tr><td id="one"><input type="radio" class="radio" name="Candidate" /></td><td id="two"> <h5>John Turner</h5></tr>' +
                                '<tr><td id="one"><input type="radio" class="radio" name="Candidate" /></td><td id="two"> <h5>Pierre Trudeau</h5></tr>' +
                                '<tr><td id="one"><input type="radio" class="radio" name="Candidate" /></td><td id="two"> <h5>Joe Clark</h5></tr>' +
                                '<tr><td id="one"><input type="radio" class="radio" name="Candidate" /></td><td id="two"> <h5>Lester B Pearson</h5></tr>' +
                                '<tr><td id="one"><input type="radio" class="radio" name="Candidate" /></td><td id="two"> <h5>John Definbaker</h5></tr>' +
                                '</tbody></table>'
                                );
                            $('.modal-footer').append('' +
                                '<table class="table"><tbody><tr><td><input type="checkbox" class="checkbox" name="EmailOptIn"/></td><td> LYAC has permission to send me emails about the election results and other LYAC news</td></tr>' +
                                '<tr><td><input type="checkbox" class="checkbox" name="TrustMyVote"/> </td><td> I am who I say I am. I am voting in the area where I live or go to school. I am casting my vote fairly and not under pressure. I have provided accurate contact information. The LYAC should trust my vote.</td></tr></tbody></table> ' +
                                '<button type="submit" class="btn btn-default" id="postForm">Submit</button>'
                                );
                            break;
                        case '7':
                               $('.modal-body').append('LYAC Election: Ward ' + ward + ' Ballot<hr>' +
                                'Voter Information<hr>' +
                                '<input type="text" class="form-control" name="FirstName" placeholder="First Name"/>' +
                                '<input type="text" class="form-control" name="LastName" placeholder="Last Name"/>' +
                                '<input type="text" class="form-control" name="Gender" placeholder="Gender"/>' +
                                '<input type="text" class="form-control" name="Age" placeholder="Age"/>' +
                                '<input type="text" class="form-control" name="CellPhoneNumber" placeholder="Cell Phone Number"/>' +
                                '<input type="text" class="form-control" name="Email" placeholder="Email Address"/> <hr>' +
                                'Your Vote<hr>' +
                                '<table class="table table-striped"><tbody>' +
                                '<tr><td id="one"><input type="radio" class="radio" name="Candidate" /></td><td id="two"> <h5>Justin Trudeau</h5></tr>' +
                                '<tr><td id="one"><input type="radio" class="radio" name="Candidate" /></td><td id="two"> <h5>Stephen Harper</h5></tr>' +
                                '<tr><td id="one"><input type="radio" class="radio" name="Candidate" /></td><td id="two"> <h5>Paul Martin</h5></tr>' +
                                '<tr><td id="one"><input type="radio" class="radio" name="Candidate" /></td><td id="two"> <h5>Jean Cretien</h5></tr>' +
                                '<tr><td id="one"><input type="radio" class="radio" name="Candidate" /></td><td id="two"> <h5>Kim Campbell</h5></tr>' +
                                '<tr><td id="one"><input type="radio" class="radio" name="Candidate" /></td><td id="two"> <h5>Brian Mulrooney</h5></tr>' +
                                '<tr><td id="one"><input type="radio" class="radio" name="Candidate" /></td><td id="two"> <h5>John Turner</h5></tr>' +
                                '<tr><td id="one"><input type="radio" class="radio" name="Candidate" /></td><td id="two"> <h5>Pierre Trudeau</h5></tr>' +
                                '<tr><td id="one"><input type="radio" class="radio" name="Candidate" /></td><td id="two"> <h5>Joe Clark</h5></tr>' +
                                '<tr><td id="one"><input type="radio" class="radio" name="Candidate" /></td><td id="two"> <h5>Lester B Pearson</h5></tr>' +
                                '<tr><td id="one"><input type="radio" class="radio" name="Candidate" /></td><td id="two"> <h5>John Definbaker</h5></tr>' +
                                '</tbody></table>'
                                );
                            $('.modal-footer').append('' +
                                '<table class="table"><tbody><tr><td><input type="checkbox" class="checkbox" name="EmailOptIn"/></td><td> LYAC has permission to send me emails about the election results and other LYAC news</td></tr>' +
                                '<tr><td><input type="checkbox" class="checkbox" name="TrustMyVote"/> </td><td> I am who I say I am. I am voting in the area where I live or go to school. I am casting my vote fairly and not under pressure. I have provided accurate contact information. The LYAC should trust my vote.</td></tr></tbody></table> ' +
                                '<button type="submit" class="btn btn-default" id="postForm">Submit</button>'
                                );
                            break;
                        case '8':
                               $('.modal-body').append('LYAC Election: Ward ' + ward + ' Ballot<hr>' +
                                'Voter Information<hr>' +
                                '<input type="text" class="form-control" name="FirstName" placeholder="First Name"/>' +
                                '<input type="text" class="form-control" name="LastName" placeholder="Last Name"/>' +
                                '<input type="text" class="form-control" name="Gender" placeholder="Gender"/>' +
                                '<input type="text" class="form-control" name="Age" placeholder="Age"/>' +
                                '<input type="text" class="form-control" name="CellPhoneNumber" placeholder="Cell Phone Number"/>' +
                                '<input type="text" class="form-control" name="Email" placeholder="Email Address"/> <hr>' +
                                'Your Vote<hr>' +
                                '<table class="table table-striped"><tbody>' +
                                '<tr><td id="one"><input type="radio" class="radio" name="Candidate" /></td><td id="two"> <h5>Justin Trudeau</h5></tr>' +
                                '<tr><td id="one"><input type="radio" class="radio" name="Candidate" /></td><td id="two"> <h5>Stephen Harper</h5></tr>' +
                                '<tr><td id="one"><input type="radio" class="radio" name="Candidate" /></td><td id="two"> <h5>Paul Martin</h5></tr>' +
                                '<tr><td id="one"><input type="radio" class="radio" name="Candidate" /></td><td id="two"> <h5>Jean Cretien</h5></tr>' +
                                '<tr><td id="one"><input type="radio" class="radio" name="Candidate" /></td><td id="two"> <h5>Kim Campbell</h5></tr>' +
                                '<tr><td id="one"><input type="radio" class="radio" name="Candidate" /></td><td id="two"> <h5>Brian Mulrooney</h5></tr>' +
                                '<tr><td id="one"><input type="radio" class="radio" name="Candidate" /></td><td id="two"> <h5>John Turner</h5></tr>' +
                                '<tr><td id="one"><input type="radio" class="radio" name="Candidate" /></td><td id="two"> <h5>Pierre Trudeau</h5></tr>' +
                                '<tr><td id="one"><input type="radio" class="radio" name="Candidate" /></td><td id="two"> <h5>Joe Clark</h5></tr>' +
                                '<tr><td id="one"><input type="radio" class="radio" name="Candidate" /></td><td id="two"> <h5>Lester B Pearson</h5></tr>' +
                                '<tr><td id="one"><input type="radio" class="radio" name="Candidate" /></td><td id="two"> <h5>John Definbaker</h5></tr>' +
                                '</tbody></table>'
                                );
                            $('.modal-footer').append('' +
                                '<table class="table"><tbody id="permissions"><tr><td><input type="checkbox" class="checkbox" name="EmailOptIn"/></td><td> LYAC has permission to send me emails about the election results and other LYAC news</td></tr>' +
                                '<tr><td><input type="checkbox" class="checkbox" name="TrustMyVote"/> </td><td> I am who I say I am. I am voting in the area where I live or go to school. I am casting my vote fairly and not under pressure. I have provided accurate contact information. The LYAC should trust my vote.</td></tr></tbody></table> ' +
                                '<button type="submit" class="btn btn-default" id="postForm">Submit</button>'
                                );
                            break;
                        case '9':
                               $('.modal-body').append('LYAC Election: Ward ' + ward + ' Ballot<hr>' +
                                'Voter Information<hr>' +
                                '<input type="text" class="form-control" name="FirstName" placeholder="First Name"/>' +
                                '<input type="text" class="form-control" name="LastName" placeholder="Last Name"/>' +
                                '<input type="text" class="form-control" name="Gender" placeholder="Gender"/>' +
                                '<input type="text" class="form-control" name="Age" placeholder="Age"/>' +
                                '<input type="text" class="form-control" name="CellPhoneNumber" placeholder="Cell Phone Number"/>' +
                                '<input type="text" class="form-control" name="Email" placeholder="Email Address"/> <hr>' +
                                'Your Vote<hr>' +
                                '<table class="table table-striped"><tbody>' +
                                '<tr><td id="one"><input type="radio" class="radio" name="Candidate" /></td><td id="two"> <h5>Justin Trudeau</h5></tr>' +
                                '<tr><td id="one"><input type="radio" class="radio" name="Candidate" /></td><td id="two"> <h5>Stephen Harper</h5></tr>' +
                                '<tr><td id="one"><input type="radio" class="radio" name="Candidate" /></td><td id="two"> <h5>Paul Martin</h5></tr>' +
                                '<tr><td id="one"><input type="radio" class="radio" name="Candidate" /></td><td id="two"> <h5>Jean Cretien</h5></tr>' +
                                '<tr><td id="one"><input type="radio" class="radio" name="Candidate" /></td><td id="two"> <h5>Kim Campbell</h5></tr>' +
                                '<tr><td id="one"><input type="radio" class="radio" name="Candidate" /></td><td id="two"> <h5>Brian Mulrooney</h5></tr>' +
                                '<tr><td id="one"><input type="radio" class="radio" name="Candidate" /></td><td id="two"> <h5>John Turner</h5></tr>' +
                                '<tr><td id="one"><input type="radio" class="radio" name="Candidate" /></td><td id="two"> <h5>Pierre Trudeau</h5></tr>' +
                                '<tr><td id="one"><input type="radio" class="radio" name="Candidate" /></td><td id="two"> <h5>Joe Clark</h5></tr>' +
                                '<tr><td id="one"><input type="radio" class="radio" name="Candidate" /></td><td id="two"> <h5>Lester B Pearson</h5></tr>' +
                                '<tr><td id="one"><input type="radio" class="radio" name="Candidate" /></td><td id="two"> <h5>John Definbaker</h5></tr>' +
                                '</tbody></table>'
                                );
                            $('.modal-footer').append('' +
                                '<table class="table"><tbody><tr><td><input type="checkbox" class="checkbox" name="EmailOptIn"/></td><td> LYAC has permission to send me emails about the election results and other LYAC news</td></tr>' +
                                '<tr><td><input type="checkbox" class="checkbox" name="TrustMyVote"/> </td><td> I am who I say I am. I am voting in the area where I live or go to school. I am casting my vote fairly and not under pressure. I have provided accurate contact information. The LYAC should trust my vote.</td></tr></tbody></table> ' +
                                '<button type="submit" class="btn btn-default" id="postForm">Submit</button>'
                                );
                            break;
                        case '10':
                               $('.modal-body').append('LYAC Election: Ward ' + ward + ' Ballot<hr>' +
                                'Voter Information<hr>' +
                                '<input type="text" class="form-control" name="FirstName" placeholder="First Name"/>' +
                                '<input type="text" class="form-control" name="LastName" placeholder="Last Name"/>' +
                                '<input type="text" class="form-control" name="Gender" placeholder="Gender"/>' +
                                '<input type="text" class="form-control" name="Age" placeholder="Age"/>' +
                                '<input type="text" class="form-control" name="CellPhoneNumber" placeholder="Cell Phone Number"/>' +
                                '<input type="text" class="form-control" name="Email" placeholder="Email Address"/> <hr>' +
                                'Your Vote<hr>' +
                                '<table class="table table-striped"><tbody>' +
                                '<tr><td id="one"><input type="radio" class="radio" name="Candidate" /></td><td id="two"> <h5>Justin Trudeau</h5></tr>' +
                                '<tr><td id="one"><input type="radio" class="radio" name="Candidate" /></td><td id="two"> <h5>Stephen Harper</h5></tr>' +
                                '<tr><td id="one"><input type="radio" class="radio" name="Candidate" /></td><td id="two"> <h5>Paul Martin</h5></tr>' +
                                '<tr><td id="one"><input type="radio" class="radio" name="Candidate" /></td><td id="two"> <h5>Jean Cretien</h5></tr>' +
                                '<tr><td id="one"><input type="radio" class="radio" name="Candidate" /></td><td id="two"> <h5>Kim Campbell</h5></tr>' +
                                '<tr><td id="one"><input type="radio" class="radio" name="Candidate" /></td><td id="two"> <h5>Brian Mulrooney</h5></tr>' +
                                '<tr><td id="one"><input type="radio" class="radio" name="Candidate" /></td><td id="two"> <h5>John Turner</h5></tr>' +
                                '<tr><td id="one"><input type="radio" class="radio" name="Candidate" /></td><td id="two"> <h5>Pierre Trudeau</h5></tr>' +
                                '<tr><td id="one"><input type="radio" class="radio" name="Candidate" /></td><td id="two"> <h5>Joe Clark</h5></tr>' +
                                '<tr><td id="one"><input type="radio" class="radio" name="Candidate" /></td><td id="two"> <h5>Lester B Pearson</h5></tr>' +
                                '<tr><td id="one"><input type="radio" class="radio" name="Candidate" /></td><td id="two"> <h5>John Definbaker</h5></tr>' +
                                '</tbody></table>'
                                );
                            $('.modal-footer').append('' +
                                '<table class="table"><tbody><tr><td><input type="checkbox" class="checkbox" name="EmailOptIn"/></td><td> LYAC has permission to send me emails about the election results and other LYAC news</td></tr>' +
                                '<tr><td><input type="checkbox" class="checkbox" name="TrustMyVote"/> </td><td> I am who I say I am. I am voting in the area where I live or go to school. I am casting my vote fairly and not under pressure. I have provided accurate contact information. The LYAC should trust my vote.</td></tr></tbody></table> ' +
                                '<button type="submit" class="btn btn-default" id="postForm">Submit</button>'
                                );
                            break;
                        case '11':
                               $('.modal-body').append('LYAC Election: Ward ' + ward + ' Ballot<hr>' +
                                'Voter Information<hr>' +
                                '<input type="text" class="form-control" name="FirstName" placeholder="First Name"/>' +
                                '<input type="text" class="form-control" name="LastName" placeholder="Last Name"/>' +
                                '<input type="text" class="form-control" name="Gender" placeholder="Gender"/>' +
                                '<input type="text" class="form-control" name="Age" placeholder="Age"/>' +
                                '<input type="text" class="form-control" name="CellPhoneNumber" placeholder="Cell Phone Number"/>' +
                                '<input type="text" class="form-control" name="Email" placeholder="Email Address"/> <hr>' +
                                'Your Vote<hr>' +
                                '<table class="table table-striped"><tbody>' +
                                '<tr><td id="one"><input type="radio" class="radio" name="Candidate" /></td><td id="two"> <h5>Justin Trudeau</h5></tr>' +
                                '<tr><td id="one"><input type="radio" class="radio" name="Candidate" /></td><td id="two"> <h5>Stephen Harper</h5></tr>' +
                                '<tr><td id="one"><input type="radio" class="radio" name="Candidate" /></td><td id="two"> <h5>Paul Martin</h5></tr>' +
                                '<tr><td id="one"><input type="radio" class="radio" name="Candidate" /></td><td id="two"> <h5>Jean Cretien</h5></tr>' +
                                '<tr><td id="one"><input type="radio" class="radio" name="Candidate" /></td><td id="two"> <h5>Kim Campbell</h5></tr>' +
                                '<tr><td id="one"><input type="radio" class="radio" name="Candidate" /></td><td id="two"> <h5>Brian Mulrooney</h5></tr>' +
                                '<tr><td id="one"><input type="radio" class="radio" name="Candidate" /></td><td id="two"> <h5>John Turner</h5></tr>' +
                                '<tr><td id="one"><input type="radio" class="radio" name="Candidate" /></td><td id="two"> <h5>Pierre Trudeau</h5></tr>' +
                                '<tr><td id="one"><input type="radio" class="radio" name="Candidate" /></td><td id="two"> <h5>Joe Clark</h5></tr>' +
                                '<tr><td id="one"><input type="radio" class="radio" name="Candidate" /></td><td id="two"> <h5>Lester B Pearson</h5></tr>' +
                                '<tr><td id="one"><input type="radio" class="radio" name="Candidate" /></td><td id="two"> <h5>John Definbaker</h5></tr>' +
                                '</tbody></table>'
                                );
                            $('.modal-footer').append('' +
                                '<table class="table"><tbody><tr><td><input type="checkbox" class="checkbox" name="EmailOptIn"/></td><td> LYAC has permission to send me emails about the election results and other LYAC news</td></tr>' +
                                '<tr><td><input type="checkbox" class="checkbox" name="TrustMyVote"/> </td><td> I am who I say I am. I am voting in the area where I live or go to school. I am casting my vote fairly and not under pressure. I have provided accurate contact information. The LYAC should trust my vote.</td></tr></tbody></table> ' +
                                '<button type="submit" class="btn btn-default" id="postForm">Submit</button>'
                                );
                            break;
                        case '12':
                               $('.modal-body').append('LYAC Election: Ward ' + ward + ' Ballot<hr>' +
                                'Voter Information<hr>' +
                                '<input type="text" class="form-control" name="FirstName" placeholder="First Name"/>' +
                                '<input type="text" class="form-control" name="LastName" placeholder="Last Name"/>' +
                                '<input type="text" class="form-control" name="Gender" placeholder="Gender"/>' +
                                '<input type="text" class="form-control" name="Age" placeholder="Age"/>' +
                                '<input type="text" class="form-control" name="CellPhoneNumber" placeholder="Cell Phone Number"/>' +
                                '<input type="text" class="form-control" name="Email" placeholder="Email Address"/> <hr>' +
                                'Your Vote<hr>' +
                                '<table class="table table-striped"><tbody>' +
                                '<tr><td id="one"><input type="radio" class="radio" name="Candidate" /></td><td id="two"> <h5>Justin Trudeau</h5></tr>' +
                                '<tr><td id="one"><input type="radio" class="radio" name="Candidate" /></td><td id="two"> <h5>Stephen Harper</h5></tr>' +
                                '<tr><td id="one"><input type="radio" class="radio" name="Candidate" /></td><td id="two"> <h5>Paul Martin</h5></tr>' +
                                '<tr><td id="one"><input type="radio" class="radio" name="Candidate" /></td><td id="two"> <h5>Jean Cretien</h5></tr>' +
                                '<tr><td id="one"><input type="radio" class="radio" name="Candidate" /></td><td id="two"> <h5>Kim Campbell</h5></tr>' +
                                '<tr><td id="one"><input type="radio" class="radio" name="Candidate" /></td><td id="two"> <h5>Brian Mulrooney</h5></tr>' +
                                '<tr><td id="one"><input type="radio" class="radio" name="Candidate" /></td><td id="two"> <h5>John Turner</h5></tr>' +
                                '<tr><td id="one"><input type="radio" class="radio" name="Candidate" /></td><td id="two"> <h5>Pierre Trudeau</h5></tr>' +
                                '<tr><td id="one"><input type="radio" class="radio" name="Candidate" /></td><td id="two"> <h5>Joe Clark</h5></tr>' +
                                '<tr><td id="one"><input type="radio" class="radio" name="Candidate" /></td><td id="two"> <h5>Lester B Pearson</h5></tr>' +
                                '<tr><td id="one"><input type="radio" class="radio" name="Candidate" /></td><td id="two"> <h5>John Definbaker</h5></tr>' +
                                '</tbody></table>'
                                );
                            $('.modal-footer').append('' +
                                '<table class="table"><tbody><tr><td><input type="checkbox" class="checkbox" name="EmailOptIn"/></td><td> LYAC has permission to send me emails about the election results and other LYAC news</td></tr>' +
                                '<tr><td><input type="checkbox" class="checkbox" name="TrustMyVote"/> </td><td> I am who I say I am. I am voting in the area where I live or go to school. I am casting my vote fairly and not under pressure. I have provided accurate contact information. The LYAC should trust my vote.</td></tr></tbody></table> ' +
                                '<button type="submit" class="btn btn-default" id="postForm">Submit</button>'
                                );
                            break;
                        case '13':
                               $('.modal-body').append('LYAC Election: Ward ' + ward + ' Ballot<hr>' +
                                'Voter Information<hr>' +
                                '<input type="text" class="form-control" name="FirstName" placeholder="First Name"/>' +
                                '<input type="text" class="form-control" name="LastName" placeholder="Last Name"/>' +
                                '<input type="text" class="form-control" name="Gender" placeholder="Gender"/>' +
                                '<input type="text" class="form-control" name="Age" placeholder="Age"/>' +
                                '<input type="text" class="form-control" name="CellPhoneNumber" placeholder="Cell Phone Number"/>' +
                                '<input type="text" class="form-control" name="Email" placeholder="Email Address"/> <hr>' +
                                'Your Vote<hr>' +
                                '<table class="table table-striped"><tbody>' +
                                '<tr><td id="one"><input type="radio" class="radio" name="Candidate" /></td><td id="two"> <h5>Justin Trudeau</h5></tr>' +
                                '<tr><td id="one"><input type="radio" class="radio" name="Candidate" /></td><td id="two"> <h5>Stephen Harper</h5></tr>' +
                                '<tr><td id="one"><input type="radio" class="radio" name="Candidate" /></td><td id="two"> <h5>Paul Martin</h5></tr>' +
                                '<tr><td id="one"><input type="radio" class="radio" name="Candidate" /></td><td id="two"> <h5>Jean Cretien</h5></tr>' +
                                '<tr><td id="one"><input type="radio" class="radio" name="Candidate" /></td><td id="two"> <h5>Kim Campbell</h5></tr>' +
                                '<tr><td id="one"><input type="radio" class="radio" name="Candidate" /></td><td id="two"> <h5>Brian Mulrooney</h5></tr>' +
                                '<tr><td id="one"><input type="radio" class="radio" name="Candidate" /></td><td id="two"> <h5>John Turner</h5></tr>' +
                                '<tr><td id="one"><input type="radio" class="radio" name="Candidate" /></td><td id="two"> <h5>Pierre Trudeau</h5></tr>' +
                                '<tr><td id="one"><input type="radio" class="radio" name="Candidate" /></td><td id="two"> <h5>Joe Clark</h5></tr>' +
                                '<tr><td id="one"><input type="radio" class="radio" name="Candidate" /></td><td id="two"> <h5>Lester B Pearson</h5></tr>' +
                                '<tr><td id="one"><input type="radio" class="radio" name="Candidate" /></td><td id="two"> <h5>John Definbaker</h5></tr>' +
                                '</tbody></table>'
                                );
                            $('.modal-footer').append('' +
                                '<table class="table"><tbody><tr><td><input type="checkbox" class="checkbox" name="EmailOptIn"/></td><td> LYAC has permission to send me emails about the election results and other LYAC news</td></tr>' +
                                '<tr><td><input type="checkbox" class="checkbox" name="TrustMyVote"/> </td><td> I am who I say I am. I am voting in the area where I live or go to school. I am casting my vote fairly and not under pressure. I have provided accurate contact information. The LYAC should trust my vote.</td></tr></tbody></table> ' +
                                '<button type="submit" class="btn btn-default" id="postForm">Submit</button>'
                                );
                            break;
                        case '14':
                               $('.modal-body').append('LYAC Election: Ward ' + ward + ' Ballot<hr>' +
                                // 'Voter Information<hr>' +
                                // '<input type="text" class="form-control" name="FirstName" placeholder="First Name"/>' +
                                // '<input type="text" class="form-control" name="LastName" placeholder="Last Name"/>' +
                                // '<input type="text" class="form-control" name="Gender" placeholder="Gender"/>' +
                                // '<input type="text" class="form-control" name="Age" placeholder="Age"/>' +
                                // '<input type="text" class="form-control" name="CellPhoneNumber" placeholder="Cell Phone Number"/>' +
                                // '<input type="text" class="form-control" name="Email" placeholder="Email Address"/> <hr>' +
                                // 'Your Vote<hr>' +
                                // '<table class="table table-striped"><tbody>' +
                                // '<tr><td id="one"><input type="checkbox" class="checkbox" name="Candidate" /></td><td id="two"> <h5>Justin Trudeau</h5></tr>' +
                                // '<tr><td id="one"><input type="checkbox" class="checkbox" name="Candidate" /></td><td id="two"> <h5>Stephen Harper</h5></tr>' +
                                // '<tr><td id="one"><input type="checkbox" class="checkbox" name="Candidate" /></td><td id="two"> <h5>Paul Martin</h5></tr>' +
                                // '<tr><td id="one"><input type="checkbox" class="checkbox" name="Candidate" /></td><td id="two"> <h5>Jean Cretien</h5></tr>' +
                                // '<tr><td id="one"><input type="checkbox" class="checkbox" name="Candidate" /></td><td id="two"> <h5>Kim Campbell</h5></tr>' +
                                // '<tr><td id="one"><input type="checkbox" class="checkbox" name="Candidate" /></td><td id="two"> <h5>Brian Mulrooney</h5></tr>' +
                                // '<tr><td id="one"><input type="checkbox" class="checkbox" name="Candidate" /></td><td id="two"> <h5>John Turner</h5></tr>' +
                                // '<tr><td id="one"><input type="checkbox" class="checkbox" name="Candidate" /></td><td id="two"> <h5>Pierre Trudeau</h5></tr>' +
                                // '<tr><td id="one"><input type="checkbox" class="checkbox" name="Candidate" /></td><td id="two"> <h5>Joe Clark</h5></tr>' +
                                // '<tr><td id="one"><input type="checkbox" class="checkbox" name="Candidate" /></td><td id="two"> <h5>Lester B Pearson</h5></tr>' +
                                // '<tr><td id="one"><input type="checkbox" class="checkbox" name="Candidate" /></td><td id="two"> <h5>John Definbaker</h5></tr>' +
                                // '</tbody></table>'
                                // );
                                '<label><input type="radio" name="optradio">Option 1</label>');
                            $('.modal-footer').append('' +
                                '<table class="table"><tbody><tr><td><input type="checkbox" class="checkbox" name="EmailOptIn"/></td><td> LYAC has permission to send me emails about the election results and other LYAC news</td></tr>' +
                                '<tr><td><input type="checkbox" class="checkbox" name="TrustMyVote"/> </td><td> I am who I say I am. I am voting in the area where I live or go to school. I am casting my vote fairly and not under pressure. I have provided accurate contact information. The LYAC should trust my vote.</td></tr></tbody></table> ' +
                                '<button type="submit" class="btn btn-default" id="postForm">Submit</button>'
                                );
                            break;
                        default:
                            $('.modal-body').append('It doesn\'t look like your address is in the London voting area, please ensure you entered it correctly.');
                            break;
                    }
                } else {
                    $('.modal-body').append('It doesn\'t look like your address is in the London voting area, please ensure you entered it correctly.');
                }
            }
        });
    }

    $('#close-modal').on('click', function() {
        $('#vote-modal').modal('hide');  
    });

    function setAddress() {
        form.keypress(function (e) {
            if(e.which ==13) {
                if($(this).val()){
                    storeAddress($(this).val());
                    showButton();
                }
            }     
        });
    }

    function storeAddress(address) {
        localStorage.setItem('address', address);
    }

    function showButton() {
        $('#vote-modal').modal('show');
    }

    wardFinder();
    setAddress();

    function verify() {
        $('#ward-1').bootstrapValidator({
            //submitButtons: '#postForm',
            // To use feedback icons, ensure that you use Bootstrap v3.1.0 or later
            feedbackIcons: {
                valid: 'glyphicon glyphicon-ok',
                invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh'
            },        
            fields: {
                FirstName: {
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
                LastName: {
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
                Gender: {
                    message: 'Gender is not valid',
                    validators: {
                        notEmpty: {
                            message: 'Gender is required and cannot be empty'
                        },
                        stringLength: {
                            min: 1,
                            max: 20,
                            message: 'Gender must be more than 1 and less than 30 characters long'
                        },
                        regexp: {
                            regexp: /^[A-z]+$/,
                            message: 'Last Names can only consist of alphabetical characters'
                        },
                    }
                },
                Age: {
                    message: 'Gender is not valid',
                    validators: {
                        notEmpty: {
                            message: 'Age is required and cannot be empty'
                        },
                        stringLength: {
                            min: 1,
                            max: 3,
                            message: 'Age must be more than 1 and less than 3 characters long'
                        },
                        regexp: {
                            regexp: /^[0-9]+$/,
                            message: 'Age can only consist of numbers'
                        },
                    }
                },
                CellPhoneNumber: {
                    message: 'Gender is not valid',
                    validators: {
                        notEmpty: {
                            message: 'Age is required and cannot be empty'
                        },
                        stringLength: {
                            min: 11,
                            max: 11,
                            message: 'Phone number must be 11 numbers ex. 12265554444'
                        },
                        regexp: {
                            regexp: /^[0-9]+$/,
                            message: 'Phone Number can only consist of numbers'
                        },
                    }
                },
                Email: {
                    validators: {
                        notEmpty: {
                            message: 'The email address is required and cannot be empty'
                        },
                        emailAddress: {
                            message: 'The email address is not a valid'
                        }
                    }
                }
            }
        });
    };
})();
