import React, { useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Formcontainer from '../components/FormContainer';
import Checkout from '../components/Checkout';
import { register } from '../actions/userAction';
import { saveShippingAddress } from '../actions/cartAction';

const Shipping = () => {

    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const [address, setAddress] = useState(shippingAddress.address);
    const [city, setCity] = useState(shippingAddress.city);
    const [postal, setPostal] = useState(shippingAddress.postal);
    const [country, setCountry] = useState(shippingAddress.country);

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(saveShippingAddress({ address, city, postal, country }))
        navigate("/payment")
    }

    return (
        <Formcontainer>
            <Checkout step1 step2/>
            <h1>Envío</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='address'>
                    <Form.Label>Dirección: </Form.Label>
                    <Form.Control type='text' placeholder='Ingresa tu dirección value' value={address} onChange={(e) => setAddress(e.target.value)} />
                </Form.Group>

                <Form.Group controlId='city'>
                    <Form.Label>Ciudad: </Form.Label>
                    <Form.Control type='text' placeholder='Ingresa una ciudad' value={city} onChange={(e) => setCity(e.target.value)} />
                </Form.Group>

                <Form.Group controlId='postal'>
                    <Form.Label>Código postal: </Form.Label>
                    <Form.Control type='text' placeholder='Ingresa el código postal de tu ciudad' value={postal} onChange={(e) => setPostal(e.target.value)} />
                </Form.Group>

                <Form.Group controlId='country'>
                    <Form.Label>País: </Form.Label>
                    <Form.Control type='text' placeholder='Ingresa tu país' value={country} onChange={(e) => setCountry(e.target.value)} />
                </Form.Group>

                <Button className='my-3' type='submit' variant='primary'>Continuar</Button>
            </Form>
        </Formcontainer>
    );
}

export default Shipping;
