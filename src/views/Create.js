import React, { useState } from 'react';
import axios from 'axios';
import {useHistory} from 'react-router-dom';
import {Link} from 'react-router-dom';

const Create = (props) => {
    const history = useHistory();

    const [form, setForm] = useState({
        name: ''
    })
    const [errors, setErrors] = useState({})

    const onChangeHandler = (event) => {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        })
    }

    const onSubmitHandler = (event) => {
        event.preventDefault();
        axios.post("http://localhost:8000/api/authors/create", form)
            .then(res=>{
                console.log(res.data);

                if(res.data.results){
                    history.push('/');
                }
                else{
                    setErrors(res.data.err.errors);
                }
            })
            .catch(err => console.log(err))
    }

    return(
        <div>
            <Link to="/">Home</Link>
            <p>Add a new author: </p>
            <form onSubmit={onSubmitHandler}>
                <div>
                    <label>Name: </label>
                    <input type='text' name='name' onChange={onChangeHandler}></input>
                    <span>{errors.name && errors.name.message}</span>
                </div>
                <Link to="/">Cancel</Link>
                <input type='submit'></input>
            </form>
        </div>
    )
}

export default Create