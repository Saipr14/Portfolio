import { Link } from "react-router-dom";
import { useState } from "react";
import DueDate from './DueDate';

const TaskList = ({ list, title }) => {
    const [taskList, setTaskList] = useState(list); // make a local copy to manage

    const handleComplete = async (id, completed) => {
        try {
            const response = await fetch(`http://localhost:8000/taskList/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ completed: !completed })
            });
            if (!response.ok) throw new Error('Failed to update task');

            // update local state after successful patch
            setTaskList(prev =>
                prev.map(task =>
                    task.id === id ? { ...task, completed: !completed } : task
                )
            );
        } catch (error) {
            console.error("Error updating task:", error);
            alert("Error updating task");
        }
    };

    return (
        <div className="tasks mt-2">
            <div className="task-width">
                <div className="title">
                    <h2>{title}</h2>
                </div>
                <hr />
            </div>

            {taskList.length === 0 && (
                <div className="no-tasks">
                    <h3>No tasks Right Now.</h3>
                    <img src="/public/blackHole.jpg" alt="taskBlackHole" />
                </div>
            )}

            {taskList.map((task) => (
                <Link className="nav-link" to={`/taskdesc/${task.id}`} key={task.id}>
                    <div className="list-preview"
                        style={{ background: task.completed ? "#e0ffe0" : "" }}
                        onClick={(e) => e.stopPropagation()}>
                        <div className="list-items mt-2">
                            <input
                                type="checkbox"
                                checked={task.completed || false}
                                onChange={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    handleComplete(task.id, task.completed);
                                }}
                                onClick={(e) => e.stopPropagation()}
                            />
                        </div>
                        <div className="list-items">
                                <h2 style={{
                                    textDecoration: task.completed ? "line-through" : "none",
                                    color: task.completed ? "grey" : ""
                                }}>
                                    {task.title}
                                </h2>
                            <DueDate date={task.dueDate} />
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default TaskList;
