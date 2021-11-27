import React, {useEffect, useState} from "react"
import Axios from "axios"
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import coach1 from '../images/coach1.jpeg'
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import { maxHeight, textAlign } from "@mui/system";
import Divider from '@mui/material/Divider';
import Pagination from '@mui/material/Pagination';

function Athletes(props)
{

    const [athleteInfo, setAthleteInfo] = useState([])

    //response.data holds selected database info
    useEffect(()=>{
        Axios.get('http://localhost:3001/api/athletes').then((response)=>{
        console.log("res", response.data)
        setAthleteInfo(response.data)
    })
    }, [])

    useEffect(() => {
        if (props.userSearch != "") {
            Axios.get(`http://localhost:3001/api/athletes/${props.userSearch}`).then((response) => {
                console.log("res2", response.data)
                setAthleteInfo(response.data)
            })
        }
    }, [props.userSearch])

    if (athleteInfo.length === 0) {
        return (
            <h2>NO DATA FOUND</h2>
        )
    }
 
    return (
        <div>
            <Stack
                direction="column"
                justifyContent="flex-start"
                alignItems="stretch"
                divider={<Divider orientation="horizontal" flexItem />}
                spacing={2}
                boxShadow="none"
                marginTop="50px"
                marginBottom="50px"
                
            >
                {athleteInfo.map((athlete) => {

                    const buffer = athlete.Photo.data
                    const b64 = new Buffer.from(buffer).toString('base64')
                    const mimeType = "png"

                    return (
                        <Card sx={{ maxWidth: 500, maxHeight: 500 }} key={`${athlete.AID}`}>
                            <Box sx={{ display: 'inline-block' }}>
                                <CardMedia
                                    component="img"
                                    height="200"
                                    src={`data:${mimeType};base64,${b64}`}
                                />
                            </Box>
                            <Box sx={{ display: 'inline-block' }}>
                                <List dense="true">
                                    <ListItem sx={{ display: 'block' }}>
                                        <ListItemText
                                            primary="Full Name"
                                            secondary={athlete.Name}
                                        />
                                        <ListItemText
                                            primary="Gender"
                                            secondary={athlete.Gender}
                                        />
                                        <ListItemText
                                            primary="Age"
                                            secondary={athlete.Age}
                                        />
                                        <ListItemText
                                            primary="Country"
                                            secondary={athlete.Team}
                                        />
                                    </ListItem>
                                </List>
                            </Box>
                        </Card>
                    )
                })}
            </Stack>
            <Pagination count={10} variant="outlined" color="primary" />
        </div>
    )
}

export default Athletes
 