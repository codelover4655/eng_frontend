import React from 'react';
import ReactDOM from 'react-dom'
import { useNavigate } from "react-router-dom";
import "./login.css";
import WebcamCapture from './webcamcapture';
import "./index.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




class Navigation_bar extends React.Component {

    constructor(props) {
        super(props);
        this.state = 
        { 
           style1:'lidashboard',
           style2:'lidashboard',
           style3:'lidashboard',
           style4:'lidashboard',
           style5:'lidashboard',
           style6:'lidashboard',
    }

}
    home()
    {
   
        window.location="/"
    }
    missingcomplain()
{
    window.location = "/Missingcomplain"
}
foundperson()
{
    window.location = "/Foundcomplain"
}
missingpersonslist()
{
    window.location = "/MissingList"
}

foundpersonslist()
{
    window.location = "/FoundList"
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
async logout()
{


 var token=localStorage.getItem('token');

   const logout=await fetch('http://127.0.0.1:8000/authapp/logout/',{
       method: 'GET',
       headers: {
           'Content-Type': 'application/json',
            'Authorization': `bearer ${token}`
           // 'Content-Type': 'application/x-www-form-urlencoded',
         },

   });
   localStorage.removeItem("token");
  localStorage.removeItem("name");
   toast("LOGOUT SUCCESSFUL");
   window.location = "/";


}
mycomplain()
{
    window.location = "/MYCOMPLAIN"
}

        render() {

             if(window.location.href=="http://localhost:3000/"&&this.state.style1=='lidashboard')
             {
                this.setState({style1:'lidashboard2',
                 style2:'lidashboard',
                 style3:'lidashboard',
                 style4:'lidashboard',
                 style5:'lidashboard',
                });
             }
             if(window.location.href=="http://localhost:3000/MissingList"&&this.state.style2=='lidashboard')
             {
                 this.setState({style1:'lidashboard',
                 style2:'lidashboard2',
                 style3:'lidashboard',
                 style4:'lidashboard',
                 style5:'lidashboard',
                });
             }

             if(window.location.href=="http://localhost:3000/FoundList"&&this.state.style3=='lidashboard')
             {
                 this.setState({style1:'lidashboard',
                 style2:'lidashboard',
                 style3:'lidashboard2',
                 style4:'lidashboard',
                 style5:'lidashboard',
                });
             }

             if(window.location.href=="http://localhost:3000/Missingcomplain"&&this.state.style4=='lidashboard')
             {
                 this.setState({style1:'lidashboard',
                 style2:'lidashboard',
                 style3:'lidashboard',
                 style4:'lidashboard2',
                 style5:'lidashboard',
                });
             }

             if(window.location.href=="http://localhost:3000/Foundcomplain"&&this.state.style5=='lidashboard')
             {
                 this.setState({style1:'lidashboard',
                 style2:'lidashboard',
                 style3:'lidashboard',
                 style4:'lidashboard',
                 style5:'lidashboard2',
                });
             }
             if(window.location.href=="http://localhost:3000/MYCOMPLAIN"&&this.state.style6=='lidashboard')
             {
                 this.setState({style1:'lidashboard',
                 style2:'lidashboard',
                 style3:'lidashboard',
                 style4:'lidashboard',
                 style5:'lidashboard',
                 style6:'lidashboard2'
                });
             }
           if(localStorage.getItem('token')!=null)
           {
            return (
                <>
                <ul className='uldashboard' >
                <li className={this.state.style1} ><button onClick={() => this.home()}>Home</button></li>
                <li className={this.state.style2}><button onClick={() => this.missingpersonslist()}>Missing People List</button></li>
                <li className={this.state.style3}><button onClick={() => this.foundpersonslist()}>Found People List</button></li>
                <li className={this.state.style4}><button onClick={() => this. missingcomplain()}>Missing Complain</button></li>
                <li className={this.state.style5}><button onClick={() => this.foundperson()}>Found Complain</button></li>
                <li className={this.state.style6}><button onClick={() => this.mycomplain()}>My Complains</button></li>
                <li className='lidashboard5'> <button>Hello {localStorage.getItem('name')} </button> </li>
                <li className='lidashboard5' ><button onClick={() => this.logout()}>Logout </button></li>
              </ul>
              <ToastContainer />
              </>
          
              );  
    
           }

          return (
              <>
            <ul className='uldashboard' >
            <li className={this.state.style1} ><button onClick={() => this.home()}>Home</button></li>
            <li className={this.state.style2}><button onClick={() => this.missingpersonslist()}>Missing People List</button></li>
            <li className={this.state.style3}><button onClick={() => this.foundpersonslist()}>Found People List</button></li>
            <li className={this.state.style4}><button onClick={() => this. missingcomplain()}>Missing Complain</button></li>
            <li className={this.state.style5}><button onClick={() => this.foundperson()}>Found Complain</button></li>
            <li className='lidashboard1'><button onClick={() => this.login()}>Login</button></li>
            <li className='lidashboard1' ><button onClick={() => this.register()}>Register</button></li>
          </ul>
          <ToastContainer />
          </>
          );  

        }

      
      

}



export default Navigation_bar