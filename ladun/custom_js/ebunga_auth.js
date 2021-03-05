// route
const rToRegister = server + 'auth/register/proses';
const rToLogin = server + 'auth/login/proses';

// vue object
var divAuth = new Vue({
  el : '#divAuth',
  data : {
    stateAuth : 'login',
    stateRegis : false,
    statusCapcha : false,
    capMessage : '',
    statePasswordReg: false
  },
  methods : {
    loginAtc : function()
    {
      let email = document.querySelector('#txtEmail').value;
      let password = document.querySelector('#txtPassword').value;
      let dataSend = {'username':email, 'password':password}
      if(this.statusCapcha === false){
        pesanUmumApp('info', 'Security check', 'Please complete the capcha');
      }else{
        $('#lg1').hide();
        $('#lg2').hide();
        $('#divLoading').show();
        document.querySelector('#txtCapLoading').innerHTML = "Currently logged in ...";
        setTimeout(function(){
          axios.post(rToLogin, dataSend).then(function(res){
            let dr = res.data;
            if(dr.status === 'success'){
              window.location.assign(server + "account");
            }else{
              $('#lg1').show();
              $('#lg2').show();
              $('#divLoading').hide();
              pesanUmumApp('warning', 'Auth failed', 'Username & password wrong, try again...!!!');
              grecaptcha.reset();
            }
          });
        }, 4000);
      }
    },
    loginFormOpen : function()
    {
      grecaptcha.reset();
    },
    registerFormOpen : function()
    {
      grecaptcha.reset();
      this.stateRegis = false;
    },
    registerAtc : function()
    {
      let email = document.querySelector('#txtEmailReg').value;
      let password = document.querySelector('#txtPasswordReg').value;
      let fullname = document.querySelector('#txtFullNameReg').value;
      let phoneNumber = document.querySelector('#txtPhoneNumberReg').value;
      let referralCode = 'addydr';
      if(email === '' || password === '' || fullname === '' || phoneNumber === ''){
          $('#capNotifIsiField').show();
          this.capMessage = 'Please fill the all field!!!';
      }else{
        let emailFormat = ValidateEmail(email);
        if(emailFormat === true){
          if(this.statePasswordReg === true){
            if(this.stateRegis === true){

              Swal.fire({
                title: "Register new user ...?",
                text: "make sure all fields are filled in correctly ...?",
                icon: "info",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Ya",
                cancelButtonText: "Batal",
              }).then((result) => {
                if (result.value) {
                  $('#lg1').hide();
                  $('#lg2').hide();
                  $('#divLoading').show();
                  document.querySelector('#txtCapLoading').innerHTML = "Registering new user ...";
                  setTimeout(function(){
                    let dataSend = {'email':email, 'password':password, 'fullname':fullname, 'phoneNumber':phoneNumber, 'referralCode':referralCode}
                    axios.post(rToRegister, dataSend).then(function(res){
                      let dr = res.data;
                      if(dr.status === 'sukses'){
                        pesanUmumApp('success', 'Success', 'Regisration success, please check your inbox to activate account');
                        $('#divBreadcumb').hide();
                        $('#divAuth').hide();
                        $('#divSuccessRegister').show();
                      }else if(dr.status === 'email_exist'){
                          grecaptcha.reset();
                          pesanUmumApp('warning', 'Email exist', 'The email you registered has been used, please use another email!!!');
                          $('#lg1').show();
                          $('#lg2').show();
                          $('#divLoading').hide();
                          document.querySelector('#txtEmailReg').value = "";
                          document.querySelector('#txtPasswordReg').value = "";
                      }else{

                      }
                    });
                  }, 2000);
                }
              });

            }else{
              pesanUmumApp('info', 'Security check', 'Please complete the capcha');
            }
          }else{
            pesanUmumApp('warning', 'Password format', 'Format password inccorrect!!!');
          }
        }else{
          pesanUmumApp('warning', 'Email format', 'Format email inccorrect!!!');
        }
      }
    }
  }
});

// inisialisasi
$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
});

$("#txtPhoneNumberReg").mask("(00) 0000-0000-0000");



// fungsi
function recaptcha_callback()
{
  divAuth.statusCapcha = true;
}

function recaptcha_callback_register()
{
  divAuth.stateRegis = true;
}

function checkPassword()
{
    let password = document.querySelector('#txtPasswordReg').value;

    if(password.length <= 4){
        document.querySelector("#passReg_1").style.textDecoration  = "none";
        divAuth.statePasswordReg = false;
    }else{
        document.querySelector("#passReg_1").style.textDecoration  = "line-through";

        if((password.match(/[a-z]/) && password.match(/\d+/))){
            document.querySelector("#passReg_2").style.textDecoration  = "line-through";
            divAuth.statePasswordReg = true;
        }else{
            document.querySelector("#passReg_2").style.textDecoration  = "none";
            divAuth.statePasswordReg = false;
        }
    }

}

function ValidateEmail(mail)
{
 if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(mail))
  {
    return true;
  }
    return false;
}

function pesanUmumApp(icon, title, text)
{
  Swal.fire({
    icon : icon,
    title : title,
    text : text
  });
}
