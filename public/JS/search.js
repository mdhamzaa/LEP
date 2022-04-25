let loader = document.getElementById("loader");
window.addEventListener('load', () => {
    loader.parentElement.removeChild(loader);
    document.body.style.overflowY = "auto";
})

let searchBtn = document.getElementById("searchBtn");

searchBtn.addEventListener('click', (e) => {
    e.preventDefault();



    let ripple = document.createElement('span');

    ripple.id = "ripple";


    e.target.appendChild(ripple);
})

let wave = document.getElementById("wave");
let scrollText = document.getElementById("searchImgBoxHead");
window.addEventListener('scroll', (e) => {
    let move1 = -70 + (window.scrollY * 0.1);
    let move2 = 5 + (window.scrollY * 0.05);
    wave.style.left = `${move1}vw`;
    scrollText.style.top = `${move2}vw`;

})

let modalContainer = document.getElementById("modalContainer");
let modalContent = document.getElementById('modalContent');
let closeBtn = document.getElementById("closeModalBtn");

let bookBtns = document.getElementsByClassName("bookBtn");
let dateDisplay = document.getElementById('dateDisplay');
// console.log(bookBtns);

let slotSelectedByUser = null;
let username = null;
Array.from(bookBtns).forEach((e) => {
    e.addEventListener('click', (evntObj) => {
        evntObj.preventDefault();
        modalContainer.style.display = 'flex';

        username = evntObj.target.parentElement.parentElement.getElementsByClassName('userIntro')[0].getElementsByClassName('userNp')[0].getElementsByClassName('userName')[0].textContent;

        let d;
        let dateRepeat = setInterval(() => {
            d = new Date();
            dateDisplay.textContent = d;
        }, 1000);

        window.addEventListener('click', (e) => {
            if (e.target == modalContainer) {
                modalContainer.style.display = 'none';
            }
            window.removeEventListener('click', () => { });

        })
    })
})

closeBtn.addEventListener('click', () => {
    modalContainer.style.display = 'none';
})

let slotArray = document.getElementsByClassName('slot');
let slotsDiv = document.getElementById('slots');
let hireBtn = document.getElementById('hireBtn');

console.log(slotsDiv);
console.log(slotArray);
Array.from(slotArray).forEach((e) => {

    let d = new Date();
    if (e.value <= d.getHours()) {
        e.classList.add('disable');
    }
    e.addEventListener('click', (evntObj) => {

        evntObj.preventDefault();
        evntObj.target.classList.toggle('selectedSlot');


        let state = slotsDiv.style.getPropertyValue("--selected");
        //   console.log(state);
        if (state == 0) {
            slotsDiv.style.setProperty('--selected', 1);
            slotSelectedByUser = evntObj.target.textContent;

        }
        else if (state == 1) {
            slotsDiv.style.setProperty('--selected', 0);
            slotSelectedByUser = null;
        }
        state = slotsDiv.style.getPropertyValue('--selected');
        if (state == 1) {
            if (hireBtn.classList.contains('disabledHire')) {

                hireBtn.classList.remove('disabledHire');
            }
        }
        if (state == 0) {
            if (!hireBtn.classList.contains('disabledHire')) {
                hireBtn.classList.add('disabledHire');

            }

        }
        //     state=slotsDiv.style.getPropertyValue("--selected");
        //    console.log(state);
    })
})




hireBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (slotSelectedByUser && username) {
        let data = {
            slot: slotSelectedByUser,
            username: username
        }
        let options = {
            method: 'POST',
            headers: {
                'Content-Type':
                    'application/json;charset=utf-8'
            },
            redirect: 'follow',
            body: JSON.stringify(data)
        }
        let fetchRes = fetch(
            "/booking", options)
            .then(response => {
                // HTTP 301 response
                // HOW CAN I FOLLOW THE HTTP REDIRECT RESPONSE?
                if (response.redirected) {
                    window.location.href = response.url;
                }
            })
    }
})
