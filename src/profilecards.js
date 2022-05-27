import React from 'react';
import ReactDOM from 'react-dom'
import { useNavigate } from "react-router-dom";
import "./login.css";
import WebcamCapture from './webcamcapture';
import "./index.css";





class Profilecard extends React.Component  {


  async  fulldetails()
    { 
        
    if(this.props.type=="Missing")
    {
      window.location=`/Profile_Missing_Verdict/${this.props.obj.id}`  }
    else {

      
      window.location=`/Profile_Found_Verdict/${this.props.obj.id}`  }
    }




    
    render(){
        return (
<>
            <div class="card">
  <img src={this.props.obj.photo} alt="John" style={{ width:"100%",height:"250px"}} />
  <h3>{this.props.obj.name}</h3>
<p>Age : {this.props.obj.age}</p>
<p> Contact: {this.props.obj.contact_no}</p>

  <button onClick={()=>this.fulldetails()}>Full Details</button>

 
</div>
</>
        );
    }







}


export default Profilecard

