import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const { login } = useAuth();

  const handleLogin = () => {
    login('test-token-1234');
  };

  return (
    <div>
      <h1>로그인 페이지</h1>
      <button onClick={handleLogin}>로그인</button>
    </div>
  );
};

export default LoginPage;