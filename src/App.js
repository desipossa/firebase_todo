import { async } from '@firebase/util';
import { collection, query, orderBy, getDocs, onSnapshot, addDoc, updateDoc, serverTimestamp, deleteDoc, doc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { db } from './firebase';


const q_ = query(collection(db, 'todo'), orderBy('timestamp'));
const App = () => {
    const [list, setList] = useState([]);
    const [input, setInput] = useState({});

    //firebase db에서 읽어오기

    const getdb = async () => {
        onSnapshot(q_, (snapshot) => {
            setList(snapshot.docs.map(doc => ({
                id: doc.id,
                item: doc.data(),
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
        addDoc(collection(db, 'todo'), { ...input, timestamp: serverTimestamp() });
        setInput({
            title: "",
            name: "",
            content: "",
        })
    };

    const deleteHandler = (id) => {
        deleteDoc(doc(db, 'todo', id))
    }

    const updateHandler = (id) => {
        updateDoc(doc(db, 'todo', id), { ...input, timestamp: serverTimestamp() });
    }
    return (
        <div>
            <h1>짜잔... {list.length}</h1>
            <form onSubmit={addHandler}>
                <input name='name' value={input.name || ''} onChange={inputHandler} />
                <input name='title' value={input.title || ''} onChange={inputHandler} />
                <textarea name='content' value={input.content || ''} onChange={inputHandler} />
                <button>추가</button>
            </form>

            <ul>
                {
                    list.map(it => <li key={it.id}>
                        {it.item.name}
                        {it.item.title}
                        {it.item.content}
                        {Date(it.item.timestamp?.seconds)}
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