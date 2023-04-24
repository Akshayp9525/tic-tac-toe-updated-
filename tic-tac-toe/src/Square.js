import React, { useState } from 'react'
import './Square.css'

function Square({value,onSquareClick}){
    return(
     <button className='square' onClick={onSquareClick}>
        {value}
     </button>
    );

}
function Board({xIsNext, squares, onPlay}) {
    function handleClick(i){
        if(squares[i] || CalculateWinner(squares)){
            return;
        }
       const nextSquares = squares.slice();
       if(xIsNext){
           nextSquares[i]="X";
        }
        else{
            nextSquares[i]="O";
       }
       onPlay(nextSquares);
     
      
    }
    const winner = CalculateWinner(squares);
    let status;
    if(winner){
        status = "winner: "+winner; 
    }
    else{
        status = "Next player: "+(xIsNext ? "X":"O");
    }
  return (
    <>
    <div className='status'>{status}</div>
    {/* <div className='container'> */}
        <div className="board-row">
             <Square value={squares[0]} onSquareClick={()=>handleClick(0)}/>  
             <Square value={squares[1]} onSquareClick={()=>handleClick(1)}/>  
             <Square value={squares[2]} onSquareClick={()=>handleClick(2)}/>  
        </div>
        <div className="board-row">
             <Square value={squares[3]} onSquareClick={()=>handleClick(3)}/>  
             <Square value={squares[4]} onSquareClick={()=>handleClick(4)}/>  
             <Square value={squares[5]} onSquareClick={()=>handleClick(5)}/>  
        </div>
        <div className="board-row">
             <Square value={squares[6]} onSquareClick={()=>handleClick(6)}/>  
             <Square value={squares[7]} onSquareClick={()=>handleClick(7)}/>  
             <Square value={squares[8]} onSquareClick={()=>handleClick(8)}/>  
        </div>
        
    {/* </div> */}
    </>
  );
}
export default function Game(){
    const[xIsNext,setXIsnext] = useState(true);
    const [history,setHistory] = useState(Array(9).fill(null));
    const currentSquares = history[history.length -1];
    function handlePlay(nextSquares){
        setHistory([...history,nextSquares]);
        setXIsnext(!xIsNext);
    }
    function jumpTo (nextMove){
        // todo
    }
    const moves = history.map((squares, move)=>{
        let discription;
        if(move> 0){
            discription = 'Go to move #'+ move;
        }
        else{
            discription = 'go to game start';
        }
        return(
            <li key={move}>
                <button onClick={()=>jumpTo(move)}>{discription}</button>
            </li>
        )
    });
    return(
    <>
        <div className='game'>
            <div className='game-board'>
                <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay}/>
            </div>
            <div className='game-info'>
                <ol>{moves}</ol>
            </div>
        </div>
    </>
    );
}
function CalculateWinner(squares){
    const lines = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,3],
        [0,4,8],
        [2,4,6],
    ];
    for(let i = 0 ; i< lines.length;i++){
        const [a,b,c] = lines[i];
      if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
            return squares[a];
        }
    }
    return null;
  }