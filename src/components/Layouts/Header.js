/* eslint-disable max-len */
import React from 'react';

function Header() {
  const benefitCard = 'flex items-start gap-3 rounded-2xl border border-slate-200 bg-white/90 p-4 text-left shadow-sm';
  const benefitIcon = 'grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-teal-50 text-sm font-bold text-teal-700';

  return (
    <header className='w-full flex-1'>
      <div className='mx-auto w-full max-w-6xl px-4 pb-5 pt-6 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between gap-4'>
          <div className='flex items-center gap-3'>
            <div className='grid h-11 w-11 place-items-center rounded-xl bg-teal-700 text-base font-extrabold text-white shadow-sm'>A</div>
            <div className='flex flex-col leading-tight'>
              <strong className='text-[15px] font-bold text-slate-900'>AllReaserch</strong>
              <span className='mt-1 text-[9px] uppercase tracking-[0.18em] text-slate-400'>Survey Community</span>
            </div>
          </div>

          <div className='inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/90 px-3 py-2 text-xs font-semibold text-slate-500 shadow-sm'>
            <span className='h-2 w-2 rounded-full bg-emerald-500' />
            <span className='hidden sm:inline'>Your privacy matters</span>
          </div>
        </div>

        <div className='mx-auto mt-10 w-full max-w-3xl text-center sm:mt-14'>
          <div className='inline-flex items-center gap-2 rounded-full bg-teal-50 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.12em] text-teal-700'>
            <span>✦</span>
            Welcome to AllReaserch
          </div>

          <h1 className='mt-5 text-[32px] font-bold leading-[1.08] tracking-[-0.035em] text-slate-900 sm:text-[40px] lg:text-[46px]'>Share Your Opinion</h1>
          <p className='mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-500 sm:text-[15px]'>
            Your feedback helps businesses make better decisions.
          </p>

          <div className='mt-7 grid gap-3 sm:grid-cols-3'>
            <div className={benefitCard}>
              <span className={benefitIcon}>⌁</span>
              <div>
                <strong className='block text-[13px] font-bold text-slate-900'>Private</strong>
                <small className='mt-1 block text-[10px] leading-4 text-slate-500'>Your responses stay confidential.</small>
              </div>
            </div>
            <div className={benefitCard}>
              <span className={benefitIcon}>✦</span>
              <div>
                <strong className='block text-[13px] font-bold text-slate-900'>Rewarded</strong>
                <small className='mt-1 block text-[10px] leading-4 text-slate-500'>Your opinions can earn rewards.</small>
              </div>
            </div>
            <div className={benefitCard}>
              <span className={benefitIcon}>◷</span>
              <div>
                <strong className='block text-[13px] font-bold text-slate-900'>Quick & Easy</strong>
                <small className='mt-1 block text-[10px] leading-4 text-slate-500'>A simple, focused survey experience.</small>
              </div>
            </div>
          </div>

          <p className='mt-5 text-[11px] text-slate-400'>A few quick questions before you begin.</p>
        </div>
      </div>
    </header>
  );
}

export default Header;
