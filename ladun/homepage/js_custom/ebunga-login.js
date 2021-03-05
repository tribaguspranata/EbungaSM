// Route
var rToLogin = server + 'login/proses';

// Vue Object
var divFormLogin = new Vue({
    el : '#divFormLogin',
    data : {
        capchaState : false
    },
    methods : {
        loginAtc : function()
        {
            let username = document.querySelector('#txtUsername').value;
            let password = document.querySelector('#txtPassword').value;

            if(this.capchaState === false){

            }else{
                let dataSend = {'username':username, 'password':password}
                $.post(rToLogin, dataSend, function(data){
                    if(data.status === 'success'){
                        window.location.assign(server + "account");
                    }else{

                    }
                });
            }
        },
      
    }
});
// Inisialisasi
document.querySelector('#txtUsername').focus();

$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
});

// Function
function recaptcha_callback()
{
    divFormLogin.capchaState = true;
}
