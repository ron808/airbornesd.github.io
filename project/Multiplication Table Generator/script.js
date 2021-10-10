const generateTable = document.getElementById("generateTable");

generateTable.onclick = () => {
  let number = document.getElementById("inputNum").value;

  if (number === "") {
    alert("Enter a number");
    return;
  }

  number = parseInt(number);

  let table = "";

  for (let i = 1; i <= 10; i++) {
    table += `${number} X ${i} = ${number * i}<br>`;
  }

  const multiplicationTable = document.getElementById("multiplicationTable");

  multiplicationTable.innerHTML = table;
};
