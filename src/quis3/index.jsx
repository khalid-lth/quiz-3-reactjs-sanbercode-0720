import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './public/css/style.css';

const DataDaftarFilm = () => {
    const [daftarFilm, setDaftarFilm] = useState(null)
    const [input, setInput] = useState({ title: "", description: "", year: "", duration: "", genre: "", rating: "" })
    const [selectedID, setSelectedID] = useState(0)
    const [statusForm, setStatusForm] = useState("Create")

    useEffect(() => {
        if (daftarFilm === null) {
            axios.get(`http://backendexample.sanbercloud.com/api/movies`)
                .then(res => {
                    setDaftarFilm(res.data.map(el => { return { id: el.id, title: el.title, description: el.description, year: el.year, duration: el.duration, genre: el.genre, rating: el.rating } }))
                })
        }
    }, [daftarFilm])


    const handleChange = (event) => {
        let typeOfInput = event.target.name
        switch (typeOfInput) {
            case 'title': {
                setInput({ ...input, title: event.target.value })
                break;
            }
            case 'description': {
                setInput({ ...input, description: event.target.value })
                break;
            }
            case 'year': {
                setInput({ ...input, year: event.target.value })
                break;
            }
            case 'duration': {
                setInput({ ...input, duration: event.target.value })
                break;
            }
            case 'genre': {
                setInput({ ...input, genre: event.target.value })
                break;
            }
            case 'rating': {
                setInput({ ...input, rating: event.target.value })
                break;
            }
            default: { break; }
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        let rating = input.rating

        if (rating <= 10) {
            if (statusForm === 'create') {
                axios.post(`http://backendexample.sanbercloud.com/api/movies`, { title: input.title, rating: input.rating, year: input.year, duration: input.duration, genre: input.genre, description: input.description })
                    .then(res => {
                        console.log(res)
                        setDaftarFilm([
                            ...daftarFilm,
                            {
                                id: res.data.id,
                                title: input.title,
                                rating: input.rating,
                                year: input.year,
                                duration: input.duration,
                                genre: input.genre,
                                description: input.description
                            }
                        ])
                    })
            } else if (statusForm === 'edit') {
                axios.put(`http://backendexample.sanbercloud.com/api/movies/${selectedID}`, { title: input.title, rating: input.rating, year: input.year, duration: input.duration, genre: input.genre, description: input.description })
                    .then(res => {
                        console.log(res)
                        let dataFilm = daftarFilm.find(el => el.id === selectedID)
                        dataFilm.title = input.title
                        dataFilm.rating = input.rating
                        dataFilm.year = input.year
                        dataFilm.duration = input.duration
                        dataFilm.genre = input.genre
                        dataFilm.description = input.description
                        setDaftarFilm([...daftarFilm])
                    })
            }

            setStatusForm('create')
            setSelectedID(0)
            setInput({ title: "", description: "", year: "", duration: "", genre: "", rating: "" })
        }
    }

    const handleEdit = (event) => {
        let idFilm = parseInt(event.target.value)
        let dataFilm = daftarFilm.find(el => el.id === idFilm)
        setInput({
            title: dataFilm.title,
            year: dataFilm.year,
            rating: dataFilm.rating,
            genre: dataFilm.genre,
            description: dataFilm.description,
            duration: dataFilm.duration
        })
        setSelectedID(idFilm)
        setStatusForm('edit')
    }


    const handleDelete = (event) => {
        let idFilm = parseInt(event.target.value)
        let newDaftarFilm = daftarFilm.filter(el => el.id != idFilm)

        axios.delete(`http://backendexample.sanbercloud.com/api/movies/${idFilm}`)
            .then(res => {
                console.log(res)
            })
        setDaftarFilm([...newDaftarFilm])
    }

    return(
        <div className="container">
            <h1>Daftar Film Film Terbaik</h1>
            <div id="article-list">
                {daftarFilm !== null && daftarFilm.map(el =>{
                    return(
                        <>
                        <ol>
                            <li>{el.title}</li>
                                <li><b>Rating : {el.rating}</b></li>
                                <li><b>Durasi : {el.duration}</b></li>
                                <li><b>Genre : {el.genre}</b></li>
                                <li><b>Deskripsi : {el.description}</b></li>
                                <li><b>Tahun : {el.year}</b></li>
                                <td><button class = "btn-1" onClick={handleEdit} value = {el.id}>Edit</button></td>
                                <td><button class="btn-2" onClick={handleDelete} value={el.id}>Delete</button></td>
                        </ol>
                        <br/><br/>
        <form onSubmit={handleSubmit}>
            <h1>Form Untuk Mengisi Daftar Film</h1>
        <label>
            <b>Masukkan Nama Film:</b>
        </label>          
        <input class = "input-1" type="text" name ='title' placeholder = 'masukan judul film' value={input.title} onChange={handleChange}/>
        <br/>
        <label>
           <b> Masukkan Rating Film:</b>
        </label>          
        <input class = "input-2"type="text" name ='rating' placeholder = 'masukan rating film' value={input.rating} onChange={handleChange} />
        <br/>
        <label>
            <b>Masukkan Durasi Film:</b>
        </label>          
        <input class = "input-3" type="text" name ='duration' placeholder = 'masukan durasi film' value={input.duration} onChange={handleChange} />
        <br/>
        <label>
            <b>Masukkan Genre Film:</b>
        </label> 
        <input class = "input-4" type="text" name ='genre' placeholder = 'masukan genre film' value={input.genre} onChange={handleChange} />
        <br/>
        <label>
            <b>Masukkan Description Film:</b>
        </label> 
        <input class = "input-5" type="text" name ='description' placeholder = 'masukan deskripsi film' value={input.description} onChange={handleChange} />
        <br/>
        <label>
            <b>Masukkan Tahun Film:</b>
        </label> 
        <input class = "input-6" type="text" name ='year' placeholder = 'masukan tahun film' value={input.year} onChange={handleChange} />
        <br/>
        <button class= "btn-3">submit</button>
        </form>
                        </>
                    )
                })}
            </div>
        </div>
    )

}

export default DataDaftarFilm
