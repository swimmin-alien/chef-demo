import React from 'react';

interface TutorialWelcomeProps {
  onStart: () => void;
  onSkip: () => void;
}

const TutorialWelcome: React.FC<TutorialWelcomeProps> = ({ onStart, onSkip }) => (
  <div className="fixed inset-0 z-[90] flex items-end sm:items-center justify-center sm:p-5">
    <div className="absolute inset-0 bg-gray-900/45 backdrop-blur-sm" />
    <section
      role="dialog"
      aria-modal="true"
      aria-labelledby="tutorial-title"
      className="relative w-full max-w-lg overflow-hidden rounded-t-[2rem] sm:rounded-[2rem] bg-white shadow-2xl animate-slide-up sm:animate-fade-in"
    >
      <div className="bg-gray-900 px-6 py-7 text-white">
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[11px] font-bold tracking-wide">
          <span className="h-1.5 w-1.5 rounded-full bg-white" />
          首次使用教学
        </div>
        <h2 id="tutorial-title" className="text-3xl font-bold leading-tight tracking-tight">
          30 秒走完一次<br />智能食谱体验
        </h2>
        <p className="mt-3 max-w-sm text-sm leading-relaxed text-gray-300">
          我们会装入一组示例食材，带你完成偏好设置、查看食谱和避坑指导。
        </p>
      </div>

      <div className="space-y-5 p-6">
        <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gray-900 text-white">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-bold text-gray-900">这不是实时 AI 生成</p>
              <p className="mt-1 text-xs leading-relaxed text-gray-500">
                本次教学读取预先准备好的案例，不连接 AI、不发送生成请求，也不会产生 API 费用。
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={onStart}
          className="w-full rounded-2xl bg-gray-900 py-4 text-sm font-bold text-white shadow-lg shadow-gray-200 transition hover:bg-black active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
        >
          开始 30 秒教学
        </button>
        <button
          onClick={onSkip}
          className="w-full py-1 text-xs font-semibold text-gray-400 transition hover:text-gray-700 focus:outline-none focus:underline"
        >
          跳过教学，自由查看演示
        </button>
      </div>
    </section>
  </div>
);

export default TutorialWelcome;
