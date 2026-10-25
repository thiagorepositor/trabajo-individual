import { useState } from "react";
function Informacion(){
    const[hola,setHola]=useState("")
    async function consumoApi(){
        let res=await fetch("http://localhost:5000/informacion")
        let data=await res.json()
        console.log(data)
        setHola(data)
        
    }
    return(
        <div>
            <p>{hola.mensaje}</p>
            <button onClick={consumoApi}>API</button>
        </div>
    )
}
export default Informacion