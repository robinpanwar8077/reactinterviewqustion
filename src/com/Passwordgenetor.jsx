import { useState } from "react";


function PasswordGenerator() {
  const[chrlength,setChrlength] = useState(4);
  const[uppercase,setUppercase] = useState(false )
  const[lower,setLower]   = useState(false)
  const [number,setNumber] = useState(false)
  const [spchr,setSpchr]  = useState(false)
  const [password ,setPassword] = useState("")
  
  const handlePassword = () => {
    const upperSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowerSet = 'abcdefghijklmnopqrstuvwxyz';
    const numberSet = '0123456789';
    const specialSet = '!@#$%^&*()_+~`|}{[]:;?><,./-=';
    let characterPool = '';

    if(uppercase) characterPool+=upperSet;
    if(lower) characterPool+= lowerSet;
    if(number) characterPool += numberSet;
    if(spchr) characterPool += specialSet;

    if(characterPool ==""){
        alert("please enter one type ")
        return 
    }
    let generatedPassword = '';
    for (let i = 0; i < chrlength; i++) {
      const randomIndex = Math.floor(Math.random() * characterPool.length);
      generatedPassword += characterPool[randomIndex]
      console.log(generatedPassword)
    }
  setPassword(generatedPassword)
   
  };

  const Copypassword = ()=>{
    navigator.clipboard.writeText(password)
    .then(()=>{alert("Password copied")}).catch(()=>alert("failed to copy password"))
  }

  console.log(password)
    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-100">
            <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md">
                <div className="flex items-center justify-between mb-4">
                    <p className="text-xl font-semibold">{password}</p>
                    <button  onClick={Copypassword} className="px-2 py-1 text-sm text-white bg-blue-500 rounded hover:bg-blue-400">
                        Copy
                    </button>
                </div>

                <div className="flex items-center justify-between mb-4">
                    <input type="range" min="4" max="20" value={chrlength} onChange={(e)=>setChrlength(e.target.value)}  className="w-full" />
                    <span className="ml-4">Length</span>
                    <span>{chrlength}</span>
                </div>

                <div className="space-y-4">
                    <label className="flex items-center">
                    <input
  type="checkbox"
  checked={uppercase}
  onChange={(e) => setUppercase(e.target.checked)}
  className="mr-2"
/>
                        <span className="text-gray-700">Include Uppercase Letters</span>
                    </label>
                    <label className="flex items-center">
                        <input type="checkbox"  checked={lower} onChange={(e)=> setLower(e.target.checked)} className="mr-2" />
                        <span className="text-gray-700">Include Lowercase Letters</span>
                    </label>
                    <label className="flex items-center">
                        <input type="checkbox"   checked={number}  onChange={(e)=>setNumber(e.target.checked)}      className="mr-2" />
                        <span className="text-gray-700">Include Numbers</span>
                    </label>
                    <label className="flex items-center">
                        <input type="checkbox"   checked={spchr} onChange={(e)=>setSpchr(e.target.checked)}   className="mr-2" />
                        <span className="text-gray-700">Include Special Characters</span>
                    </label>
                </div>

                <button    onClick={handlePassword} className="w-full px-4 py-2 mt-6 text-white bg-green-500 rounded hover:bg-green-400">
                    Generate Password
                </button>
            </div>
        </div>
    );
}

export default PasswordGenerator;
