import React from 'react';
import ReactDOM from 'react-dom'
import { useNavigate } from "react-router-dom";
import "./login.css";
import WebcamCapture from './webcamcapture';
import "./index.css";
import Faq from "react-faq-component";


const data = {
    title: "FAQ (How it works)",
    rows: [
        {
            title: "How to file Missing Complain or Found Complin",
            content: `To file a missing Complain you first need to create your account on our site which is a 1 minute process also
            login via google is available then after that you can move to missing complain section where you need to fill each and every field
            and select last seen location on map and after clicking submit button please wait for 5-10 seconds as we analyse the image upload 
            ie image must have an face of whom you are filing complain.`,
        },
        {
            title: "How will i get notified on a match",
            content:
                "as we have taken your email address(which must be valid) as soon as we found a match you get a email from our side as well as you can check status of yours complain on my complain section we update regulary there also",
        },
        {
            title: "Getting errors on submitting complain",
            content: `main resons can be you are not submitting a vaild phone number its format is first type country code and then give space and then write rest of your contact no.
            One more reson can be if you are uploading an corrupted file on image input so please upload a valid image having detectable face 
            of person for whom the complain is . if face is not detectable ww will notify you as well `,
        },
        {
            title: "Want to take compalin back ",
            content: <p>head to my complain section and click on delete complain butoon .</p>,
        },
    ],
};




const styles = {
     bgColor: 'white',
    titleTextColor: "black",
    rowTitleColor: "black",
     rowContentColor: 'grey',
     arrowColor: "red",
};

const config = {
     animate: true,
     arrowIcon: "V",
     tabFocus: true
};


class Faqq extends React.Component {

    render(){
    return (
        <div>
            <Faq
                data={data}
                styles={styles}
                config={config}
            />
        </div>
    );
    }

}
export default Faqq