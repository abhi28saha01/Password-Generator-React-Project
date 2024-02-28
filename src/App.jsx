import { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8);
  const [isNumber,setIsNumber] = useState(false);
  const [isCharacter,setIsCharacter] = useState(false);
  const [password,setPassword] = useState("");

  // UseRef hook
  const passRef = useRef(null);


  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if(isNumber) str += "0123456789";
    if(isCharacter) str += ",./';?!|@[]{}`()";

    for(let i = 1; i <= length ; i++){
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }

    setPassword(pass);

  },[length,isCharacter,isNumber,setPassword])

  const copyToClickBoard = useCallback(() => {
    passRef.current?.select()
    //Copy To Click board
    window.navigator.clipboard.writeText(password);
  },[password])

  useEffect(()=> {
    passwordGenerator()
  },[length,isNumber,isCharacter,passwordGenerator])

  return (
    <div className=' bg-gray-800 h-screen w-full text-yellow-300 flex flex-col justify-center items-center'>
      <h1 className=' text-4xl text-center font-bold'>Password Generator</h1>
      <div className='flex shadow-md rounded-lg w-[400px] overflow-hidden mb-4 mx-auto mt-5'>
        <input 
          type='text' 
          value={password}
          className='outline-none w-[400px] py-1 px-3 cursor-default text-xl font-bold text-lime-600'
          placeholder='Password'
          readOnly
          ref={passRef}
        />
        <button
          onClick={copyToClickBoard}
         className='outline-none bg-blue-500 hover:bg-blue-800 text-white px-3 py-0.5 shrink-0 font-bold'
        >Copy</button>
      </div>
      <div className='flex text-l gap-x-5 font-semibold'>
        <div className='flex items-center gap-2'>
          <input type='range' min={4} max={20} value={length} className='cursor-pointer' 
            onChange={(e) => {setLength(e.target.value)}}
          />
          <label>Length : {length}</label>
        </div>
        <div className='flex items-center gap-2'>
            <input type='checkbox' defaultChecked={isNumber} id='numberInput' 
              onChange={() => {setIsNumber((prev) => !prev)}}
            />
            <label>Number Allowed</label>
        </div>
        <div className='flex items-center gap-2'>
            <input type='checkbox' defaultChecked={isCharacter} id='charInput' 
              onChange={() => {setIsCharacter((prev) => !prev)}}
            />
            <label>Special Character Allowed</label>
        </div>
      </div>
      <button
          onClick={passwordGenerator}
         className='mt-5 outline-none bg-green-600 hover:bg-green-800 text-white px-10 py-3 shrink-0 font-bold'
        >Re-Generate</button>
    </div>
  )
}

export default App
