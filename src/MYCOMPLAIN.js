import React from 'react';
import ReactDOM from 'react-dom'
import Profilecard  from "./profilecards"
import Profilstatuscard from "./profilestatuscard"
import { useNavigate } from "react-router-dom";
import "./login.css";
import "./index.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




class MyComplaint extends React.Component {

    constructor(props) {
        super(props);
        this.state={
            missingdata:'no',
            founddata:'no',
            data_missing:[],
            data_found:[],
        };

    }
  async callformissingdata()
  {
    const token = localStorage.getItem("token");
    const data={
        token:localStorage.getItem('token'),
    };
    const response = await fetch("http://127.0.0.1:8000/mycomplain/missing",{
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
    toast("Session Expired Please Login Again and logout fom current session");
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
       this.setState({data_missing: yoyo, missingdata:'yes'});
     });

}

  }

  async callforfounddata()
  {
    const token = localStorage.getItem("token");
    const data={
        token:localStorage.getItem('token'),
    };
    const response = await fetch("http://127.0.0.1:8000/mycomplain/found",{
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
  toast("Session Expired Please Login Again and logout fom current session");
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
       this.setState({data_found: yoyo, founddata:'yes'});
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
       
     });

}






  }




    
    render()
    {
        if(this.state.missingdata=='no')
        {
            this.callformissingdata();

        }
        if(this.state.founddata=='no')
        {
            this.callforfounddata();
        }
        if(this.state.missingdata=='yes')
        {
            

            var list=this.state.data_missing;
            console.log(list);
            var List=list.map(element=>{
              return(  
               
                  <Profilstatuscard  obj={element} type="MISSING"/>
              );
      
          });
        }
        if(this.state.founddata=='yes')
        {
            console.log("testing");

            var list=this.state.data_found;
            console.log(list);
            var List1=list.map(element=>{
              return(  
                   <div>
                  <Profilstatuscard  obj={element} type="FOUND" />
                  </div>
              );
      
          });
        }
        return(
            <>
          <div className="margin-class">
            <div className="MYMISSING">
            <h2>Missing complains</h2>
            <div className="mycomplain-found">
              {List}
              </div>
            </div>
            <div class="MYFOUND">
            <h2> Found Complains</h2>
            <div className="mycomplain-found">
             {List1}
             </div>
            </div>
            </div>
            <ToastContainer/>
            </>
        );

    }
}




export default MyComplaint