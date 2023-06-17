import React from "react";
import { Form } from "react-bootstrap";
import { useEffect } from "react";
import { BsFillTrash3Fill } from "react-icons/bs";

const SingleTask = ({ currentTasks, deleteTask, taskStatus, setTaskStatus }) => {
    useEffect(() => {
        const storedTaskStatus = localStorage.getItem("taskStatus");
        if (storedTaskStatus) {
            setTaskStatus(JSON.parse(storedTaskStatus));
        }
        if (storedTaskStatus) {
            setTaskStatus(JSON.parse(storedTaskStatus));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("taskStatus", JSON.stringify(taskStatus));
    }, [taskStatus]);

    const handleClick = (taskId) => {
        setTaskStatus((prevStatus) => ({
            ...prevStatus,
            [taskId]: !prevStatus[taskId] || false,
        }));
    };

    return (
        <div className="task-wrapper">
            {currentTasks.map((task) => {
                const isDone = taskStatus[task.id] || false;

                return (
                    <div className="task" key={task.id}>
                        <Form.Check
                            checked={isDone}
                            type="checkbox"
                            label={
                                <span className={isDone ? "text-crossed" : null}>{task.task}</span>
                            }
                            onChange={() => handleClick(task.id)}
                        />
                        <BsFillTrash3Fill
                            onClick={() => deleteTask(task.id)}
                            className="del-icon"
                        />
                    </div>
                );
            })}
        </div>
    );
};

export default SingleTask;
