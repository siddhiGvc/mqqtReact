import { Route,Routes } from "react-router-dom"
import CustomizedTables from "../App"
import SignIn from "./login"

export default function AllRoutes(){
    return <>
    <Routes>
        <Route path={'/'} element={<CustomizedTables/>}></Route>
        <Route path={'/login'} element={<SignIn/>}></Route>



    </Routes>
      
    
    
    </>
}