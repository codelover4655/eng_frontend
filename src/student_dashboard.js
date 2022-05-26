import React from 'react';
import ReactDOM from 'react-dom'
import { useNavigate } from "react-router-dom";
import "./login.css";
import "./index.css";
import WebcamCapture from './webcamcapture';


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

 const KEY = "96aa79f0f2be4acca4208632a8e201ee"
 const ENDPOINT = "https://engage4655.cognitiveservices.azure.com"
const fix1=`/face/v1.0/detect?overload=stream&returnFaceAttributes=age,gender,headPose,smile,facialHair,glasses,emotion,hair,makeup,occlusion,accessories,blur,exposure,noise&recognitionModel=recognition_01&returnRecognitionModel=True&detectionModel=detection_01
`
function _base64ToArrayBuffer(base64) {
  var atob = require('atob');
  var bin = atob(base64);
  return bin;
 
}


class Dashboard extends React.Component {

    render() {
      return (
        <ul className='uldashboard'>
        <li className='lidashboard'><a href="default.asp">Home</a></li>
        <li className='lidashboard'><a href="news.asp">News</a></li>
        <li className='lidashboard'><a href="contact.asp">Contact</a></li>
        <li className='lidashboard'><a href="about.asp">hello {localStorage.getItem('adminname')}</a></li>
        <li className='lidashboard1'><button onClick={()=>this.props.onClick()}>LOGOUT</button></li>
      </ul>
  
      )
    }
  }
  
class Nothing extends React.Component{
  render(){

    return (
      <></>
    )

  }
}

class StudentDashboard extends React.Component {


    constructor(props) {
        super(props);
        this.state={
            username:'',
            email:'',
            first_name:'',
            photo:'',
            roll:'',
            can_mark_attendance_now:'',
            isdataup:'false',
            markattendance:'false',
            btnstate:'atbutton1',
            faceid1:'',
            faceid2:'',

        }
    }

    
   notify()
    { 
     toast(" ADMIN HAS NOT YET STARTED TAKING ATTENDANCE");
    }
   notifysucess()
   { 
     toast(" Please allow camera acces to mark your attendance");
   }

    markattendance()
    {

      if(this.state.can_mark_attendance_now=='False')
      {
        this.notify();
        
      }
       else
         
       {
        this.notifysucess();
        this.setState({markattendance:'true',btnstate:'atbutton'});

       }








    }










     async callfordata()
     {
      

        
const token = localStorage.getItem("token");
const data={
token:localStorage.getItem('token'),

};
const response = await fetch('http://127.0.0.1:8000/student/dashboard',{
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
    toast(data.data);
    alert(response.errors);
    alert("you can google the respone code :"+response.status);
}
else
{
   const yoyo=response.json();
   // yet not response is extrected properly
   yoyo.then((data) => {
       console.log(data);
      
       
     });

}






     }

     async matchimage()
     {
        
      






     }
     
     async sendimage1()
     {

      const data={

        url:"https://res.cloudinary.com/my-tutor/image/upload/v1652696368/media/images/temp_ipomhg.jpg",
        
        };
const response = await fetch('https://engage4655.cognitiveservices.azure.com/face/v1.0/detect?overload=stream&returnFaceAttributes=age,gender,headPose,smile,facialHair,glasses,emotion,hair,makeup,occlusion,accessories,blur,exposure,noise&recognitionModel=recognition_01&returnRecognitionModel=True&detectionModel=detection_01',{
          method: "POST",
          headers: {

             'Content-Type': 'application/json',
             "Ocp-Apim-Subscription-Key":"96aa79f0f2be4acca4208632a8e201ee"
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
      
       
     });

}




     }

    async sendimage()
    {
        
      
      if(localStorage.getItem('blob')=='notset')
      {
        toast("please capture your image");
      }
     else
     {
        
     
           
const token = localStorage.getItem("token");
const data={
token:localStorage.getItem('token'),
photo:localStorage.getItem('blob'),

};
const response = await fetch('http://127.0.0.1:8000/student/verifyimage',{
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
    console.log('yoyo');
  const yoyo=response.json();
   // yet not response is extrected properly
   yoyo.then((data) => {
       console.log(data); 
       toast(data['happy']);
     });
  
   
}
else
{
   const yoyo=response.json();
   // yet not response is extrected properly
   yoyo.then((data) => {
       console.log(data); 
       toast(data['happy']);
     });

}







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
        localStorage.removeItem("token");
        localStorage.removeItem("blob");
        toast("LOGOUT SUCCESSFUL");
        window.location = "/";


     }

    render()
     {

      localStorage.setItem('blob','notset');
    if(this.state.isdataup=='false')
    {
          this.callfordata();
    }

 


        return(
           <>
            <Dashboard onClick={()=>this.logout()}/>
            <div>
            <button className="atbutton" onClick={()=>this.markattendance()}> MARK ATTENDANCE</button>
            <ToastContainer />
            {this.state.markattendance=='true'?<WebcamCapture/>:<Nothing/>}
            <button className={this.state.btnstate} onClick={()=>this.sendimage()}>SUBMIT IMAGE</button>
            </div>
            </>
        )
    }





}


export default StudentDashboard 



