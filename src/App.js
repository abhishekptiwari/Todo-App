import { useState } from "react";
import { Button } from '@material-ui/core';
import { FormControl } from '@material-ui/core';
import { InputLabel } from '@material-ui/core';
import { Input } from '@material-ui/core';
import Todo from "./components/Todo";
import { useEffect } from "react";
import db from './firebase';
import firebase from 'firebase';

function App() {
	
	const [todos, setTodos] = useState([]);

	const [input, setInput] = useState('');

	// when the app loads, we need to listen the DB and Fetch todos a they get added/Removed
	useEffect(() => {

		// forma 1 .
		db.collection('todos').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
            setTodos(snapshot.docs.map(doc => ({id: doc.id, todo: doc.data().todo})));
        })
		// Forma 2 .
		// db.collection('todos').onSnapshot(snapshot =>{
		// 	console.log(snapshot.docs.map(doc => doc.data().todo));
		// 	setTodos([snapshot.docs.map(doc => doc.data().todo)])
		// });

		// db.collection('messages').orderBy('createdAt').limit(50).onSnapshot(snapshot => {
        //     setMessages(snapshot.docs.map(doc => doc.data()))
        // })
	}, []);

	// -----------
	const addTodo = (e) =>{
		e.preventDefault();
		// sabe in DB

		db.collection('todos').add({
			todo:input,
			timestamp: firebase.firestore.FieldValue.serverTimestamp()
		});


		// setTodos([...todos, input]);
		setInput('');
	}

	return (
		<div className="App">
			<h1>Hellow - Todo App 🚀 👽</h1>
			<form onSubmit={addTodo}>
			<FormControl  >
				<InputLabel htmlFor="my-input">Write a Todo</InputLabel>
				<Input  type="text"
					value={input}
					onChange={(e) => setInput(e.target.value)}
					name='tarea' />

			</FormControl>

			<Button disabled={!input} variant="contained" color="primary"  type="submit">
				Add Todo
				</Button>
			</form>
		<hr />
		<ul>
			{	todos.map(todo =>(
					<Todo 
						key={todo.id}
						todo={todo}
					/>
				))
			}
		</ul>
		</div>
	);
}

export default App;
