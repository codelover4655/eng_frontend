import React from 'react';
import ReactDOM from 'react-dom'
import { useNavigate } from "react-router-dom";
import Profilecard  from "./profilecards"
import "./login.css";
import WebcamCapture from './webcamcapture';
import "./index.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Fuse from 'fuse.js';


class FoundPersonList extends React.Component {
    constructor(props) {

        super(props);
        this.state = {
            isdataup:'no',
            data:[],
        };

    }
    async calldata()
    {

        const response = await fetch('http://127.0.0.1:8000/Foundperson/list',{
    method: "GET",
    headers: {
       'Content-Type': 'application/json',
      
       // 'Content-Type': 'application/x-www-form-urlencoded',
     },
     mode: 'cors',
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
        this.setState({data: yoyo, isdataup:'yes'});

     });

}



    }
    searchItem(query)
    {
        if (query) {
             
            query = query.toLowerCase();
            var data1=this.state.data;
            const fuse = new Fuse(data1, { 
                keys: ["name", "father","age","mother"]    
           });    
           const result = fuse.search(query);
      console.log(result);
           var res1=[];
           for(var itr=0;itr<result.length;itr++) {
                   res1.push(result[itr].item);
           }
           this.setState({data: res1,forsearch:'yes'});
           
            
          }

    }

    render() {
        if(this.state.isdataup=='no')
        {
           this.calldata();

        }
        if(this.state.isdataup=='yes')
    {

      var list=this.state.data;
      var List=list.map(element=>{
        return(  
         
            <Profilecard obj={element} type="FOUND"/>
   
        );

    });
        return(
              <>
                        <div className="searchbar">
           <h3>SEARCH BY PERSONS NAME/ PARENTS NAME/ AGE</h3>
            <input
          type="search"
          onChange={(e) => this.searchItem(e.target.value)}
          placeholder="Search Here.."
        />
        </div>
        <h2 className="missinglisth2">LIST OF Reported Found People </h2>

              <div className="margin-class">
           
            <div className="missinglist">
                {List}
            </div>
            </div>
            </>
        );
    }
}

}


export default FoundPersonList