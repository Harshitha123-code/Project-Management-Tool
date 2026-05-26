import axios from "axios";

const API_URL =
  "http://localhost:5000/api/projects";

export const createProject = async (
  projectData
) => {

  const response = await axios.post(
    API_URL,
    projectData
  );

  return response.data;
};

export const getProjects = async () => {

  const response = await axios.get(
    API_URL
  );

  return response.data;
};
export const deleteProject = async (
  projectId
) => {

  const response = await axios.delete(
    `${API_URL}/${projectId}`
  );

  return response.data;
};