export function SiteFooter() {
  return (
    <footer className="bg-footer text-[#e8e1d8]">
      <div className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-12 border-b border-white/10 pb-14 md:grid-cols-2 xl:grid-cols-4">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-primary">Bible Memory</p>
            <h3 className="mt-5 text-3xl font-light tracking-[0.08em] text-white">성경 암송 대회</h3>
            <p className="mt-5 max-w-xs text-sm leading-7 text-white/62">
              말씀을 배우고 나누는 공동체 행사를 위한 성경 암송 플랫폼입니다.
            </p>
          </div>

          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-white/70">Explore</p>
            <ul className="mt-6 space-y-3 text-sm text-white/62">
              <li>대회 안내</li>
              <li>참가 신청</li>
              <li>암송 시험</li>
              <li>랭킹</li>
            </ul>
          </div>

          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-white/70">Schedule</p>
            <ul className="mt-6 space-y-3 text-sm text-white/62">
              <li>접수: 2026.05.01 - 05.14</li>
              <li>시험: 2026.05.18 - 05.24</li>
              <li>발표: 2026.05.31</li>
            </ul>
          </div>

          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-white/70">Newsletter</p>
            <p className="mt-6 text-sm leading-7 text-white/62">행사 소식과 공지 업데이트를 이메일로 받아보세요.</p>
            <div className="mt-6 flex gap-3 border-b border-white/15 pb-3">
              <input
                type="email"
                placeholder="Email Address"
                className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/35"
              />
              <button type="button" className="text-xs uppercase tracking-[0.22em] text-primary">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 pt-6 text-xs text-white/45 md:flex-row md:items-center md:justify-between">
          <p>© 2026 Bible Memory Competition. All rights reserved.</p>
          <p>기도와 말씀, 그리고 공동체를 위한 행사 홈페이지</p>
        </div>
      </div>
    </footer>
  );
}
