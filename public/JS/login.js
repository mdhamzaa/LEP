
 // passwordeye.addEventListener('click',toggle());
function toggle(){
  const inputpassword=document.getElementById("two");
  const passwordeye=document.getElementById('eye');
         if(inputpassword.type=="password"){
            inputpassword.type="text";
            passwordeye.src="Images/eyeclose.png";
        }
        else{
            inputpassword.type="password";
            passwordeye.src="Images/eyeopen.png";
        }
}
