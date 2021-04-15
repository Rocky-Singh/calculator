import React, {useState} from 'react'
import './Calculator.css'


const Board = () => {
    const keys = ["C","<-","%","/","7","8","9","*","4","5","6","-","1","2","3","+",".","0","00","="];

    const [text, setText] = useState("")
    const [number, setNumber] = useState("")
    const [numbers, setNumbers] =  useState([]);
    const [operations, setOperations] = useState([]);

    const isCharDigit = n => n < 10;

    const evaluateExpression = (num) => {
        if(operations.length==0) return ;

        console.log("Numbers array", numbers)
        let total = parseFloat(numbers[0]);
        const newNumbers = numbers;
        newNumbers.push(number)
        // console.log(total)
        operations.forEach( (operation, idx) => {
            switch(operation){
                case '+' :  total = total + parseFloat(newNumbers[idx+1])
                            break;
                case '-' :  total = total - parseFloat(newNumbers[idx+1])
                            break;
                case '*' :  total = total * parseFloat(newNumbers[idx+1])
                            break;
                case '/' :  total = total / parseFloat(newNumbers[idx+1])
                            break;
            }
        })
        return total;
    }

    const onCellTap = (e) => {
        const key = e.target.innerHTML;
        const lastChar = text.slice(-1);

        // If current character is digit
        if(isCharDigit(key)){
            setText(text+e.target.innerHTML)
            setNumber(number+key)            
        }

        // If user clears the text area
        else if(key==='C'){
            setText("")
            setNumber("")  
        }

        // If backspace is pressed
        else if(key=="&lt;-"){
            return;
            setText(text.slice(0, -1))
            setNumber(number.slice(0, -1))
        }

        // If we need to evaluate
        else if(key==="="){ 
            // Evaluate
            
            if(isCharDigit(lastChar) ){
                if(number!=="")
                    setNumbers([...numbers, number])
           }
            const total = evaluateExpression(number);
            setText(total.toString());
            setNumber(total)
            setNumbers([])
            setOperations([])
        }

        // If demical is inserted
        else if(key==="."){
            if(!number.includes(".")){
                setText(text+key)
                setNumber(number+key)
            }
        }

        // If arithmetic operations are applied
        else{
           if(isCharDigit(lastChar) ){
                setText(text+e.target.innerHTML)
                setNumbers([...numbers, number])
                setOperations([...operations, key])
                setNumber("")
                // numbers.slice(-1)[0] 
           }
           else if (lastChar!=="."){
                setText(text.slice(0, -1)+e.target.innerHTML)
           }
        }
        // console.log("Current number", number)
        // console.log("Numbers array", numbers)
        // console.log("Operations array", operations)
    }


    return (
        <div className="board">
              <div className="text-container">
                  <div>{text}</div>
              </div>
              <div className="grid-container">
                { keys.map((key, idx) => {
                    return(
                        <div 
                        id={idx+1} 
                        className="grid-item" 
                        key={idx} 
                        onClick={onCellTap}
                        > 
                        {key} 
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Board
