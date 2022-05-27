import React from 'react';
import ReactDOM from 'react-dom'
import { useNavigate } from "react-router-dom";
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
const MAPBOX_TOKEN  = 'pk.eyJ1IjoiY29kZWxvdmVyNDY1NSIsImEiOiJja3l3dXZ1bmswYzY4MnFxaWZuMzB6bzJ2In0.fc8OZYG7p6jsuXHo5domPA'


const Mappopup = (props) => {
   
    const [viewport, setViewport] = useState({
      latitude: 26.9124,
      longitude:75.7873,
      zoom: 8
    });

    const mapRef = useRef();
    const handleViewportChange = useCallback(
      (newViewport) => setViewport(newViewport),
      []
  
    
    );
    
    
  
    // if you are happy with Geocoder default settings, you can just use handleViewportChange directly
    const handleGeocoderViewportChange = useCallback(
      (newViewport) => {
        const geocoderDefaultOverrides = { transitionDuration: 1000 };
  
        return handleViewportChange({
          ...newViewport,
          ...geocoderDefaultOverrides
        });
      },
  
      [handleViewportChange]
    );
  
    return (
      
      <>
      
      <div style={{ height: "50vh",width: "50vh" }}>

        <MapGL
          ref={mapRef} 
          {...viewport}
          width="100%"
          height="100%"
        
          mapStyle="mapbox://styles/codelover4655/ckyykqauo000j14qo4cpkinbu"
          onViewportChange={handleViewportChange}
          mapboxApiAccessToken={MAPBOX_TOKEN}
        >
          <Geocoder
            mapRef={mapRef}
            onViewportChange={handleGeocoderViewportChange}
            mapboxApiAccessToken={MAPBOX_TOKEN}
            position="top-left"
          />
        </MapGL>
      </div>
      <button type="button" style={{display: 'flex'}} onClick={() => props.onclick(viewport)} >SUBMIT TO FINALIZE LOCATION</button>
      </>
    
  
    );
  };




class Missingcomplain extends React.Component {
 
    constructor(props) {
        super(props);
        this.state = {
            name:'',
            photo:null,
            latitude:'',
            longitude:'',
            father:'',
            mother:'',
            age:'',
            gender:'Male',
            contact_no:'',
            email:'',
            token:'edbe344d37e44f0d70a5bb0fd06f071782a4b024',
            address:'',
        }
    }
    handlechange(e){
        let  feild=e.target.name;
        let  value=e.target.value;
         this.setState({
             [feild]:value,
         });
     }
    
