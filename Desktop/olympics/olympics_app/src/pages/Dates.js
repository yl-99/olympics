import React, {useEffect} from "react"
import Axios from "axios"

function Dates(props)
{
    //response.data holds selected database info
    useEffect(()=>{
        Axios.get('http://localhost:3001/api/dates').then((response)=>{
        console.log("res", response.data)
    })
    }, [])

    if(props.userSearch)
    {
            Axios.get(`http://localhost:3001/api/dates/${props.userSearch}`).then((response)=>{
            console.log("res", response.data)
        })
    }

    return(
        <div><h1>Dates!</h1></div>
    )
}

export default Dates