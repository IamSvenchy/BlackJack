let suits = ["clubs", "diamonds", "spades", "hearts"]
let values = ["ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "jack", "queen", "king"]

//karte
let dealerHand = new Array();
let playerHand = new Array();
//vrednost kart
let dealerVal = 0;
let playerVal = 0;

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

setTimeout(() => {
    console.log(middle)
},3000)
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
divWinLose.setAttribute("style", "position: absolute; width:300px; height: 100px; left:" + 32 + "%; bottom: " + 78 + "%; background-color:red")
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

    document.querySelectorAll("#card").forEach((element) => {
        element.remove()
    })

    setTimeout(() => {
        console.log("brisem")
    deal()}
        , 2000)


}

//karte trenutno še v kupu
let curCards = cards.slice();

//deal
function deal(){
    dealerHand = new Array();
    playerHand = new Array();


    for(let i = 0; i < 2; i++){
        addCardDealer()
        addCardPlayer()
    }

    console.log(curCards.length + " ->" + dealerHand + " " + playerHand)
    console.log(playerVal + " " + dealerVal)

    if(playerVal == 21 && dealerVal == 21){
        playerWin = true
        dealerWin = true
        setTimeout(() => {replay}, 500)
    }
    else if(playerVal == 21){
        playerWin = true;
        playerWins()
        rmvHidden()
        setTimeout(() => {replay}, 500)
    }else if(dealerVal == 21){
        dealerWin = true
        dealerWins()
        rmvHidden()
        setTimeout(() => {replay}, 500)
    }

    return curCards;
}

//hit
function hit(){
    addCardPlayer()
    if(playerWin){
        let winSign = document.createElement("img")
        winSign.setAttribute("src", "./Images/winSign.png")
        winSign.setAttribute("align", "center")
        middle.appendChild()
    }

    if(playerVal == 21){
        playerWins()
        stay()
    }
    if(playerVal > 21){
        rmvHidden()
        replay()
    }
}
function rmvHidden(){
    if(document.querySelectorAll("#hidden-card") != null){
        document.querySelector("#hidden-card").remove()
    }
}

//stay
function stay(){
    rmvHidden()

    if(dealerVal <= 16){
        addCardDealer()
        setTimeout(() => {stay()}, 500)
    }else{
        replay()
    }
    /*while(dealerVal <= 16){
        document.querySelector("#hidden-card").remove()
        addCardDealer()
    }*/
}

//split
function split(curCards){
    
}

//double down
function doubleDown(curCards){
    
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

    if(curCards[random].value == 0){
        if(playerWin + 11 > 21){
            playerVal++;
        }else{
            playerVal += 11;
        }
    }else{
        playerVal += curCards[random].value
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
}

function addCardDealer(){
    
    let random = Math.floor(Math.random()*cardNum)
    dealerHand.push(curCards[random])

    if(curCards[random].value == 0){
        if(dealerWin + 11 > 21){
            dealerVal++;
        }else{
            dealerVal += 11;
        }
    }else{
        dealerVal += curCards[random].value
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

function dealerWins(){
    divWinLose.appendChild(lose)
    /*setTimeout(() => {
        divWinLose.removeChild(lose)
        replay(),1000
    })*/
}

function playerWins(){
    divWinLose.appendChild(win)
    /*setTimeout(() => {
        divWinLose.removeChild(win)
        replay(),1000
    })*/
}

deal()