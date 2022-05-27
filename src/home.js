import React from 'react';
import ReactDOM from 'react-dom'
import { useNavigate } from "react-router-dom";
import "./login.css";
import WebcamCapture from './webcamcapture';
import "./index.css";

import Faqq from "./faq";


class Homepage extends React.Component {
tutor()
{
    window.location = "/TutorLogin";
}
student()
{
    window.location = "/StudentLogin";
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

    render() {
        return(
            <>
            <div className="homedisplay">
            <div class="card23">
  <img src="https://advancelocal-adapter-image-uploads.s3.amazonaws.com/image.nj.com/home/njo-media/width2048/img/ledgerupdates_impact/photo/2018/08/06/24752076-standard.jpg" alt="John" style={{ width:"100%",height:"250px"}} />
  <h2>Missing People List</h2>
  <p>
      In This section you can find 
      list of people whose missing complains
      have been reported. if you find
      from the listed people please
      file his/her found complain so his/her 
      loved ones can see him again.
  </p>
 
  <button onClick={() =>this.missingpersonslist()}> Missing persons list</button>

</div>


<div class="card23">
  <img src="https://www.natchitochestimes.com/wp-content/uploads/2021/01/Child-found-safe.png" alt="John" style={{ width:"100%",height:"250px"}} />
  <h2>Found People List</h2>
  <p>
      In This section you can find 
      List of people who were Found 
      in Strey conditions and they 
      can be Someone you know so 
      please have a look at these profiles
      and help them to meet their Loves ones.  
  </p>

  <button onClick={() =>this.foundpersonslist()}> Found persons list</button>
  
</div>

<div class="card23">
  <img src="https://bloximages.chicago2.vip.townnews.com/missoulian.com/content/tncms/assets/v3/editorial/2/19/2197b36a-5a94-559e-aa74-e0662931f2dc/5956aa0dc4b4c.image.jpg" alt="John" style={{ width:"100%",height:"250px"}} />
  <h2>File Missing Complain</h2>
  <p>
      Is you Loved Ones Missing,Here 
      The solution ,You can file complain here 
      of missing and as soon as someone found them and 
      file complain here you both will get notified on
      your register emails as well as in my complain section.
  </p>
 
  <button onClick={() =>this.missingcomplain()}> File Missing Complain</button>
  
</div>

<div class="card23">
  <img src="https://media.istockphoto.com/photos/kid-crying-to-lost-parent-on-sky-train-station-picture-id1134393173?k=20&m=1134393173&s=612x612&w=0&h=aSMBKlP1RU6fz4Bg1eOoMpBllLmu7CC3IKHLONgxX1E=" alt="John" style={{ width:"100%",height:"250px"}} />
  <h2>File Found Complain</h2>
  <p>
    Found Someone in strey or unconscious
    conditions What to do next!! Here We 
    Come.. you can file complain of them 
    and we display them on found person list 
    and whenerver someone file complain of 
    missing them we will notify you both 
    via emails and updates same on my complain section.
  </p>
 
  <button onClick={() =>this.foundperson()}> File Found Complain</button>
  
</div>
<div class="card23">
  <img src="https://images-na.ssl-images-amazon.com/images/I/41GpKHoDs8L._SX384_BO1,204,203,200_.jpg" alt="John" style={{ width:"100%",height:"250px"}} />
  <h2>My Complains</h2>

  <p>
    Here you can find all the Missing as well 
    as Found  complains filed by You and you 
    can check status of them where you can see 
    all the matching complains which were identified 
    by our Face recognization technology and you can 
    Take your complain back as well.

  </p>
 
  <button onClick={() =>this.mycomplain()}> My Complain</button>
  
</div>

<Faqq/>

            </div>






            </>
        );
    }




}








export default Homepage