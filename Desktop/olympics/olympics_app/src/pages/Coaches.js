import React, {useEffect} from "react"
import Axios from "axios"

function Coaches(props)
{
    //response.data holds selected database info
    useEffect(()=>{
        Axios.get('http://localhost:3001/api/coaches').then((response)=>{
        console.log("res", response.data)
    })
    }, [])

    if(props.userSearch)
    {
            Axios.get(`http://localhost:3001/api/coaches/${props.userSearch}`).then((response)=>{
            console.log("res", response.data)
        })
    }

    return(
        <div><h1>Coaches!</h1></div>
    )
}

export default Coaches