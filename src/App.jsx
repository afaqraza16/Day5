import { useCallback, useEffect, useRef, useState } from "react";

// import "./App.css";
function App() {
  const [length, setLength] = useState(8);
  const [includeChar, setIncludeChar] = useState(false);
  const [includeNumbers, setIncludeNumbers] = useState(false);
  const [password, setPassword] = useState("");
  // const [copied, setCopied] = useState(false);
  const passwordRef = useRef(null);

  const generatePassword = useCallback(() => {
    let generatedPassword = "";
    let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (includeChar) characters += "!@#$%^&*(){}[]<>,./?";
    if (includeNumbers) characters += "0123456789";
    for (let i = 0; i <= length; i++) {
      let char = characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
      generatedPassword += char;
    }
    setPassword(generatedPassword);
  }, [length, includeChar, includeNumbers, setPassword]);

  const copyPassword = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 20);
    window.navigator.clipboard.writeText(password);
  }, [password]);
  useEffect(() => {
    generatePassword();
  }, [length, includeChar, includeNumbers, generatePassword]);
  return (
    <>
      <div className="flex items-center h-screen justify-center">
        <div className="App max-w-xl   w-full mx-auto shadow-lg rounded-lg p-4 px-8  py-6 my-8 bg-gray-800 text-orange-400">
          <h1 className="text-3xl font-bold text-center text-white py-2 mb-4">
            Password Generator
          </h1>
          <div className=" flex shadow-lg rounded-lg overflow-hidden mb-4">
            <input
              type="text"
              value={password}
              className="p-2 w-full font-medium outline-none max-w-full  bg-white "
              placeholder="Password"
              readOnly
              ref={passwordRef}
            />
            <button
              onClick={copyPassword}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 "
            >
              Copy
            </button>
          </div>
          <div className="flex text-sm gap-x-2 items-center">
            <div className="flex gap-x-2 items-center">
              <input
                type="range"
                min="6"
                max="50"
                value={length}
                className="cursor-pointer "
                onChange={(e) => setLength(e.target.value)}
              />
              <label htmlFor="length">
                <span className="font-bold">Length: {length}</span>
              </label>
            </div>
            <div className="flex items-center gap-x-2">
              <input
                type="checkbox"
                defaultChecked={includeNumbers}
                id="numberInput"
                onChange={() => {
                  setIncludeNumbers((prev) => !prev);
                }}
              />
              <label htmlFor="numberInput" className="font-bold">
                Numbers
              </label>
            </div>
            <div className="flex items-center gap-x-2">
              <input
                type="checkbox"
                defaultChecked={includeChar}
                id="numberInput"
                onChange={() => {
                  setIncludeChar((prev) => !prev);
                }}
              />
              <label htmlFor="numberInput" className="font-bold">
                Characters
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
