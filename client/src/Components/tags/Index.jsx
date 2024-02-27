function Tag(props) {
  const { variant, extra, children, ...rest } = props;
  return (
    <div
      className={`block rounded-md  py-[5px] px-[14px] text-base text-dark dark:text-white hover:bg-green-500 border hover:text-white
      ${extra}`}
      {...rest}
    >
      {children}
    </div>
  );
}

export default Tag;
