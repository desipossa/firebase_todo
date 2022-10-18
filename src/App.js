import { async } from '@firebase/util';
import { collection, getDocs, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { db } from './firebase';



const App = () => {
    const [todos, setTodos] = useState([]);
    const getdb = async () => {
        // const querySnapshot = await getDocs(collection(db, "todo"));
        // setTodos(querySnapshot.doc());
        onSnapshot(collection(db, 'todo'), (snapshot) => {
            setTodos(snapshot.docs.map(doc => doc.data()))
        })
    }
    useEffect(() => {
        getdb()
    }, [])
    // db.collection('todo')
    //     .orderBy('todo')
    //     .onSnapshot(data => {
    //         setTodos(data)
    //     })
    return (
        <div>
            <h1>짜잔...</h1>
            <ul>
                {
                    todos.map(it => <li>{it.title}</li>)
                }
            </ul>
            {/* {
                querySnapshot.forEach((doc) => {
                    console.log(doc);
                })
            } */}
            {console.log(todos, db)}
        </div>
    )
}



export default App