import axios from 'axios';
import React, { useState, useEffect } from "react";
import { Link, useParams,useNavigate} from 'react-router-dom';
import { Col, Row, Card } from 'react-bootstrap';
import Product from '../components/Product';

const Search = () => {
    const {id}=useParams()
    console.log(id, "iddd")
    const [products, setProducts] = useState([]); 
    /* filtrar(id); */
    useEffect(() => {
        getProductos();
    }, []);

    const getProductos = () => {
        axios.get(`/api/products`)
        .then((res) => {
            setProducts(res.data);
            console.log(res.data,"res dataaaa productos")
        })
        .catch((err) => console.log("Error: ", err))
    };

    return(
<>
            <Row>
                {products.filter((prod,i)=> (prod.category.toString().toLowerCase().includes(id.toLowerCase())||
                    prod.marca?.toString().toLowerCase().includes(id.toLowerCase())||prod.name.toString().toLowerCase().includes(id.toLowerCase())))
                    .map((producto, j) => (
                    <Col key={j} sm={12} md={6} lg={4} xl={3}>
                    <Product product={producto} />
                </Col>
                ))}
            </Row>
        
    </>

)
}
export default Search;
