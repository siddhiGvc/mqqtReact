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
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
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
  const [startDate,setStartDate]=React.useState();
  const [endDate,setEndDate]=React.useState();
  const [from,setFrom]=React.useState("");
  const [to,setTo]=React.useState("");

  function formatStartDate(date) {
    setStartDate(date);
    // const year =date.getFullYear().toString().slice(-2); // Get the last two digits of the year
    // const month = String(date.getMonth() + 1).padStart(2, '0'); // Ensure 2-digit month
    // const day = String(date.getDate()).padStart(2, '0'); // Ensure 2-digit day
    // setStartDate(`${year}/${month}/${day}`);
  }
  
  function formatEndDate(date) {
    setEndDate(date);
    // const year =date.getFullYear().toString().slice(-2); // Get the last two digits of the year
    // const month = String(date.getMonth() + 1).padStart(2, '0'); // Ensure 2-digit month
    // const day = String(date.getDate()).padStart(2, '0'); // Ensure 2-digit day
    // setEndDate(`${year}/${month}/${day}`);
  }


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

   const OnSubmit=()=>{
    if(!from && !to)
    {
    fetch(`http://localhost:8080/transactions?start_date=${startDate}&end_date=${endDate}`)
    .then((res)=>{
      return res.json();
    })
    .then((json)=>{
      console.log(json);
      setData(json);
      
      
    })
  }
  else if(from && to)
  {
    fetch(`http://localhost:8080/transactions/serial?start_date=${startDate}&end_date=${endDate}&from=${from}&to=${to}`)
    .then((res)=>{
      return res.json();
    })
    .then((json)=>{
      console.log(json);
      setData(json);
      
      
    })
 
  }
  else if(from)
  {
    fetch(`http://localhost:8080/transactions/from?start_date=${startDate}&end_date=${endDate}&from=${from}`)
    .then((res)=>{
      return res.json();
    })
    .then((json)=>{
      console.log(json);
      setData(json);
      
      
    })
 
  }
  else if(to)
  {
    fetch(`http://localhost:8080/transactions/machine?start_date=${startDate}&end_date=${endDate}&to=${to}`)
    .then((res)=>{
      return res.json();
    })
    .then((json)=>{
      console.log(json);
      setData(json);
      
      
    })
 
  }

   }

       
      

   
     
  

  return <>
  <div styles={{width:'80%',padding:"30px",paddingTop:"40px",margin:"auto"}}>
  <div style={{marginTop:"50px",marginBottom:"30px"}}>
  <FormControl style={{display:'flex',flexDirection:"row",justifyContent:'space-evenly'}} >
    
  <TextField
          type='date'
          required
          id="outlined-required"
          label="Start Date "
          InputLabelProps={{
            shrink: true,
          }}
          
          onChange={(e)=>formatStartDate(e.target.value)}
        />
        <TextField
          type="date"
          required
          id="outlined-disabled"
          label="End Date "
          InputLabelProps={{
            shrink: true,
          }}
          
          onChange={(e)=>formatEndDate(e.target.value)}
        />
        <TextField
          id="outlined-password-input"
          label="From"
          type="text"
          autoComplete="From"
          onChange={(e)=>setFrom(e.target.value)}
        />
         <TextField
          id="outlined-password-input"
          label="To"
          type="text"
          autoComplete="To"
          onChange={(e)=>setTo(e.target.value)}
        />
         <Button type="submit" onClick={OnSubmit} variant="contained">Search</Button>
         
         </FormControl>
        
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
            <StyledTableCell align="left">CreatedAt</StyledTableCell>
        
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
              <StyledTableCell align="left">{row.createdAt}</StyledTableCell>
            
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