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
import TableFooter from '@mui/material/TableFooter';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';

import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import LoadingButton from '@mui/lab/LoadingButton';
import SendIcon from '@mui/icons-material/Send';
import { getLoadingButtonUtilityClass, loadingButtonClasses } from '@mui/lab/LoadingButton';
import noData from "./assets/download.png"
import CircularProgress from '@mui/material/CircularProgress';


import axios from 'axios';
import { useState } from 'react';


function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
        sx={{
          color:'blue'
        }}
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
        sx={{
          color:'blue'
        }}
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
        sx={{
          color:'blue'
        }}
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
        sx={{
          color:'blue'
        }}
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

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

const styles = {
  pagination: {
   
    color:"blue",
  },
};


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
  

  const emptyRows =
  page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

const handleChangePage = (event, newPage) => {
  setPage(newPage);
};

const handleChangeRowsPerPage = (event) => {
  setRowsPerPage(parseInt(event.target.value, 10));
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
      setPage(0);
      
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
      setPage(0);
      
    })
  }
  else if(from && to)
  {
    fetch(`http://localhost:8080/transactions/serial?start_date=${startDate}&end_date=${endDate}&from=${from}&to=${to}&page=${page}&limit=${rowsPerPage}`)
    .then((res)=>{
      return res.json();
    })
    .then((json)=>{
      console.log(json);
      setData(json);
      setLoading(false);
      setPage(0);
      
      
    })
    .catch((err)=>{
      setData([]);

    })
 
  }
  else if(from)
  {
    fetch(`http://localhost:8080/transactions/from?start_date=${startDate}&end_date=${endDate}&from=${from}&page=${page}&limit=${rowsPerPage}`)
    .then((res)=>{
      return res.json();
    })
    .then((json)=>{
      console.log(json);
      setData(json);
      setLoading(false);
      setPage(0);
      
    })
 
  }
  else if(to)
  {
    fetch(`http://localhost:8080/transactions/machine?start_date=${startDate}&end_date=${endDate}&to=${to}&page=${page}&limit=${rowsPerPage}`)
    .then((res)=>{
      return res.json();
    })
    .then((json)=>{
      console.log(json);
      setData(json);
      setLoading(false);
      setPage(0);
      
    })
 
  }

   }

       
      

   
     
  

  return <>
  <div style={{width:'100%',paddingTop:"5px",margin:"auto",paddingBottom:"290px"}} class="BackgroundHeader">
    <p style={{textAlign:"center",color:"white",fontSize:"45px"}}>MQTT Details</p>
    <Paper elevation={20} sx={{width:"90%",margin:"auto",height:"100px",maxHeight:"500px",display:"flex",alignItems:"center",justifyContent:"center",marginTop:"20px",marginBottom:"20px",borderTopRightRadius:"10px",borderTopLeftRadius:"10px"}}>
  <div style={{width:"90%",marginTop:"50px",marginBottom:"30px",maxHeight:"300px", overflowX:'auto',whiteSpace:'nowrap',paddingTop:"10px"}}>
  <FormControl style={{display:'flex',flexDirection:'row',justifyContent:"space-between"}} >
    
  <TextField
          type='date'
          required
          id="outlined-required"
          label="Start Date "
          InputLabelProps={{
            shrink: true,
            style: { color: 'blue' },
          }}
          style={{
            minWidth:"100px"
          }}
          defaultValue={getPreviousDate()}
         
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
          style={{
            minWidth:"100px"
          }}
          defaultValue={getCurrentDate()}
          onChange={(e)=>setEndDate(e.target.value)}
        />
        <TextField
          id="outlined-password-input"
          label="P1"
          type="text"
          style={{
            minWidth:"100px"
          }}
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
          style={{
            minWidth:"100px"
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
        
          {(rowsPerPage > 0
            ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : data
          ).map((row,i) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row" align='center'>
                {page*rowsPerPage+i+1}
              </StyledTableCell>
              <StyledTableCell align="center">{row.machine}</StyledTableCell>
              <StyledTableCell align="center">{row.command}</StyledTableCell>
              <StyledTableCell align="center">{row.p1}</StyledTableCell>
              <StyledTableCell align="center">{convertDate(row.createdAt)}</StyledTableCell>
              <StyledTableCell align="center">{convertTime(row.createdAt)}</StyledTableCell>
            
            </StyledTableRow>
          ))} 
            {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
     </Table>:<div style={{width:'100%',height:"100%",display:"flex",justifyContent:"center",alignItems:"center"}}><img style={{width:"30%",height:"50%",minWidth:"200px"}} src={noData}/></div>}
    </TableContainer>
    <TablePagination
               style={styles.pagination}
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
            
              count={data.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                label:"Show",
                inputProps: {
                  'aria-label': 'Show',
                },
                native: false,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
             
   
      </Paper>
    </div>
    </>
}