export default function Loader() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-white/10 rounded-full" />
        <div className="w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin absolute top-0 left-0" />
      </div>
    </div>
  );
}
