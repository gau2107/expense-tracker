const ValidationMessage = ({errors, message}) => {
  return (
    <>
        <span className="text-red-500 text-sm ">
          {message || "This field is required"}
        </span>
    </>
  );
};
export default ValidationMessage;