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

function Teams(props)
{
    const [teamInfo, setTeamInfo] = useState([])

    //response.data holds selected database info
    useEffect(()=>{
        Axios.get('http://localhost:3001/api/teams').then((response)=>{
        console.log("res", response.data)
        setTeamInfo(response.data)
    })
    }, [])

    useEffect(() => {
        if (props.userSearch != "") {
            Axios.get(`http://localhost:3001/api/teams/${props.userSearch}`).then((response) => {
                console.log("res2", response.data)
                setTeamInfo(response.data)
            })
        }
    }, [props.userSearch])


    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(!open);
    };

    if (teamInfo.length === 0) {
        return (
            <h2>NO DATA FOUND</h2>
        )
    }

    return (
        <div>

            {teamInfo.map((team) => {
                return (
                    <List 
                        sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', marginTop:"50px", marginBottom:"50px" }}
                        component="nav">
                        <ListItemButton  onClick={handleClick}>
                            <ListItemText primary={`${team.Tname}`}/>
                            {open ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>
                        <Collapse in={open} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                <ListItemButton sx={{ pl: 4 }}>
                                    <ListItemText primary={`Gold: ${team.gold} Silver: ${team.silver} Bronze: ${team.bronze}`}  />
                                </ListItemButton>
                            </List>
                        </Collapse>
                    </List>
                )
            })}
            <Pagination count={10} variant="outlined" color="primary" />
        </div>
    )
}

export default Teams