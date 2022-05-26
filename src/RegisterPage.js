import React from 'react';
import ReactDOM from 'react-dom'
import { useNavigate } from "react-router-dom";
import "./login.css";
import WebcamCapture from './webcamcapture';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';








class RegisterPage extends React.Component {
    constructor(props)
    {
        super(props);
        this.state = {
            username:'',
            password:'',
            first_name:'',
            email:'',
        }
    }

    async handleregistersubmit(e)
{

    e.preventDefault();
    const data={username: this.state.username,password: this.state.password,email:this.state.email,first_name:this.state.first_name};
    const response = await fetch("http://127.0.0.1:8000/authapp/register/",{
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
        for(let key in data)
        {
           alert(data[key]); 
            toast(data[key]);
        }
      
      });

}
else
{
   const yoyo=response.json();
   // yet not response is extrected properly
   toast("Register Sucessfull");
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
 <div className="form"  onSubmit={(e)=> this.handleregistersubmit(e)}>
   <form className="login-form">
   <h2>REGISTER</h2>
     <input type="text" required name='username' onChange={(e)=>this.handlechange(e)}  placeholder="username"/>
     <input type="password"  required name="password" onChange={(e)=>this.handlechange(e)} placeholder="password"/>
     <input type="text" required name='first_name' onChange={(e)=>this.handlechange(e)}  placeholder="Name"/>
     <input type="email"  required name='email' onChange={(e)=>this.handlechange(e)}  placeholder="Your Contact Email"/>
     <button type="submit">Register</button>
   </form>
 </div>
</div>
<ToastContainer />
</>


        );
    }
}


export default RegisterPage