function toggle(){
    const t = document.getElementById("password");
    const eye = document.getElementById("img");
    if (t.type === "password"){
        t.type = "text";
        eye.src = "Images/eyeclose.jfif";
    }
    else{
        t.type = "password";
        eye.src = "Images/eyeopen.jfif";
    }
}