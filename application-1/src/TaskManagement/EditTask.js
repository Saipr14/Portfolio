import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditTask = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [user, setUser] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:8000/taskList/${id}`)
      .then(res => res.json())
      .then(data => {
        setTitle(data.title);
        setDesc(data.desc);
        setUser(data.user);
        setDueDate(data.dueDate || '');
        setCompleted(data.completed || false);
      });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedTask = { title, desc, user, dueDate, completed };
    await fetch(`http://localhost:8000/taskList/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedTask)
    });
    navigate('/');
  };

  return (
    <div className="addTask">
        <form onSubmit={handleSubmit}>
        <label>Task</label>
        <input value={title} onChange={e => setTitle(e.target.value)} required />

        <label>Description</label>
        <textarea value={desc} onChange={e => setDesc(e.target.value)} required />

        <label>User</label>
        <input value={user} readOnly disabled style={{background:"#ececec"}} />

        <label>Completion Date & Time</label>
        <input type="datetime-local" value={dueDate} onChange={e => setDueDate(e.target.value)} />

        <label>
          <input type="checkbox" checked={completed} onChange={e => setCompleted(e.target.checked)} />
          Completed
        </label>
        <button>Update Task</button>
      </form>
    </div>

  );
};

export default EditTask;
