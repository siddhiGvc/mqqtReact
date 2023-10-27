import * as React from 'react';
import "./App.css"
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
import LoadingButton from '@mui/lab/LoadingButton';
import SendIcon from '@mui/icons-material/Send';
import { getLoadingButtonUtilityClass, loadingButtonClasses } from '@mui/lab/LoadingButton';
import noData from "./assets/download.png"
import CircularProgress from '@mui/material/CircularProgress';


import axios from 'axios';
import { useState } from 'react';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    fontSize:"17px"
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 15,
    
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.common.pink,
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
  const [startDate,setStartDate]=React.useState("2023-10-27");
  const [endDate,setEndDate]=React.useState(new Date());
  const [from,setFrom]=React.useState("");
  const [to,setTo]=React.useState("");
  const [loading, setLoading] = React.useState(false);
  function handleClick() {
    setLoading(true);
    OnSubmit();
  }

  function getCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Month is 0-based
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  function getPreviousDate() {
    const today = new Date();
    today.setDate(today.getDate() - 1); // Subtract 1 day from the current date
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Month is 0-based
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  function convertDate(d){
    const isoDateString = d;
const isoDate = new Date(isoDateString);

const year = isoDate.getFullYear();
const month = String(isoDate.getMonth() + 1).padStart(2, '0'); // Month is 0-based
const day = String(isoDate.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  function convertTime(d) {
    const isoDateString = d;
    const isoDate = new Date(isoDateString);

    const hours = String(isoDate.getUTCHours()).padStart(2, '0');
const minutes = String(isoDate.getUTCMinutes()).padStart(2, '0');
const seconds = String(isoDate.getUTCSeconds()).padStart(2, '0');

   return `${hours}:${minutes}:${seconds}`;

    
  }
  


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  React.useEffect(()=>{
    fetch(`http://localhost:8080/transactions?start_date=${startDate}&end_date=${endDate}`)
    .then((res)=>{
      return res.json();
    })
    .then((json)=>{
      console.log(json);
      setData(json);
      setLoading(false);
      
    })

  },[])

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
      setLoading(false);
      
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
      setLoading(false);
      
      
    })
    .catch((err)=>{
      setData([]);

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
      setLoading(false);
      
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
      setLoading(false);
      
    })
 
  }

   }

       
      

   
     
  

  return <>
  <div style={{width:'100%',paddingTop:"5px",margin:"auto",paddingBottom:"290px"}} class="BackgroundHeader">
    <p style={{textAlign:"center",color:"white",fontSize:"45px"}}>MQTT Details</p>
    <Paper elevation={20} sx={{width:"90%",margin:"auto",height:"100px",display:"flex",alignItems:"center",justifyContent:"center",marginTop:"20px",marginBottom:"20px",borderTopRightRadius:"10px",borderTopLeftRadius:"10px"}}>
  <div style={{width:"90%",marginTop:"50px",marginBottom:"30px"}}>
  <FormControl style={{display:'flex',flexDirection:"row",justifyContent:"space-between"}} >
    
  <TextField
          type='date'
          required
          id="outlined-required"
          label="Start Date "
          InputLabelProps={{
            shrink: true,
            style: { color: 'blue' },
          }}
          defaultValue={getPreviousDate()}
          style={{color:"blue"}}
          onChange={(e)=>setStartDate(e.target.value)}
        />
        <TextField
          type="date"
          required
          id="outlined-disabled"
          label="End Date "
          InputLabelProps={{
            shrink: true,
            style: { color: 'blue' },
          }}
          defaultValue={getCurrentDate()}
          onChange={(e)=>setEndDate(e.target.value)}
        />
        <TextField
          id="outlined-password-input"
          label="P1"
          type="text"
          InputLabelProps={{
            shrink: true,
            style: { color: 'blue' }, // Change label color to blue
          }}
          InputProps={{
            style: { borderColor: 'red' }, // Change border color to red
          }}
          autoComplete="P1"
          onChange={(e)=>setFrom(e.target.value)}
        />
         <TextField
          id="outlined-password-input"
          label="Machine Number"
          type="text"
          InputLabelProps={{
            shrink: true,
            style: { color: 'blue' },
          }}
          autoComplete="Machine Number"
          onChange={(e)=>setTo(e.target.value)}
        />
           <LoadingButton
          size="medium"
          onClick={handleClick}
          sx={{fontWeight:400}}
          loading={loading}
          loadingPosition="end"
          variant="contained"
        >
          <span>Search</span>
        </LoadingButton>
         
         </FormControl>
        
  </div>
  </Paper>
  <Paper elevation={20}  sx={{ width: '86%', overflow: 'hidden',margin:"auto",padding:"20px" }}>
    <TableContainer component={Paper} style={{widht:"50%",height:"500px",margin:"auto"}}>
      {loading ? <div style={{width:'100%',height:"100%",display:"flex",justifyContent:"center",alignItems:"center"}}><CircularProgress/></div>:
    data.length>0 ?
      <Table sx={{width:"100%",margin:"auto"}}  stickyHeader aria-label="sticky table">
     
        <TableHead>
          <TableRow>
            <StyledTableCell align='center'>Id</StyledTableCell>
            <StyledTableCell align="center">Machine</StyledTableCell>
            <StyledTableCell align="center">Command</StyledTableCell>
            <StyledTableCell align="center">P1</StyledTableCell>
            <StyledTableCell align="center">Date</StyledTableCell>
            <StyledTableCell align="center">Time</StyledTableCell>
        
          </TableRow>
        </TableHead>
        <TableBody>
        
          {data.map((row,i) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row" align='center'>
                {i+1}
              </StyledTableCell>
              <StyledTableCell align="center">{row.machine}</StyledTableCell>
              <StyledTableCell align="center">{row.command}</StyledTableCell>
              <StyledTableCell align="center">{row.p1}</StyledTableCell>
              <StyledTableCell align="center">{convertDate(row.createdAt)}</StyledTableCell>
              <StyledTableCell align="center">{convertTime(row.createdAt)}</StyledTableCell>
            
            </StyledTableRow>
          ))} 
        </TableBody>
     
      </Table>:<div style={{width:'100%',height:"100%",display:"flex",justifyContent:"center",alignItems:"center"}}><img style={{width:"30%",height:"50%",minWidth:"200px"}} src={noData}/></div>}
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