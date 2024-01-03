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
const errorText = $.querySelector('small');
const spinnerContainer = $.getElementById('spinner-container');
const spinBtn = $.querySelector('.spin');
const prizeModal = $.querySelector('.prize-modal');
const prizeTitle = $.querySelector('.prize-modal h1');
const prizeDescription = $.querySelector('.prize-modal p');
const prizeButton = $.querySelector('.prize-modal button');

const setFadeIn = () => {
    motherImg.classList.add('fade-in');
    setTimeout(() => {
        textImg.classList.add('fade-in');
    }, 1000);
}

const setMusic = () => {
    music.play();
}

const showSpinner = () => {
    spinnerContainer.style.display = 'flex';
}

async function getData () {
    let response = await fetch('https://mothersdayhamta-default-rtdb.firebaseio.com/users.json');
    let users = await response.json();

    let response2 = await fetch('https://mothersdayhamta-default-rtdb.firebaseio.com/totalClicked.json');
    let clicks = await response2.json();

    let response3 = await fetch('https://mothersdayhamta-default-rtdb.firebaseio.com/totalEntries.json');
    let entries = await response3.json();

    checkInput(users);
    setCookies(clicks, entries);
}

const setCookies = (clicks, entries) => {
    let now = new Date();
    let expire = now.getTime() + (365 * 24 * 60 * 60 * 1000);
    now.setTime(expire);

    $.cookie = `totalEntries=${entries};path=/;expires=${now}`;
    $.cookie = `totalClicked=${clicks};path=/;expires=${now}`;
}

const checkInput = users => {
    if (!phoneInput.value) {
        errorText.textContent = 'لطفا شماره تلفن را وارد کنید';
        loginError();
    }else {
        users.some(user => {
            if (user.number === phoneInput.value) {
                setUserCookie(user, users.indexOf(user));
                console.log(user);
                console.log(users.indexOf(user));
                showContainer();
                checkZeroChance();
                return true;
            }else {
                errorText.textContent = 'شماره تلفن نادرست است'
                loginError();
            }
        })
    }
}

const setUserCookie = (user, id) => {
    let now = new Date();
    let expire = now.getTime() + (365 * 24 * 60 * 60 * 1000);
    now.setTime(expire);

    $.cookie = `number=${user.number};path=/;expires=${now}`;
    $.cookie = `chances=${user.chances};path=/;expires=${now}`;
    $.cookie = `id=${id};path=/;expires=${now}`;
}

const getClickedCount = () => {
    let cookies = $.cookie.split(';');
    let totalClicked = 0;

    cookies.filter(cookie => {
        if (cookie.includes('totalClicked')) {
            totalClicked = cookie.substring(cookie.indexOf('=') + 1);
        } 
    })

    return Number(totalClicked);
}

const getEnriesCount = () => {
    let cookies = $.cookie.split(';');
    let totalEntries = 0;

    cookies.filter(cookie => {
        if (cookie.includes('totalEntries')) {
            totalEntries = cookie.substring(cookie.indexOf('=') + 1);
        } 
    })

    return Number(totalEntries);
}

const getUserChances = () => {
    let cookies = $.cookie.split(';');
    let chances = 0;

    cookies.filter(cookie => {
        if (cookie.includes('chance')) {
            chances = cookie.substring(cookie.indexOf('=') + 1);
        } 
    })

    return Number(chances);
}

const getUserId = () => {
    let cookies = $.cookie.split(';');
    let id = 0;

    cookies.filter(cookie => {
        if (cookie.includes('id')) {
            id = cookie.substring(cookie.indexOf('=')+ 1);
        } 
    })

    return Number(id);
}

const getUserNumber = () => {
    let cookies = $.cookie.split(';');
    let number = 0;

    cookies.filter(cookie => {
        if (cookie.includes('number')) {
            number = cookie.substring(cookie.indexOf('=') + 1);
        } 
    })

    return number;
}

const checkZeroChance = () => {
    let chances = getUserChances();
    if (chances === 0) {
        spinBtn.style.display = 'none'
    }
}

