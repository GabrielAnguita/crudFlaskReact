import React, {useState, useEffect} from 'react'

const API = process.env.REACT_APP_API;

    

export const Users = () => {
    
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [users, setUsers] = useState([])

    const [editing, setEditing] = useState(false)
    const [id, setId] = useState('')

    const handleSubmit = async (e)=>{
        e.preventDefault();
        
        if(!editing){
            
            
            console.log(email, name, password);
            const res = await fetch(`${API}/users`, {
                method:'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name,
                    email,
                    password
                })
            });
        
            const data = await res.json();
            console.log(data);
        }
        else {
            const res = await fetch(`${API}/user/${id}`,{
                method: 'PUT',
                headers: {

                    'Content-Type': 'application/json'
                
                },
                body: JSON.stringify({
                    name,
                    email,
                    password})
            })
            const data = await res.json()
            console.log(data)
            setEditing(false)
        }
        
        
        await getUsers();

        setName('');
        setEmail('');
        setPassword('');

    }

    const getUsers = async () => {
        const res = await fetch(`${API}/users`);
        const data = await res.json();
        console.log(data);
        setUsers(data)
    }

    const deleteUser = async (id) => {
        const confirmacion = window.confirm('quiere eliminar esta entrada?');
        if (confirmacion) {
            const res = await fetch(`${API}/users/${id}`,{
                method: 'DELETE'
            });
     
            const data = await res.json();
     
            console.log(data);
            await getUsers();       

        }

    }

    const editUser = async (id) => {
        const res = await fetch(`${API}/user/${id}`);
        const data = await res.json();
        
        setEditing(true); 
        setId(id);

        setName(data.name);
        setEmail(data.email);
        setPassword(data.password);

        

        console.log(data)
    }



    useEffect(() => {
        getUsers();
    }, [])
    
    return (

         <div className="row">
            <div className="col-md-4">
                <form onSubmit={handleSubmit} className="card card-body">
                     <div className="form-group">
                         <input type="text"
                                onChange={e => setName(e.target.value)}
                                value={name}
                                className="form-control"
                                placeholder="name"
                                autoFocus
                         />
                     </div>
                     <div className="form-group">
                         <input type="email"
                                onChange={e => setEmail(e.target.value)}
                                value={email}
                                className="form-control"
                                placeholder="Email"
                                
                         />
                     </div>
                     <div className="form-group">
                         <input type="password"
                                onChange={e => setPassword(e.target.value)}
                                value={password}
                                className="form-control"
                                placeholder="Password"
                              
                         />
                     </div>
                    <button className="btn btn-primary btn-block">
                        Create
                    </button>
                </form>
            </div>
            <div className="col md-6">
                <div className="card">
               <table className="table table-striped">
                   <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Email</th>
                            <th>Password</th>
                            <th>Operations</th>
                        </tr>
                   </thead>
                    <tbody>
                    {users.map(user => (
                    <tr key={user._id}>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.password}</td>
                        <td><button 
                                onClick={(e) => editUser(user._id)}
                                className="btn btn-secondary btn-sm">Editar</button>
                                
                            
                            <button
                                onClick={(e) => deleteUser(user._id)} 
                                className="btn btn-danger btn-sm">Eliminar</button>
                        </td>
                    </tr>
                ))}
                    </tbody>
               </table>
               </div>
            </div>
        </div>
    )

}