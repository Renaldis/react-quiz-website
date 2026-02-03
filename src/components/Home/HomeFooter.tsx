export default function HomeFooter() {
  return (
    <footer className="w-full bg-white border-t border-slate-200 py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="text-black font-bold text-xl tracking-tight">
            Quizz<span className="text-blue-500">ly</span>
          </div>

          <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm font-medium text-slate-400">
            <a href="#" className="hover:text-blue-500 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-blue-500 transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-blue-500 transition-colors">
              Contact Us
            </a>
          </div>

          <div className="text-slate-500 text-xs">
            © 2026 Quzzly by renaldis. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
