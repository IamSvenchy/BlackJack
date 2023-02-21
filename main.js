let suits = ["clubs", "diamonds", "spades", "hearts"]
let values = ["ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "jack", "queen", "king"]

let cards = new Array();

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


for(let i = 0; i < suits.length; i++){
    for(let j = 0; j < values.length; j++){
        cards[i*values.length + j] = new Card(suits[i], values[j])
    }
}   

cards.forEach(element => {
    console.log(element.suit + " " + element.nameValue + " dejanska vredost " + element.value)
});

let mainContainer = document.querySelector(".middle-container")

mainContainer.appendChild