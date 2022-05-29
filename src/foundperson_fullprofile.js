import React from 'react';
import ReactDOM from 'react-dom'
import { useNavigate } from "react-router-dom";
import "./login.css";
import WebcamCapture from './webcamcapture';
import Profilecard  from "./profilecards"
import "./index.css";
import { useParams } from "react-router-dom";



function Giveid1(){
  let  param=useParams();
return < FullProfile_FoundPerson id={param.id}/>
}


class Searchinggif extends React.Component {

  render()
  {
    return(
      <>
 
      <h2>As soon as we found a match we will display here.</h2>
      <div className="picc">
        <img src="https://media4.giphy.com/media/42wQXwITfQbDGKqUP7/giphy.gif" style={{ width:"300px",height:"300px"}}/>
        
        </div>
      </>
    );

  }
}

class FullProfile_FoundPerson extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
          isdataup:'no',
          data:{},
          matchingprofiles:[],
          matchdone:'no',
          foundmatch:'no',
      }
  }

  async callfordata()
  {
    var token = localStorage.getItem("token");
    const data={
        userid:this.props.id,
       };
       const response = await fetch('http://127.0.0.1:8000/Found/person_details',{
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
              this.setState({data:data,isdataup:'yes'});
           
            });
       
       }






  }

  async matchmissingface(id)
  {
    const token = localStorage.getItem("token");
   
    const data={
      Foundfaceid:id,
  };
  const response = await fetch("http://127.0.0.1:8000/mycomplain/matchfoundedface",{
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
    console.log("hogya");
   const yoyo=response.json();
   // yet not response is extrected properly
   yoyo.then((data) => {
       console.log(data);
       var ar=[];
        ar[0]=data;
        var yoyo=Array.isArray(data)===false?ar:data

        if(data.length==0)
        {
          console.log('yessss');
          this.setState({matchingprofiles: yoyo, matchdone:'yes'});
          
        }
        else
        {
          console.log('yessss');
        this.setState({foundmatch:'yes',matchingprofiles: yoyo, matchdone:'yes'});
        }

       
     });

}






  }


  render()
  {


    if(this.state.isdataup=='no')
    {
        this.callfordata();
    }

    if(this.state.matchdone=='no'&&this.state.isdataup=='yes')
    {
      this.matchmissingface(this.state.data.id);
      


    }
   
    if(this.state.matchdone=='yes')
    {

      console.log(this.state.matchingprofiles)
      var list=this.state.matchingprofiles
      var List=list.map(element=>{
        return(  
         
            <Profilecard obj={element} type="MISSING"/>
        );

    });
    

    }

      return (
            

   
<>
            <div class="card1">
  <img src={this.state.data.photo} alt="John" style={{ width:"300px",height:"300px"}} />
<div>
<h3 className="data1">Name: {this.state.data.name}</h3>   <h3 className="data1"> Age: {this.state.data.age}</h3>
<h3 className="data1">FatherName: {this.state.data.father}</h3>   <h3 className="data1">MotherName: {this.state.data.mother}</h3>
<h3 className="data1">Gender: {this.state.data.gender}</h3>
 <h2 className="data1">Last seen Address : {this.state.data.address} </h2> 
<h3 className="data1">Contact Number: {this.state.data.contact_no}</h3>  <h3 className="data1">Contact Email : {this.state.data.email}</h3>
</div>
</div>

<div className="detective">
<h2>Some Missing People Profiles Regarding The Person You Found</h2>
<div className="detectivepro">
{this.state.foundmatch=='yes'?List:<Searchinggif/>}
</div>
</div>


</>





      );

  }







}


export  default Giveid1