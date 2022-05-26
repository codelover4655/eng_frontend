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
        
  
      </ul>
  
      )
    }
  }


  class ATTENDANCESHEET extends React.Component {
  
    constructor(props) {
        super(props);
        this.state = {
            isdataup:'false',
            student_list:[],

        }
    }

   async callfordata()
    {
        
      const token = localStorage.getItem("tokenadmin");
     const data={
     userid:localStorage.getItem('adminname'),
     token:localStorage.getItem('tokenadmin'),
     };
const response = await fetch('http://127.0.0.1:8000/student/attendancesheet',{
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



    render(){
   
        if(this.state.isdataup=='false'){
            this.callfordata();

        }
        if(this.state.isdataup=='yes')
        {
    
          var student_list=this.state.student_list;
          let counter=1;
          let y1='PRESENT';
          let y2='NOT MARKED YET';
          var List=student_list.map(element=>
            {
              
             
    
               return(

                <table className="table-attende">
                <tr className="table-attende">
                  <th className="table-attende">{element.first_name}</th>
                  <th className="table-attende">{element.email}</th>
                  <th className="table-attende">{element.present==true?y1:y2}</th>
                </tr>
              </table>

               );

             }
    
        
        );
    
    
        }
        
        return (
            <>
            <Dashboard />
            <h1 className="headingsheet">ATTENDANCE SHEET</h1>
            <div >
            <h2 className="h1sheet">FIRST NAME</h2>
            <h2 className="h2sheet">EMAIL</h2>
            <h2 className="h3sheet">STATUS</h2>
        
            </div>
            {List}
            <ToastContainer />


            </>
        )
    }
  }

  export default ATTENDANCESHEET