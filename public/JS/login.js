
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

let ham=document.getElementById("hamburger");
let navmenu=document.getElementById("navmenu");

let navlinks=document.querySelectorAll(".navlinks");
ham.addEventListener('click',function(){
    ham.classList.toggle("active");
    navmenu.classList.toggle("active");
    
    
    for(let e of navlinks){
        e.classList.toggle("active");
    }
})

Array.from(navmenu.children).forEach(function(e){
    e.addEventListener('click',function(){
        navmenu.classList.remove("active");
        ham.classList.remove("active");
        searchIcon.classList.remove("active");
       
        for(let e of navlinks){
            e.classList.toggle("active");
        }
    },true)
})