import React from 'react';
import ReactDOM from 'react-dom'
import { useNavigate } from "react-router-dom";
import Profilecard  from "./profilecards"
import "./login.css";
import  { useState, useRef, useCallback } from 'react'
import WebcamCapture from './webcamcapture';
import "./index.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css'
import mapboxgl from 'mapbox-gl';
import MapGL from "react-map-gl";
import Geocoder from "react-map-gl-geocoder";
import { Link ,Outlet} from "react-router-dom";
import Fuse from 'fuse.js';
const MAPBOX_TOKEN  = 'pk.eyJ1IjoiY29kZWxvdmVyNDY1NSIsImEiOiJja3l3dXZ1bmswYzY4MnFxaWZuMzB6bzJ2In0.fc8OZYG7p6jsuXHo5domPA'


class MissingPersonList extends React.Component {
    constructor(props) {

        super(props);
        this.state = {
            isdataup:'no',
            data:[],
            forsearch:'no',
            query:'',
            data1:[],
        };

    }
    async calldata()
    {

        const response = await fetch('http://127.0.0.1:8000/Missingperson/list',{
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
        this.setState({data: yoyo, isdataup:'yes',data1:yoyo});

     });

}



    }
    searchItem(query)
    {
     
        if (query!='') {
             
         
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
          else 
          {
              console.log("hogya");
              var data1=this.state.data1;
              this.setState({data:data1,forsearch:'yes'});
          }

    }
    search(val)
    {
       this.setState({query:val});
    }
    render() {
        if(this.state.isdataup=='no')
        {
           this.calldata();

        }
        if(this.state.isdataup=='yes'||this.state.forsearch=='yes')
    {
                    
      var list=this.state.data;
      var List=list.map(element=>{
        return(  
         
            <Profilecard obj={element} type="MISSING"/>
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
<h2 className="missinglisth2">LIST OF Reported Missing People </h2>

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


export default MissingPersonList