import logo from './logo.svg';
import './App.css';
import {useState} from "react";
import axios from "axios";

function App() {
  const [inputText, setInputText] = useState('Hello');
    const [notesContent, setNotesContent] = useState([]);
    const handleInput = ({target}) => {
        if (target.value === 'СтудСовет') {
            setInputText('ЭМИТ')
        } else {
            setInputText(target.value)
        }
    }

    const handleSubmit = () => {
        fetch('http://localhost:3001/create-note', {
            method: 'POST',
            body: JSON.stringify({noteText: inputText}),
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((res) => {
            console.log(res.json())
        })
    }

    const handleGetNotes = () => {
        fetch('http://localhost:3001/notes', {
            method: 'GET',
        }).then(async res => {
            const result = await res.json()
            setNotesContent(result.notes)
        })
    }

    const handleDeleteNote = (id) => {
        console.log(notesContent)
        fetch('http://localhost:3001/delete/'+id, {
            method: 'DELETE',
        }).then(async res => {
            handleGetNotes()
        })
    }

    return (
        <div className="App" style={{marginTop: 100}}>
            <div>
                {notesContent.length && notesContent.map(el => {
                    return (
                        <>
                            <div>{el.noteText} {' '}
                                <button onClick={() => handleDeleteNote(el._id)}>Удалить</button>
                            </div>
                        </>
                    )
                })}
                <button onClick={handleGetNotes}>Получить заметки</button>
            </div>
            <input
                onChange={handleInput} value={inputText}
                placeholder={'Введите заметку'}/>
            <button onClick={handleSubmit}>Сохранить заметку</button>
        </div>
    );
  // return (
  //   <div className="App">
  //     <div class="inputCard">
  //       <div class="nameField">
  //         <input type="text" class="name" placeholder="Название"></input>
  //         <button>Отправить</button>
  //       </div>
  //       <textarea></textarea>
  //    </div>
  //   </div>
  // );
}

export default App;
