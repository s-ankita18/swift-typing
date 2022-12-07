const setOfWords = 'https://api.quotable.io/random'
const quoteDisplayElement = document.getElementById('quoteDisplay');
const quoteInput = document.getElementById('quoteInput');
const btn = document.getElementById('btn');
let startTime , endTime;
//for fetching quote
function getRandomQuote() {
    return fetch(setOfWords)
      .then(response => response.json())
      .then(data => data.content)
  }
async function renderNewQuote() {
    const quote = await getRandomQuote();
    quoteDisplayElement.innerText = quote;
}
// when we click start button playGame is called
const playGame = () =>{
    
    renderNewQuote();
    let date = new Date();
    startTime = date.getTime();
    btn.innerText = "Done";
}
//when we click done button endGame ic called
const endPlay = () =>{
    let date = new Date();
    endTime = date.getTime();
    let totalTime = ((endTime-startTime)/1000);

    let totalStr = quoteInput.value;
    let wordCount = wordCounter(totalStr);

    let speed = Math.round((wordCount/totalTime) * 60);

    let finalMsg = "You typed " +speed+ " words per minute";

    finalMsg += compareWord(quoteDisplayElement.innerText, totalStr);
    quoteDisplayElement.innerText = finalMsg;

}
//for comparing how many words are wrong
const compareWord = (str1, str2) =>{
     let words1 = str1.split(" ");
     let words2 = str2.split(" ");
     let count = 0;
     words1.forEach(function (item, index){
        if(item == words2[index]){
            count++;
        }
     })
     let errorWord = (words1.length - count) 
     return (" and you have typed "+errorWord+" words wrong");
}
//for counting how many words user will enetr
 const wordCounter = (str) =>{
     let response = str.split(" ").length; 
     return response;
 }
//when we click start or done button 
btn.addEventListener('click', function(){
    if(this.innerText == 'Start'){
        quoteInput.disabled = false;
        playGame(); 
    }
    else if(this.innerText == "Done"){
        quoteInput.disabled = true;
        btn.innerText = "Start";
        endPlay();
    }
})