const showContainer = () => {
        errorText.classList.remove('display-inline');
        modal.classList.add('display-none');
        graficContainer.style.filter = 'none';
        $.body.classList.add('height-110')
        setFadeIn();
        setMusic();
        resetInputs();
        showSpinner();
}

const loginError = () => {
    errorText.classList.add('display-inline');
    setTimeout(() => {
        errorText.classList.remove('display-inline');
    }, 3000)
}

const resetInputs = () => {
    phoneInput.value = '';
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

const shuffle = array => {
    let currentIndex = array.length;
    let randomIndex = null;
    
    while(currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[currentIndex], array[currentIndex]]
    }
    return array;
}

const spin = () => {
    let chances = getUserChances();
    let clicked = getClickedCount();
    let entries = getEnriesCount();
    let id = getUserId();

    console.log(chances, clicked, entries, id);
    if (entries > 0) {
        if (chances === 1) {
            console.log('1 chance');
            prizeModal.classList.remove('show-modal');
            const box = $.getElementById('box');
            const element = $.getElementById('mainbox');
            let selectedItem = '';
        
            let first = shuffle([1890, 2250, 2610]);
            let second = shuffle([1850, 2210, 2570]);
            let third = shuffle([1770, 2130, 2490]);
            let fourth = shuffle([1810, 2270, 2530]);
            let fifth = shuffle([1750, 2110, 2470]);
            let sixth = shuffle([1630, 1990, 2350]);
            let seventh = shuffle([1570, 1930, 2290]);
        
            let results = shuffle([first[0], second[0], third[0], fourth[0], fifth[0], sixth[0], seventh[0]]);
        
            if (first.includes(results[0])) {
                selectedItem = 'جایزه اول'
            }else if (second.includes(results[0])) {
                selectedItem = 'جایزه دوم'
            }else if (third.includes(results[0])) {
                selectedItem = 'جایزه سوم'
            }else if (fourth.includes(results[0])) {
                selectedItem = 'جایزه چهارم'
            }else if (fifth.includes(results[0])) {
                selectedItem = 'جایزه پنجم'
            }else if (sixth.includes(results[0])) {
                selectedItem = 'جایزه ششم'
            }else if (seventh.includes(results[0])) {
                selectedItem = 'جایزه هفتم'
            }
        
            box.style.setProperty('transition', 'all ease 5s');
            box.style.transform = `rotate(${results[0]}deg)`;
            element.classList.remove('animate');
            setTimeout(() => {
                element.classList.add('animate');
                checkPrize(clicked);
                box.style.setProperty(`transition`, 'initial');
                box.style.transform = 'rotate(90deg)'
            }, 5000);

            clicked++;
            entries--;
            chances--;
            spinBtn.style.display = 'none';
            updateTotalClicked(clicked);
            updateTotalEntries(entries);
            updateChances(chances, id);
            updateCookies(clicked, chances, entries);
            return false;
        }
        prizeModal.classList.remove('show-modal');
        const box = $.getElementById('box');
        const element = $.getElementById('mainbox');
        let selectedItem = '';
    
        let first = shuffle([1890, 2250, 2610]);
        let second = shuffle([1850, 2210, 2570]);
        let third = shuffle([1770, 2130, 2490]);
        let fourth = shuffle([1810, 2270, 2530]);
        let fifth = shuffle([1750, 2110, 2470]);
        let sixth = shuffle([1630, 1990, 2350]);
        let seventh = shuffle([1570, 1930, 2290]);
    
        let results = shuffle([first[0], second[0], third[0], fourth[0], fifth[0], sixth[0], seventh[0]]);
    
        if (first.includes(results[0])) {
            selectedItem = 'جایزه اول'
        }else if (second.includes(results[0])) {
            selectedItem = 'جایزه دوم'
        }else if (third.includes(results[0])) {
            selectedItem = 'جایزه سوم'
        }else if (fourth.includes(results[0])) {
            selectedItem = 'جایزه چهارم'
        }else if (fifth.includes(results[0])) {
            selectedItem = 'جایزه پنجم'
        }else if (sixth.includes(results[0])) {
            selectedItem = 'جایزه ششم'
        }else if (seventh.includes(results[0])) {
            selectedItem = 'جایزه هفتم'
        }
    
        box.style.setProperty('transition', 'all ease 5s');
        box.style.transform = `rotate(${results[0]}deg)`;
        element.classList.remove('animate');
        setTimeout(() => {
            element.classList.add('animate');
            checkPrize(clicked);
            box.style.setProperty(`transition`, 'initial');
            box.style.transform = 'rotate(90deg)'
        }, 5000);

        clicked = clicked + 1;
        entries = entries - 1;
        chances = chances - 1;
        updateTotalClicked(clicked);
        updateTotalEntries(entries);
        updateChances(chances, id);
        updateCookies(clicked, chances, entries);
    }
}

