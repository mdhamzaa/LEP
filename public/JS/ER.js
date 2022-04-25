function toggle(){
    const t = document.getElementById("password");
    const eye = document.getElementById("eye");
    if (t.type === "password"){
        t.type = "text";
        eye.className = "fa-solid fa-eye" 
    }
    else{
        t.type = "password";
        eye.className = "fa-solid fa-eye-slash"
    }
}

let ham=document.getElementById("hamburger");
let navmenu=document.getElementById("navmenu");
let searchIcon=document.getElementById("searchIcon");
let navlinks=document.querySelectorAll(".navlinks");
ham.addEventListener('click',function(){
    ham.classList.toggle("active");
    navmenu.classList.toggle("active");
    searchIcon.classList.add("active");
    
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


let regExpWeak = /[a-z]/;
let regExpMedium = /\d+/;
let regExpStrong = /.[!,@,#,$,%,^,&,*,?,_,~,-,(,)]/;

function strength(){
    const input=document.getElementById("password");
    if(input.value.length <= 4 &&input.value.length >0 && (input.value.match(regExpWeak) || input.value.match(regExpMedium) || input.value.match(regExpStrong))){
        document.getElementById("pass_result").innerHTML="Weak";
       document.getElementById("red").style.backgroundColor="red";
       document.getElementById("green").style.backgroundColor="white";
       document.getElementById("yellow").style.backgroundColor="white";
    };
    if(input.value.length >= 6 && ((input.value.match(regExpWeak) && input.value.match(regExpMedium)) || (input.value.match(regExpMedium) && input.value.match(regExpStrong)) || (input.value.match(regExpWeak) && input.value.match(regExpStrong)))){
        document.getElementById("pass_result").innerHTML="Medium";
       document.getElementById("yellow").style.backgroundColor="yellow";
       document.getElementById("green").style.backgroundColor="white";
    };
    if(input.value.length >= 8 && input.value.match(regExpWeak) && input.value.match(regExpMedium) && input.value.match(regExpStrong)){
        document.getElementById("pass_result").innerHTML="Strong";
        document.getElementById("green").style.backgroundColor="green";
        return true;
    }
}

// function vali_pass(){
//     const pass = document.getElementById('password').value;
//     const cpass = document.getElementById('cpassword').value;
//     // const pin1 = document.getElementById('pcode1').value;
//     // const pin2 = document.getElementById('pcode2').value;
//     // const pin3 = document.getElementById('pcode3').value;
//     if (pass == cpass) {
//     document.getElementById('message').style.color = 'green';
//     document.getElementById('message').innerHTML = 'Matching';
//   } else {
//     document.getElementById('message').style.color = 'red';
//     document.getElementById('message').innerHTML = 'Not matching';
//     return false;
//   }
// }
function ageCalculator() {  
    let userinput = document.getElementById("birthday").value;  
    let dob = new Date(userinput);    
      
    //calculate month difference from current date in time  
    let month_diff = Date.now() - dob.getTime();  
      
    //convert the calculated difference in date format  
    let age_dt = new Date(month_diff);   
      
    //extract year from date      
    let year = age_dt.getUTCFullYear();  
      
    //now calculate the age of the user  
    let age = Math.abs(year - 1970);  
      
    //display the calculated age  
    return age; 
}  

function validate(event){
    const pass = document.getElementById('password').value;
    const cpass = document.getElementById('cpassword').value;
    const user = document.getElementById('uname').value;
    //const fnam = document.getElementById('fname').value;
    //const lnam = document.getElementById('lname').value;
    const emailid = document.getElementById('email').value;

    if (pass != cpass) {
    document.getElementById('message').style.color = 'red';
    document.getElementById('message').innerHTML = 'Not matching';
	event.preventDefault();
    } 
    if (user.length <= 2 || user.length >20){
        alert('username length should be from 3 to 19');
        event.preventDefault();
    }
    // if(user != /^[a-z0-9_.]+$/){
    //     alert('username is not appropriate');
    //     event.preventDefault();
    // }
    if(ageCalculator() < 18){
        alert('according to government rules below !8 years should not work');
        event.preventDefault();
    }
    // if(emailid.indexof('@') <= 0){
    //     alert('email id should not start with @');
    //     event.preventDefault();
    // }   
    if((emailid.charAt(emailid.length-4) !='.') && (emailid.charAt(emailid.length-3) != '.')){
        alert('invalid email id');
        event.preventDefault();
    }
    // if(fnam != /^[a-zA-Z \-]+$/){
    //     alert('first name should be with alphabets only');
    //     event.preventDefault();
    // }
    // if(lnam != /^[a-zA-Z \-]+$/){
    //     alert('last name should be with alphabets only');
    //     event.preventDefault();
    // }

        // const res = /^[a-z0-9_\.]+$/.exec(username);
        // const valid = !!res;
        // return valid;
//   
}



