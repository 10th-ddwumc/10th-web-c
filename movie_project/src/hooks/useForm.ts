import { useState, useEffect } from 'react';

interface UseFormProps<T> {
  initialValues: T;
  validate: (values: T) => { [key: string]: string };
}

const useForm = <T extends { [key: string]: any }>({ initialValues, validate }: UseFormProps<T>) => {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isTouched, setIsTouched] = useState<{ [key: string]: boolean }>({});
  const [isValid, setIsValid] = useState(false);

  // 입력값 변경 핸들러
  const handleChange = (name: string, value: string) => {
    setValues({ ...values, [name]: value });
    setIsTouched({ ...isTouched, [name]: true });
  };

  // 값이나 터치 상태가 바뀔 때마다 유효성 검사 실행
  useEffect(() => {
    const newErrors = validate(values);
    setErrors(newErrors);
    
    // 에러가 하나도 없음 -> 유효한 것으로 간주
    setIsValid(Object.keys(newErrors).length === 0);
  }, [values, validate]);

  return { values, errors, isTouched, isValid, handleChange };
};

export default useForm;