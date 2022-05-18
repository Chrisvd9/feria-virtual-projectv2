import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
    return (
        <footer className="text-center text-lg-start bg-light text-muted">
            <section
            className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom"
            >
            <div className="me-5 d-none d-lg-block">
                <span>Conéctate con nosotros y síguenos por las redes sociales:</span>
            </div>
        
            <div>
                <a href="" className="me-4 text-reset">
                <i className="fab fa-facebook-f"></i>
                </a>
                <a href="" className="me-4 text-reset">
                <i className="fab fa-twitter"></i>
                </a>
                <a href="" className="me-4 text-reset">
                <i className="fab fa-google"></i>
                </a>
                <a href="" className="me-4 text-reset">
                <i className="fab fa-instagram"></i>
                </a>
            </div>
            </section>
        
            <section className="">
            <div className="container text-center text-md-start mt-5">
                <div className="row mt-3">
                <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                    <h6 className="text-uppercase fw-bold mb-4">
                    <i className="fas fa-gem me-3"></i>Feria Virtual
                    </h6>
                    <p>
                    Es una plataforma desarrollada para la implementación de Espacios Virtuales, Centros de Negocios y Ferias Virtules que pueden aplicar a sectores específicos del mercado. 
                    Es un exclusivo desarrollo para que expositores y visitantes de un sector puedan contactar a clientes de interés.
                    </p>
                </div>
        
                <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                    <h6 className="text-uppercase fw-bold mb-4">
                    Categorías más populares
                    </h6>
                    <p>
                    <a href="#!" className="text-reset">Tecnologia</a>
                    </p>
                    <p>
                    <a href="#!" className="text-reset">Deporte</a>
                    </p>
                    <p>
                    <a href="#!" className="text-reset">Libros</a>
                    </p>
                    <p>
                    <a href="#!" className="text-reset">Juguetes</a>
                    </p>
                </div>
        
                <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">

                    <h6 className="text-uppercase fw-bold mb-4">
                    Enlaces útiles
                    </h6>
                    <p>
                    <a href="#!" className="text-reset">Precios</a>
                    </p>
                    <p>
                    <a href="#!" className="text-reset">Ajustes</a>
                    </p>
                    <p>
                    <a href="#!" className="text-reset">Pedidos</a>
                    </p>
                    <p>
                    <a href="#!" className="text-reset">Ayuda</a>
                    </p>
                </div>

        

                <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">

                    <h6 className="text-uppercase fw-bold mb-4">
                    Contacto
                    </h6>
                    <p><i className="fas fa-home me-3"></i>Av. Argentina 3440, Santiago, CL</p>
                    <p>
                    <i className="fas fa-envelope me-3"></i>
                    feriavirtual@gmail.com
                    </p>
                    <p><i className="fas fa-phone me-3"></i> +56 9 3456 7880</p>
                </div>

                </div>

            </div>
            </section>

        

            <div className="text-center p-4">
            © 2022 Feria Virtual todos los derechos reservados
            </div>

        </footer>

    );
}

export default Footer;