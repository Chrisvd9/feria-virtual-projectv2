import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Formcontainer from '../components/FormContainer';
import { getUserDetails, updateUser } from '../actions/userAction';
import { USER_UPDATE_RESET } from '../constants/userConstants';

const UserEdit = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { id } = useParams()
    const userId = id
    
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);

    const dispatch = useDispatch()

    const userDetails = useSelector(state => state.userDetails)
    const { loading, error, user } = userDetails

    const userUpdate = useSelector(state => state.userUpdate)
    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = userUpdate
    

    useEffect(() => {
        if(successUpdate) {
            dispatch({ type: USER_UPDATE_RESET })
            navigate("/admin/userlist")
        } else {
            if(!user.name || user._id !== userId){
                dispatch(getUserDetails(userId))
            } else {
                setName(user.name)
                setEmail(user.email)
                setIsAdmin(user.isAdmin)
            }
        }
    }, [dispatch, navigate, userId, user, successUpdate]);

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateUser({ _id: userId, name, email, isAdmin }))
    }


    return (
        <>
            <Link to='/admin/userlist' className='btn btn-light my-3'>Atrás</Link>
            <Formcontainer>
            <h1>Editar cuenta</h1>
            {loadingUpdate && <Loader />}
            {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
            {loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> : (
                <Form onSubmit={submitHandler}>
                <Form.Group controlId='name'>
                    <Form.Label>Nombre: </Form.Label>
                    <Form.Control type='text' placeholder='Ingresa tu nombre' value={name} onChange={(e) => setName(e.target.value)} />
                </Form.Group>

                <Form.Group controlId='email'>
                    <Form.Label>Email:</Form.Label>
                    <Form.Control type='text' placeholder='Ingresa tu correo' value={email} onChange={(e) => setEmail(e.target.value)} />
                </Form.Group>

                <Form.Group controlId='isadmin'>
                    <Form.Check type='checkbox' label='Administrador' value={isAdmin} checked={isAdmin} onChange={(e) => setIsAdmin(e.target.checked)} />
                </Form.Group>

                <Button className='my-3' type='submit' variant='primary'>Actualizar</Button>
            </Form>
            )}

        </Formcontainer>
        </>
        
    );
}

export default UserEdit;
