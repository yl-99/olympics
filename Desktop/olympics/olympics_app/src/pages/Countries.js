import React, {useEffect} from "react"
import Axios from "axios"

function Countries(props)
{
    //response.data holds selected database info
    useEffect(()=>{
        Axios.get('http://localhost:3001/api/countries').then((response)=>{
        console.log("res", response.data)
    })
    }, [])

    if(props.userSearch)
    {
            Axios.get(`http://localhost:3001/api/countries/${props.userSearch}`).then((response)=>{
            console.log("res", response.data)
        })
    }

    return(
        <div><h1>Countries!</h1></div>
    )
}

export default Countries