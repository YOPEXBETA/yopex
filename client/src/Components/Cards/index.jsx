function Card(props) {
  const { variant, extra, children, ...rest } = props;
  return (
    <div
      className={`!z-5 relative flex flex-col md:rounded-xl dark:border-zinc-700 rounded-none  rounded-[20px] hover:shadow-lg hover:scale-102 bg-white bg-clip-border  dark:bg-zinc-800  dark:text-white dark:shadow-none transition  cursor-pointer hover:scale-102 duration-500 bg-clip-border border-[1px] border-gray-100 ${extra}`}
      {...rest}
    >
      {children}
    </div>
  );
}

export default Card;
