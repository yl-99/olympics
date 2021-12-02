import React, {useEffect, useState} from "react"
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

    const [currentPage, setCurrentPage] = useState(1)
    const [rowsPerPage] = useState(10)

    const indexOfLastRow = currentPage * rowsPerPage
    const indexOfFirstRow = indexOfLastRow - rowsPerPage
    const currentRow = teamInfo.slice(indexOfFirstRow, indexOfLastRow)

    const paginate = (pageNum) => setCurrentPage(pageNum)

    if (teamInfo.length === 0) {
        return (
            <h2>NO DATA FOUND</h2>
        )
    }

    return (
        <div>

            {currentRow.map((team) => {
                return (
                    <Accordion sx={{marginTop:"20px", marginBottom:"20px"}}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      id={team.Tname}
                    >
                      <Typography> <GroupsTwoToneIcon/> {team.Tname} | <EmojiEventsTwoToneIcon/> {team.gold+team.silver+team.bronze}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>
                        <p>Gold: {team.gold}</p><p>Silver: {team.silver}</p><p>Bronze: {team.bronze}</p>
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                )
            })}
            <Pagination rowsPerPage={rowsPerPage} totalRows={teamInfo.length} paginate={paginate}/>
        </div>
    )
}

export default Teams