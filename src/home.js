import React from 'react';
import ReactDOM from 'react-dom'
import { useNavigate } from "react-router-dom";
import "./login.css";
import WebcamCapture from './webcamcapture';
import "./index.css";



class Homepage extends React.Component {
tutor()
{
    window.location = "/TutorLogin";
}
student()
{
    window.location = "/StudentLogin";
}
missingcomplain()
{
    window.location = "/Missingcomplain"
}
foundperson()
{
    window.location = "/Foundcomplain"
}
missingpersonslist()
{
    window.location = "/MissingList"
}

foundpersonslist()
{
    window.location = "/FoundList"
}
login()
{
    window.location = "/Loginpage"
}
register()
{
    window.location = "/RegisterPage"
}
mycomplain()
{
    window.location = "/MYCOMPLAIN"
}

    render() {
        return(
            <>
            
            <div className="homepage1">
                <button className="btnhomepage1" onClick={() =>this.tutor()} >TUTOR PORTAL</button>
                <button className="btnhomepage2" onClick={() =>this.student()}> STUDENT PORTAL</button>
                <button className="btnhomepage2" onClick={() =>this.missingcomplain()}> Missing Person complain</button>
                <button className="btnhomepage2" onClick={() =>this.foundperson()}> Found Person complain</button>
                <button className="btnhomepage2" onClick={() =>this.missingpersonslist()}> Missing persons list</button>
                <button className="btnhomepage2" onClick={() =>this.foundpersonslist()}> Found persons list</button>
                <button className="btnhomepage2" onClick={() =>this.login()}>LOGIN</button>
                <button className="btnhomepage2" onClick={() =>this.register()}>REGISTER</button>
                <button className="btnhomepage2" onClick={() =>this.mycomplain()}>MY Compalins</button>

            </div>
            </>
        );
    }




}








export default Homepage