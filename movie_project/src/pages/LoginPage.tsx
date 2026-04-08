import { useNavigate } from 'react-router-dom';
import useForm from '../hooks/useForm';

const LoginPage = () => {
  const navigate = useNavigate();

  const validateLogin = (values: any) => {
    const errors: { email?: string; password?: string } = {};
    if (!values.email) {
      errors.email = "이메일을 입력해주세요.";
    } else if (!/^\S+@\S+\.\S+$/.test(values.email)) {
      errors.email = "유효하지 않은 이메일 형식입니다.";
    }

    if (!values.password) {
      errors.password = "비밀번호를 입력해주세요.";
    } else if (values.password.length < 6) {
      errors.password = "비밀번호는 최소 6자 이상이어야 합니다.";
    }
    return errors;
  };

  const { values, errors, isTouched, isValid, handleChange } = useForm({
    initialValues: { email: '', password: '' },
    validate: validateLogin,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValid) {
      console.log("로그인 데이터:", values);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-zinc-900 rounded-2xl shadow-xl border border-zinc-800">
      {/* 뒤로 가기 버튼 */}
      <button 
        onClick={() => navigate(-1)} 
        className="mb-6 text-zinc-400 hover:text-white transition-colors flex items-center gap-1"
      >
        <span className="text-xl">{"<"}</span> 뒤로가기
      </button>

      <h1 className="text-3xl font-bold mb-8 text-white text-center">로그인</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        {/* 이메일 필드 */}
        <div className="flex flex-col gap-2">
          <input
            type="email"
            placeholder="이메일을 입력해주세요"
            className={`p-4 rounded-lg bg-zinc-800 border ${
              isTouched.email && errors.email ? 'border-red-500' : 'border-zinc-700'
            } focus:outline-none focus:border-red-600 text-white`}
            value={values.email}
            onChange={(e) => handleChange('email', e.target.value)}
          />
          {isTouched.email && errors.email && (
            <span className="text-red-500 text-sm pl-1">{errors.email}</span>
          )}
        </div>

        {/* 비밀번호 필드 */}
        <div className="flex flex-col gap-2">
          <input
            type="password"
            placeholder="비밀번호를 입력해주세요"
            className={`p-4 rounded-lg bg-zinc-800 border ${
              isTouched.password && errors.password ? 'border-red-500' : 'border-zinc-700'
            } focus:outline-none focus:border-red-600 text-white`}
            value={values.password}
            onChange={(e) => handleChange('password', e.target.value)}
          />
          {isTouched.password && errors.password && (
            <span className="text-red-500 text-sm pl-1">{errors.password}</span>
          )}
        </div>

        {/* 로그인 버튼 */}
        <button
          type="submit"
          disabled={!isValid}
          className={`mt-4 p-4 rounded-lg font-bold text-lg transition-all ${
            isValid 
            ? 'bg-red-600 hover:bg-red-700 text-white cursor-pointer' 
            : 'bg-zinc-700 text-zinc-500 cursor-not-allowed opacity-50'
          }`}
        >
          로그인
        </button>
        <div className="mt-6 text-center text-zinc-400">
            계정이 없으신가요? 
            <button onClick={() => navigate('/signup')} className="ml-2 text-red-500 font-bold hover:underline">
            회원가입
            </button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;