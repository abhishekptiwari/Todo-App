import { Button, List, ListItem, ListItemText } from '@material-ui/core';
import  '../Css/Todo.css';
import db from '../firebase'
import DeleteIcon from '@material-ui/icons/Delete';
import Modal from '@material-ui/core/Modal';
import { useState } from 'react';

const Todo = ({todo}) => {

    const [open, setOpen] = useState(false);
    const [input, setInput] = useState(todo.todo);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const updateTodo = () =>{

        db.collection('todos').doc(todo.id).set({
            todo: input
        }, {merge:true});

        console.log('actualizando...');
        setOpen(false);
    }

    return (
        <>
        <Modal
            open={open}
            onClose={handleClose}
            >
                <div>
                    <h1>Open</h1>
                    <button onClick={e => setOpen(false)}>x</button>
                    <hr />
                    <input type="text" value={input} onChange={e => setInput(e.target.value)} />
                    <Button   variant="contained" color="primary"
                     onClick={ updateTodo}>
                    Update Todo
                    </Button>
                </div>
        </Modal>
        <ListItem  >
            <ListItemText primary={todo.todo} secondary="dummy deadline 🕥" />
            <button onClick={e => setOpen(true)}>Edit ✏️</button>
            <DeleteIcon onClick={e => db.collection('todos').doc(todo.id).delete() }>Delete me ⛔</DeleteIcon>
        </ListItem>
        </>
     );
}

export default Todo;