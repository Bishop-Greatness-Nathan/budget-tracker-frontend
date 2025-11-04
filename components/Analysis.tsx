type AnalysisType = {
  totalIncome: number;
  totalExpenditure: number;
  balance: number;
  currency: string;
  locale: string;
};

function Analysis({ analysis }: { analysis: AnalysisType }) {
  return (
    <div className='w-[50%] lg:w-[40%] text-[8px] md:text-sm lg:text-base border border-[var(--primary)] rounded bg-white mb-5'>
      <h2 className='grid grid-cols-2 gap-2 border border-[var(--primary)]'>
        <span className='border border-l-0 border-t-0 border-b-0 border-[var(--primary)] p-1'>
          Total Income
        </span>
        <span className='p-1'>
          {new Intl.NumberFormat(`${analysis.locale}`, {
            style: 'currency',
            currency: `${analysis.currency}`,
          }).format(analysis.totalIncome || 0)}
        </span>
      </h2>
      <h2 className='grid grid-cols-2 gap-2 border border-[var(--primary)] border-t-0'>
        <span className='border border-l-0 border-t-0 border-b-0 border-[var(--primary)] p-1'>
          Total Expenditure
        </span>
        <span className='p-1'>
          {new Intl.NumberFormat(`${analysis.locale}`, {
            style: 'currency',
            currency: `${analysis.currency}`,
          }).format(analysis.totalExpenditure || 0)}
        </span>
      </h2>
      <h2 className='grid grid-cols-2 gap-2 border border-[var(--primary)] border-t-0'>
        <span className='border border-l-0 border-t-0 border-b-0 border-[var(--primary)] p-1'>
          Balance
        </span>
        <span className='p-1'>
          {new Intl.NumberFormat(`${analysis.locale}`, {
            style: 'currency',
            currency: `${analysis.currency}`,
          }).format(analysis.balance || 0)}
        </span>
      </h2>
    </div>
  );
}

export default Analysis;
