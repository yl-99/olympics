import React, { useEffect, useState } from "react"
import Axios from "axios"
import Pagination from "../components/Pagination";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

function Dates(props) {

    const [dateInfo, setDateInfo] = useState([])

    //response.data holds selected database info
    useEffect(() => {
        Axios.get('http://localhost:3001/api/dates').then((response) => {
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

    const [currentPage, setCurrentPage] = useState(1)
    const [rowsPerPage] = useState(10)

    const indexOfLastRow = currentPage * rowsPerPage
    const indexOfFirstRow = indexOfLastRow - rowsPerPage
    const currentRow = dateInfo.slice(indexOfFirstRow, indexOfLastRow)

    const paginate = (pageNum) => setCurrentPage(pageNum)

    if (dateInfo.length === 0) {
        return (
            <h2>NO DATA FOUND</h2>
        )
    }

    return (
        <div>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell> Day Number </TableCell>
                            <TableCell align="right"> Date </TableCell>
                            <TableCell align="right"> Gold Medal Event </TableCell>
                            <TableCell align="right"> Venue </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>

                        {currentRow.map((date) => {
                            return (
                                <TableRow key={date.DayNum} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell component="th" scope="row">
                                        {date.DayNum}
                                    </TableCell>
                                    <TableCell align="right">{date.Day}/{date.Month}/{date.YEAR}</TableCell>
                                    <TableCell align="right">{date.Ename}</TableCell>
                                    <TableCell align="right">{date.vName}</TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <Pagination rowsPerPage={rowsPerPage} totalRows={dateInfo.length} paginate={paginate} />
        </div>
    )

}

export default Dates