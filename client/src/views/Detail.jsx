import React, {useState, useEffect} from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import {Row, Col, Image, ListGroup, Card, Button, ListGroupItem, Form, FormGroup,} from 'react-bootstrap';
import Rating from '../components/Rating';
import { listProductDetails, createProductReview } from '../actions/productAction';
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants';
import Loader from '../components/Loader';
import Message from '../components/Message';


const Detail = () => {
    const navigate = useNavigate();

    const [qty, setQty] = useState(1);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');


    const { id } = useParams()
    const dispatch = useDispatch()

    const productDetails = useSelector((state) => state.productDetails)
    const { loading, error, product } = productDetails

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const productReviewCreate = useSelector((state) => state.productReviewCreate)
    const { success: successProductReview, error: errorProductReviews} = productReviewCreate


    useEffect(() => {
        if(successProductReview){
            alert('Comentario enviado!')
            setRating(0)
            setComment('')
            dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
        }
        dispatch(listProductDetails(id))
    }, [dispatch, id, successProductReview]);

    const addToCardHandler = () => {
        navigate(`/cart/${id}?qty=${qty}`)
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(createProductReview(id, {
            rating,
            comment
        }))
    }

    return (
        <>
            <div className='d-flex justify-content-end'>
                <Link className='btn btn-dark my-3' to="/">Atrás</Link>
            </div>
            {loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> : (
                <>
                    <Row>
                <Col md={6}>
                    <Image className='img2' src={product.image}/>
                </Col>
                <Col>
                
                <Card md={3}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h4>{product.name}</h4>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Rating value={product.rating} text={` de ${product.numReviews} opiniones`}/>
                        </ListGroup.Item>

                        <ListGroup.Item>
                                <h3>Precio: ${product.price}</h3>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Col>
                                {product.countInStock > 0 ? 'Unidades Disponible' : 'No hay unidades disponible'}
                            </Col>
                        </ListGroup.Item>

                        {product.countInStock > 0 && (
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Cantidad</Col>
                                            <Col>
                                                <Form.Control as ='select' value={qty} onChange={(e) => setQty(e.target.value) }>
                                                    {
                                                        [...Array(product.countInStock).keys()].map((x) => (
                                                            <option key= {x + 1} value={x + 1}>
                                                                {x + 1}
                                                            </option>
                                                        ))
                                                    }
                                                </Form.Control>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                )}
                                
                        <ListGroup.Item className="d-flex justify-content-center">
                            <Button className='btn-block' type='button' disabled= {product.countInStock === 0} onClick={addToCardHandler}>
                                Añadir al carrito
                            </Button>
                        </ListGroup.Item>

                    </ListGroup>
                </Card>
                </Col>
                <Row>
                    <table class="table table-hover">
                        <thead>
                            <tr>
                            <th scope="col">Marca</th>
                            <th scope="col">Categoría</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{product.brand}</td>
                                <td>{product.category}</td>
                            </tr>
                        </tbody>
                    </table>

                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h5>Descripción</h5>
                            {product.description}
                        </ListGroup.Item>
                    </ListGroup>
                </Row>
            </Row>
            <Row className='mt-3'>
                    <Col md={6}>
                        <h2>Comentarios</h2>
                        {product.reviews.length === 0 && <Message>No hay comentarios</Message>}
                        <ListGroup variant='flush'>
                            {product.reviews.map((review) => (
                                <ListGroup.Item key={review._id}>
                                    <strong>{review.name}</strong>
                                    <Rating value={review.rating}/>
                                    <p>{review.createdAt.substring(0, 10)}</p>
                                    <p>{review.comment}</p>
                                </ListGroup.Item>
                            ))}
                            <ListGroup.Item className='mt-4'>
                                <h2>Déjanos tu opinión</h2>
                                {userInfo ? (
                                    <Form onSubmit={submitHandler}>
                                        <Form.Group controlId='rating'>
                                            <Form.Label>Calificación</Form.Label>
                                            <Form.Control as='select' value={rating} onChange={(e) => setRating(e.target.value)}>
                                                <option value=''>Selecciona...</option>
                                                <option value='1'>1 - Insatisfecho</option>
                                                <option value='2'>2 - Malo</option>
                                                <option value='3'>3 - Normal</option>
                                                <option value='4'>4 - Bueno</option>
                                                <option value='5'>5 - Muy bueno</option>
                                            </Form.Control>
                                        </Form.Group>
                                        <Form.Group controlId='comment'>
                                            <Form.Label>Comentario</Form.Label>
                                            <Form.Control as='textarea' row='3' value={comment} onChange={(e) => setComment(e.target.value)}></Form.Control>
                                        </Form.Group>
                                        <Button className='my-3' type='submit' variant='primary'>Enviar</Button>
                                    </Form>
                                ) : <Message>Porfavor <Link to='/login'>Inicia sesión</Link> para añadir tu opinión {' '} </Message>}
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>
                </Row>
            </>
            )}
        </>
    );
}

export default Detail;
