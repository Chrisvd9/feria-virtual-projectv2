import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { ListGroup, Button, Row, Col, Image, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Checkout from '../components/Checkout';
import Message from '../components/Message';
import { createOrder } from '../actions/orderAction';


const Placeorder = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const cart = useSelector(state => state.cart)


    cart.itemsPrice = cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)

    cart.shippingPrice = cart.itemsPrice > 100 ? 0 : 100
    cart.taxPrice = Number((0.26 * cart.itemsPrice))
    cart.totalPrice = Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice)  

    const orderCreate = useSelector(state => state.orderCreate)
    const { order, success, error } = orderCreate

    useEffect(() => {
        if(success) {
            navigate(`/order/${order._id}`)
        }
        // eslint-disable-next-line
    }, [navigate, success]);


    const placeOrderHandler = () => {
        dispatch(createOrder({
            orderItems: cart.cartItems,
            shippingAddress: cart.shippingAddress,
            paymentMethod: cart.paymentMethod,
            itemsPrice: cart.itemsPrice,
            shippingPrice: cart.shippingPrice,
            taxPrice: cart.taxPrice,
            totalPrice: cart.totalPrice,
        }))
    }

    return (
        <>
            <Checkout step1 step2 step3 step4 />
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>

                        <ListGroup.Item>
                            <h2>Envío</h2>
                            <p>
                                <strong>Dirección: </strong>
                                {cart.shippingAddress.address}, {cart.shippingAddress.city}{''}, {cart.shippingAddress.postal}, {''}
                                {cart.shippingAddress.country}
                            </p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Método de pago</h2>
                            <strong>Método: </strong>
                            {cart.paymentMethod}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Mis productos</h2>
                            {cart.cartItems.length === 0 ? <Message variant='danger'>Tu carrito esta vacío</Message> : (
                                <ListGroup variant='flush'>
                                    {cart.cartItems.map((item, i) => (
                                        <ListGroup.Item key={i}>
                                            <Row>
                                                <Col md={1}>
                                                    <Image src={item.image} alt={item.name} fluid rounded />
                                                </Col>
                                                <Col>
                                                    <Link to={`/product/${item.product}`}>
                                                        {item.name}
                                                    </Link>
                                                </Col>
                                                <Col md={4}>
                                                    {item.qty} x ${item.price} = ${item.qty * item.price}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            )}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>Resumen del pedido</h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        Productos
                                    </Col>
                                    <Col>${cart.itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        Envío
                                    </Col>
                                    <Col>${cart.taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        Total
                                    </Col>
                                    <Col>${cart.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                {error && <Message variant='danger'>{error}</Message>}
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Button type='button' className='btn-block my-1' disabled={cart.cartItems === 0} onClick={placeOrderHandler}>Realizar pedido</Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    );
}

export default Placeorder;
