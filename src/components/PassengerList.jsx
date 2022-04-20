import axios from 'axios';
import React, { useEffect, useState } from 'react'

const initialData = {
    loading: false,
    page: 0,
    data: {
        totalPassengers: 0,
        totalPages: 0,
        data: [],
    },
    success: true,
    error: false,
}



const Flights = () => {
    const [data, setData] = useState(initialData);

    const getData = async () => {
        if (data.page < data.data.totalPages || data.page === 0) {
            try {
                setData(prev => {
                    return {
                        ...prev,
                        loading: true,
                    }
                });

                const dataServer = await axios.get(`http://localhost:8080/userlist?page=${data.page}&size=10`);

                setData(prev => {
                    return {
                        ...prev,
                        loading: false,
                        success: false,
                        data: dataServer.data,
                        error: false,
                    }
                });
                console.log(data);
            } catch (e) {
                setData(prev => {
                    return {
                        ...prev,
                        loading: false,
                        success: false,
                        error: false,
                    }
                });
            }
        }
    }
    useEffect(
        () => {
            getData();
        }, [data.page]
    );
    return (
        <div className='container text-center'>
            <h1>List of passengers</h1>
            <h3>Total Pages : {data.data.totalPages + 1}</h3>
            <div className="container my-3 d-flex justify-content-center">
                <div className='pagination'>
                    <button onClick={() =>
                        setData(prev => {
                            return {
                                ...prev,
                                page: prev.page > 0 ? prev.page - 1 : 0
                            }
                        })} className="btn btn-danger">prev</button>

                    <span className="text-center mx-3 pt-1">
                        Page : {data.page + 1}
                    </span>
                    <button onClick={() =>
                        setData(prev => {
                            return {
                                ...prev,
                                page: prev.page < prev.data.totalPages ? prev.page + 1 : prev.page
                            }
                        })} className="btn btn-danger">next</button>

                </div>
            </div>
            {data.loading === true && <div className="text-center fs-1 fw-bold m-5">loading....</div>}
            {data.loading === false &&
                <table className="table table-hover table-bordered text-center text-break">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Passenger Name</th>
                            <th scope="col">Airline Name</th>
                            <th scope="col">Country</th>
                        </tr>
                    </thead>
                    <tbody> {
                        data.data.data.map(
                            (data, key) => {
                                return <tr key={key}>
                                    <td >{data.id}</td>
                                    <td >{data.passenger_Name}</td>
                                    <td >{data.name}</td>
                                    <td >{data.country}</td>
                                </tr>
                            }
                        )
                    }
                    </tbody>
                </table>
            }
        </div>
    )
}

export default Flights