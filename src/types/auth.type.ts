export interface ILoginResponse {
  token: string;
  accessToken: string;
  refreshToken: string;
  data: {
    user: {
      id: string;
      email: string;
      name: string;
      role: string;
      image: string | null;
      status: string;
      emailVerified: boolean;
      needPasswordChange: boolean;
      createdAt: string;
      updatedAt: string;
      isDeleted: boolean;
      deletedAt: string | null;
    };
    redirect: boolean;
  };
}
