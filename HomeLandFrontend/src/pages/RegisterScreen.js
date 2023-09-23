import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import {Form, Button, Row, Col} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Loader from '../components/Loader'
import Massage from '../components/Massage'
import FormContainer from '../components/FormContainer'
import {register} from '../actions/userActions'


function RegisterScreen({location, history}) {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')
    const [massage, setMassage] = useState('')

    const dispatch = useDispatch()
    const redirect = location.search ? location.search.split('=')[1] : '/'
    const userRegister = useSelector(state => state.userRegister)
    const { error, loading, userInfo } = userRegister

    useEffect(() => {
        if (userInfo) {
            history.push(redirect)
        }
    }, [history, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        if(password != passwordConfirm){
            setMassage('Passwords don\'t match')
        }else{
            dispatch(register(name, email, password))
        }
        
    }

  return (
    <FormContainer>
        <h1>Sign In</h1>
        {massage && <Massage variant='dangar'>{massage}</Massage>}
        {error && <Massage variant='dangar'>{error}</Massage>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>

            <Form.Group controlId='name'>
                <Form.Label>Name</Form.Label>
                <Form.Control
                    required
                    type='name'
                    placeholder='Enter Name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                >
                </Form.Control>
            </Form.Group>

            <Form.Group controlId='email'>
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                    required
                    type='email'
                    placeholder='Enter Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                >
                </Form.Control>
            </Form.Group>

            <Form.Group controlId='password'>
                <Form.Label>Password</Form.Label>
                <Form.Control 
                    required
                    type='password' 
                    placeholder='Enter your password' 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)}
                >    
                </Form.Control>
            </Form.Group>

            <Form.Group controlId='passwordConfirm'>
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control 
                    required
                    type='password' 
                    placeholder='Confirm your password' 
                    value={passwordConfirm} 
                    onChange={(e) => setPasswordConfirm(e.target.value)}
                >    
                </Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary'>Register</Button>
            <Row className='py-3'>
                <Col>
                    Have an account? 
                    <Link to={redirect ? `/login?redirect=${redirect}` : '/login' }>  Sign In</Link>
                </Col>
            </Row>

        </Form>
    </FormContainer>
  )
}

export default RegisterScreen
