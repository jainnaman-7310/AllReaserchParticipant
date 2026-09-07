/* eslint-disable jsx-quotes */
import React from 'react';
// import { useTranslation } from 'react-i18next';

function Header() {
  // const { t } = useTranslation();

  return (
    <header className="min-h-screen w-full overflow-hidden bg-[#f5faff] text-[#183b50]">
      {/* Background */}
      <div className="pointer-events-none absolute -left-32 -top-32 h-80 w-80 rounded-full bg-[#0d9bd7]/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 top-20 h-96 w-96 rounded-full bg-[#0d9bd7]/10 blur-3xl" />

      <div className="relative mx-auto flex min-h-screen w-full max-w-[1200px] flex-col px-5 py-6 sm:px-8 lg:px-12">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0798d3] shadow-md shadow-[#0798d3]/20">
              <span className="text-lg font-black text-white">A</span>
            </div>

            <div>
              <p className="text-sm font-extrabold tracking-wide text-[#087eaf]">
                AllReaserch
              </p>
              <p className="text-[9px] font-medium uppercase tracking-[2px] text-slate-400">
                Survey Community
              </p>
            </div>
          </div>

          {/* Privacy */}
          <div className="hidden items-center gap-2 rounded-full border border-[#dcecf4] bg-white px-4 py-2 shadow-sm sm:flex">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            <span className="text-xs font-semibold text-slate-500">
              Your privacy matters
            </span>
          </div>
        </div>

        {/* Main */}
        <main className="flex flex-1 items-center justify-center py-14">
          <section className="w-full max-w-3xl text-center">

            {/* Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#cfe9f5] bg-white px-4 py-2 shadow-sm">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#e1f4fb] text-[11px] text-[#0786bb]">
                ✦
              </span>

              <span className="text-[10px] font-bold uppercase tracking-[1.5px] text-[#0786bb]">
                Welcome to AllReaserch
              </span>
            </div>

            {/* Heading */}
            <h1 className="mx-auto max-w-2xl text-4xl font-black leading-[1.08] tracking-tight text-[#0878ad] sm:text-5xl lg:text-6xl">
              Share Your Opinion
            </h1>

            {/* Divider */}
            <div className="mx-auto mt-6 h-1 w-14 rounded-full bg-[#0b9bd5]" />

            {/* Description */}
            <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-slate-600 sm:text-base">
              Your feedback helps businesses make better decisions.
            </p>

            {/* Survey Info */}
            <div className="mx-auto mt-8 flex max-w-md flex-wrap items-center justify-center gap-3">
              {/* <div className="rounded-full border border-[#dcecf4] bg-white px-4 py-2 text-xs font-semibold text-slate-500 shadow-sm">
                ⏱ 2–5 min
              </div> */}

              <div className="rounded-full border border-[#dcecf4] bg-white px-4 py-2 text-xs font-semibold text-slate-500 shadow-sm">
                🔒 Private
              </div>

              <div className="rounded-full border border-[#dcecf4] bg-white px-4 py-2 text-xs font-semibold text-slate-500 shadow-sm">
                ★ Rewarded
              </div>
            </div>

            {/* CTA */}
            <div className="mt-9">
              <button
                type="button"
                // eslint-disable-next-line max-len
                className="group inline-flex items-center gap-3 rounded-xl bg-[#0798d3] px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#0798d3]/20 transition-all duration-300 hover:-translate-y-1 hover:bg-[#0789bf] hover:shadow-xl"
              >
                Start Survey

                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </button>
            </div>

            {/* Small note */}
            <p className="mt-5 text-[11px] text-slate-400">
              A few quick questions before you begin.
            </p>

          </section>
        </main>

      </div>
    </header>
  );
}

export default Header;
