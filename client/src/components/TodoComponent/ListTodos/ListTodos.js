import React, { useEffect, useState } from 'react';


import EditTodo from '../EditTodo/EditTodo';


export default function ListTodos({allTodos, setTodosChange}) {

    const [todos, setTodos] = useState([]);

    const deleteTodo = async(id) => {
        try {

            await fetch(`http://localhost:5000/dashboard/todos/${id}`,{
                method: "DELETE",
                headers: {jwt_token: localStorage.token}
            });

           setTodos(todos.filter(todo => todo.todo_id !== id));

        } catch (error) {
            console.log(error.message)
        }
    }

    useEffect(() => {
        setTodos(allTodos)
    }, [allTodos])

    return (
        <div className="ListTodos" >
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        todos.length !== 0 && todos[0].todo_id !== null && 
                        todos.map(todo => (
                            <tr key={todo.todo_id} >
                                <td>{todo.description.length >= 15 ? todo.description.substring(0, 25) : todo.description }</td>
                                <td> <EditTodo todo={todo} setTodosChange={setTodosChange} /> </td>
                                <td><button onClick={() => deleteTodo(todo.todo_id)} >Delete</button></td>
                            </tr>         
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}
