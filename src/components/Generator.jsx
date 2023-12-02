import { useState, useCallback, useEffect, useRef } from "react";

const Generator = () => {
  const [length, setLength] = useState(6);
  const [password, setPassword] = useState("");
  const [numberAllowed, setNumberAllowed] = useState(true);
  const [characterAllowed, setCharacterAllowed] = useState(false);

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "1234567890";
    if (characterAllowed) str += "!@#$%^&*()_";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);

      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, characterAllowed, setPassword]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, characterAllowed, passwordGenerator]);
    
    const copyPasswordToClipboard = useCallback(() => {
        passwordRef.current?.select()
        passwordRef.current?.setSelectionRange(0, 5)
        let passwordToCopy = password.substring(0,5)
        window.navigator.clipboard.writeText(passwordToCopy)
    },[password])

  return (
    <>
      <div className="flex flex-col flex-wrap gap-[7px]0 rounded-lg bg-gray-500 p-10">
        <div className="flex  py-3 px-5 bg-gray-400 rounded-full">
          <input
            className="p-2 w-full outline-none bg-transparent rounded-md"
            type="text"
            value={password}
            readOnly
            ref={passwordRef}
          />
          <button className="px-10 bg-blue-500 text-white rounded-3xl" onClick={copyPasswordToClipboard}>
            Copy
          </button>
        </div>

        <div className="flex gap-20  items-center">
          <div className="flex gap-3 items-center">
            <input
              type="range"
              min={5}
              max={100}
              value={length}
              onChange={(e) => setLength(() => e.target.value)}
            />
            <label htmlFor="">Length ({length})</label>
          </div>

          <div className="flex gap-[7px]  items-center">
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              onChange={() => setNumberAllowed((prev) => !prev)}
            />
            <label htmlFor="">Number</label>
          </div>
          <div className="flex gap-[7px]  items-center">
            <input
              type="checkbox"
              defaultChecked={characterAllowed}
              onChange={() => {
                setCharacterAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="">Special Character</label>
          </div>
        </div>
      </div>
    </>
  );
};

export default Generator;
