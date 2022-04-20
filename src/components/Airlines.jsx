import React, { useEffect, useState } from 'react';
import Axios from 'axios';

const Airlines = () => {
    const [airlineResult, setAirlineResult] = useState(null);
    const [loading, setLoading] = useState(false);
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
        <div className="container-fluid h-100 overflow-auto">
            <h1 className="m-4 text-center text-uppercase">List of airline</h1>
            {loading === true && <div className="text-center fs-1 fw-bold m-5">loading....</div>}
            {loading === false &&
                <table className="table table-hover table-bordered text-center text-break">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Name</th>
                            <th scope="col">Country</th>
                            <th scope="col">Logo</th>
                            <th scope="col">Slogan</th>
                            <th scope="col">Head Quaters</th>
                            <th scope="col">Website</th>
                            <th scope="col">Established</th>
                        </tr>
                    </thead>
                    <tbody>
                        {airlineResult !== null && airlineResult.map((data, key) => {
                            return <tr key={key}>
                                <th scope="row container">{data.id}</th>
                                <td >{data.name}</td>
                                <td >{data.country}</td>
                                <td ><img src={data.logo} alt="logo" width="100" height="100" /> </td>
                                <td >{data.slogan}</td>
                                <td >{data.head_quaters}</td>
                                <td >{data.website}</td>
                                <td >{data.established}</td>
                            </tr>
                        })}
                    </tbody>
                </table>
            }
        </div>
    )
}

export default Airlines