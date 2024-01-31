const apiRoutes = {
  login: `${process.env.EXPO_PUBLIC_API_LINK}/login`,
  profile: `${process.env.EXPO_PUBLIC_API_LINK}/profile`,
  refresh: `${process.env.EXPO_PUBLIC_API_LINK}/refresh`,
  logout: `${process.env.EXPO_PUBLIC_API_LINK}/logout`,
  updateUser: `${process.env.EXPO_PUBLIC_API_LINK}/update-user`,
  updatePassword: `${process.env.EXPO_PUBLIC_API_LINK}/update-password`,
  requests: `${process.env.EXPO_PUBLIC_API_LINK}/requests`,
  cancelRequest: `${process.env.EXPO_PUBLIC_API_LINK}/cancel-request`,
  requestableItems: `${process.env.EXPO_PUBLIC_API_LINK}/requestable-items`,
  createRequest: `${process.env.EXPO_PUBLIC_API_LINK}/create-request`,
};

export default apiRoutes;
