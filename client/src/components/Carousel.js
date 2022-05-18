import React from "react";
import { Carousel } from "react-responsive-carousel";

export default () => (
<Carousel  autoPlay infiniteLoop>
    <div>
        <img src="/images/carrusel01.png"></img>
        <p className="legend">¡Próximamente pago virtual!</p>
    </div>
    <div>
        <img alt="" src="/images/carrusel02.png" />
        <p className="legend">¡Mejor lugar para trabajar!</p>
    </div>
    <div>
        <img alt="" src="/images/carrusel03.png" />
        <p className="legend">¡Descuentos y más!</p>
    </div>
    <div>
        <img alt="" src="/images/carrusel04.png" />
        <p className="legend">Déjalo en nuestras manos</p>
    </div>
</Carousel>
);
