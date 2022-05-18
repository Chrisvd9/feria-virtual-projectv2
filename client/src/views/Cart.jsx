import React, { useEffect } from 'react';
import { Link, useNavigate, useParams, useLocation } from 'react-router-dom';
import queryString from 'query-string';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, ListGroup, Image, Form , Button, Card } from 'react-bootstrap';
import Message from '../components/Message';
import { addToCart, removeFromCart } from '../actions/cartAction';

const Cart = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const location = useLocation();

    const productId = id

    const qty = location.search ? Number(location.search.split('=')[1]) : 1;

    const dispatch = useDispatch();

    const cart = useSelector(state => state.cart)
    const { cartItems } = cart

    console.log(cartItems)

    useEffect(() => {
        if(productId) {
            dispatch(addToCart(productId, qty))
        }
    }, [dispatch, productId, qty]);

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id))
    }

    const checkOutHandler = () => {
        navigate("/login?redirect=shipping")
    }

    return (
        <Row>
            <Col md={8}>
                <h1>Carrito de compras</h1>
                {cartItems.length === 0 ?
                <Message>Tu carrito esta vacío <Link to='/'>Atrás</Link></Message> : (
                    <ListGroup variant='flush'>
                        {cartItems.map(item => (
                            <ListGroup.Item key={item.product}>
                                <Row>
                                    <Col md={2}>
                                        <Image src={item.image} alt={item.name} fluid rounded />
                                    </Col>
                                    <Col md={3}>
                                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                                    </Col>
                                    <Col md={2}>${item.price}</Col>
                                    <Col md={2}>
                                        <Form.Control as ='select' value={item.qty} onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value))) }>
                                            {
                                                [...Array(item.countInStock).keys()].map((x) => (
                                                    <option key= {x + 1} value={x + 1}>
                                                        {x + 1}
                                                    </option>
                                                ))
                                            }
                                        </Form.Control>
                                    </Col>
                                    <Col md={2}>
                                            <Button type='button' variant='light' onClick={() => removeFromCartHandler(item.product)}><i className='fas fa-trash'></i></Button>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                ) }
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Total ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) Productos</h2>
                            <span className='product-price'>${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0)}</span>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Button type='button' className='btn-block' disabled={cartItems.length === 0} onClick={checkOutHandler}>Ir a comprar</Button>
                            <Button type='button' className='btn-block ms-2' onClick={() => navigate("/")}>Seguir mirando</Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    );
}

export default Cart;
