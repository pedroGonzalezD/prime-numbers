import { useState } from 'react'
import styles from './App.module.scss'

function App() {
  const [number, setNumber] = useState(""); 
  const [validatedNumber, setValidatedNumber] = useState(null); 
  const [isPrime, setIsPrime] = useState(null); 

  const checkPrime = (num) => {
    if (num < 2) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
      if (num % i === 0) return false;
    }
    return true;
  };

  const handleCheck = () => {
    const parsedNumber = parseInt(number, 10);
    if (!isNaN(parsedNumber)) {
      setValidatedNumber(parsedNumber); 
      setIsPrime(checkPrime(parsedNumber)); 
    } else {
      setValidatedNumber(null);
      setIsPrime(null); 
    }
  };

  const generatePrimes = (limit) => {
    const primes = [];
    for (let i = 1; i <= limit; i++) {
      if (checkPrime(i)) primes.push(i);
    }
    return primes;
  };

  const primes = generatePrimes(100);

  return (
    <div className={styles.container}>
      <h1>¿Es un número primo?</h1>
      <div className={styles["input-container"]}>
        <input
          type="text"
          placeholder="Ingresa un número"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
        />
        <button onClick={handleCheck}>Comprobar</button>
      </div>
      {validatedNumber !== null && isPrime !== null && (
        <p className={styles.result}>
          {validatedNumber} {isPrime ? "es un número primo." : "no es un número primo."}
        </p>
      )}
      <div className={styles["primes-container"]}>
        <h2>Números primos del 1 al 100</h2>
        <div className={styles.grid}>
          {Array.from({ length: 100 }, (_, i) => i + 1).map((num) => (
            <div
              key={num}
              className={`${styles.number} ${
                primes.includes(num) ? styles.prime : styles["not-prime"]
              }`}
            >
              {num}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default App
