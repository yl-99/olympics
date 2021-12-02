import React from "react";
import MUIPagination from '@mui/material/Pagination';

const Pagination = ({ rowsPerPage, totalRows, paginate }) => {

    const pageNums = []

    for (let i = 1; i <= Math.ceil(totalRows / rowsPerPage); i++) {
        pageNums.push(i)
    }

    const handleChange = (event, value) => {
        paginate(value);
      };

    return (

        <div>  
                <MUIPagination onChange={handleChange} count={pageNums.length} variant="outlined" color="primary" />
        </div>
    )
}

export default Pagination