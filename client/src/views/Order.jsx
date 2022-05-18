import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PayPalButton } from 'react-paypal-button-v2';
import { useLocation, useNavigate, Link, useParams } from 'react-router-dom';
import { ListGroup, Button, Row, Col, Image, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { getOrderDetail, payOrder, deliverOrder } from '../actions/orderAction';
import { ORDER_PAY_RESET, ORDER_DELIVER_RESET } from '../constants/orderConstants';


const Order = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const orderId = id
    const navigate = useNavigate();

    const [sdkReady, setSdkReady] = useState(false);

    
    const orderDetails = useSelector(state => state.orderDetails)
    const { order, loading, error } = orderDetails

    const orderPay = useSelector(state => state.orderPay)
    const { loading: loadingPay, success: successPay } = orderPay

    const orderDeliver = useSelector(state => state.orderDeliver)
    const { loading: loadingDeliver, success: successDeliver } = orderDeliver
        
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    if(!loading) {
        order.itemsPrice = order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    }
    
    const addPayPalScript = async () => {
        const { data: clientId } = await axios.get('/api/config/paypal')
        const script = document.createElement('script')
        script.type = 'text/javascript'
        script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
        script.async = true
        script.onload = () => {
            setSdkReady(true)
        }
        document.body.appendChild(script)
    }

    useEffect(() => {
        if(!userInfo) {
            navigate("/login")
        }
        if(!order || successPay || successDeliver || order._id !== orderId) {
            dispatch({ type: ORDER_PAY_RESET })
            dispatch({ type: ORDER_DELIVER_RESET })
            dispatch(getOrderDetail(orderId))
        } else if(!order.isPaid) {
            if(!window.paypal) {
                addPayPalScript()
            } else {
                setSdkReady(true)
            }
        }
    }, [dispatch, orderId, successPay, successDeliver, order]);

    const successPaymentHandler = (paymentResult) => {
        console.log(paymentResult)
        dispatch(payOrder(orderId, paymentResult))
    }

    const deliverHandler = () => {
        dispatch(deliverOrder(order))
    }

    return loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : 
    <>
        <h1>Pedido {order._id}</h1>
        <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>

                        <ListGroup.Item>
                            <h2>Envío</h2>
                            <p><strong>Nombre: </strong> {order.user.name}</p>
                            <p><strong>Email: </strong><a href={`emailto:${order.user.email}`}>{order.user.email}</a></p>
                            <p>
                                <strong>Dirección: </strong>
                                {order.shippingAddress.address}, {order.shippingAddress.city}{''}, {order.shippingAddress.postal}, {''}
                                {order.shippingAddress.country}
                            </p>
                            {order.isDelivered ? (
                                <Message variant='success'>
                                Envíado el {order.deliveredAt.substring(0, 10)}
                                </Message>
                            ) : (
                                <Message variant='info'>Una vez realizado el pago, envíaremos tu pedido.</Message>
                            )}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Método de pago</h2>
                            <p>
                            <strong>Método: </strong>
                            {order.paymentMethod}
                            </p>
                            {order.isPaid ? 
                            ( 
                            <Message variant='success'>Pagado el {order.paidAt.substring(0, 10)}</Message>
                            ) : (
                            <Message variant='danger'>Pago pendiente.</Message>
                            )}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Mis productos</h2>
                            {order.orderItems.length === 0 ? <Message variant='danger'>Pedido esta vacío</Message> : (
                                <ListGroup variant='flush'>
                                    {order.orderItems.map((item, i) => (
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
                                    <Col>${order.itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        Envío
                                    </Col>
                                    <Col>${order.shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        Impuesto
                                    </Col>
                                    <Col>${order.taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        Total
                                    </Col>
                                    <Col>${order.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            {!order.isPaid && (
                                <ListGroup.Item>
                                    {loading && <Loader />}
                                    {!sdkReady ? <Loader /> : (
                                        <PayPalButton amount={order.totalPrice} onSuccess={successPaymentHandler} />
                                    )}
                                </ListGroup.Item>
                            )}
                            {loadingDeliver && <Loader />}
                            {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                                <ListGroup.Item>
                                    <Button type='button' className='btn btn-block' onClick={deliverHandler}>Marcar como envíado</Button>
                                </ListGroup.Item>
                            )}


                        </ListGroup>
                    </Card>
                </Col>
            </Row>
    </>
}

export default Order;
