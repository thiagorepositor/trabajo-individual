import { useState } from "react"

function Solicitud(){
    const [dato_enviado, setDatoEnviado] = useState("")
    const [dato_apellido, setDatoApellido] = useState("")
    const [mensaje, setMensaje] = useState("")
    const [nombre, setNombre] = useState("")
    const [apellido, setApellido] = useState("")
    const [correo, setCorreo] = useState("") 

    async function guardar(){
        let resultado = await fetch("http://localhost:5000/solicitudes", {
            method: 'POST',
            body: JSON.stringify({
                nombre: nombre,
                apellido: apellido,
                correo: correo //  Y lo enviamos también al backend
            }),
            headers: {
                'Content-Type': 'application/json' 
            }
        });
        
        let datos = await resultado.json();
        setDatoEnviado(datos.dato_enviado);
        setDatoApellido(datos.dato_apellido);
        setMensaje(datos.mensaje);
    }

    return(
        <div>
            {/* Ojo: en React se escribe onChange con la C mayúscula */}
            <input placeholder="nombre" onChange={(e) => setNombre(e.target.value)} />
            <input placeholder="apellido" onChange={(e) => setApellido(e.target.value)} />
            <input placeholder="correo" onChange={(e) => setCorreo(e.target.value)} /> 
            
            <button onClick={guardar}>aceptar</button>
            
            <p>{dato_enviado}</p>
            <p>{dato_apellido}</p>
            <p>{mensaje}</p>
        </div>
    )
}

export default Solicitud;