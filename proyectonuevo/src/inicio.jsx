import { useState } from "react"
function Inicio(){
        const[hola,setHola]=useState("")
        async function consumoApi(){
            let res=await fetch("http://localhost:5000/inicio")
            let data=await res.json()
            console.log(data)
            setHola(data)
            
        }
    return(
        <div>
              <p>{hola.mensaje}</p>
            <button onClick={consumoApi}>llamar</button>
        </div>
    )
}
export default Inicio