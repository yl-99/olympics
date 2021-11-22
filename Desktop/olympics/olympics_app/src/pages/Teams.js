import React, {useEffect} from "react"
import Axios from "axios"

function Teams(props)
{
    //response.data holds selected database info
    useEffect(()=>{
        Axios.get('http://localhost:3001/api/teams').then((response)=>{
        console.log("res", response.data)
    })
    }, [])

    if(props.userSearch)
    {
            Axios.get(`http://localhost:3001/api/teams/${props.userSearch}`).then((response)=>{
            console.log("res", response.data)
        })
    }

    return(
        <div><h1>Teams!</h1></div>
    )
}

export default Teams