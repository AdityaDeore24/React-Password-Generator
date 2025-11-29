import { useState , useCallback , useEffect , useRef } from 'react'


function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")
  const passwordRef = useState(null);

  // useCallback (hook)
  // Generate password on the basis of dependencies length , numberAllowed ,  
  // charAllowed and setPassword for seting password in password dependencies are
  // used in function and memoized and optimized a password
  const passwordGenerator = useCallback(()=>{
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(numberAllowed) str += "0123456789"
    if(charAllowed) str += "!@#$%^&*()~"

    for(let i = 1 ; i <= length ; i++)
      {
        let char = Math.floor(Math.random() * str.length + 1)
        pass += str.charAt(char)
      }

      setPassword(pass)

  },[length , numberAllowed , charAllowed , setLength])

  // useEffect (hook)
  // useEffect is used to call function on the basis of dependencies if dependencies
  // changes then function is called
  useEffect(()=>{
    passwordGenerator()
  },[length,numberAllowed,charAllowed,passwordGenerator])

  // useRef (hook)
  const copyPasswordToClipboard = useCallback(()=>{
    passwordRef.current?.select() // for select all text 
    passwordRef.current?.setSelectionRange(0,length); // for select text in range 0 to 4 
    // but above select method is also mandatory for setSelectionRange method
    window.navigator.clipboard.writeText(password)
  },[password])

  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-700'>
        <h1 className='text-white text-center'>Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input 
          type="text"
          value={password}
          className='outline-none w-full py-1 px-3'
          placeholder='password'
          readOnly
          ref={passwordRef}
          />
          <button className='outline-none bg-blue-600 text-white px-3 py-0.5 shrink-0 active:bg-blue-900' onClick={copyPasswordToClipboard}>copy</button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input 
            type="range"
            min={6}
            max={100}
            value={length}
            className='cursor-pointer'
            onChange={(e)=>{setLength(e.target.value)}}
            />
            <label>Length : {length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input 
            type="checkbox"
            defaultChecked={numberAllowed} 
            id='numberInput'
            onChange={()=>{
              setNumberAllowed((prev) => !prev)
            }}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input 
            type="checkbox"
            defaultChecked={charAllowed} 
            id='charInput'
            onChange={()=>{
              setCharAllowed((prev) => !prev)
            }}
            />
            <label htmlFor="charInput">Characters</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
