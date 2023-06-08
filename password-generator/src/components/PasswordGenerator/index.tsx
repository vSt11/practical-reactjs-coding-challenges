import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import React, { useEffect, useState } from 'react'
import passwordGif from '../../assets/gif/password.gif'
import { ReactComponent as Copy } from '../../assets/icons/copy.svg'
import { ReactComponent as Refresh } from '../../assets/icons/refresh.svg'
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Checkbox from '../Checkbox'
import './index.css'

const PasswordGenerator = () => {
  const [passwordLength, setPasswordLength] = useState<number>(8);
  const [generatedPassword, setGeneratedPassword] = useState<string>('B0QI4PDBYY');
  const [charInfo, setCharInfo] = useState<{ upperCase: boolean, lowerCase: boolean, numbers: boolean, specialChar: boolean, numChecked?: number }>({ upperCase: true, lowerCase: true, numbers: true, specialChar: true });
  const [copied, setCopied] = useState(false);
  const [passwordStength, setPasswordStrength] = useState<String>('');

  useEffect(() => {
    generatePassword();
  }, [passwordLength]);

  const characterGenerator = () => {

  }

  function HandleStrength() {
    let num:number = handleNumChecked();

    if (generatedPassword.length < 8 || num<=2) {
      setPasswordStrength('Weak');
    }
    else if (num<=3){
      setPasswordStrength('Medium');
    }
    else { 
      console.log(num)
      setPasswordStrength('Strong'); }
  }

  const generatePassword = () => {
    const maj = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const min = 'abcdefghijklmnopqrstuvwxyz'
    const num = '0123456789'
    const special = '!@#$%^&*()_+~`|}{[]\\:;?><,./-='
    const characters = characterGenerator();
    let password = ''

    for (let i = 0; i < passwordLength; i++) {
      const categoryIndex = Math.floor(Math.random() * 4) // Génère un nombre aléatoire entre 0 et 3
      let character = ''

      if (charInfo.upperCase === false && charInfo.lowerCase === false && charInfo.numbers === false && charInfo.specialChar === false) {
        charInfo.lowerCase = true;
      }

      switch (categoryIndex) {
        case 0:
          if (charInfo.upperCase === true) {
            character = maj.charAt(Math.floor(Math.random() * maj.length))
            break;
          } else { i -= 1; break; }

        case 1:
          if (charInfo.lowerCase === true) {
            character = min.charAt(Math.floor(Math.random() * min.length))
            break;
          } else { i -= 1; break; }
        case 2:
          if (charInfo.numbers === true) {
            character = num.charAt(Math.floor(Math.random() * num.length))
            break;
          } else { i -= 1; break; }
        case 3:
          if (charInfo.specialChar === true) {
            character = special.charAt(Math.floor(Math.random() * special.length))
            break;
          } else { i--; break; }
        default:
          break;
      }
      password += character

      setGeneratedPassword(password)
      HandleStrength();
    }
    return password;

  }

  // Générer un nouveau mot de passe
  function handleRefresh() {
    generatePassword();
  }

  const handleNumChecked = () => {
    let count: number = 0;
    Object.entries(charInfo).forEach(([key, value]) => {
      if (value === true) {
        count++;
      }
    });
    return count;
  };

  function handleCopy() {
    setCopied(true);

    setTimeout(() => {

      setCopied(false);
    }, 1000);

  }

  const onChangePasswordLength = (value: number | number[]) => {
    setPasswordLength(value as number);
  }


  return (
    <div className="password-wrapper">
      <div className="gif">
        <img src={passwordGif} alt="Password Gif" />
      </div>
      <div className="tac">
        <h2 className="title">PASSWORD GENERATOR</h2>
        <p className="subtitle">
          Create strong and secure passwords to keep your account safe online.
        </p>
      </div>
      <div className="password-input-wrapper">
        <div className="password-field">
          <input type="text" placeholder="your password" value={generatedPassword} disabled />
          <Refresh onClick={handleRefresh} />
        </div>
        <button className="copy-btn">
          <CopyToClipboard text={generatedPassword} onCopy={handleCopy}>
            <span>{copied ? 'Copied!' : 'Copy'}</span>
          </CopyToClipboard>
        </button>

      </div>
      <span className="fw-500" style={{color:passwordStength==="Weak"?'red':passwordStength==='Medium'?'orange':'green'}}>{passwordStength}</span>
      <div className="slider">
        <div>
          <label id="slider-label">Password Length: </label>
          <span>{passwordLength}</span>
        </div>
        <Slider
          max={30}
          min={5}
          value={passwordLength}
          onChange={onChangePasswordLength}
          className="slider-style"
        />
      </div>
      <div className="elements">
        <Checkbox id="uppercase"
          label="Uppercase"
          checked={charInfo.upperCase}
          onChange={() => setCharInfo((prev) => ({ ...prev, upperCase: !prev.upperCase }))}
          name="upper" />

        <Checkbox id="lowercase"
          label="Lowercase"
          checked={charInfo.lowerCase}
          onChange={() => setCharInfo((prev) => ({ ...prev, lowerCase: !prev.lowerCase }))}
          name="lower" />

        <Checkbox id="numbers"
          label="Numbers"
          checked={charInfo.numbers}
          onChange={() => setCharInfo((prev) => ({ ...prev, numbers: !prev.numbers }))}
          name="numbers" />

        <Checkbox id="special chars"
          label="Special Characters"
          checked={charInfo.specialChar}
          onChange={() => setCharInfo((prev) => ({ ...prev, specialChar: !prev.specialChar }))}
          name="specialChars" />
      </div>
    </div>
  )
}


export default PasswordGenerator;
