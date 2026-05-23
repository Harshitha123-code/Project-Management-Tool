import { useEffect, useState } from "react";

import {
  createProject,
  getProjects,
} from "../services/projectService";

import {
  createTask,
  getTasks,
  updateTaskStatus,
} from "../services/taskService";

function Dashboard() {

  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);

  const [projectForm, setProjectForm] = useState({
    title: "",
    description: "",
  });

  const [taskForm, setTaskForm] = useState({
    title: "",
    description: "",
    priority: "Medium",
    projectId: "",
  });

  // FETCH PROJECTS
  const fetchProjects = async () => {
    try {

      const data = await getProjects();

      setProjects(data);

    } catch (error) {
      console.log(error);
    }
  };

  // FETCH TASKS
  const fetchTasks = async () => {
    try {

      const data = await getTasks();

      setTasks(data);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProjects();
    fetchTasks();
  }, []);

  // PROJECT INPUT CHANGE
  const handleProjectChange = (e) => {
    setProjectForm({
      ...projectForm,
      [e.target.name]: e.target.value,
    });
  };

  // TASK INPUT CHANGE
  const handleTaskChange = (e) => {
    setTaskForm({
      ...taskForm,
      [e.target.name]: e.target.value,
    });
  };

  // CREATE PROJECT
  const handleProjectSubmit = async (e) => {
    e.preventDefault();

    try {

      await createProject(projectForm);

      alert("Project Created");

      setProjectForm({
        title: "",
        description: "",
      });

      fetchProjects();

    } catch (error) {
      console.log(error);
    }
  };

  // CREATE TASK
  const handleTaskSubmit = async (e) => {
    e.preventDefault();

    try {

      await createTask(taskForm);

      alert("Task Created");

      setTaskForm({
        title: "",
        description: "",
        priority: "Medium",
        projectId: "",
      });

      fetchTasks();

    } catch (error) {
      console.log(error);
    }
  };

  const handleStatusChange = async (
  taskId,
  status
) => {

  try {

    await updateTaskStatus(
      taskId,
      status
    );

    fetchTasks();

  } catch (error) {
    console.log(error);
  }
};

  return (
    <div className="min-h-screen bg-black text-white p-10">

      <h1 className="text-4xl font-bold text-cyan-400 mb-10">
        Dashboard
      </h1>

      <div className="grid grid-cols-4 gap-6 mb-10">

  <div className="bg-gray-900 p-6 rounded-lg">
    <h2 className="text-xl">
      Total Projects
    </h2>

    <p className="text-3xl mt-4 text-cyan-400">
      {projects.length}
    </p>
  </div>

  <div className="bg-gray-900 p-6 rounded-lg">
    <h2 className="text-xl">
      Total Tasks
    </h2>

    <p className="text-3xl mt-4 text-cyan-400">
      {tasks.length}
    </p>
  </div>

  <div className="bg-gray-900 p-6 rounded-lg">
    <h2 className="text-xl">
      Completed
    </h2>

    <p className="text-3xl mt-4 text-green-400">
      {
        tasks.filter(
          (task) =>
            task.status === "Completed"
        ).length
      }
    </p>
  </div>

  <div className="bg-gray-900 p-6 rounded-lg">
    <h2 className="text-xl">
      Pending
    </h2>

    <p className="text-3xl mt-4 text-yellow-400">
      {
        tasks.filter(
          (task) =>
            task.status !== "Completed"
        ).length
      }
    </p>
  </div>

</div>

      {/* PROJECT FORM */}
      <div className="bg-gray-900 p-6 rounded-lg mb-10">

        <h2 className="text-2xl mb-4">
          Create Project
        </h2>

        <form
          onSubmit={handleProjectSubmit}
          className="space-y-4"
        >

          <input
            type="text"
            name="title"
            placeholder="Project Title"
            value={projectForm.title}
            onChange={handleProjectChange}
            className="w-full p-3 rounded bg-gray-800"
          />

          <textarea
            name="description"
            placeholder="Project Description"
            value={projectForm.description}
            onChange={handleProjectChange}
            className="w-full p-3 rounded bg-gray-800"
          />

          <button
            className="bg-cyan-500 px-6 py-3 rounded"
          >
            Create Project
          </button>

        </form>

      </div>

      {/* TASK FORM */}
      <div className="bg-gray-900 p-6 rounded-lg mb-10">

        <h2 className="text-2xl mb-4">
          Create Task
        </h2>

        <form
          onSubmit={handleTaskSubmit}
          className="space-y-4"
        >

          <input
            type="text"
            name="title"
            placeholder="Task Title"
            value={taskForm.title}
            onChange={handleTaskChange}
            className="w-full p-3 rounded bg-gray-800"
          />

          <textarea
            name="description"
            placeholder="Task Description"
            value={taskForm.description}
            onChange={handleTaskChange}
            className="w-full p-3 rounded bg-gray-800"
          />

          <select
            name="priority"
            value={taskForm.priority}
            onChange={handleTaskChange}
            className="w-full p-3 rounded bg-gray-800"
          >

            <option>Low</option>
            <option>Medium</option>
            <option>High</option>

          </select>

          <select
            name="projectId"
            value={taskForm.projectId}
            onChange={handleTaskChange}
            className="w-full p-3 rounded bg-gray-800"
          >

            <option value="">
              Select Project
            </option>

            {projects.map((project) => (
              <option
                key={project._id}
                value={project._id}
              >
                {project.title}
              </option>
            ))}

          </select>

          <button
            className="bg-cyan-500 px-6 py-3 rounded"
          >
            Create Task
          </button>

        </form>

      </div>

      {/* PROJECTS */}
      <h2 className="text-3xl mb-6">
        Projects
      </h2>

      <div className="grid grid-cols-3 gap-6 mb-12">

        {projects.map((project) => (

          <div
            key={project._id}
            className="bg-gray-900 p-6 rounded-lg"
          >

            <h2 className="text-2xl font-bold mb-2">
              {project.title}
            </h2>

            <p className="text-gray-400">
              {project.description}
            </p>

          </div>

        ))}

      </div>

      {/* TASKS */}
      <h2 className="text-3xl mb-6">
        Tasks
      </h2>

      <div className="grid grid-cols-3 gap-6">

        {tasks.map((task) => (

          <div
            key={task._id}
            className="bg-gray-900 p-6 rounded-lg"
          >

            <h2 className="text-2xl font-bold mb-2">
              {task.title}
            </h2>

            <p className="text-gray-400 mb-3">
              {task.description}
            </p>

            <p className="mb-2">
              Priority:
              <span className="text-cyan-400 ml-2">
                {task.priority}
              </span>
            </p>

            <div className="mb-3">

  <p className="mb-2">
    Status:
  </p>

  <select
    value={task.status}
    onChange={(e) =>
      handleStatusChange(
        task._id,
        e.target.value
      )
    }
    className="bg-gray-800 p-2 rounded"
  >

    <option>To Do</option>
    <option>In Progress</option>
    <option>Completed</option>

  </select>

</div>

            <p>
              Project:
              <span className="text-yellow-400 ml-2">
                {task.projectId?.title}
              </span>
            </p>

          </div>

        ))}

      </div>

    </div>
  );
}

export default Dashboard;