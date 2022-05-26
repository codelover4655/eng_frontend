import React from 'react';
import ReactDOM from 'react-dom'
import { useNavigate } from "react-router-dom";
import "./login.css";
import WebcamCapture from './webcamcapture';
import "./index.css";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class LOGINTUTOR extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        username:'',
        password:'',
        secretkey:''
        }
    }

async handleloginsubmit(e)
{

    e.preventDefault();
    const data={username: this.state.username,password: this.state.password,secretkey:this.state.secretkey};

    const response = await fetch("http://127.0.0.1:8000/professor/login/",{
    method: "POST",
    headers: {
         'Content-Type': 'application/json'
       // 'Content-Type': 'application/x-www-form-urlencoded',
     },
     mode: 'cors',
     body: JSON.stringify(data)
});


if(!response.ok)
{
    const yoyo=response.json();
    yoyo.then((data) => {

        console.log(data);
        
       toast("INVALID CREDENTIALS")
      
      });
    

}
else
{
   const yoyo=response.json();
   // yet not response is extrected properly
   yoyo.then((data) => {
       console.log(data);
       localStorage.setItem('tokenadmin',data.Token);
       localStorage.setItem('adminname',data.id);
       window.location = "/ADMINPORTAL";
     });

}




}
    
handlechange(e){
    let  feild=e.target.name;
    let  value=e.target.value;
     this.setState({
         [feild]:value,
     });
 }
 home()
 {
    window.location = "/";
 }

    render(){
        return (
            <>
             <button className="atbutton" onClick={()=>this.home()}>RETURN HOME</button>
            <div className="login-page">
  <div className="form"  onSubmit={(e)=> this.handleloginsubmit(e)}>
    <form className="login-form">
    <h2>ADMIN PORTAL</h2>
      <input type="text" name='username' onChange={(e)=>this.handlechange(e)}  placeholder="username"/>
      <input type="password" name="password" onChange={(e)=>this.handlechange(e)} placeholder="password"/>
      <input type="password" name="secretkey"  onChange={(e)=>this.handlechange(e)}  placeholder="secretkey"/>
      <button type="submit">login</button>
     
    </form>
  </div>
</div>
<ToastContainer />
</>
        )
    }


}

export default LOGINTUTOR