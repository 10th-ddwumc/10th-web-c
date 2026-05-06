interface ErrorMessageProps {
  message: string
  onRetry: () => void
}

const ErrorMessage = ({ message, onRetry }: ErrorMessageProps) => {
  return (
    <div className='flex flex-col justify-center items-center h-96 gap-4'>
      <p className='text-red-500'>{message}</p>
      <button
        onClick={onRetry}
        className='bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600'
      >
        다시 시도
      </button>
    </div>
  )
}

export default ErrorMessage