import React from "react";
import { Container, Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import SingleTask from "./components/SingleTask";
import Pages from "./components/Pages";

const App = () => {
    const [input, setInput] = useState("");
    const [tasks, setTasks] = useState([]);
    const [taskStatus, setTaskStatus] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const tasksPerPage = 7;
    const totalPages = Math.ceil(tasks.length / tasksPerPage);
    const indexOfLastTask = currentPage * tasksPerPage;
    const indexOfFirstTask = indexOfLastTask - tasksPerPage;
    const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);

    useEffect(() => {
        const storedTasks = localStorage.getItem("tasks");
        if (storedTasks) {
            setTasks(JSON.parse(storedTasks));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

    const addTask = (e, input) => {
        e.preventDefault();
        if (input === "") return;
        const newTask = {
            id: Math.random(),
            task: input,
        };
        setTasks([newTask, ...tasks]);
        setInput("");

        if (currentTasks.length === 0) {
            setCurrentPage(1);
        }
    };

    const deleteTask = (id) => {
        const newTasks = tasks.filter((task) => task.id !== id);
        setTasks(newTasks);

        // Update page after deleting a track
        const maxPages = Math.ceil(newTasks.length / tasksPerPage);
        if (currentPage > maxPages) {
            setCurrentPage(maxPages);
        }

        // Local Storage
        const updatedTaskStatus = { ...taskStatus };
        delete updatedTaskStatus[id];
        setTaskStatus(updatedTaskStatus);
        localStorage.setItem("taskStatus", JSON.stringify(updatedTaskStatus));
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <Container className="wrapper" fluid>
            <Form onSubmit={(e) => addTask(e, input)} className="form mt-5 ">
                <Form.Control
                    className="mb-5"
                    type="text"
                    placeholder="Add new task..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
                <SingleTask
                    currentTasks={currentTasks}
                    deleteTask={deleteTask}
                    taskStatus={taskStatus}
                    setTaskStatus={setTaskStatus}
                />
            </Form>
            <Pages
                totalPages={totalPages}
                currentPage={currentPage}
                handlePageChange={handlePageChange}
            />
        </Container>
    );
};

export default App;
