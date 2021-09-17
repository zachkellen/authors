import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {useParams, useHistory} from 'react-router-dom';
import {Link} from 'react-router-dom';

const Edit = (props) => {
    const {_id} = useParams();
    const history = useHistory();

    const [form, setForm] = useState({
        name: ""
    })
    const [errors, setErrors] = useState({});

    useEffect( () => {
        axios.get("http://localhost:8000/api/authors/" + _id)
            .then(res=>setForm(res.data.results))
            .catch(err=>console.log(err));
    },[_id])

    const onChangeHandler = (event) => {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        })
    }

    const onSubmitHandler = (event) => {
        event.preventDefault();
        axios.patch(`http://localhost:8000/api/authors/${_id}/update`,form)
            .then(res=>{
                console.log(res.data);

                if(res.data.results){
                    history.push('/');
                }
                else{
                    setErrors(res.data.err.errors);
                }
            })
            .catch(err=>console.log(err))
    }

    return(
        <div>
            <p>Edit this author: </p>
            <form onSubmit={onSubmitHandler}>
                <div>
                    <label>Name: </label>
                    <input type='text' name='name' onChange={onChangeHandler} value={form.name}></input>
                    <span>{errors.name && errors.name.message}</span>
                </div>
                <Link to="/">Cancel</Link>
                <input type='submit'></input>
            </form>
        </div>
    )
}

export default Edit;