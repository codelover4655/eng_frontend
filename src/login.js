import React from 'react';
import ReactDOM from 'react-dom'
import { useNavigate } from "react-router-dom";
import "./login.css";
import WebcamCapture from './webcamcapture';




function blobToFile(theBlob, fileName){
    //A Blob() is almost a File() - it's just missing the two properties below which we will add
    theBlob.lastModifiedDate = new Date();
    theBlob.name = fileName;
    return theBlob;
}

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
    const yoyo=response.json();
    yoyo.then((data) => {
        console.log(data);
        alert(data.username);
        for(var i=0;i<data.length;i++)
        {
            alert(data[i].value);
            console.log(data[i].value);
        }
        //localStorage.setItem('userid',data.id);
       // window.location = "/Mappage";
      });

    
}
else
{
   const yoyo=response.json();
   // yet not response is extrected properly
   yoyo.then((data) => {
       console.log(data);
       localStorage.setItem('token',data.Token);
       //localStorage.setItem('userid',data.id);
      // window.location = "/Mappage";
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
    alert(response.errors);
    alert("you can google the respone code :"+response.status);
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
render()
{
    
    localStorage.setItem('blob','notset');
   if(this.state.register=='true')
   { 
     return(
         <>
           <form  onSubmit={(e)=>this.handleregistersubmit(e)} >
               <div className='contentobj'>
                <h2 style={{backgroundColor:"white"}}>username:
                <input type="text" placeholder="username" name="username" style={{margin:"8px"}} required onChange={(e)=>this.handlechange(e)}/><br></br></h2>
                </div>
                <div className='contentobj'>
                <h2 style={{backgroundColor:"white"}}>password:
                <input type="password" placeholder="password"  required  name="password" onChange={(e)=>this.handlechange(e)} style={{margin:"8px"}} /><br></br></h2>
                </div>
                <div className='contentobj'>
                <h2 style={{backgroundColor:"white"}}>email:
                <input type="email" placeholder="email" name="email" style={{margin:"8px"}}   required onChange={(e)=>this.handlechange(e)}/><br></br></h2>
                </div>
                <div className='contentobj'>
                <h2 style={{backgroundColor:"white"}}>First name: <input type="text"  style={{margin:"8px"}} name="first_name" placeholder="firstname"  required onChange={(e)=>this.handlechange(e)}/><br></br>
                </h2>
                </div>
                <div className='contentobj'>
                <h2 style={{backgroundColor:"white"}}>Rollnumber: <input type="number"  style={{margin:"8px"}} name="rollnumber"   required onChange={(e)=>this.handlechange(e)}/><br></br>
                </h2>
                </div>
                <WebcamCapture/>
                <input type="submit"/>

           </form>
          <button onClick={() =>this.logg()}>Already a member</button>
          </>
     )
  
   }
   else
   {
     
      // login form

      return (
           <>
            
            <div className="login-page">
  <div className="form"  onSubmit={(e)=> this.handleloginsubmit(e)}>
    <form className="login-form">
    <h2>ADMIN PORTAL</h2>
      <input type="text" name='username' onChange={(e)=>this.handlechange(e)}  placeholder="username"/>
      <input type="password" name="password" onChange={(e)=>this.handlechange(e)} placeholder="password"/>
      <button type="submit">login</button>
     
    </form>
  </div>
</div>
          </>
      )
    




    
   }
}






}


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
    
    alert(response.errors);
    alert("you can google the respone code :"+response.status);
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

    render(){
        return (
            <>

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
</>
        )
    }


}






class LOGIN extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        username:'',
        password:'',
        student_portal:'False',
        teacher_portal:'False',
        }
    }
    movetostudentporatl()
    {
        this.setState({student_portal:'true', teacher_portal:'False'});
    }
    movetoteacherporatl()
    {
        this.setState({teacher_portal:'true',student_portal:'False'});
    }
    render(){
      
        if(this.state.student_portal=='False'&&this.state.teacher_portal=='False')
        {
            return(
            <>
                <div>
                    <button onClick={() => this.movetostudentporatl()}>STUDENT PORTAL</button>
                    <button onClick={() => this.movetoteacherporatl()}>TEACHER PORTAL</button>
                </div>
            </>
            )
        }
        else if(this.state.student_portal=='true')
        {
           return(
            <LOGINFORMSTUDENT/>   
           )
        }
        else
        {
            return(
                  <LOGINTUTOR/>
            )
        }
    }
}


export default LOGIN

