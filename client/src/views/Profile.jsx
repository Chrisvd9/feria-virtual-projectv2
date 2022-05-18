import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col, Table } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getUserDetails, updateUserProfile  } from '../actions/userAction';
import { listMyOrders } from '../actions/orderAction';

const Profile = () => {
    const navigate = useNavigate();
    const location = useLocation();
    
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState(null);

    const dispatch = useDispatch()

    const userDetails = useSelector(state => state.userDetails)
    const { loading, error, user } = userDetails
    
    const userLogin = useSelector(state => state.userLogin)
    const {  userInfo } = userLogin

    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const {  success } = userUpdateProfile

    const orderListMy = useSelector(state => state.orderListMy)
    const { loading: loadingOrders, error: errorOrders, orders } = orderListMy

    useEffect(() => {
        if(!userInfo) {
            navigate('/login')
        } else {
            if(!user.name) {
                dispatch(getUserDetails('profile'))
                dispatch(listMyOrders())
            } else {
                setName(user.name)
                setEmail(user.email)
            }
        }
    }, [dispatch, navigate, userInfo, user]);

    const submitHandler = (e) => {
        e.preventDefault()
        if(password !== confirmPassword) {
            setMessage('Las contraseñas no coinciden')
        } else {
            dispatch(updateUserProfile({ id: user._id, name, email, password }))
        }
    }


    return (
        <Row>
            <Col md={3}>
                <h2>Perfil</h2>
                {error && <Message variant='danger'>{error}</Message>}
                {message && <Message variant='danger'>{message}</Message>}
                {success && <Message variant='success'>Usuario actualizado!</Message>}
                {loading && <Loader />}
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId='name'>
                        <Form.Label>Nombre: </Form.Label>
                        <Form.Control type='name' placeholder='Ingresa tu nombre' value={name} onChange={(e) => setName(e.target.value)} />
                    </Form.Group>

                    <Form.Group controlId='email'>
                        <Form.Label>Email:</Form.Label>
                        <Form.Control type='email' placeholder='Ingresa tu correo' value={email} onChange={(e) => setEmail(e.target.value)} />
                    </Form.Group>

                    <Form.Group controlId='password'>
                        <Form.Label>Contraseña:</Form.Label>
                        <Form.Control type='password' placeholder='Ingresa una nueva contraseña' value={password} onChange={(e) => setPassword(e.target.value)} />
                    </Form.Group>

                    <Form.Group controlId='confirmPassword'>
                        <Form.Label>Confirmar contraseña: </Form.Label>
                        <Form.Control type='password' placeholder='Vuelve a ingresar tu contraseña' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                    </Form.Group>

                    <Button className='my-3' type='submit' variant='primary'>Actualizar</Button>
                </Form>

            </Col>
            <Col md={9}>
                <h2>Mis productos</h2>
                {loadingOrders ? <Loader /> : errorOrders ? <Message variant='danger'>{errorOrders}</Message> : (
                    <Table striped responsive className='table-sm table-hover'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>FECHA</th>
                                <th>TOTAL</th>
                                <th>PAGADO</th>
                                <th>ENTREGADO</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                        {orders.map((order) => (
                            <tr key={order._id}>
                            <td>{order._id}</td>
                            <td>{order.createdAt.substring(0, 10)}</td>
                            <td>{order.totalPrice}</td>
                            <td>
                                {order.isPaid ? (
                                order.paidAt.substring(0, 10)
                                ) : (
                                    <i className='fas fa-times' style={{ color: 'red' }}></i>
                                )}
                            </td>
                            <td>
                                {order.isDelivered ? (
                                order.deliveredAt.substring(0, 10)
                                ) : (
                                    <i className='fas fa-times' style={{ color: 'red' }}></i>
                                )}
                            </td>
                            <td>
                                <LinkContainer to={`/order/${order._id}`}>
                                    <Button className='btn-sm' variant='light'>
                                        Details
                                    </Button>
                                </LinkContainer>
                            </td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                )}
            </Col>
        </Row>
    );
}

export default Profile;
