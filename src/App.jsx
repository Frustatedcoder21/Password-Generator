import { useState, useEffect } from 'react';

function App() {
  const [password, setPassword] = useState("");
  const [passwordSize, setPasswordSize] = useState(6);
  const [passwordType, setPasswordType] = useState('number');
  const [copySuccess, setCopySuccess] = useState('');

  useEffect(() => {
    generatePassword();
  }, [passwordType, passwordSize]);

  const generatePassword = () => {
    let newPassword = "";
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < passwordSize; i++) {
      if (passwordType === 'number') {
        newPassword += Math.floor(Math.random() * 10); // generate random number
      } else {
        newPassword += characters.charAt(Math.floor(Math.random() * characters.length)); // generate random character
      }
    }
    setPassword(newPassword);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password)
      .then(() => {
        setCopySuccess('Copied!');
        setTimeout(() => setCopySuccess(''), 2000); // Clear message after 2 seconds
      })
      .catch(err => {
        setCopySuccess('Failed to copy');
      });
  };

  return (
    <>
      <div style={styles.container}>
        <h1 style={styles.heading}>Your Password Generator!</h1>
        <div style={styles.innerContainer}>
          <input
            type="text"
            style={styles.input}
            value={password}
            readOnly
          />
          <button onClick={copyToClipboard} style={styles.button}>Copy</button>
          {copySuccess && <p style={styles.copySuccess}>{copySuccess}</p>}
        </div>
        <div style={styles.controls}>
          <label htmlFor="range" style={styles.label}>Password Size</label>
          <input
            type="range"
            id="range"
            max={50}
            min={6}
            value={passwordSize}
            onChange={(e) => setPasswordSize(e.target.value)}
            style={styles.range}
          />
          <div style={styles.radioGroup}>
            <input
              type="radio"
              id="number"
              name="type"
              value="number"
              checked={passwordType === 'number'}
              onChange={(e) => setPasswordType(e.target.value)}
            />
            <label htmlFor="number" style={styles.label}>Number</label>
            <input
              type="radio"
              id="character"
              name="type"
              value="character"
              checked={passwordType === 'character'}
              onChange={(e) => setPasswordType(e.target.value)}
            />
            <label htmlFor="character" style={styles.label}>Character</label>
          </div>
        </div>
      </div>
    </>
  );
}

const styles = {
  heading: {
    fontSize: '24px',
    color: 'orange',
    marginBottom: '20px',
  },
  container: {
    width: '100vw',
    height: '100vh',
    backgroundColor: 'black',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerContainer: {
    width: '75%',
    backgroundColor: 'grey',
    margin: '30px 0',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius: '30px',
    padding: '20px',
  },
  input: {
    width: '75%',
    height: '40px',
    backgroundColor: 'white',
    borderRadius: '30px',
    padding: '10px',
    fontSize: '16px',
    marginBottom: '10px',
    color: 'orange',
  },
  button: {
    padding: '10px 20px',
    borderRadius: '30px',
    backgroundColor: 'white',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px',
    color: 'orange',
    marginBottom: '10px',
  },
  copySuccess: {
    color: 'green',
    fontSize: '14px',
  },
  controls: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    color: 'orange',
  },
  label: {
    margin: '10px 0',
    fontSize: '16px',
    color: 'orange',
  },
  range: {
    margin: '10px 0',
    color: 'orange',
  },
  radioGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginTop: '10px',
    color: 'orange',
  },
};

export default App;