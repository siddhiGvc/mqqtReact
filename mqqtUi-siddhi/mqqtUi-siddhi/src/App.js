import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import TablePagination from '@mui/material/TablePagination';
import axios from 'axios';
import { useState } from 'react';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function CustomizedTables() {
  const [data,setData]=useState([])
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

   React.useEffect(()=>{

    fetch('http://localhost:8080/transactions')
    .then((res)=>{
      return res.json();
    })
    .then((json)=>{
      console.log(json);
      setData(json);
      
      
    })
       
      

   },[])
     
  

  return <>
  <div styles={{width:'80%',padding:"30px",paddingTop:"40px",margin:"auto"}}>
  <div style={{marginTop:"50px",marginBottom:"30px"}}>
  <TextField
          required
          id="outlined-required"
          label="Required"
          defaultValue="Select Start Date"
        />
        <TextField
          
          id="outlined-disabled"
          label="Required"
          defaultValue="Select End Date"
        />
        <TextField
          id="outlined-password-input"
          label="From"
          type="text"
          autoComplete="From"
        />
         <TextField
          id="outlined-password-input"
          label="To"
          type="text"
          autoComplete="To"
        />
  </div>
  <Paper  sx={{ width: '100%', overflow: 'hidden' }}>
    <TableContainer component={Paper} style={{widht:"50%",margin:"auto"}}>
      <Table sx={{maxWidth:700,margin:"auto"}}  stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Id</StyledTableCell>
            <StyledTableCell align="left">Machine</StyledTableCell>
            <StyledTableCell align="left">Command</StyledTableCell>
            <StyledTableCell align="left">P1</StyledTableCell>
        
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row,i) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {i+1}
              </StyledTableCell>
              <StyledTableCell align="left">{row.machine}</StyledTableCell>
              <StyledTableCell align="left">{row.command}</StyledTableCell>
              <StyledTableCell align="left">{row.p1}</StyledTableCell>
            
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      </Paper>
    </div>
    </>
}