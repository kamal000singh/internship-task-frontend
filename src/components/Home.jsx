import React, { useEffect, useState } from 'react'
import Axios from 'axios';

const Home = () => {
    const [airlineResult, setAirlineResult] = useState(null);
    const [data, setData] = useState({ name: '', trips: '', airline: '' });
    const [loading, setLoading] = useState(false);
    const handleChange = (ev) => {
        setData({ ...data, [ev.target.name]: ev.target.value });
    }
    const handleSubmit = async (ev) => {
        ev.preventDefault();
        await Axios.post('http://localhost:8080/adduser', data).then(function (response) {
            if (response.status === 200) {
                alert("New user added successfully");
                setData({ name: '', trips: '', airline: '' })
            }
        });
    }
    const loadAirline = async () => {
        setLoading(true);
        await Axios.get('https://api.instantwebtools.net/v1/airlines').then(function (response) {
            setAirlineResult(response.data);
        });
        setLoading(false);
    }
    useEffect(() => {
        loadAirline();

    }, [])
    return (
        <>
            <form className="container mt-4" action="" onSubmit={handleSubmit}>
                <h1 className="">Add New User to Passenger</h1>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" name="name" value={data.name} onChange={handleChange} className="form-control" id="exampleFormControlInput1" placeholder="enter name here..." required />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">Trip No. </label>
                    <input type="number" name="trips" value={data.trips} onChange={handleChange} className="form-control" id="exampleFormControlInput1" placeholder="enter trip number here..." required />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">Select Airlines ID </label>
                    <select className="form-select" name="airline" onChange={handleChange} aria-label="Default select example" disabled={loading ? true : false} required>
                        <option defaultValue >{loading ? "loading..." : "select Airline ID here..."}</option>
                        {airlineResult !== null && airlineResult.map((data, key) => {
                            return <option key={key} value={data.id}>{data.id}</option>
                        })}
                    </select>
                </div>
                <div className="d-grid gap-2">
                    <button className="btn btn-danger" type="submit" disabled={loading ? true : false}>{loading ? "loading..." : "Submit"}</button>
                </div>

            </form>
        </>
    )
}

export default Home