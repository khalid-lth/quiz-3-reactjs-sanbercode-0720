import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './css/form.css';

const MovieListEditor = () => {
    const [daftarFIlm, setDaftarFilm] = useState(null)
    const [input, setInput] = useState({title: "", description: "", year: "", duration: "", genre: "", rating: ""})
    const [selectedID, setSelectedID] = useState(0)
    const [statusForm, setStatusForm] = useState("Create")

    useEffect( () => {
        if (daftarFIlm === null) {
            axios.get(`http://backendexample.sanbercloud.com/api/movies`)
            .then (res => {
                setDaftarFilm(res.data.map(el=>{return {id: el.id, title: el.title, description: el.description, year: el.year, duration: el.duration, genre: el.genre, rating: el.rating}}))
            })
        }
    }, [daftarFIlm])


    const handleChange = (event) =>{
        let typeOfInput = event.target.name
        switch (typeOfInput) {
            case 'title': {
                setInput({...input, title: event.target.value})
                break;
            }
            case 'description': {
                setInput({...input, description: event.target.value})
                break;
            }
            case 'year': {
                setInput({...input, year: event.target.value})
                break;
            }
            case 'duration': {
                setInput({...input, duration: event.target.value})
                break;
            }
            case 'genre': {
                setInput({...input, genre: event.target.value})
                break;
            }
            case 'rating': {
                setInput({...input, rating: event.target.value})
                break;
            }
            default: {break;}
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        let rating = input.rating

        if (rating <= 10) {
            if (statusForm === 'create') {
                axios.post(`http://backendexample.sanbercloud.com/api/movies`, {title: input.title, rating: input.rating, year: input.year, duration: input.duration, genre: input.genre, description: input.description})
                .then (res => {
                    console.log(res)
                    setDaftarFilm([
                        ...daftarFIlm,
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
                axios.put(`http://backendexample.sanbercloud.com/api/movies/${selectedID}`, {title: input.title, rating: input.rating, year: input.year, duration: input.duration, genre: input.genre, description: input.description})
                .then (res => {
                    console.log(res)
                    let dataFilm = daftarFIlm.find(el => el.id === selectedID)
                            dataFilm.title = input.title
                            dataFilm.rating = input.rating
                            dataFilm.year = input.year
                            dataFilm.duration = input.duration
                            dataFilm.genre = input.genre
                            dataFilm.description = input.description
                            setDaftarFilm([...daftarFIlm])
                })
            }

            setStatusForm('create')
            setSelectedID(0)
            setInput({title: "", description: "", year: "", duration: "", genre: "", rating: ""})
        }
    }

    const handleEdit = (event) => {
        let idFilm = parseInt(event.target.value)
        let dataFilm = daftarFIlm.find(el => el.id === idFilm)
        setInput({
            title: dataFilm.title,
            year: dataFilm.year,
            rating: dataFilm.rating,
            genre:dataFilm.genre,
            description:dataFilm.description,
            duration:dataFilm.duration
        })
        setSelectedID(idFilm)
        setStatusForm('edit')
    }


    const handleDelete = (event) => {
        let idFilm = parseInt(event.target.value)
        let newDaftarFilm = daftarFIlm.filter(el => el.id != idFilm)

        axios.delete(`http://backendexample.sanbercloud.com/api/movies/${idFilm}`)
        .then (res => {
            console.log(res)
        })
        setDaftarFilm([...newDaftarFilm])
    }



    return(
        <div>

        <h1>Daftar Film Terbaik</h1>
        <table className="tabel">
            <tbody>
                <th>Judul</th>
                <th>Tahun</th>
                <th>Rating</th>
                <th>Durasi</th>
                <th>Genre</th>
                <th>Deskripsi</th>
                <th></th>
                <th></th>
            
        { 
        daftarFIlm !== null && daftarFIlm.map((item, index) => {
            daftarFIlm.sort((a, b) => a.rating < b.rating ? 1 : -1)
            
            return(
                <tr key={index}>
                    
                    <td>{item.title}</td>
                    <td>{item.year}</td>
                    <td>{item.rating}</td>
                    <td>{item.duration} menit</td>
                    <td>{item.genre}</td>
                    <td>{item.description}</td>
                   <td><button onClick={handleDelete} value={item.id}>Delete</button></td> 
                   <td> <button onClick={handleEdit} value={item.id}>Edit</button></td> 
                </tr>
               
            )
        })
        }
         </tbody>
                </table>

            {/* Form Submit */}
             
            <div className="tambahData">
             <h2>Tambah Film</h2>
             <form onSubmit={handleSubmit}>
            <label>Judul:</label>
            <input type="textarea" name="title" value={input.title} onChange={handleChange} required='required' /><br/>
            <label>Rating:</label>
            <input type="number" name="rating"  value={input.rating} onChange={handleChange} required='required' /><br/>
            <label>Tahun:</label>
            <input type="number" name="year"  value={input.year} onChange={handleChange} required='required'/> <br/>
            <label>durasi:</label>
            <input type="number" name="duration"  value={input.duration} onChange={handleChange} required='required'/> <br/>
            <label>genre:</label>
            <input type="textarea" name="genre"  value={input.genre} onChange={handleChange} required='required'/> <br/>
            <label>deskripsi:</label>
            <input type="text" name="description"  value={input.description} onChange={handleChange} required='required'/> <br/>
            <button>Kirim</button>
          
             </form>
             </div>
        </div>
    )
}

export default MovieListEditor