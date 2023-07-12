import axios from 'axios';
import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';

export default function AddSubject() {

    let navigate = useNavigate();

    const [subject,setSubject] = useState({
        title:"",
        discription:""
    })

    const{title,discription} = subject;

    const onInputChange = (e) => {
        setSubject({ ...subject, [e.target.name]: e.target.value });
      };      

    const onSubmit= async (e)=>{
        e.preventDefault();
        await axios.post("http://localhost:8080/subject/",subject);
        navigate("/adminSubject")
    }

    return (
        <div className='container'>
            <div className='row'>
                <div className=' border rounded'>
                    <h3 className='text-center'>Add Subject  </h3>
                    <form onSubmit={(e)=>onSubmit(e)}>
                    <div className='mb-3'>
                        <label htmlFor='Title' className='form-label'>Title</label>
                        <input
                            type={"text"}
                            className='form-control'
                            placeholder='Enter the subject name'
                            name='title'
                            value={title}
                            required
                            onChange={(e)=>onInputChange(e)} />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='Disc' className='form-label'>Discription</label>
                        <textarea
                            className='form-control'
                            placeholder='Enter the description'
                            name='discription'
                            rows={3}
                            value={discription}
                            onChange={onInputChange}
                            required
                            />
                    </div>
                    <Button type="submit" style={{ fontFamily: "Imprint Mt Shadow",borderRadius:'10px' }} className='btnn btn-primary mb-3 text-center'>Submit</Button>
                    </form>
                </div>
            </div>
        </div>
    )
}
