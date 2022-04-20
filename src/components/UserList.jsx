import Axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useSearchParams, useLocation } from 'react-router-dom';

const UserList = () => {
    const [users, setUsers] = useState(null);
    const [loading, setLoading] = useState(false);
    const [count, setCount] = useState([])
    let [search] = useSearchParams();
    let location = useLocation();
    console.log(location);
    useEffect(() => {
        let c = [];
        const loadUsers = async () => {
            setLoading(true);
            await Axios.get(`http://localhost:8080/userlist${location.search === "" ? '?page=0&size=10' : '?' + search}`).then(function (response) {
                setUsers(response.data);
                for (let i = 0; i < (response.data.totalPages); i++) {
                    c.push(i);
                }
                setCount(c);

            });
            setLoading(false);
        }
        loadUsers();
    }, [search, location.search]);
    return (
        <>
            <div className="container">
                <h1 className="text-center fw-bold text-danger m-3">List of Users</h1>
                {loading === true && <div className="text-center fs-1 fw-bold m-5">loading....</div>}
                {loading === false && <div className="container">
                    <div className="container-fluid overflow-auto my-4">
                        <nav aria-label="Page navigation">
                            <ul className="pagination">
                                {
                                    count !== [] && count.map((data) => {
                                        return <li key={data} className={`page-item ${search.get('page') === data ? 'active' : ''}`}>
                                            <Link className="page-link" to={`/userlist?page=${data}&size=10`}>{(data + 1)}</Link>
                                        </li>
                                    })
                                }
                            </ul>
                        </nav>
                    </div>
                    <table className="table table-hover table-bordered text-center text-break">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Passenger Name</th>
                                <th scope="col">Airline Name</th>
                                <th scope="col">Country</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users !== null && users.data.map((data, key) => {
                                return <tr key={key}>
                                    <td >{data.id}</td>
                                    <td >{data.passenger_Name}</td>
                                    <td >{data.name}</td>
                                    <td >{data.country}</td>
                                </tr>
                            })}
                        </tbody>
                    </table>
                </div>
                }
            </div>
        </>
    )
}

export default UserList