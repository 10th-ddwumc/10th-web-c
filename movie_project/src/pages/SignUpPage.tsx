import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { signUpSchema } from '../types/auth';
import type { SignUpFormValues } from '../types/auth'; 

const SignUpPage = () => {
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    trigger,
    formState: { errors, isValid },
  } = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    mode: 'onChange', 
  });

  const emailValue = watch("email");

  const nextStep = async () => {
    let fieldsToValidate: any[] = [];
    if (step === 1) fieldsToValidate = ["email"];
    if (step === 2) fieldsToValidate = ["password", "passwordCheck"];

    const isStepValid = await trigger(fieldsToValidate);
    if (isStepValid) setStep(step + 1);
  };

  const onSubmit = (data: SignUpFormValues) => {
    console.log("회원가입 완료:", data);
    // 회원가입 성공 후 홈으로 이동
    alert("회원가입이 완료되었습니다!");
    navigate("/");
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-8 bg-zinc-900 rounded-2xl border border-zinc-800 text-white">
      <h1 className="text-3xl font-black mb-10 text-center">회원가입</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        {/* 이메일 입력 */}
        {step >= 1 && (
          <div className="flex flex-col gap-2">
            <label className="text-sm text-zinc-400">이메일 주소</label>
            <input
              {...register("email")}
              placeholder="example@gmail.com"
              disabled={step > 1}
              className={`p-4 rounded-lg bg-zinc-800 border ${errors.email ? 'border-red-500' : 'border-zinc-700'} focus:outline-none`}
            />
            {errors.email && <span className="text-red-500 text-xs">{errors.email.message}</span>}
            {step === 1 && (
              <button type="button" onClick={nextStep} disabled={!emailValue || !!errors.email}
                className="mt-4 p-4 bg-red-600 rounded-lg font-bold disabled:opacity-50">다음</button>
            )}
          </div>
        )}

        {/* 비밀번호 설정 */}
        {step >= 2 && (
          <div className="flex flex-col gap-4 animate-fadeIn">
            <div className="flex flex-col gap-2 relative">
              <label className="text-sm text-zinc-400">비밀번호</label>
              <input
                {...register("password")}
                type={showPassword ? "text" : "password"}
                placeholder="6자 이상 입력"
                className="p-4 rounded-lg bg-zinc-800 border border-zinc-700"
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-10 text-zinc-500">
                {showPassword ? "👁️" : "🙈"}
              </button>
              {errors.password && <span className="text-red-500 text-xs">{errors.password.message}</span>}
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm text-zinc-400">비밀번호 재확인</label>
              <input
                {...register("passwordCheck")}
                type="password"
                placeholder="다시 한번 입력"
                className="p-4 rounded-lg bg-zinc-800 border border-zinc-700"
              />
              {errors.passwordCheck && <span className="text-red-500 text-xs">{errors.passwordCheck.message}</span>}
            </div>
            {step === 2 && (
              <button type="button" onClick={nextStep} className="mt-2 p-4 bg-red-600 rounded-lg font-bold">다음</button>
            )}
          </div>
        )}

        {/* 닉네임 및 완료 */}
        {step === 3 && (
          <div className="flex flex-col gap-6 animate-fadeIn">
            <div className="flex flex-col items-center gap-3">
              <div className="w-24 h-24 bg-zinc-800 rounded-full flex items-center justify-center border-2 border-dashed border-zinc-600 text-zinc-500 text-xs text-center">
                프로필<br/>이미지
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm text-zinc-400">닉네임</label>
              <input {...register("nickname")} placeholder="사용할 닉네임을 입력하세요" className="p-4 rounded-lg bg-zinc-800 border border-zinc-700" />
              {errors.nickname && <span className="text-red-500 text-xs">{errors.nickname.message}</span>}
            </div>
            <button type="submit" disabled={!isValid} className="mt-4 p-4 bg-red-600 rounded-lg font-bold disabled:opacity-50">회원가입 완료</button>
          </div>
        )}
      </form>
    </div>
  );
};

export default SignUpPage;