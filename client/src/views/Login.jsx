import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Formcontainer from '../components/FormContainer';
import { login } from '../actions/userAction';

const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { loading, error, userInfo } = userLogin

    const redirect = location.search ? location.search.split('=')[1] : "/"
    

    useEffect(() => {
        console.log(redirect)
        if(userInfo) {
            navigate(redirect)
        }
    }, [navigate, userInfo, redirect]);

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(email, password))
    }


    return (
        <Formcontainer>
            <div className="contenedorMain">
                <div className="bienvenidos">
                    <h1>BIENVENIDOS</h1>
                    <h1>A LA</h1>
                    <h1>FERIA VIRTUAL</h1>
                </div>
                {error && <Message variant='danger'>{error}</Message>}
                {loading && <Loader />}
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId='email'>
                        <Form.Label>Email:</Form.Label>
                        <Form.Control type='email' placeholder='Ingresa un email' value={email} onChange={(e) => setEmail(e.target.value)} />
                    </Form.Group>

                    <Form.Group controlId='password'>
                        <Form.Label>Contraseña:</Form.Label>
                        <Form.Control type='password' placeholder='Ingresa un contraseña' value={password} onChange={(e) => setPassword(e.target.value)} />
                    </Form.Group>

                    <Button className='my-3' type='submit' variant='primary'>Iniciar sesión</Button>
                </Form>

                <Row className='py-3'>
                    <Col>
                        <p>¿No estás registrado?</p>
                        <Link className='link' to={redirect ? `/register?redirect=${redirect}` : '/register'}>¡Haz click aquí!</Link>
                    </Col>
                </Row>
            </div>
        </Formcontainer>
    );
}

export default Login;
