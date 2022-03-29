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
        document.getElementById("green").style.backgroundColor="green";}
}
