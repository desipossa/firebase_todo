import { async } from '@firebase/util';
import { collection, getDocs, onSnapshot, addDoc, updateDoc, serverTimestamp, deleteDoc, doc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { db } from './firebase';



const App = () => {
    const [list, setList] = useState([]);
    const [input, setInput] = useState({});


    //firebase db에서 읽어오기

    const getdb = async () => {
        onSnapshot(collection(db, 'todo'), (snapshot) => {
            setList(snapshot.docs.map(doc => ({
                id: doc.id,
                item: doc.data()
            })))
        })
    }
    useEffect(() => {
        getdb()
    }, [])


    //firebase db에 추가

    const inputHandler = e => {
        const { name, value } = e.target;
        setInput({
            ...input,
            [name]: value
        })
    }

    const addHandler = (e) => {
        e.preventDefault();
        addDoc(collection(db, 'todo'), {
            content: input,
            timestamp: serverTimestamp()
        })
    };

    const deleteHandler = (id) => {
        deleteDoc(doc(db, 'todo', id))
    }

    const updateHandler = (id) => {
        updateDoc(doc(db, 'todo', id), { content: input });
    }
    return (
        <div>
            <h1>짜잔...</h1>
            <form onSubmit={addHandler}>
                <input name='name' value={input.value} onChange={inputHandler} />
                <input name='title' value={input.value} onChange={inputHandler} />
                <textarea name='content' value={input.value} onChange={inputHandler} />
                <button>추가</button>
            </form>

            <ul>
                {
                    list.map(it => <li>
                        {it.item.content.name}
                        {it.item.content.title}
                        {it.item.content.content}
                        {/* {Date(it.item.timestamp.seconds)} */}
                        <button onClick={() => deleteHandler(it.id)}>X</button>
                        <button onClick={() => updateHandler(it.id)}>m</button>
                    </li>
                    )
                }
            </ul>
            {console.log(list, db)}
        </div>
    )
}



export default App