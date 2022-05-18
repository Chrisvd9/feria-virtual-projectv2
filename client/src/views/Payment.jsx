import React, { useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Formcontainer from '../components/FormContainer';
import Checkout from '../components/Checkout';
import { register } from '../actions/userAction';
import { savePaymentMethod } from '../actions/cartAction';

const Payment = () => {

    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart
    const navigate = useNavigate();

    if(!shippingAddress) {
        navigate("/shipping")
    }

    const dispatch = useDispatch();

    const [paymentMethod, setPaymentMethod] = useState('PayPal');


    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        navigate("/placeorder")
    }

    return (
        <Formcontainer>
            <Checkout step1 step2 step3/>
            <h1>Método de pago</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label as='legend'>Selecciona el método de pago</Form.Label>
                    <Col>
                    
                        <Form.Check type='radio' label='PayPal o Crédito' id='PayPal' name='paymentMethod' value='PayPal' checked onChange={(e) => setPaymentMethod(e.target.value)}></Form.Check>
                        <Form.Check type='radio' label='Débito' id='Stripe' name='paymentMethod' value='Stripe' onChange={(e) => setPaymentMethod(e.target.value)}></Form.Check>

                    </Col>
                </Form.Group>
                <Button className='my-3' type='submit' variant='primary'>Continuar</Button>
            </Form>
        </Formcontainer>
    );
}

export default Payment;
