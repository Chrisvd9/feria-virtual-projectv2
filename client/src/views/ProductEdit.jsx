import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Formcontainer from '../components/FormContainer';
import { listProductDetails, updateProduct } from '../actions/productAction';
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants';


const ProductEdit = () => {
    const navigate = useNavigate();
    const { id } = useParams()
    const productId = id
    
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState('');
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [countInStock, setCountInStock] = useState(0);
    const [description, setDescription] = useState('');
    const [uploading, setUploading] = useState(false);


    const dispatch = useDispatch()

    const productDetails = useSelector(state => state.productDetails)
    const { loading, error, product } = productDetails    

    const productUpdate = useSelector(state => state.productUpdate)
    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = productUpdate   

    useEffect(() => {
        if(successUpdate) {
            dispatch({ type: PRODUCT_UPDATE_RESET })     
            navigate("/admin/productlist")
        } else {
            if(!product.name || product._id !== productId){
                dispatch(listProductDetails(productId))
            } else {
                setName(product.name)
                setPrice(product.price)
                setImage(product.image)
                setBrand(product.brand)
                setCategory(product.category)
                setCountInStock(product.countInStock)
                setDescription(product.description)
            }
        }
    }, [dispatch, navigate, productId, product, successUpdate]);

    const uploadFileHandler = async(e) => {
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('image', file)
        setUploading(true)

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }

            const { data } = await axios.post('/api/upload', formData, config)

            setImage(data)
            setUploading(false)
        } catch (error) {
            console.error(error)
            setUploading(false)
        }
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateProduct({
            _id: productId,
            name,
            price,
            image,
            brand,
            category,
            countInStock,
            description
        }))
    }


    return (
        <>
            <Link to='/admin/productlist' className='btn btn-light my-3'>Atrás</Link>
            <Formcontainer>
            <h1>Editar producto</h1>
            {loadingUpdate && <Loader/>}
            {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
            {loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> : (
                <Form onSubmit={submitHandler}>
                <Form.Group controlId='name'>
                    <Form.Label>Nombre: </Form.Label>
                    <Form.Control type='text' placeholder='Ingresa tu nombre' value={name} onChange={(e) => setName(e.target.value)} />
                </Form.Group>

                <Form.Group controlId='price'>
                    <Form.Label>Precio: </Form.Label>
                    <Form.Control type='number' placeholder='Ingresa el precio' value={price} onChange={(e) => setPrice(e.target.value)} />
                </Form.Group>

                <Form.Group controlId='image'>
                    <Form.Label>Imagen: </Form.Label>
                    <Form.Control type='text' placeholder='Ingresa la url de la imagen' value={image} onChange={(e) => setImage(e.target.value)} />
                    <Form.File id='image-file' label='Selecciona el archivo' custom onChange={uploadFileHandler} ></Form.File>
                    {uploading && <Loader/>}
                </Form.Group>

                <Form.Group controlId='brand'>
                    <Form.Label>Marca: </Form.Label>
                    <Form.Control type='text' placeholder='Ingresa la marca' value={brand} onChange={(e) => setBrand(e.target.value)} />
                </Form.Group>

                <Form.Group controlId='countInStock'>
                    <Form.Label>Stock disponible: </Form.Label>
                    <Form.Control type='number' placeholder='Ingresa cuanto stock hay disponible' value={countInStock} onChange={(e) => setCountInStock(e.target.value)} />
                </Form.Group>

                <Form.Group controlId='category'>
                    <Form.Label>Categoría: </Form.Label>
                    <Form.Control type='text' placeholder='Ingresa la categoría' value={category} onChange={(e) => setCategory(e.target.value)} />
                </Form.Group>

                <Form.Group controlId='description'>
                    <Form.Label>Descripción: </Form.Label>
                    <Form.Control type='text' placeholder='Ingresa la descripción' value={description} onChange={(e) => setDescription(e.target.value)} />
                </Form.Group>

                <Button className='my-3' type='submit' variant='primary'>Actualizar</Button>
            </Form>
            )}

        </Formcontainer>
        </>
        
    );
}

export default ProductEdit;
