import React from "react";
import { render } from "react-dom";
import Carousel from "./Carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

// import img1 from "/Users/esperanzaforero/Desktop/Feria-Virtual-Project-master/client/public/images/img1.png";
// import img2 from "/Users/esperanzaforero/Desktop/Feria-Virtual-Project-master/client/public/images/img2.png";
// import img3 from "/Users/esperanzaforero/Desktop/Feria-Virtual-Project-master/client/src/imagenes/img3.png";

import "../components/carrusel.css";

function Slider (){
    return (
        <>
        <Carousel>
            <div>
                {/* <img1 src={img1}/> */}
            </div>
            <div>
                {/* <img1 src={img2}/> */}
            </div>
            <div>
                {/* <img1 src={img3}/> */}
            </div>
        </Carousel>
        </>
    );
}

export default Slider; 

