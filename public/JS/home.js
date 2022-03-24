let imgChange=document.getElementById("imgChange");
let cnt=0;

let leftArrow=document.getElementById("leftArrow");
let rightArrow=document.getElementById("rightArrow");

leftArrow.addEventListener('click',()=>{
cnt=(cnt-1+5)%5;
let url=`images/bg${cnt}.jpg`;
let newImg=new Image();

newImg.onload=function(){
    imgChange.style.backgroundImage=`url(${newImg.src})`;
}
newImg.src=`${url}`;


});

rightArrow.addEventListener('click',()=>{
cnt=(cnt+1)%5;
let url=`images/bg${cnt}.jpg`;
let newImg=new Image();
newImg.onload=function(){
     imgChange.style.backgroundImage=`url(${newImg.src})`;
}
newImg.src=`${url}`;
});

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

const card1=document.getElementById("card1");
const card2=document.getElementById("card2");
const card3=document.getElementById("card3");

let cards=document.querySelectorAll(".reviewCards");
Array.from(cards).forEach((ele)=>{
  ele.addEventListener('click',(eventObj)=>{
      for(let card of cards){
          card.classList.remove("card-center");
          card.classList.remove("card-left");
          card.classList.remove("card-right");
      }
    if(eventObj.target==card1){
        
        card1.classList.add("card-center");
        card2.classList.add("card-right");
        card3.classList.add("card-left");
    }
    else if(eventObj.target==card2){
        card2.classList.add("card-center");
        card1.classList.add("card-left");
        card3.classList.add("card-right");
    }
    else{
        card3.classList.add('card-center');
        card2.classList.add("card-left");
        card1.classList.add("card-right");
    }
  })
});

