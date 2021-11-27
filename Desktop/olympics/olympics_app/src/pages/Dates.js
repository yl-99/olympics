import React, {useEffect, useState} from "react"
import Axios from "axios"
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import Pagination from '@mui/material/Pagination';

function Dates(props)
{

    const [dateInfo, setDateInfo] = useState([])

    //response.data holds selected database info
    useEffect(()=>{
        Axios.get('http://localhost:3001/api/dates').then((response)=>{
        console.log("res", response.data)
        setDateInfo(response.data)
    })
    }, [])

    useEffect(() => {
        if (props.userSearch != "") {
            Axios.get(`http://localhost:3001/api/dates/${props.userSearch}`).then((response) => {
                console.log("res2", response.data)
                setDateInfo(response.data)
            })
        }
    }, [props.userSearch])

    if (dateInfo.length === 0) {
        return (
            <h2>NO DATA FOUND</h2>
        )
    }

    return (
        <div>
            {dateInfo.map((date) => {
                return (
                    <List 
                        sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', marginTop:"50px", marginBottom:"50px" }}
                        component="nav">
                            <ListItemText key={date.DayNum} primary={`Day Number: ${date.DayNum} Date: ${date.Day}/${date.Month}/${date.YEAR} Event: ${date.Ename} Venue: ${date.vName}`}/>
                            </List>
                )
            })}
            <Pagination count={10} variant="outlined" color="primary" />
        </div>
    )
                
}

export default Dates