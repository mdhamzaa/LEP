function toggle(){
    const t = document.getElementById("password");
    const eye = document.getElementById("img");
    if (t.type === "password"){
        t.type = "text";
        eye.src = "./eyeclose.jfif";
    }
    else{
        t.type = "password";
        eye.src = "./eyeopen.jfif";
    }
}