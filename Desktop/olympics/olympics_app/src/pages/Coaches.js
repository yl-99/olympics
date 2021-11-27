import React, { useEffect, useState } from "react"
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




function Coaches(props) {


    //response.data holds selected database info
    const [coachInfo, setCoachInfo] = useState([])

    useEffect(() => {
        Axios.get('http://localhost:3001/api/coaches').then((response) => {
            console.log("res", response.data)
            setCoachInfo(response.data)
        })
    }, [])

    useEffect(() => {
        if (props.userSearch != "") {
            Axios.get(`http://localhost:3001/api/coaches/${props.userSearch}`).then((response) => {
                console.log("res2", response.data)
                setCoachInfo(response.data)
            })
        }
    }, [props.userSearch])

    if (coachInfo.length === 0) {
        return (
            <h2>NO DATA FOUND</h2>
        )
    }

    const Item = styled(Paper)(({ theme }) => ({
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));


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
                {coachInfo.map((val) => {

                    const buffer = val.Photo.data
                    const b64 = new Buffer.from(buffer).toString('base64')
                    const mimeType = "png"

                    return (
                        <Card sx={{ maxWidth: 500, maxHeight: 500 }} key={`${val.CID}`}>
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
                                            secondary={val.Name}
                                        />
                                        <ListItemText
                                            primary="Gender"
                                            secondary={val.Gender}
                                        />
                                        <ListItemText
                                            primary="Age"
                                            secondary={val.Age}
                                        />
                                        <ListItemText
                                            primary="Country"
                                            secondary={val.Team}
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

export default Coaches