import React from 'react';
import ReactDOM from 'react-dom'
import { useNavigate } from "react-router-dom";
import "./login.css";
import WebcamCapture from './webcamcapture';
import "./index.css";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class LOGINFORMSTUDENT extends React.Component
{
      
constructor(props) {
    super(props);
    this.state = {
        username:'',
        password:'',
        email:'',
        first_name:'',
        photo:'',
        rollnumber:'',
        register:'false',
    }

}

handlechange(e){
    let  feild=e.target.name;
    let  value=e.target.value;
     this.setState({
         [feild]:value,
     });
 }
  async handleregistersubmit(e)
 {
    e.preventDefault();
    if(localStorage.getItem('blob')=='notset')
    {
        alert('please capture your picture for sucessful registration');
    }
    else{
//console.log(localStorage.getItem('blob'));

let form_data = new FormData();
let str=localStorage.getItem('blob');
form_data.append('photo',str );
form_data.append('username', this.state.username);
form_data.append('password',this.state.password);
form_data.append('first_name',this.state.first_name);
form_data.append('email',this.state.email);
form_data.append('roll_no',this.state.rollnumber);


const response = await fetch("http://127.0.0.1:8000/student/register/",{
    method: "POST",
    headers: {
      //   'Content-Type': 'application/json'
       // 'Content-Type': 'application/x-www-form-urlencoded',
     },
     mode: 'cors',
     body: form_data
});

if(!response.ok)
{
    if(response.status==401)
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
    if(response.status==400)
    {

      toast("PLEASE Capture A CLEAR IMAGE");

    }
    
}
else
{
   const yoyo=response.json();
   // yet not response is extrected properly
   yoyo.then((data) => {
       console.log(data);
       localStorage.setItem('token',data.Token);
       //localStorage.setItem('userid',data.id);
       window.location = "/StudentPORTAL";
     });

}

    }



 }

 async handleloginsubmit(e)
 {

    e.preventDefault();
const data={username: this.state.username,password: this.state.password};
console.log(data.username)
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
   toast("INVALID CREDENTIALS");
}
else
{
   const yoyo=response.json();
   // yet not response is extrected properly
   yoyo.then((data) => {
       console.log(data);
       localStorage.setItem('token',data.Token);
       //localStorage.setItem('userid',data.id);
       window.location = "/StudentPORTAL";

     });

}




 }
 register()
 {
     this.setState({
        username:'',
        password:'',
        email:'',
        first_name:'',
        photo:'',
        rollnumber:'',
        register:'true',

     });
 }
 logg()
 {
    this.setState({
        username:'',
        password:'',
        email:'',
        first_name:'',
        photo:'',
        rollnumber:'',
        register:'false',
    });
 }
 home()
 {
    window.location = "/";
 }
render()
{
    
    localStorage.setItem('blob','notset');
   if(this.state.register=='true')
   { 
     return(
         <>
          <button className="atbutton" onClick={()=>this.home()}>RETURN HOME</button>
           <div className="login-page">
  <div className="form"  onSubmit={(e)=> this.handleregistersubmit(e)}>
    <form className="login-form">
    <h2>STUDENT REGISTER</h2>
      <input type="text" name='username' onChange={(e)=>this.handlechange(e)}  placeholder="username"/>
      <input type="password" name="password" onChange={(e)=>this.handlechange(e)} placeholder="password"/>
      <input type="email" name='email' onChange={(e)=>this.handlechange(e)}  placeholder="Email"/>
      <input type="text" name='first_name' onChange={(e)=>this.handlechange(e)}  placeholder="First_name"/>
      <input type="number" name='rollnumber' onChange={(e)=>this.handlechange(e)}  placeholder="Roll Number"/>
      <WebcamCapture/>
      <div className='registerbutton'>
      <button type="submit">REGISTER</button>
      </div>
      <div className='registerbutton'>
      <button onClick={() => this.logg()}>ALREADY REGISTERD</button>
      </div>
     
    </form>
  </div>
</div>
          </>
     )
  
   }
   else
   {
     
      // login form

      return (
           <>
             <button className="atbutton" onClick={()=>this.home()}>RETURN HOME</button>
            <div className="login-page">
  <div className="form"  onSubmit={(e)=> this.handleloginsubmit(e)}>
    <form className="login-form">
    <h2>STUDENT LOGIN</h2>
      <input type="text" name='username' onChange={(e)=>this.handlechange(e)}  placeholder="username"/>
      <input type="password" name="password" onChange={(e)=>this.handlechange(e)} placeholder="password"/>
      <button type="submit">login</button>
      <div className='registerbutton'>
      <button onClick={() => this.register()}>CREATE ACCOUNT</button>
      </div>
     
    </form>
  </div>
</div>
<ToastContainer />
          </>
      )
    




    
   }
}






}
export default LOGINFORMSTUDENT