     async match(id)
     {

console.log("doone");



     }



async match(id)
{

  
 
    const data={id:id};

    const response = await fetch("http://127.0.0.1:8000/testing",{
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
    const yoyo=response.json();
    yoyo.then((data) => {

        console.log(data);

      });
    

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











    async handleregistersubmit(e)
     {
         console.log('yoyo');
         const token = localStorage.getItem("token");
         toast("Please wait For a while we are evaluating your Application");
    e.preventDefault();
         let form_data = new FormData();
         form_data.append('photo', this.state.photo,this.state.photo.name);
         form_data.append('name', this.state.name);
         form_data.append('father',this.state.father);
         form_data.append('mother',this.state.mother);
         form_data.append('email',this.state.email);
         form_data.append('contact_no',this.state.contact_no);
         form_data.append('age',this.state.age);
         form_data.append('gender',this.state.gender);
         form_data.append('latitude',this.state.latitude);
         form_data.append('longitude',this.state.longitude);
         form_data.append('token',localStorage.getItem('token'));
         form_data.append('address',this.state.address);
         form_data.append('photo1',this.state.photo,this.state.photo.name);

         const response = await fetch("http://127.0.0.1:8000/Missingperson/report",{
             method: "POST",
             headers: {
                // 'Content-Type':"multipart/form-data",
                'Authorization': `bearer ${token}`,
              },
              mode: 'cors',
              body: form_data
                
         });
      
         if(!response.ok)
         {
             if(response.status==400)
             {
               toast("Please Upload Clear picture");
               const yoyo=response.json();
               // yet not response is extrected properly
               yoyo.then((data) => {
                   console.log(data);
                  
                 });
            
             }
             if(response.status==401)
             {
               toast("add +91 as prefix of your contact number");
               const yoyo=response.json();
               // yet not response is extrected properly
               yoyo.then((data) => {
                   console.log(data);
                  

                 });
            
               
             }
         }
         else
         { 

           alert("As soon as we Found someone matching your missing person we will notify you on your email");
           alert("Please check status of your complain regulary at my complain section");
           toast("Application Submited");
             console.log("hogya");
            const yoyo=response.json();
            // yet not response is extrected properly
            yoyo.then((data) => {
              console.log(data);

              window.location = "/MYCOMPLAIN"
            });


           
         
         }
         



     }
    handleImageChange(e)
    {
       this.setState({
           photo: e.target.files[0]
       });
    }
    async fetchlocation(latitude,longitude)
    {
        let add= await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=pk.eyJ1IjoiY29kZWxvdmVyNDY1NSIsImEiOiJja3l3dXZ1bmswYzY4MnFxaWZuMzB6bzJ2In0.fc8OZYG7p6jsuXHo5domPA
        `);
        if(!add.ok)
        {
            alert("pleas select some location and click submit button ");
            alert(add.status);
        }
        else
        {
         
       const yoyo=add.json();
    yoyo.then((data) => {
           
           toast("you have selected  location "+data.features[0].place_name);
           this.setState({address:data.features[0].place_name});

     
      });
        }

    }  
     handlelocation(view){
         console.log("hello");
        this.fetchlocation(view.latitude,view.longitude);
        this.setState({
            latitude:view.latitude,
            longitude:view.longitude,
            
        });
    }
    login()
    {
        window.location = "/Loginpage"
    }
    register()
    {
        window.location = "/RegisterPage"
    }
    mycomplain()
    {
        window.location = "/MYCOMPLAIN"
    }



    render() {
      if(localStorage.getItem('token')==null)
      {

        toast("Please Login/Register First to File a complain");
        
        return(
                    
                    <div className="dialog">
                      <button className="atbutton" onClick={()=>this.login()}>Login</button>
                      <button className="atbutton" onClick={()=>this.register()}>Register</button>
                    </div>
        );

        
      }
        return (
            <>
                <div>
                <div className="login-page">
  <div className="form"  onSubmit={(e)=> this.handleregistersubmit(e)}>
    <form className="login-form">
    <h2>Missing Person Details</h2>
      <input type="text" required name='name' onChange={(e)=>this.handlechange(e)}  placeholder="Name"/>
      <input type="text" required name='father' onChange={(e)=>this.handlechange(e)}  placeholder="FatherName"/>
      <input type="text" required name='mother' onChange={(e)=>this.handlechange(e)}  placeholder="  MotherName"/>
      <label for="phone">Enter a phone number:</label>
      <input type="tel" id="phone" name="contact_no" onChange={(e)=>this.handlechange(e)}   placeholder="[countrycode(+91)then space then contact_no ]"  required/><br/><br/>
  
      <input type="number" required  name='age' onChange={(e)=>this.handlechange(e)}  placeholder="Age"/>
      <input type="email"  required name='email' onChange={(e)=>this.handlechange(e)}  placeholder="Your Contact Email"/>
             <p>Gender : <select name="gender"  onChange={(e)=>this.handlechange(e)}  >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select></p>
      
      <input type="file" name="photo" required  style={{margin:"8px"}}
                   accept="image/png, image/jpeg,image/jpg"    onChange={(e)=>this.handleImageChange(e)}/>
      <p>Select last seen location:</p>
      <Mappopup onclick={(view)=>this.handlelocation(view)}/>
      <div className="registerbutton">
      <button type="submit">SUBMIT</button>
     </div>
    </form>
  </div>
  </div>
                </div>
                <ToastContainer/>
            </>
        )
    }




}

export default Missingcomplain
