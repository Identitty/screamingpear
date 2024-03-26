const triple = [300,200,300,400,500,600]
var stats = {'singleone':0,'singlefive':0,'triple':0,'four':0,'five':0,'six':0,'straight':0,'threepair':0,'fourwithpair':0,'twotriple':0,'totalscore':0}

let score = 0
let dailyhigh = 0
let alltimehigh = 0
var rolls = [0,0,0,0,0,0]
let farklecounter = 0
let scoredcounter = 0
var gamestate = 1
//0 = regular 1 = reset 2 = farkle

const dicediv = document.getElementById('dice')
const button = document.getElementById('button')
const reset = document.getElementById('reset')
const resethidden = document.getElementById('resethidden')
const scoretext = document.getElementById('score')
const cb = document.getElementById('cb')
const dailyhightext = document.getElementById('dailyhigh')
const logscore = document.getElementById('logscore')
var dice = []
for (let i = 0; i < 6; i++){
    dice.push(document.querySelector(`#dice :nth-child(${i+1})`))
}

window.onload = function(){
    dicediv.style.minHeight = `${dicediv.offsetHeight}px`
}

function RollDie(){
    if (button.innerHTML == 'REROLL!!'){
        button.innerHTML = 'Roll Dice'
        for (i in dice){
            dice[i].className = 'die'
            dice[i].innerHTML = ''
        }
    } else{
    if (document.getElementsByClassName('removable').length == document.getElementsByClassName('removed').length && gamestate != 2){
        //if (JSON.stringify(rolls) == JSON.stringify([0,0,0,0,0,0])){
        if (gamestate == 1){
            for (let i = 0; i < 6; i++){
                rolls[i] = Math.ceil(Math.random() * 6)
            }
        }else{
            for (let i = 0; i < 6; i++){
                if (rolls[i] != 0){
                    rolls[i] = Math.ceil(Math.random() * 6)
                }
            }
        }
        for (let i = 0; i < 6; i++){
            if (rolls[i] != 0) {
                dice[i].innerHTML=rolls[i]
            }
        }
        console.log(rolls)
        gamestate = 0
        CalculateScore(rolls)
    } else if(gamestate == 2){
        alert('Farkle! Please reset the game')
    } else{
        alert('Please remove scored dice! Also I love you!')
    }
}

function CalculateScore(rolls){
    let count = [0,0,0,0,0,0]
    let counted = {}
    for (let i = 0; i < 6; i++){
        if (rolls[i] != 0){
            count[rolls[i]-1] +=1
        }
    }
    console.log(count)
    count.forEach(ele => {
        if (ele != 0){
            if (counted[ele]) {
                counted[ele] += 1;
            } else {
                counted[ele] = 1;
            }
        }
    });
    if (count.includes(6)){
        score += 3000
        stats['six'] += 1
    }else if (count.includes(5)){
        score += 2000
        stats['five'] += 1
        for (let i = 0; i < 6; i++){
            if (rolls[i] == count.indexOf(5)+1){
                rolls[i] = 0
            }else if (rolls[i] == 1){
                score += 100
                rolls[i] = 0
                stats['singleone'] += 1
            }else if (rolls[i] == 5){
                score += 50
                rolls[i] = 0
                stats['singlefive'] += 1
            }
        }
    }else if (count.includes(4)){
        if (count.includes(2)){
            score += 1500
            stats['fourwithpair'] += 1
            for (let i = 0; i < 6; i++){
                rolls[i] = 0
            }
        }else{
            stats['four'] += 1
            score += 1000
            for (let i = 0; i < 6; i++){
                if (rolls[i] == count.indexOf(4)+1){
                    rolls[i] = 0
                }else if (rolls[i] == 1){
                    score += 100
                    rolls[i] = 0
                    stats['singleone'] += 1
                }else if (rolls[i] == 5){
                    score += 50
                    rolls[i] = 0
                    stats['singlefive'] += 1
                }
            }
        }
    }else if (count.includes(3)){
        if (counted[3] == 2){
            score += 2500
            stats['twotriple'] += 1
            for (let i = 0; i < 6; i++){
                rolls[i] = 0
            }
        }else{
            stats['triple'] += 1
            score += triple[count.indexOf(3)]
            for (let i = 0; i < 6; i++){
                if (rolls[i] == count.indexOf(3)+1){
                    rolls[i] = 0
                }else if (rolls[i] == 1){
                    score += 100
                    stats['singleone'] += 1
                    rolls[i] = 0
                }else if (rolls[i] == 5){
                    stats['singlefive'] += 1
                    score += 50
                    rolls[i] = 0
                }
            }
        }
    }else if (counted[2]==3){
        score += 1500
        stats['threepair'] += 1
        for (let i = 0; i < 6; i++){
            rolls[i] = 0
        }
    }else if (count == [1,1,1,1,1,1]){
        stats['straight'] += 1
        score += 1500
        for (let i = 0; i < 6; i++){
            rolls[i] = 0
        }
    }else if ((rolls.includes(1)) || (rolls.includes(5))){
        for (let i = 0; i < 6; i++){
            if (rolls[i] == 1){
                score += 100
                stats['singleone'] += 1
                rolls[i] = 0
            }else if (rolls[i] == 5){
                score += 50
                stats['singlefive'] += 1
                rolls[i] = 0
            }
        }
    }else{
        console.log(`Farkle :( - ${score}`)
        for (let i = 0; i < 6; i++){
            if (rolls[i] != 0){
                dice[i].classList.add("farkle")
            }
        }
        button.style.display = 'none'
        resethidden.style.display = 'inline'
        gamestate = 2;
        farklecounter += 1
        stats['totalscore'] += score
        score = 0
    }
    for (let i = 0; i < 6; i++){
        if (rolls[i] == 0){
            dice[i].classList.add("removable")
            if (cb.checked){
                dice[i].classList.add("removed")
            }
        }
    }
    if (JSON.stringify(rolls) == JSON.stringify([0,0,0,0,0,0])){
        gamestate = 1
        button.innerHTML = 'REROLL!!'
    }
    scoretext.innerHTML = score
    if (score >= 500){
        logscore.style.opacity='1'
        logscore.style.pointerEvents='auto'
    }
}
}

function ResetGame(){
    for (i in dice){
        dice[i].className = 'die'
        dice[i].innerHTML = ''
    }
    resethidden.style.display = 'none'
    button.style.display = 'inline'
    gamestate = 1
    score = 0
    scoretext.innerHTML = score
    logscore.style.opacity='0.5'
    logscore.style.pointerEvents='none'
}

function takeScore(){
    if (score > dailyhigh){
        dailyhigh = score
        dailyhightext.innerHTML = `Highest Score (this session): ${dailyhigh}`
    }
    if (score > alltimehigh){
        alltimehigh = score
    }
    ResetGame()
}

button.addEventListener('click',RollDie)
reset.addEventListener('click',ResetGame)
resethidden.addEventListener('click',ResetGame)
logscore.addEventListener('click',takeScore)
document.body.addEventListener('click', function(e) {
    e = e.target
    if (e.className && e.className.indexOf('removable') != -1 && e.className.indexOf('removed') == -1) {
        e.classList.add("removed")
    }
})
