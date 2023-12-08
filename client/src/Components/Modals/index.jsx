function Modal(props) {
  const { variant, extra, children, ...rest } = props;
  return (
    <div
      className={`fixed left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50 py-10 z-40  ${extra}`}
      {...rest}
    >
      {children}
    </div>
  );
}

export default Modal;
