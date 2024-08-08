import { useState } from 'react';

function EmiCalculator() {
  const [cost, setCost] = useState(0);
  const [interest, setInterest] = useState(10);
  const [fee, setFee] = useState(1);
  const [downPayment, setDownPayment] = useState(0);
  const [tenure, setTenure] = useState(12);
  const [emi, setEmi] = useState(0);
  const tenureData = [12, 24, 36, 48, 60];

  const updateDownPayment = (e) => {
    if (!cost) return;
    let dp = Number(e.target.value);
    setDownPayment(dp.toFixed(0));
    const emiValue = calculateEmi(dp);
    setEmi(emiValue);
  };

  const updateEmi = (e) => {
    if (!cost) return;
    let emiValue = Number(e.target.value);
    setEmi(emiValue.toFixed(0));
    const dp = calculateDp(emiValue);
    setDownPayment(dp);
  };

  const calculateEmi = (downPayment) => {
    if (!cost) return;
    let loanAmount = cost - downPayment;
    let monthlyInterestRate = interest / 100 / 12;
    let numberOfMonths = tenure;
    const emi = (loanAmount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfMonths)) / (Math.pow(1 + monthlyInterestRate, numberOfMonths) - 1);
    return Number(emi).toFixed(0);
  };

  const calculateDp = (emi) => {
    if (!cost) return;
    const totalEmi = calculateEmi(0);
    const downPaymentPercent = 100 - (emi / totalEmi) * 100;
    return Number((downPaymentPercent / 100) * cost).toFixed(0);
  };

  return (
    <div className='mr-[50%] ml-[50%]'>
      <span>EMI Calculator</span>
      <div className='flex flex-col w-28'>
        <div className='flex flex-col'>
          <span>Total Cost of Asset</span>
          <input type='number' value={cost} onChange={(e) => setCost(Number(e.target.value))} />
        </div>
        <div className='flex flex-col'>
          <span>Interest Rate %</span>
          <input type='number' value={interest} onChange={(e) => setInterest(Number(e.target.value))} />
        </div>
        <div className='flex flex-col'>
          <span>Processing Fee</span>
          <input type='number' value={fee} onChange={(e) => setFee(Number(e.target.value))} />
        </div>

        <div>
          <span>Down Payment</span>
          <input type='range' min={0} max={cost} value={downPayment} onChange={updateDownPayment} />
          <span>{downPayment}</span>
        </div>

        <div>
          <span>EMI</span>
          <input type='range' min={0} max={calculateEmi(0)} value={emi} onChange={updateEmi} />
          <span>{emi}</span>
        </div>

        <div>
          {tenureData.map((item, index) => (
            <button onClick={() => setTenure(item)} className='pl-8' key={index}>
              {item} months
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default EmiCalculator;
