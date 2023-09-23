import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import {Button, Row, Col, ListGroup, Image, Card, ListGroupItem} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Massage from '../components/Massage'
import Loader from '../components/Loader'
import {getOrderDetails, payOrder, deliverOrder} from '../actions/orderActions'
import {ORDER_DELIVER_RESET} from '../constants/orderConstants'

function OrderScreen({match, history}) {
    const orderId = match.params.id
    const dispatch = useDispatch()

    const orderDetails = useSelector(state => state.orderDetails)
    const { order, error, loading } = orderDetails

    const orderDeliver = useSelector(state => state.orderDeliver)
    const { loading: loadingDeliver , success: successDeliver } = orderDeliver

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    if (!loading && !error){
        order.itemsPrice = order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2)
    }
     
    useEffect(() => {
        if (!userInfo) {
            history.push('/login')
        }

        if(!order || order._id !== Number(orderId) || successDeliver){
            dispatch({type: ORDER_DELIVER_RESET})
            dispatch(getOrderDetails(orderId))
        }
    }, [dispatch, order, orderId, successDeliver])

    const deliverHandler = () =>{
        dispatch(deliverOrder(order))
    }

    return loading ? (
        <Loader/>
    ) : error ? (<Massage variant='danger'>{error}</Massage>) : (
        <div>
            <h1>Reservation: {order._id}</h1>
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroupItem>
                            <h2>Infomation</h2>
                            <p><strong>Name: </strong>{order.user.name}</p>
                            <p><strong>Email: </strong><a href={`mailto:${order.user.email}`}>{order.user.email}</a></p>
                            <p>
                                <strong>Adrress: </strong>
                                {order.shippingAddress.address},{' '}
                                 {order.shippingAddress.city},{' '}
                                {order.shippingAddress.country},{'    '}
                                {order.shippingAddress.postalCode}
                            </p>
                            {order.isDelivered ? (
                                <Massage variant='success'> Delivered on {order.deliveredAt} </Massage> 
                            ) : (
                                <Massage variant='warning'> Not Delivered </Massage> 
                            )}
                        </ListGroupItem>

                        <ListGroupItem>
                            <h2>Method</h2>
                            <p>
                                <strong>Method: </strong>
                                {order.paymentMethod}
                            </p>
                            {order.isPaid ? (
                                <Massage variant='success'> Paid on {order.paidAt} </Massage> 
                            ) : (
                                <Massage variant='warning'> Not Paid </Massage> 
                            )}
                        </ListGroupItem>

                        <ListGroupItem>
                            <h2>Reserve Items</h2>
                            {order.orderItems.lenght === 0 ? 
                                <Massage variant='info'> Order is empty</Massage> : (
                                    <ListGroup variant='flush'>
                                        {order.orderItems.map((item, index) => (
                                            <ListGroup.Item key={index}>
                                                <Row>
                                                    <Col md={2}>
                                                        <Image src={item.image} alt={item.name} fluid rounded />
                                                    </Col>

                                                    <Col>
                                                        <Link to={`/product/${item.product}/`}>{item.name}</Link>
                                                    </Col>

                                                    <Col md={4}>
                                                        {item.qty} × ${item.price} = ${(item.qty*item.price).toFixed(2)}
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                        ))}
                                    </ListGroup>
                                )
                            }
                        </ListGroupItem>
                    </ListGroup>
                </Col>

                <Col md={4}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>Reservation Summary</h2>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>item:</Col>
                                    <Col>${order.itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping:</Col>
                                    <Col>${order.shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax:</Col>
                                    <Col>${order.taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Total Price:</Col>
                                    <Col>${order.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                        </ListGroup>

                        {loadingDeliver && <Loader />}
                        {/* && order.isPaid */}
                        {userInfo && userInfo.isAdmin && !order.isDelivered && (
                            <ListGroup.Item>
                                <div className="d-grid gap-2">
                                    <Button type='button' className='btn btn block' onClick={deliverHandler}>
                                        Mark As Deliver
                                    </Button>
                                </div>
                            </ListGroup.Item>
                        )}
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default OrderScreen
