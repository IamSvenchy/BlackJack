let suits = ["clubs", "diamonds", "spades", "hearts"]
let values = ["ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "jack", "queen", "king"]

let balance = 1000
const bal = document.getElementById("num")
bal.innerText = balance + "$"
//karte
let dealerHand = new Array();
let playerHand = new Array();
//vrednost kart
let dealerVal = 0;
let playerVal = 0;

let bet = 0

const PosStartX = 47.5
const playerPosStartY = 25
const DealerPosStartY = 60

//nastavi na začetno pozicijo... ta se spreminja z hit, split, itd...
let playerPosX = PosStartX
let playerPosY = playerPosStartY
let dealerPosX = PosStartX
let dealerPosY = DealerPosStartY

let playerWin = false;
let dealerWin = false;
let dealerOpen = false;

const middle = document.querySelector("#middle-container")
const hitBtn = document.querySelector("#hit")
const stayBtn = document.querySelector("#stay")
const splitBtn = document.querySelector("#split")
const ddBtn = document.querySelector("#dd")

let betInput = document.querySelector("#betInput")
let submit = document.querySelector("#submitBet")

hitBtn.disabled = true
splitBtn.disabled = true
stayBtn.disabled = true
ddBtn.disabled = true

//Konstruktor za karte določi suit in vrednost karte ter ime in lokacijo png - ja
class Card {
    constructor(suit, nameValue) {
        this.suit = suit;
        this.nameValue = nameValue;
        this.img = "./Images/PNG-cards-1.3/" + nameValue + "_of_" + suit + ".png";
        this.value = 0

        switch(this.nameValue){
            case "ace": 
                this.value = 0 
                break;
            case "2": 
                this.value = 2
                break;
            case "3": 
                this.value = 3;
                break;
            case "4": 
                this.value = 4;
                break;
            case "5": 
                this.value = 5;
                break;
            case "6": 
                this.value = 6;
                break;
            case "7": 
                this.value = 7;
                break;
            case "8": 
                this.value = 8;
                break;  
            case "9": 
                this.value = 9;
                break;

            default:
                this.value = 10;
                break;
            
        }
    }
}
//vse možne karte
let cards = new Array();

//število kart v kupu
let cardNum = 52;

for(let i = 0; i < suits.length; i++){
    for(let j = 0; j < values.length; j++){
        cards[i*values.length + j] = new Card(suits[i], values[j])
    }
}


const divWinLose = document.createElement('div')
divWinLose.setAttribute("id", "win")
divWinLose.setAttribute("style", "position: absolute; width:240px; height: 80px; left:" + 35 + "%; bottom: " + 82 + "%;")
middle.appendChild(divWinLose)

//win sign
const win = document.createElement('img')
win.setAttribute("src", "./Images/winSign.png" )
win.setAttribute("style", "width:100%; height:100%")

//lose sign
const lose = document.createElement('img')
lose.setAttribute("src", "./Images/loseSign.png" )
lose.setAttribute("style", "width:100%; height:100%")



function replay(){
    //ponastavi vse parametre
    playerWin = false;
    dealerWin = false;
    dealerOpen = false;
    curCards = cards.slice()
    cardNum = 52;
    dealerHand = new Array()
    playerHand = new Array()
    dealerVal = 0
    playerVal = 0
    playerPosX = PosStartX
    playerPosY = playerPosStartY
    dealerPosX = PosStartX
    dealerPosY = DealerPosStartY

    document.querySelector(".player-score").textContent = ""
    document.querySelector(".dealer-score").textContent = ""
    

    document.querySelectorAll("#card").forEach((element) => {
        element.remove()
    })
}

//karte trenutno še v kupu
let curCards = cards.slice();

//deal
function deal(){
    dealerHand = new Array();
    playerHand = new Array();

    splitBtn.disabled = true
    hitBtn.disabled = false
    stayBtn.disabled = false
    ddBtn.disabled = false


    for(let i = 0; i < 2; i++){
        addCardDealer()
        addCardPlayer()
    }

    if(playerVal == 21 && dealerVal == 21){
        playerWin = true
        dealerWin = true
        setTimeout(() => {tie()}, 1000)
    }
    else if(playerVal == 21){
        playerWin = true;
        blackJack()
        rmvHidden()
        
    }else if(dealerVal == 21){
        dealerWin = true
        dealerWins()
        rmvHidden()
    
    }

    if(playerHand[0].value == playerHand[1].value){
        splitBtn.disabled = false
    }

    return curCards;
}

//hit
function hit(){
    addCardPlayer()

    if(playerVal == 21){
        stay()
    }
    if(playerVal > 21){
        hitBtn.disabled = true
        splitBtn.disabled = true
        ddBtn.disabled = true
        stayBtn.disabled = true
        dealerWins()
        rmvHidden()
    }
}

//opens hidden card
function rmvHidden(){
    if(document.querySelector("#hidden-card") != null){
        document.querySelector("#hidden-card").remove()
    }
}

//stay
function stay(){
    rmvHidden()
    document.querySelector(".dealer-score").textContent = dealerVal

    hitBtn.disabled = true
    splitBtn.disabled = true
    ddBtn.disabled = true
    stayBtn.disabled = true

    if(dealerVal <= 16){
        setTimeout(() => {
            addCardDealer()
            stay()
            document.querySelector(".dealer-score").textContent = dealerVal
        }, 1000)
    }else if(dealerVal > 21){
        playerWins()
    }
    else{
        if(dealerVal > playerVal){
            dealerWins()
        }else if(dealerVal < playerVal){
            playerWins()
        }else{
            tie()
        }
    }
}
//TODO
//split
function split(curCards){
    
}

//double down
function doubleDown(curCards){
    hitBtn.disabled = true
    splitBtn.disabled = true
    ddBtn.disabled = true
    stayBtn.disabled = true

    balance -= bet    
    bet *= 2

    addCardPlayer()
    
    if(playerVal > 21){
        dealerWin = true
        rmvHidden()
        dealerWins()
    }else setTimeout(()=>{stay()}, 1000)

}

let mainContainer = document.querySelector(".middle-container")


function play(button){
    if(button.id == "hit"){
        hit(curCards)
    }
    if(button.id == "split"){
        split(curCards)
    }
    if(button.id == "stay"){
        stay(curCards)
    }
    if(button.id == "dd"){
        doubleDown(curCards)
    }

    console.log("click")

}


function addCardPlayer(){
    let random = Math.floor(Math.random()*cardNum);

    playerHand.push(curCards[random])

    playerVal = 0;
    
    for(let i = 0; i < playerHand.length; i++){
        if(playerHand[i].nameValue != "ace"){
            console.log(playerHand[i].nameValue)
            playerVal += playerHand[i].value
        }
    }
    for(let i = 0; i < playerHand.length; i++){
        if(playerHand[i].nameValue == "ace"){
            if(playerVal + 11 >= 21){
                playerVal++;
            }else{
                playerVal += 11;
            }
        }
    }
    
    let div = document.createElement('div')
    div.setAttribute("id", "card")
    div.setAttribute("style", "position: absolute; width:50px; height: 75px; left:" + playerPosX + "%; bottom: " + playerPosY + "%;")
    
    
    let img = document.createElement('img')
    img.setAttribute("src", curCards[random].img)
    img.setAttribute("style", "width:100%; height:100%")

    div.appendChild(img)
    middle.appendChild(div)

    playerPosX += 1.2
    playerPosY += 2

    curCards.splice(random,1)
    cardNum--;

    document.querySelector(".player-score").textContent = playerVal
}

function addCardDealer(){
    
    let random = Math.floor(Math.random()*cardNum)
    dealerHand.push(curCards[random])

    dealerVal = 0;
    
    for(let i = 0; i < dealerHand.length; i++){
        if(dealerHand[i].nameValue != "ace"){
            dealerVal += dealerHand[i].value
        }
    }
    for(let i = 0; i < dealerHand.length; i++){
        if(dealerHand[i].nameValue == "ace"){
            if(dealerVal + 11 > 21){
                dealerVal++;
            }else{
                dealerVal += 11;
            }
        }
    }


    let div = document.createElement('div')
    div.setAttribute("id", "card")
    div.setAttribute("style", "position: absolute; width:50px; height: 75px; left:" + dealerPosX + "%; bottom: " + dealerPosY + "%;")
    
    let img = document.createElement('img')
    img.setAttribute("src", curCards[random].img)
    img.setAttribute("style", "width:100%; height:100%")

    div.appendChild(img)
    middle.appendChild(div)

    if(DealerPosStartY == dealerPosY){
        let div = document.createElement('div')
        div.setAttribute("id", "hidden-card")
        div.setAttribute("style", "position: absolute; width:50px; height: 75px; left:" + dealerPosX + "%; bottom: " + dealerPosY + "%;")
    
    
        let img = document.createElement('img')
        img.setAttribute("src","./Images/PNG-cards-1.3/backside.png")
        img.setAttribute("style", "width:100%; height:100%")

        div.appendChild(img)
        middle.appendChild(div)
    }

    dealerPosX -= 1.2
    dealerPosY -= 2
    
    curCards.splice(random,1)
    cardNum--;
    
}


//money 0:1
function dealerWins(){
    divWinLose.appendChild(lose)
    setTimeout(() => {
        divWinLose.removeChild(lose)
        replay()
    },1500)

    betInput.disabled = false
    submit.disabled = false
}


//money 2:1
function playerWins(){
    divWinLose.appendChild(win)
    setTimeout(() => {
        divWinLose.removeChild(win)
        balance += bet * 2
        bal.innerText = balance + "$"
        replay()
    },1500)

    betInput.disabled = false
    submit.disabled = false
}
//money 1:1
function tie(){
    replay()
    balance += bet
    bal.innerHTML = balance + "$"

    betInput.disabled = false
    submit.disabled = false
}

//3:1
function blackJack(){
    if(dealerVal == 21){
        tie()
    }else{
        divWinLose.appendChild(win)
        setTimeout(() => {
            divWinLose.removeChild(win)
            balance += bet * 3
            bal.innerText = balance + "$"
            replay()
        },1500)

        betInput.disabled = false
        submit.disabled = false
    }
}

function acceptBet(){
    balance -= betInput.value
    bet = betInput.value
    bal.innerText = balance + "$"
    betInput.value = ""

    betInput.disabled = true
    submit.disabled = true

    hitBtn.disabled = false
    splitBtn.disabled = true
    stayBtn.disabled = false
    ddBtn.disabled = false

    deal()
}