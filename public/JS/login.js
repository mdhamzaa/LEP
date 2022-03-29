
function toggle(){
  const inputpassword=document.getElementById("two");
  const passwordeye=document.getElementById('eye');
         if(inputpassword.type=="password"){
            inputpassword.type="text";
             passwordeye.className="fa-solid fa-eye";
        }
        else{
            inputpassword.type="password";
            passwordeye.className="fa-solid fa-eye-slash";
        }
}
