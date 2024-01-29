const apiRoutes = {
  login: `${process.env.EXPO_PUBLIC_API_LINK}/login`,
  profile: `${process.env.EXPO_PUBLIC_API_LINK}/profile`,
  refresh: `${process.env.EXPO_PUBLIC_API_LINK}/refresh`,
  logout: `${process.env.EXPO_PUBLIC_API_LINK}/logout`,
  updateUser: `${process.env.EXPO_PUBLIC_API_LINK}/update-user`,
  updatePassword: `${process.env.EXPO_PUBLIC_API_LINK}/update-password`,
};

export default apiRoutes;
