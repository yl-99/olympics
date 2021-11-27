import React, { useEffect, useState } from "react"
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
import Divider from '@mui/material/Divider';

function Countries(props) {
    const [countryInfo, setCountryInfo] = useState([])
    const [teamInfo, setteamInfo] = useState([])

    //response.data holds selected database info
    useEffect(() => {
        Axios.get('http://localhost:3001/api/countries').then((response) => {
            console.log("res", response.data)
            setCountryInfo(response.data)
        })
    }, [])

    useEffect(() => {
        Axios.get('http://localhost:3001/api/countries/teams').then((response) => {
            console.log("res", response.data)
            setteamInfo(response.data)
        })
    }, [])

    useEffect(() => {
        if (props.userSearch != "") {
            Axios.get(`http://localhost:3001/api/countries/${props.userSearch}`).then((response) => {
                console.log("res2", response.data)
                setCountryInfo(response.data)
            })
        }
    }, [props.userSearch])



    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(!open);
    };

    if (countryInfo.length === 0 || countryInfo[0].country === null) {
        return (
            <h2>NO DATA FOUND</h2>
        )
    }

    return (
        <div>

            {countryInfo.map((country) => {


                var teams = []
                {
                    teamInfo.map((team) => {
                        if (team.country === country.country) {
                            teams.push(team.Tname)
                        }
                        return (
                            teams
                        )
                    })
                }
                return (
                    <List
                        sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' , marginTop:"50px", marginBottom:"50px"}}
                        component="nav"
                        >
                        <ListItemButton onClick={handleClick}>
                            <ListItemText primary={`${country.country} ${country.medalSum}`} />
                            {open ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>
                        <Collapse in={open} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                <ListItemButton sx={{ pl: 4 }}>
                                    <ListItemText primary={`${teams}`} />
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

export default Countries