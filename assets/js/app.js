"use strict"

const $ = document;

const motherImg = $.querySelector('.mother-title-img');
const textImg = $.querySelector('.mother-description-img');
const music = $.getElementById('music');
const musicBtn = $.getElementById('music-btn')
const pauseIcon = $.querySelector('.fa-pause');
const playIcon = $.querySelector('.fa-play');
const graficContainer = $.getElementById('grafic-container');
const modal = $.getElementById('data-modal')
const submitBtn = $.getElementById('submit-btn');
const phoneInput = $.getElementById('phone-input');
const cardInput = $.getElementById('card-input');
const errorText = $.querySelector('small');
const spinner = $.querySelector('.commonninja_component')

const setFadeIn = () => {
    motherImg.classList.add('fade-in');
    setTimeout(() => {
        textImg.classList.add('fade-in');
    }, 1000);
}

const setMusic = () => {
    music.play();
}

async function getData () {
    let response = await fetch('https://mothersdayhamta-default-rtdb.firebaseio.com/users.json');
    let users = await response.json();
    console.log(users);
    checkUser(users)
}

const checkUser = users => {
    if (!phoneInput.value || !cardInput.value) {
        errorText.textContent = "لطفا اطلاعات رو وارد کنید 😊";
        loginError();
    }else {
        let isLegit = users.some(user => {
            if (phoneInput.value === user.number) {
                console.log('successful');
                showContainer();
                setUserCookie(user.number, user.chances);
                setSpinBtn();
                return true;
            }else {
                errorText.textContent = "شماره تلفن مادر صحیح نمیباشد 😒"
                loginError();
            }
        })
    }
}

const setUserCookie = (number, chances) => {
    let now = new Date();
    let expire = now.getTime() + (365 * 24 * 60 * 60 * 1000);
    now.setTime(expire);

    $.cookie = `number=${number};path=/;expires=${now}`;
    $.cookie = `chances=${chances};path=/;expires=${now}`;
}

const getInfo = () => {
    let cookies = $.cookie.split(';');
    let chances = 0;
    let number = 0;

    cookies.filter(cookie => {
        if (cookie.includes('number')) {
            number = cookie.substring(cookie.indexOf('=') + 1);
        }else if (cookie.includes('chances')) {
            chances = cookie.substring(cookie.indexOf('=') + 1);
        }
    })

    console.log(chances, number);

    if (chances && number) {
        checkChances(chances);
        updateCookie(number, chances);
    }
}

const checkChances = chances => {
    let spinAgainBtn = null;
    setTimeout(() => {
        spinAgainBtn = $.querySelector('.try-again');

        if (chances === 1) {
            spinAgainBtn.classList.add('display-none');
            console.log('chance-1');
        }else if (chances === 2) {
            console.log('chance-2')
        }else if (chances === 3) {
            console.log('chance-3');
        }
        
        spinAgainBtn.addEventListener('click', () => {
            console.log('spin again');
            getInfo();
        })
    }, 4100);
}

const updateCookie = (number, chances) => {
    let newChance = chances - 1;
    console.log(newChance);
    setUserCookie(number, newChance);
    // updateData(number, newChance);
}

const setSpinBtn = () => {
    const spinBtn = $.querySelector('.details button');

    spinBtn.addEventListener('click', () => {
        getInfo();
    })
}

const showContainer = () => {
        errorText.classList.remove('display-inline');
        modal.classList.add('display-none');
        graficContainer.style.filter = 'none';
        spinner.classList.add('display-inline');
        $.body.classList.add('height-110')
        setFadeIn();
        setMusic();
        resetInputs();
}

const loginError = () => {
    errorText.classList.add('display-inline');
    setTimeout(() => {
        errorText.classList.remove('display-inline');
    }, 3000)
}

const resetInputs = () => {
    phoneInput.value = '';
    cardInput.value = '';
}

const changeMusicStatus = () => {
    if (musicBtn.className.includes('pause')) {
        music.pause();
        musicBtn.className = 'play';
    }else {
        music.play()
        .then(res => musicBtn.className = 'pause')
        .catch(err => {
            musicBtn.className = 'play',
            console.log('error');
        })
    }
}

window.addEventListener('load', () => {
    // setFadeIn();
    // setMusic();
})

musicBtn.addEventListener('click', () => {
    changeMusicStatus();
})

submitBtn.addEventListener('click', event => {
    event.preventDefault();
    getData();
})
