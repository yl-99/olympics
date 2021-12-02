import React, { useEffect, useState } from "react"
import Axios from "axios"
import Pagination from "../components/Pagination";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EmojiEventsTwoToneIcon from '@mui/icons-material/EmojiEventsTwoTone';
import FlagTwoToneIcon from '@mui/icons-material/FlagTwoTone';
import GroupsTwoToneIcon from '@mui/icons-material/GroupsTwoTone';

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



    const [currentPage, setCurrentPage] = useState(1)
    const [rowsPerPage] = useState(10)
    
    const indexOfLastRow = currentPage * rowsPerPage
    const indexOfFirstRow = indexOfLastRow - rowsPerPage
    const currentRow = countryInfo.slice(indexOfFirstRow, indexOfLastRow)

    const paginate = (pageNum) => setCurrentPage(pageNum)

    if (countryInfo.length === 0 || countryInfo[0].country === null) {
        return (
            <h2>NO DATA FOUND</h2>
        )
    }

    return (
        <div>
            {currentRow.map((country) => {
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
                    <Accordion sx={{marginTop:"20px", marginBottom:"20px"}}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      id={country.country}
                    >
                      <Typography> <FlagTwoToneIcon/> {country.country} | <EmojiEventsTwoToneIcon/> {country.medalSum} | <GroupsTwoToneIcon/> {teams.length}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>
                        {teams.map((team) =>{
                            return(
                                <p>{team}</p>
                            )
                        })} 
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                )
            })}
            <Pagination rowsPerPage={rowsPerPage} totalRows={countryInfo.length} paginate={paginate}/>
        </div>
    )
}

export default Countries