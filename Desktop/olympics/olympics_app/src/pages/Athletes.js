import React, {useEffect} from "react"
import Axios from "axios"

function Athletes(props)
{
    //response.data holds selected database info
    useEffect(()=>{
        Axios.get('http://localhost:3001/api/athletes').then((response)=>{
        console.log("res", response.data)
    })
    }, [])

    if(props.userSearch)
    {
            Axios.get(`http://localhost:3001/api/athletes/${props.userSearch}`).then((response)=>{
            console.log("res", response.data)
        })
    }
 
    return(
        <div><h1>Athletes!</h1></div>
    )
}

export default Athletes
 