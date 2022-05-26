import React from 'react';
import ReactDOM from 'react-dom'
import { useNavigate } from "react-router-dom";
import "./login.css";
import "./index.css";
import WebcamCapture from './webcamcapture';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


class Dashboard extends React.Component {

  render() {
    return (
      <ul className='uldashboard'>
      <li className='lidashboard'><a href="/ADMINPORTAL">Home</a></li>
      <li className='lidashboard'><a href="news.asp">News</a></li>
      <li className='lidashboard'><a href="contact.asp">Contact</a></li>
      <li className='lidashboard'><a href="about.asp">hello {localStorage.getItem('adminname')}</a></li>
      <li className='lidashboard1'><button  className=".atbutton1" onClick={()=>this.props.onClick()}>LOGOUT</button></li>
    </ul>

    )
  }
}

class Studentlist extends React.Component {
  
constructor(props) {
  super(props);
  this.state={
  
    isdataup:'no',
    student_list:[],
  };

}

async requestdata()
{

const token = localStorage.getItem("tokenadmin");
  const data={
 userid:localStorage.getItem('adminname'),

};
const response = await fetch('http://127.0.0.1:8000/student/list',{
    method: "POST",
    headers: {
       'Content-Type': 'application/json',
        'Authorization': `bearer ${token}`
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
       var ar=[];
        ar[0]=data;
        var yoyo=Array.isArray(data)===false?ar:data
        this.setState({student_list: yoyo, isdataup:'yes'});

       
     });

}





}




  render() {

    if(this.state.isdataup=='no')
    {
      this.requestdata();
    }

    if(this.state.isdataup=='yes')
    {

      var student_list=this.state.student_list;
      var List=student_list.map(element=>{
   
        return(  
          <ul className='ulstudent'>
          <li className='ulstudent'> <h2> {element.first_name}</h2></li>
          <li className='ulstudent'><h2>  {element.username} </h2></li>
          <li className='ulstudent'> <h2> {element.email} </h2></li>
          <li className='ulstudent'> <h2> USER PROFILE </h2></li> 
        </ul>
   
        );

    });


    }


    return (
      <>
      <div className='ulstudentmain'>
       <ul className='ulstudent'>
       <li className='ulstudent'> <h2>FIRST NAME </h2></li>
       <li className='ulstudent'><h2> USERNAME </h2></li>
       <li className='ulstudent'> <h2>EMAIL ID </h2></li>
       <li className='ulstudent'> <h2> USER PROFILE </h2></li> 
       </ul>
       <div>
        {List}
       </div>
       </div>
       </>
     


    )
  }
}



class ADMINPORTAL extends React.Component{


    constructor(props) {
        super(props);
      this.state={
        style1:'atbutton1',
        
      }
       
      }
     
      async logout()
      {

        var token=localStorage.getItem('tokenadmin');
  
        const logout=await fetch('http://127.0.0.1:8000/authapp/logout/',{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                 'Authorization': `bearer ${token}`
                // 'Content-Type': 'application/x-www-form-urlencoded',
              },
    
        });
        localStorage.removeItem("tokenadmin");
        localStorage.removeItem("adminname");
        toast("LOGOUT SUCCESSFUL");
        window.location = "/";


      }
     async handleattendance()
      {

        const token = localStorage.getItem("tokenadmin");
      const data={
      token:localStorage.getItem('tokenadmin'),
     };
    const response = await fetch('http://127.0.0.1:8000/student/attendance_activation',{
    method: "POST",
    headers: {
       'Content-Type': 'application/json',
        'Authorization': `bearer ${token}`
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
    toast("ATTENDANCE PROCESS HAS STARTED ");
    this.setState({style1:'atbutton'})
       console.log(data);
      
     });

}








      }

    async checksheat()
      {

        window.location = "/ATTENDANCESHEET";

      }



      render() {
        return (
          <>
          <Dashboard onClick={()=>this.logout()}/>
          <button onClick={()=>this.handleattendance()} className="takeattendance"> <h2> TAKE ATTENDANCE</h2></button>
         <button className={this.state.style1} onClick={() =>this.checksheat()}>ATTENDANCE SHEET</button>
          <div>
          <Studentlist/>
          <ToastContainer />

          </div>
          </>
        )
      }




}



export default ADMINPORTAL