export default function ProfileLoading() {
  return (
    <main className="flex min-h-[100dvh] items-center justify-center bg-[#050505] px-4 py-8">
      <div className="w-full max-w-[430px] rounded-[2rem] border border-white/10 bg-[#0a0a0a] px-5 py-7 sm:px-8 sm:py-9">
        <div className="mx-auto size-32 animate-pulse rounded-full bg-white/8" />
        <div className="mx-auto mt-5 h-8 w-48 animate-pulse rounded-lg bg-white/8" />
        <div className="mx-auto mt-3 h-16 w-full max-w-[280px] animate-pulse rounded-lg bg-white/6" />
        <div className="mt-8 grid gap-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="h-18 animate-pulse rounded-2xl bg-white/6" />
          ))}
        </div>
      </div>
    </main>
  );
}
