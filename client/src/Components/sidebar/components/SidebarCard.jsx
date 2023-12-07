const SidebarCard = () => {
  return (
    <div className="relative mt-14 flex w-[256px] justify-center rounded-[20px] bg-gradient-to-br from-[#868CFF] via-[#432CF3] to-brand-500 pb-4">
      <div className="mt-16 flex h-fit flex-col items-center">
        <a
          target="blank"
          className="text-medium mt-7 block rounded-full bg-gradient-to-b from-white/50 to-white/10 py-[12px] px-11 text-center text-base text-white hover:bg-gradient-to-b hover:from-white/40 hover:to-white/5 "
          href="https://horizon-ui.com/pro?ref=live-free-tailwind-react"
        >
          Create
        </a>
      </div>
    </div>
  );
};

export default SidebarCard;
