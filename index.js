const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");

let currentPlayer;
let gameGrid;

const winningPositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]

]

//create a funtion to initialise the game
function initGame(){
    currentPlayer = "X";
    gameGrid = [ "", "", "", "", "","", "", "", ""];
    //UI par empty karna padega boxes ko.
    boxes.forEach((box, index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
    // green color ko remove karna hai.
    box.classList = `box box${index+1}`;
    });
    newGameBtn.classList.remove("active");
    gameInfo.innerText = `Current Player - ${currentPlayer}`;

}
initGame();

function swapTurn(){
    if(currentPlayer === "X"){
        currentPlayer = "O";
    }
    else{
        currentPlayer = "X";
    }
    
    //UI update kar do
    gameInfo.innerText = `Current Player - ${currentPlayer}`;

}

function checkGameOver(){
    let answer = "";
    winningPositions.forEach((position) =>{
        //all be boxes should be not empty and exactly same in value
        if((gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "")
        && (gameGrid[position[0]] === gameGrid[position[1]] && (gameGrid[position[1]] === gameGrid[position[2]]))) {


            if(gameGrid[position[0]] === "X")
            answer = "X";
            else
            answer = "O";
            //winner mil gya pointer Event ko Close kar do
            boxes.forEach((box) =>{
                box.style.pointerEvents = "none";
            })
            //now we know X/O is a winner
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");

        }
    });
    if(answer !== ""){
        gameInfo.innerText = `Winner Player`-$(answer);
        newGameBtn.classList.add("active");
        return;
    }
    //there is no winner (tie)
    let fillCount = 0;
    gameGrid.forEach((box)=>{
        if(box != "")
        fillCount++;
    });
    //Bord is fill game is tie
    if(fillCount === 9){
        gameInfo.innerText = "Game Tie";
        newGameBtn.classList.add("active");
    }

}

function handleClick(index){
    if(gameGrid[index] === ""){
        boxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = "none";
        //turn on swap, "X" ki turn thi to ab "O" ki turn le aao, ab "O" ki turn hai to "X" ki turn le aao.
        swapTurn();
        // hame check karna hai koi jeet to nahi gya
        checkGameOver();
    }
}

boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        handleClick(index);
    })
});

newGameBtn.addEventListener("click", initGame);


// function func2(){
//     for(var i = 0; i < 3; i++){
//       setTimeout(()=> console.log(i),2000);
//   }
//   }
//   func2();
