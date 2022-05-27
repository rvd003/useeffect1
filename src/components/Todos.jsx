import React from "react";
import { useEffect } from "react";
import { useState } from "react";

const Todos=()=>{
    const [page,setPage]=useState(1);
    const [newTodo,setNewTodo]=useState("");
    const[todos,setTodos]=useState([]);
    const saveInfo=()=>{
        fetch("http://localhost:8080/todos",{
            method:"POST",
            headers:{
                "content-type":"application/json",
            },
            body:JSON.stringify({
                value:newTodo,
                isCompletes:false
            }),
        })
        .then((r)=>r.json())
        .then((d)=>{
            setTodos([...todos,d])
            setNewTodo("");
        });

        };
    

    useEffect(()=>{
        fetch(`http://localhost:8080/todos`)
        .then((r)=>r.json())
        .then((d)=>{
            console.log(d);
            setTodos(d);
        });
    },[]);

    return ( 
        <div>
            Todos
        <div>
            <input 
            value={newTodo}
            onChange={({target})=>setNewTodo(target.value)}
            />
            <button onClick={saveInfo}>+</button>
            {todos.map((todo)=>(
                <div key={todo.id}>{todo.value}</div>
            ))}
        </div>
        <button onClick={()=>setPage(page-1)}>{`<`}</button>
        <button onClick={()=>setPage(page+1)}>{`>`}</button>
        </div>
    );
};
export default Todos;