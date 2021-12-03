import React, { useEffect, useState } from "react"
import Axios from "axios"
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Pagination from "../components/Pagination";
import pic from "../pics/blankpic.png"



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

    const [currentPage, setCurrentPage] = useState(1)
    const [rowsPerPage] = useState(10)

    const indexOfLastRow = currentPage * rowsPerPage
    const indexOfFirstRow = indexOfLastRow - rowsPerPage
    const currentRow = coachInfo.slice(indexOfFirstRow, indexOfLastRow)

    const paginate = (pageNum) => setCurrentPage(pageNum)

    if (coachInfo.length === 0) {
        return (
            <h2>NO DATA FOUND</h2>
        )
    }


    return (
        <div>
            <Stack
                direction="column"
                divider={<Divider orientation="horizontal" flexItem />}
                spacing={2}
                boxShadow="none"
                marginTop="50px"
                marginBottom="50px"
                marginLeft="75px"
                marginRight="200px"

            >
                {currentRow.map((coach) => {

                    let b64, mimeType, defualtPic = true

                    if (coach.Photo.data.length > 10) {
                        const buffer = coach.Photo.data
                        b64 = new Buffer.from(buffer).toString('base64')
                        mimeType = "png"
                        defualtPic = false
                    }

                    return (
                        <Card sx={{ maxWidth: 500, maxHeight: 500 }} key={`${coach.CID}`}>
                            <Box sx={{ display: 'inline-block', marginTop: "15px" }}>
                                {defualtPic == false &&
                                    <CardMedia
                                        component="img"
                                        height="200"
                                        src={`data:${mimeType};base64,${b64}`}
                                    />
                                }
                                {defualtPic &&
                                    <CardMedia
                                        component="img"
                                        height="200"
                                        src={pic}
                                    />
                                }
                            </Box>
                            <Box sx={{ display: 'inline-block' }}>
                                <List dense="true">
                                    <ListItem sx={{ display: 'block' }}>
                                        <ListItemText
                                            primary="Full Name"
                                            secondary={coach.Name}
                                        />
                                        <ListItemText
                                            primary="Gender"
                                            secondary={coach.Gender}
                                        />
                                        <ListItemText
                                            primary="Age"
                                            secondary={coach.Age}
                                        />
                                        <ListItemText
                                            primary="Country"
                                            secondary={coach.Team}
                                        />
                                    </ListItem>
                                </List>
                            </Box>
                        </Card>
                    )
                })}
            </Stack>
            <Pagination rowsPerPage={rowsPerPage} totalRows={coachInfo.length} paginate={paginate} />
        </div>
    )
}

export default Coaches