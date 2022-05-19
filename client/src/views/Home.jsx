import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product';
import { listProducts } from '../actions/productAction';
import Componentecarrusel from '../components/componentecarrusel';
import Message from '../components/Message';
import Loader from '../components/Loader';


const Home = () => {

    const dispatch = useDispatch()

    const productList = useSelector(state => state.productList)
    const { loading, error, products } = productList

    useEffect(() => {
        dispatch(listProducts())
    }, [dispatch]);



    return (
        <>
            <Componentecarrusel></Componentecarrusel>
            <h1>Últimos productos posteados!</h1>
            {loading ? 
            <Loader/> : error ? <Message variant='danger'>{error}</Message> :  
            <Row>
                {products.map((product, i) => (
                    <Col key={i} sm={12} md={6} lg={4} xl={3} >
                        <Product product={product}/>
                    </Col>
                ))}
            </Row>
        }

        </>
    );
}

export default Home;
