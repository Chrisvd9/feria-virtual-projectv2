import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Formcontainer from '../components/FormContainer';
import { register } from '../actions/userAction';

const Register = () => {
    const navigate = useNavigate();
    const location = useLocation();
    
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);

    const dispatch = useDispatch()

    const userRegister = useSelector(state => state.userRegister)
    const { loading, error, userInfo } = userRegister

    const redirect = location.search ? location.search.split('=')[1] : "/";
    

    useEffect(() => {
        console.log(redirect)
        if(userInfo) {
            navigate(redirect)
        }
    }, [navigate, userInfo, redirect]);
    
    const submitHandler = (e) => {
        e.preventDefault()
        if(password !== confirmPassword) {
            setMessage('Las contraseñas no coinciden')
        } else {
            dispatch(register(name, email, password, isAdmin))
            navigate("/")
        }
    }


    return (
        <Formcontainer>
            <div className="contenedorMain2">
                <div className='d-flex justify-content-between'>
                    <h1>Registrate aquí</h1>
                    <button className='btn btn-primary' onClick={() => navigate("/login")}>Volver</button>
                </div>
                {error && <Message variant='danger'>{error}</Message>}
                {message && <Message variant='danger'>{message}</Message>}
                {loading && <Loader />}
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId='name'>
                        <Form.Label>Nombre: </Form.Label>
                        <Form.Control type='text' placeholder='Ingresa tu nombre' value={name} onChange={(e) => setName(e.target.value)} />
                    </Form.Group>

                    <Form.Group controlId='email'>
                        <Form.Label>Email:</Form.Label>
                        <Form.Control type='text' placeholder='Ingresa tu correo' value={email} onChange={(e) => setEmail(e.target.value)} />
                    </Form.Group>

                    <Form.Group controlId='password'>
                        <Form.Label>Contraseña:</Form.Label>
                        <Form.Control type='password' placeholder='Ingresa una contraseña' value={password} onChange={(e) => setPassword(e.target.value)} />
                    </Form.Group>

                    <Form.Group controlId='confirmPassword'>
                        <Form.Label>Confirmar contraseña: </Form.Label>
                        <Form.Control type='password' placeholder='Vuelve a ingresar tu contraseña' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                    </Form.Group>

                    <Form.Group className='mt-3' controlId='isadmin'>
                        <Form.Check className='vendedor' type='checkbox' label='Cuenta de vendedor' value={isAdmin} checked={isAdmin} onChange={(e) => setIsAdmin(e.target.checked)} />
                    </Form.Group>

                    <Button className='my-3' type='submit' variant='primary'>Crear cuenta</Button>
                </Form>

                <Row className='py-3'>
                    <Col>
                        <p>Ya tienes una cuenta? </p>
                        <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>¡Inicia sesión aquí!</Link>
                    </Col>
                </Row>
            </div>
        </Formcontainer>
    );
}

export default Register;
