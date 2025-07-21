import TaskList from "../TaskManagement/Tasks";
import useFetch from "../useFetch";

const Home = ({ searchTerm, setSearchTerm }) => {
    const { data: list, isPending, fetchError } = useFetch('http://localhost:8000/taskList');

    return (
        <div className="home">
            {fetchError &&
                <div className="error">
                    <h3>{fetchError}</h3>
                </div>
            }
            {isPending &&
                <div className="loading">
                    <h3>Fetching data. Please wait... </h3>
                </div>
            }
            {list && <TaskList list={list.filter((task) =>
            task.title.toLowerCase().includes(searchTerm.toLowerCase())
            )}
            title="My Tasks"/>}


        </div>
    );
}

export default Home;
