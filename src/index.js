import { render } from "react-dom";
import {BrowserRouter,Routes,Route} from "react-router-dom";
import LOGIN from "./login";
import ATTENDANCESHEET from "./sheet";
import './login.css';
import StudentDashboard from "./student_dashboard";
import Homepage from "./home";
import LOGINTUTOR from "./TutorLogin"
import LOGINFORMSTUDENT from "./StudentLogin"
import Missingcomplain from "./Missingcomplain"
import AdminPortal from "./adminportal"
import Foundcomplain from "./Foundcomplain"
import MissingPersonList from "./MissingList"
import FoundPersonList from "./FoundList"
import LoginPage from "./Loginpage"
import RegisterPage from "./RegisterPage"
import MyComplaint from "./MYCOMPLAIN"
import Giveid from "./fullprofile_complain"
import Giveid1 from "./foundperson_fullprofile"
import  Navigation_bar from "./navbar.js"
import Giveid3 from "./Profile_Missing_Verdict"
import Giveid4 from "./Profile_Found_Verdict"

const rootElement = document.getElementById("root");


render(
    <BrowserRouter>
    <Navigation_bar/>
    <Routes>
    <Route path="/" element={<Homepage />} />
    <Route path="/ADMINPORTAL" element={<AdminPortal />} />
    <Route path="/StudentPORTAL" element={<StudentDashboard  />} />
    <Route path="/ATTENDANCESHEET" element={<ATTENDANCESHEET/>} />
    <Route path="/TutorLogin" element={<LOGINTUTOR/>} />
    <Route path="/StudentLogin" element={<LOGINFORMSTUDENT/>} />
    <Route path="/Missingcomplain" element={<Missingcomplain/>} />
    <Route path="/Foundcomplain" element={<Foundcomplain/>} />
    <Route path="/MissingList" element={<MissingPersonList/>} />
    <Route path="/FoundList" element={< FoundPersonList />} />
    <Route path="/Loginpage"element ={< LoginPage/>} />
    <Route path="/RegisterPage"element ={< RegisterPage/>} />
    <Route path="/MYCOMPLAIN" element={<MyComplaint/>} />
    <Route path="/fullprofile_missing/:id" element={<Giveid/>} />
    <Route path ="/fullprofile_foundperson/:id" element={<Giveid1/>} />
    <Route path="/Profile_Missing_Verdict/:id" element={<Giveid3/>} />
    <Route path="/Profile_Found_Verdict/:id" element={<Giveid4/>} />
    </Routes>
    </BrowserRouter>
    , rootElement);
