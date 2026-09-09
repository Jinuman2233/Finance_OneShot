export default function SiteFooter() {
  return (
    <footer className="border-t border-zinc-200 bg-white py-8">
      <div className="mx-auto max-w-6xl px-4 text-center sm:px-6">
        <p className="text-sm font-medium text-zinc-700">
          Office Worker Financial Toolkit
        </p>
        <p className="mt-1 text-xs leading-relaxed text-zinc-400">
          © {new Date().getFullYear()} · 참고용 근사 계산 · 세무·노무 자문을
          대체하지 않습니다
        </p>
      </div>
    </footer>
  );
}
