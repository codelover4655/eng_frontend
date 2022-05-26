import React from 'react';
import ReactDOM from 'react-dom'
import { useNavigate } from "react-router-dom";
import "./login.css";
import WebcamCapture from './webcamcapture';
import Profilecard  from "./profilecards"
import "./index.css";
import { useParams } from "react-router-dom";



function Giveid3(){
  let  param=useParams();
return < Profile id={param.id}/>
}




class Profile extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
          isdataup:'no',
          data:{},
          matchingprofiles:[],
          matchdone:'no',
      }
  }

  async callfordata()
  {

    const data={
        userid:this.props.id,
       };
       const response = await fetch('http://127.0.0.1:8000/Missing/person_details',{
           method: "POST",
           headers: {
              'Content-Type': 'application/json',
       
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
              this.setState({data:data,isdataup:'yes'});
           
            });
       
       }






  }




  render()
  {


    if(this.state.isdataup=='no')
    {
        this.callfordata();
    }

 

      return (
            

   
<>
            <div class="card3">

     <div className="card3-card">     
  <img src={this.state.data.photo} alt="John" style={{ width:"300px",height:"300px"}} />
<h3 className="data1">Name: {this.state.data.name}</h3>   <h3 className="data1"> Age: {this.state.data.age}</h3>
<h3 className="data1">FatherName: {this.state.data.father}</h3>   <h3 className="data1">MotherName: {this.state.data.mother}</h3>
<h3 className="data1">Gender: {this.state.data.gender}</h3>
 <h3 className="data1">Last seen Address : {this.state.data.address} </h3> 
<h3 className="data1">Contact Number: {this.state.data.contact_no}</h3>  <h3 className="data1">Contact Email : {this.state.data.email}</h3>
</div>
</div>

</>





      );

  }







}


export  default Giveid3