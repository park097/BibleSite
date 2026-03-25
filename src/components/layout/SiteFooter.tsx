export function SiteFooter() {
  return (
    <footer className="bg-footer text-gray-300">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 md:grid-cols-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-accent">About</p>
          <h3 className="mt-5 font-serif text-3xl text-white">성경 암송 대회</h3>
          <p className="mt-5 max-w-sm text-sm leading-8 text-gray-300">
            말씀을 마음에 새기고 공동체 안에서 나누는 교회 행사 플랫폼입니다. 안내, 신청, 공지와 기록을 한곳에 담았습니다.
          </p>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-accent">Address</p>
          <div className="mt-5 space-y-3 text-sm leading-8 text-gray-300">
            <p>샘물교회</p>
            <p>서울시 중구 샘물로 100</p>
            <p>02-123-4567</p>
            <p>biblememory@church.org</p>
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-accent">Newsletter</p>
          <p className="mt-5 text-sm leading-8 text-gray-300">행사 공지와 변경 사항을 이메일로 받아보세요.</p>
          <div className="mt-6 space-y-3">
            <input
              type="email"
              placeholder="이메일 주소"
              className="w-full rounded-lg border border-gray-600 bg-gray-800 px-4 py-3 text-sm text-white outline-none placeholder:text-gray-400"
            />
            <button
              type="button"
              className="w-full rounded-lg bg-primary px-4 py-3 text-sm font-medium uppercase tracking-[0.18em] text-white transition duration-300 hover:bg-[#183b5d]"
            >
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
