
import React from 'react';
import ReactDOM from 'react-dom'
import { useNavigate } from "react-router-dom";
import './login.css';
import "./index.css";
import { Link ,Outlet} from "react-router-dom";
import GoogleLogin from 'react-google-login';
import Button from 'react-bootstrap/Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';





class GoogleSocialAuth extends React.Component {

     async handlelogin(accessToken,tokenId) {
        const data={'access_token': accessToken, 'id_token': tokenId};
       const response = await fetch("http://127.0.0.1:8000/authapp/social-login/google/",{
           method: "POST",
           headers: {
              'Content-Type': 'application/json'
              // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            mode: 'cors',
            body: JSON.stringify(data)
       });
       // response is a promise here 
       if(!response.ok)
       {
           toast("Please Try Login via username and password");
        const yoyo=response.json();
        // yet not response is extrected properly
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
              localStorage.setItem('token',data.key);

              //localStorage.setItem('userid',data.id);
              window.location = "/";
            });
      
       }
      
      
      
  
    }
  
      render() {
        const googleResponse = (response) => {
        console.log(response);
          console.log(response.accessToken);
          console.log(response.tokenId)
          this.handlelogin(response.accessToken,response.tokenId);
        }
        return (
          <div className="App">
            <GoogleLogin
              clientId='1069247781281-4ies7pb49nckgplk1okavrm8krm2a547.apps.googleusercontent.com'
              buttonText="LOGIN WITH GOOGLE"
              onSuccess={googleResponse }
              onFailure={googleResponse }
            />
            <ToastContainer/>
          </div>
        );
      }
    }
    

export default GoogleSocialAuth