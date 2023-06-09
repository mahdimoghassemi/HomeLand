import React, {useEffect} from 'react'
import {Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {Row, Col, ListGroup, Image, Form, Button, Card} from 'react-bootstrap'
import Loader from '../components/Loader'
// import Massage from '../components/Massage'
import {addToCart, removeFromCart} from '../actions/cartActions'

function Cart({match, location, history}) {
  const productId = match.params.id
  const qty = location.search ? Number(location.search.split('=')[1]) : 1
  const dispatch = useDispatch()

  const cart =  useSelector(state => state.cart)
  const {cartItems} = cart

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty))
    }
  },[dispatch, productId, qty])

  const removeFromCartHandler = (id) =>{
    dispatch(removeFromCart(id))
  }

  const cheakOutHandler = () => {
    history.push('/login?redirect=shipping')
  }

  return (
    <Row>
      <Col md={8}>
      <h1>Reservation Cart</h1>
        {cartItems.length === 0 ? (
        <div className='badge bg-info'>
            Your cart is empty <Link to='/'>Go Back</Link> 
        </div>
        ) : (
          <ListGroup variant = 'flush'>
            {cartItems.map(item =>(
              <ListGroup.Item key={item.product}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded/>
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </Col>
                  <Col md={2}>
                    ${item.price}
                  </Col>
                  <Col md={3}>
                    <Form.Control as='select' value={item.qty} 
                    onChange={(e => dispatch(addToCart(item.product, Number(e.target.value))))}>
                      {
                        [...Array(item.countInStock).keys()].map((x)=>(
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))
                      }
                    </Form.Control>
                  </Col>
                  <Col md={1}>
                    <Button type='button' variant='light' 
                    onClick={() => removeFromCartHandler(item.product)}>
                      <i className='fas fa-trash'></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )} 
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>
                Subtotal({
                cartItems.reduce((acc,item) => acc + item.qty, 0)
                }) items ${
                  cartItems.reduce((acc,item) => acc + item.qty * item.price, 0).toFixed()
                }
                </h2>
            </ListGroup.Item>
          </ListGroup>
          <ListGroup.Item>
            <div className="d-grid gap-2">
              <Button onClick={cheakOutHandler} disabled={cartItems.length === 0} type='button' className='m-2 btn btn-block'>Proceed To Checkout</Button>
            </div>
          </ListGroup.Item>
        </Card>
      </Col>
    </Row>
  )
}

export default Cart
