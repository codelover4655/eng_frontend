import React from 'react';
import ReactDOM from 'react-dom'
import { useNavigate } from "react-router-dom";
import './login.css';
import "./index.css";
import WebcamCapture from './webcamcapture';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import  GoogleSocialAuth from './googlelogin';




class LoginPage extends React.Component {
    constructor(props)
    {
        super(props);
        this.state = {
            username:'',
            password:'',
        }
    }

    async handleloginsubmit(e)
{

    e.preventDefault();
    const data={username: this.state.username,password: this.state.password};

    const response = await fetch("http://127.0.0.1:8000/authapp/login/",{
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
   toast("Logined Successfully");
   yoyo.then((data) => {
       console.log(data);
       localStorage.setItem('token',data.Token);
       localStorage.setItem('name',data.name);
       window.location = "/";
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
    render(){
        return(
            <>
         
           <div className="login-page">
 <div className="form"  onSubmit={(e)=> this.handleloginsubmit(e)}>
   <form className="login-form">
   <h2>LOGIN</h2>
     <input type="text" name='username' onChange={(e)=>this.handlechange(e)}  placeholder="username"/>
     <input type="password" name="password" onChange={(e)=>this.handlechange(e)} placeholder="password"/>
     <button type="submit">login</button>
   </form>
   <GoogleSocialAuth/>
 </div>
</div>
<ToastContainer />
</>


        );
    }
}


export default LoginPage