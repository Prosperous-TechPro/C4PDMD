const ErrorMessage = ({ message }) => {
  return (
    <div className="text-red-500 text-center py-10">
      {message}
    </div>
  );
};

export default ErrorMessage;