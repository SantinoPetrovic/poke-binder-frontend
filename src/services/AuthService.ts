interface LoginCredentials {
  username: string;
  password: string;
}

interface AuthResponse {
  token: string;
  user: {
    id: number;
    username: string;
  };
}

const LOGIN_URL = `${process.env.REACT_APP_API_URL}/users/login`;

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {

    const response = await fetch(LOGIN_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
    
    if (!response.ok) {
      throw new Error('Login failed');
    }
    return response.json();
  },

  logout(): void {
    localStorage.removeItem('token');
  },

  getToken(): string | null {
    let token = localStorage.getItem('token');
    if ((token?.length ?? 0) > 0) {
      const raw = localStorage.getItem("expired");
      let expired: Date | null = raw ? new Date(raw) : null;
      let currentDate = new Date();
      if (expired && expired < currentDate) {
        this.logout();
      }
    }
    return token;
  },

  setToken(token: string): void {
    let dateModify = new Date();
    dateModify.setHours(dateModify.getHours() + 3);
    localStorage.setItem('token', token);
    localStorage.setItem('expired', dateModify.toISOString());
  },
};