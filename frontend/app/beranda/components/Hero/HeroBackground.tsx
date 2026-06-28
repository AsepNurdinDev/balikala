export default function HeroBackground() {
  return (
    <>
      <div className="absolute inset-0 bg-gradient-to-br from-[#F8F5F0] via-[#EFE6DA] to-[#D7C1A3]" />

      <div className="absolute right-0 bottom-0 h-[500px] w-[500px] rounded-full bg-[#C89B3C]/20 blur-3xl" />

      <div className="absolute left-0 top-20 h-[350px] w-[350px] rounded-full bg-[#8B5E3C]/10 blur-3xl" />
    </>
  );
}