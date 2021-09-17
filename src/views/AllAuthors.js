import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

const AllAuthors = (props) => {
    const [authors, setAuthors] = useState([]);
    const [loaded, setLoaded] = useState(true);

    useEffect(() => {
        console.log("Use Effect running");
        axios.get("http://localhost:8000/api/authors/all")
            .then(res => {
                setAuthors(res.data.results);
            })
            .catch(err => console.log(err))
    },[loaded])

    const onDeleteHandler = (_id) => {
        axios.delete(`http://localhost:8000/api/authors/${_id}/delete`)
            .then(res=>{
                console.log(res);
                setLoaded(!loaded);
            })
            .catch(err => console.log(err));
    }

    return(
        <div>
            <Link to="/authors/create">Add an author:</Link>
            <p>We have quotes by:</p>
            <table className='authors_table'>
                <tr className='authors_row'>
                    <th>Author</th>
                    <th>Actions Available</th>
                </tr>
                {
                    authors.map((item,i) =>{
                        return <tr key={i} className='authors_row'>
                                    <td>{item.name}</td>
                                    <td><Link to={`/authors/${item._id}`}>EDIT</Link> <button onClick={()=>onDeleteHandler(item._id)}>DELETE</button> </td>
                                </tr>
                        
                    })
                }
            </table>
        </div>
    )
}

export default AllAuthors;