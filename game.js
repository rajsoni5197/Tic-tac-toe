let main = document.querySelector('.main')
main.addEventListener('click', draw)

let currentValue = ['./unnamed.png', './j.png'];
let lastValueIndex;
let x = [], o = [];
let winningStep = [
    { a:0, b:1, c:2}, { a:3, b:4, c:5}, { a:6, b:7, c:8},
    { a:0, b:3, c:6}, { a:1, b:4, c:7}, { a:2, b:5, c:8},
    { a:0, b:4, c:8}, { a:2, b:4, c:6}
]
let i = 0
function draw(e) {

    let target = e.target;
    if (target.className != "container") { return }
    if (i == 0) {
        target.insertAdjacentHTML('beforeend', `<img src="${currentValue[lastValueIndex = Math.floor(Math.random() * 2)]}">`)
        pushIndex(lastValueIndex, target);
        
        i++;
    } else {
        target.insertAdjacentHTML('beforeend', `<img src="${currentValue[lastValueIndex = oneInTwo(lastValueIndex)]}">`)
        pushIndex(lastValueIndex, target);
        
    }
     
        for(let i=0;i<8;i++){
            
            if(checkIfWins(winningStep[i].a,winningStep[i].b,winningStep[i].c,o)||checkIfWins(winningStep[i].a,winningStep[i].b,winningStep[i].c,x)){
                console.log('gameover')
                if(checkIfWins(winningStep[i].a,winningStep[i].b,winningStep[i].c,o)){gameOver('O')}
                else{gameOver('X')}
            }
           
          

        }
        
    if(!(checkIfWins(winningStep[i].a,winningStep[i].b,winningStep[i].c,o)||checkIfWins(winningStep[i].a,winningStep[i].b,winningStep[i].c,x))&&(x.length==5||o.length==5)){
        gameOver('No One')
    }
}

function pushIndex(last, target) {
    if (last == 0) {
        x.push(target.id);
    } 
    if(last==1){
        o.push(target.id);
    }
}
function oneInTwo(last) {
    return last == 0 ? 1 : 0;
}
function checkIfWins(a, b, c, array) {
    let isTrue = [];
    if (array.some(ele => { return ele == a })) { isTrue.push(true) } else { isTrue.push(false) };
    if (array.some(ele => { return ele == b })) { isTrue.push(true) } else { isTrue.push(false) };
    if (array.some(ele => { return ele == c })) { isTrue.push(true) } else { isTrue.push(false) };

    return isTrue[0] && isTrue[1] && isTrue[2] ? true : false;
}
function gameOver(winner){
    main.innerHTML='';
    main.insertAdjacentHTML('beforeend',`<div class='gameover'>Game Over:<br><strong>${winner} wins</strong><br><button>Replay</button></div>`)
    main.removeEventListener('click', draw)
    document.querySelector('button').addEventListener('click',()=>location.reload())
}
