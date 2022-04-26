let loader = document.getElementById("loader");
window.addEventListener('load', () => {
    loader.parentElement.removeChild(loader);
    document.body.style.overflowY = "auto";
})


const allSideMenu = document.querySelectorAll('#sidebar .side-menu.top li a');

allSideMenu.forEach(item=> {
	const li = item.parentElement;

	item.addEventListener('click', function () {
		allSideMenu.forEach(i=> {
			i.parentElement.classList.remove('active');
		})
		li.classList.add('active');
	})
});




// TOGGLE SIDEBAR
const menuBar = document.querySelector('#closeSb');
const sidebar = document.getElementById('sidebar');

menuBar.addEventListener('click', function () {
	sidebar.classList.toggle('hide');
})


document.getElementById("dash").onclick = function() {
    document.querySelector("body").style.display = ""
    document.getElementById("three").style.display = "";
    document.getElementById("boss2").style.display = "none";
    document.getElementById("order2").style.display = "none";
     document.getElementById("worker2").style.display = "none";
  }

document.getElementById("boss").onclick = function() {
  document.querySelector("body").style.display = "initial"
    document.getElementById("three").style.display = "none";
    document.getElementById("boss2").style.display = "flex";
    document.getElementById("order2").style.display = "none";
     document.getElementById("worker2").style.display = "none";
  }
  document.getElementById("worker").onclick = function() {
    document.querySelector("body").style.display = "initial"
    document.getElementById("three").style.display = "none";
    document.getElementById("boss2").style.display = "none";
    document.getElementById("order2").style.display = "none";
	document.getElementById("worker2").style.display = "flex";
  } 
   document.getElementById("order").onclick = function() {
    document.querySelector("body").style.display = "initial"
	document.getElementById("three").style.display = "none";
    document.getElementById("boss2").style.display = "none";
    document.getElementById("order2").style.display = "flex";
	document.getElementById("worker2").style.display = "none";
  }






