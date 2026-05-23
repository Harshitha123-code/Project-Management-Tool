import axios from "axios";

const API_URL =
  "http://localhost:5000/api/tasks";

export const createTask = async (
  taskData
) => {

  const response = await axios.post(
    API_URL,
    taskData
  );

  return response.data;
};

export const getTasks = async () => {

  const response = await axios.get(
    API_URL
  );

  return response.data;
}

export const updateTaskStatus = async (
  taskId,
  status
) => {

  const response = await axios.put(
    `${API_URL}/${taskId}`,
    { status }
  );

  return response.data;
};