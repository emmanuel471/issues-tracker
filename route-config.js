export const route = "http://localhost:3000";

export const API_ENDPOINTS = {
  issues: `${route}/api/issues`,
  issue_by_id: (id) => `${route}/api/issues/${id}`,
};
