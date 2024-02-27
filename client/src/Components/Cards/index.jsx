function Card(props) {
  const { variant, extra, children, ...rest } = props;
  return (
    <div
      className={`!z-5 relative flex flex-col md:rounded-2xl rounded-none border-gray-200 border-[1px] hover:shadow-xl hover:scale-102 bg-white bg-clip-border shadow-3xl shadow-shadow-500 dark:bg-zinc-800  dark:text-white dark:shadow-none transition  cursor-pointer hover:scale-102 duration-500  ${extra}`}
      {...rest}
    >
      {children}
    </div>
  );
}

export default Card;
