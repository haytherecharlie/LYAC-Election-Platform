var verify = (function() {

    var url = location.href;
    var x = url.split('=');
    var y = x[x.length-1];
    var baseURL = location.origin;

    $('#vote').on('click', function() {
        if($('#auto-comp').val() == y){
            console.log('success');
            window.location = location.origin + '/thanks/';
        }
        else {
            console.log('fail');
        }
    })
})();