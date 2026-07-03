import API from "../axios";

export const getTeamMembers = async () => {
  const response = await API.get("/team");
  return response.data;
};

export const createTeamMember = async (data) => {
  const response = await API.post("/team", data);
  return response.data;
};

export const updateTeamMember = async (
  id,
  data
) => {
  const response = await API.put(
    `/team/${id}`,
    data
  );

  return response.data;
};

export const deleteTeamMember = async (
  id
) => {
  const response = await API.delete(
    `/team/${id}`
  );

  return response.data;
};

export const getTeamMemberById = async (id) => {
  const response = await API.get(`/team/${id}`);
  return response.data;
};