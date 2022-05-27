import React from 'react';
import ReactDOM from 'react-dom'
import { useNavigate } from "react-router-dom";
import "./login.css";
import WebcamCapture from './webcamcapture';
import "./index.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




class Profilstatuscard extends React.Component  {


    fulldetails(type)
    { 
      if(type=="MISSING")
      {
      window.location=`/fullprofile_missing/${this.props.obj.id}`
      }
      else
      {
        window.location=`/fullprofile_foundperson/${this.props.obj.id}`
      }
    }
   async delete(id,type)
   {
     alert("are you sure");
     if(type=="MISSING")
     {
      const token = localStorage.getItem("token");
   
      const data={
        id:id,
    };
    const response = await fetch("http://127.0.0.1:8000/mycomplain/delete_missing_complain",{
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
    toast("profile delete sucessfully");
   const yoyo=response.json();
   // yet not response is extrected properly
   yoyo.then((data) => {
       console.log(data);
       window.location = "/MYCOMPLAIN"
     });

}



     }
     else
     {
      const token = localStorage.getItem("token");
   
      const data={
        id:id,
    };
    const response = await fetch("http://127.0.0.1:8000/mycomplain/delete_found_complain",{
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
    toast("profile delete sucessfully");
   const yoyo=response.json();
   // yet not response is extrected properly
   yoyo.then((data) => {
       console.log(data);
       window.location = "/MYCOMPLAIN"
     });

}

     }
   }
    render(){
        return (
<>
            <div class="card34">
  <img src={this.props.obj.photo} alt="John" style={{ width:"100%",height:"250px"}} />
  <h3>{this.props.obj.name}</h3>
<p>Age : {this.props.obj.age}</p>
<p> Contact: {this.props.obj.contact_no}</p>

  <button onClick={()=>this.fulldetails(this.props.type)}>Check status</button>
  
  <button onClick={()=>this.delete(this.props.obj.id,this.props.type)}>Delete Complain</button>
  

</div>
<ToastContainer/>
</>
        );
    }







}


export default Profilstatuscard