const updateCookies = (clicks, chances, entries) => {
    let now = new Date();
    let expire = now.getTime() + (365 * 24 * 60 * 60 * 1000);
    now.setTime(expire);

    $.cookie = `chances=${chances};path=/;expires=${now}`;
    $.cookie = `totalClicked=${clicks};path=/;expires=${now}`;
    $.cookie = `totalEntries=${entries};path=/;expires=${now}`;
}

const checkPrize = clicked => {

    if (clicked === 3 || clicked === 7 || clicked === 14 || clicked === 16 || clicked === 25 || clicked === 29 || clicked === 32 || clicked === 38) {
        prizeTitle.textContent = 'وجه نقد'
        prizeDescription.textContent = "بانوی زیبا، تبریک، شما برنده پنج میلیون ریال وجه نقد شده اید"
        showPrizeModal();
        updateWinners();
    }else if (
        clicked === 1 || clicked === 4 || clicked === 6 || clicked === 9 || clicked === 12 || clicked === 15 || clicked === 18 || clicked === 20 || clicked === 22
        || clicked === 24 || clicked === 27 || clicked === 30 || clicked === 33 || clicked === 35 || clicked === 37 || clicked === 40
    ) {
        prizeTitle.textContent = 'بوس'
        prizeDescription.textContent = 'بغلت کنن و دستتو ببوسن'
        showPrizeModal()
    }else {
        prizeTitle.textContent = 'بغل'
        prizeDescription.textContent = 'بغلت کنن و دستتو ببوسن'
        showPrizeModal()
    }
}

async function updateTotalClicked (clicks) {
    await fetch('https://mothersdayhamta-default-rtdb.firebaseio.com/totalClicked.json', {
        method: "PUT",
        headers: {
            "Content-type" : "application/json" 
        },
        body: JSON.stringify(clicks)
    })
}

async function updateTotalEntries (entries) {
    await fetch('https://mothersdayhamta-default-rtdb.firebaseio.com/totalEntries.json', {
        method: "PUT",
        headers: {
            "Content-type" : "application/json" 
        },
        body: JSON.stringify(entries)
    })
}

async function updateChances (chances, id) {
    await fetch(`https://mothersdayhamta-default-rtdb.firebaseio.com/users/${id}/chances.json`, {
        method: "PUT",
        headers: {
            "Content-type" : "application/json" 
        },
        body: JSON.stringify(chances)
    })
}

async function updateWinners () {
    let number = getUserNumber();
    let winner = {
        number: number
    }
    await fetch(`https://mothersdayhamta-default-rtdb.firebaseio.com/winners.json`, {
        method: "POST",
        headers: {
            "Content-type" : "application/json" 
        },
        body: JSON.stringify(winner)
    })
}


const showPrizeModal = () => {
    prizeModal.classList.add('show-modal');
}

const hidePrizeModal = () => {
    prizeModal.classList.remove('show-modal');
}

musicBtn.addEventListener('click', () => {
    changeMusicStatus();
})

submitBtn.addEventListener('click', event => {
    event.preventDefault();
    getData();
})

spinBtn.addEventListener('click', () => {
    spin();
})

prizeButton.addEventListener('click', () => {
    hidePrizeModal();
})
