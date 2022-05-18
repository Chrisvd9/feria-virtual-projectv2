import React,{useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { Link, useParams,useNavigate} from 'react-router-dom';
import { Route } from 'react-router-dom';
import { logout } from '../actions/userAction';


const Header = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const [valor, setValor] = useState(""); 

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const logOutHandler = () => {
        dispatch(logout())
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();
        console.log(e.target.value, "eeeee")
        navigate("/listarBusqueda/"+valor)
    }

    const handleonchange = (e)=> {
        console.log(e.target, "que me llega en change")
        setValor(e.target.value)
       /* navigate("/listarBusqueda/"+e.target.value) */
    }
    const handleonchange2 = (e)=> {
        console.log(e.target.value, "value del select")
        navigate("/listarBusqueda/"+e.target.value)
    }


    return (
        <header>
            <Navbar bg="primary" variant='dark' expand="lg" collapseOnSelect>
                <Container>

                    <LinkContainer to='/'>
                        <Navbar.Brand><img src='../images/feria-virtual.001.png' alt='feria virtual logo' className='logo' /></Navbar.Brand>
                    </LinkContainer>

                        <select className='select1' name="category" onClick= {(e)=>{e.target.value!=="selected"?handleonchange2(e):console.log("nada")}}>
                            <option value="selected" selected="selected">Elige una categoria</option>
                            <option value="Tecnologia" >Tecnologia</option>
                            <option value="Deporte">Deporte</option>
                            <option value="Moda">Moda</option>
                            <option value="Libros">Libros</option>
                            <option value="Juguetes">Juguetes</option>
                        </select>
                        <form class="d-flex ms-3" method= "post" onSubmit={onSubmitHandler}>
                            <input id='filterr' className={`form-control`} name='valor' onChange = {(e)=>{handleonchange(e)}} value={valor} type="text" placeholder="Busca por nombre producto, categoria o marca"/>
                            <button className='btn btn-secondary ms-3' type="submit">Search</button>
                        </form>

                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className='ms-auto'>
                            <LinkContainer to={'/'}>
                                <Nav.Link className='nav-links'><i className='i2 fas fa-home'></i>Inicio</Nav.Link>
                            </LinkContainer>
                        {userInfo && userInfo.isAdmin && (
                                <NavDropdown id="nav-dropdown-dark-example" title="Admin" menuVariant="dark">
                                    <LinkContainer to='/admin/userlist'>
                                        <NavDropdown.Item>Usuarios</NavDropdown.Item>
                                    </LinkContainer>

                                    <LinkContainer to='/admin/productlist'>
                                        <NavDropdown.Item>Productos</NavDropdown.Item>
                                    </LinkContainer>

                                    <LinkContainer to='/admin/orderlist'>
                                        <NavDropdown.Item>Pedidos</NavDropdown.Item>
                                    </LinkContainer>
                                
                            </NavDropdown>
                            )}


                            {userInfo ? (
                                <NavDropdown title={userInfo.name} id='nav-dropdown-dark-example' menuVariant="dark">
                                    <LinkContainer to='/profile'>
                                        <NavDropdown.Item>Perfil</NavDropdown.Item>
                                    </LinkContainer>
                                    <NavDropdown.Item onClick={logOutHandler}>Cerrar sesión</NavDropdown.Item>
                                </NavDropdown>
                            ):
                            <LinkContainer to="login">
                                <Nav.Link className='nav-links'><i className='i2 fas fa-user'></i>Iniciar sesión</Nav.Link>
                            </LinkContainer>}

                            <LinkContainer to={"/cart"}>
                                <Nav.Link className='nav-links'><i className='i2 fas fa-shopping-cart'></i></Nav.Link>
                            </LinkContainer>

                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
}

export default Header;
