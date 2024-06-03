import "./style.css";

const inputLength = <HTMLParagraphElement>(
  document.getElementById("input-length")
);
const inputSlider = <HTMLInputElement>document.getElementById("pass-length");
const copybtn = <HTMLButtonElement>document.getElementById("copy");
const passTxt = <HTMLInputElement>document.getElementById("generate-pass");
const generateBtn = <HTMLButtonElement>document.getElementById("generate-btn");

/* Settings adjustment input */
const isChecknum = <HTMLInputElement>document.getElementById("switch-numbers");
const isCheckUpperCase = <HTMLInputElement>(
  document.getElementById("switch-uppercase")
);
const isCheckSymbols = <HTMLInputElement>(
  document.getElementById("switch-symbols")
);

type StringOrNumberType = string | number;

//Update the html render value from input slider
inputSlider.addEventListener("input", (event: Event) => {
  inputLength.innerText = (event.target as HTMLInputElement).value;
});

//copy action for  the generated password
copybtn.addEventListener("click", () => {
  passTxt.select();
  passTxt.setSelectionRange(0, 99999);
  navigator.clipboard.writeText(passTxt.value);
  passTxt.readOnly = true;
});

const asciiConvertToCharCode = (
  min: number,
  max: number
): StringOrNumberType[] => {
  let collectionChar: any[] = [];
  for (let i = min; i <= max; i++) {
    collectionChar.push(String.fromCharCode(i));
  }

  return collectionChar;
};

const generatedPassword = (charLength: number): StringOrNumberType[] => {
  let generated: StringOrNumberType[] = [];
  for (let len = 0; len < charLength; len++) {
    generated.push(pass[Math.floor(Math.random() * pass.length)]);
  }

  return generated;
};

const finalisedSettings = () => {
  if (isChecknum.checked === true) {
    !pass.includes(numberCollection)
      ? numberCollection.forEach((num) => (pass = [...pass, num]))
      : [];
  } else {
    pass = pass.filter(
      (element: number) => !numberCollection.includes(element)
    );
  }

  if (isCheckUpperCase.checked === true) {
    !pass.includes(uppercaseCollection)
      ? uppercaseCollection.forEach((char) => (pass = [...pass, char]))
      : [];
  } else {
    pass = pass.filter(
      (element: string) => !uppercaseCollection.includes(element)
    );
  }

  if (isCheckSymbols.checked === true) {
    !pass.includes(symbolsCollection)
      ? symbolsCollection.forEach((symb) => (pass = [...pass, symb]))
      : [];
  } else {
    pass = pass.filter(
      (element: string) => !symbolsCollection.includes(element)
    );
  }
};

let pass: any = [];
let numberCollection: StringOrNumberType[] = asciiConvertToCharCode(48, 57);
let uppercaseCollection: StringOrNumberType[] = asciiConvertToCharCode(65, 90);
let symbolsCollection: StringOrNumberType[] = asciiConvertToCharCode(33, 47);

pass = asciiConvertToCharCode(97, 122);

generateBtn.addEventListener("click", () => {
  const charLength = Number.parseInt(inputSlider.value);
  finalisedSettings();
  let generationPass = generatedPassword(charLength);
  passTxt.value = generationPass.join("");
});
