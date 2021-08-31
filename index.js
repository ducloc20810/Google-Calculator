let prevOp;
let prevInput;
let firstRun = 1;
let prevAns = 0;
let op = ["+", "-", "x", "/"];

const main = (inputVal, currentVal) => {
  currentVal = procFirstRun(inputVal);
  if (inputVal === "=") {
    return equal(currentVal);
  }

  if (inputVal === "AC") return allClear();

  return updateDisplay(inputVal, currentVal);
};

const procFirstRun = (inputVal) => {
  if (firstRun === 1) {
    if (!op.includes(inputVal)) {
      clearInputDisplay();
      firstRun = 0;
      $("#display-two").val("ans = " + prevAns);
      return $("#display-one").val();
    }
    firstRun = 0;
    $("#display-two").val("ans = " + prevAns);
    return prevAns;
  }

  $("#display-two").val("ans = " + prevAns);
  return $("#display-one").val();
};

document.getElementById("input-area").onclick = function (e) {
  if (e.target.nodeName == "BUTTON") {
    let inputVal = e.target.value;
    let currentVal = $("#display-one").val();
    main(inputVal, currentVal);
  }
};

const updateDisplay = (inputVal, currentVal) => {
  if (op.includes(inputVal) && op.includes(currentVal[currentVal.length - 1]))
    return $("#display-one").val(currentVal);

  if (op.includes(inputVal) || op.includes(currentVal[currentVal.length - 1]))
    return $("#display-one").val(currentVal + " " + inputVal);

  console.log("hi");
  return $("#display-one").val(currentVal + inputVal);
};

const clearInputDisplay = () => {
  $("#display-one").val(" ");
};

const equal = (currentVal) => {
  let temp = currentVal;
  if (currentVal.includes("x")) {
    temp = currentVal.replaceAll("x", "*");
    console.log(currentVal);
  }

  let ans = eval(temp);
  $("#display-one").val(ans);
  $("#display-two").val(currentVal + " = ");

  firstRun = 1;
  prevAns = ans;
};

allClear = () => {
  //   $('input[name="ans-display"]').attr("id", "display-two");
  //   $('input[name="input-display"]').attr("id", "display-one");
  $("#display-one").val("0");
  $("#display-two").val("");
  firstRun = 1;
  prevAns = 0;
};
