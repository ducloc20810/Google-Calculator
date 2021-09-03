let prevOp;
let prevInput;
let firstRun = 1;
let prevAns = 0;
let op = ["+", "-", "x", "/"];
let quotes = ["(", ")"];

const main = (inputVal, currentVal) => {
  currentVal = procFirstRun(inputVal);
  if (currentVal === "default") return;
  if (inputVal === "=") {
    return equal(currentVal);
  }

  if (inputVal === "AC") return allClear();

  return updateDisplay(inputVal, currentVal);
};

const procFirstRun = (inputVal) => {
  if (firstRun === 1) {
    // Nếu người dùng chưa nhập mà bấm dấu =
    if (inputVal === "=") return "default";

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
  //TH người dùng nhập dấu ngoặc
  if (quotes.includes(inputVal)) {
    // TH trc dấu ngoặc là một phép tính
    if (op.includes(currentVal[currentVal.length - 1]))
      if (inputVal === ")") return; //Nếu người dùng nhập dấu đóng thì không cho nhập
    if (currentVal[currentVal.length - 1] === inputVal) return; //TH người dùng nhập dấu ngoặc liên tục
    if (inputVal === ")" && currentVal[currentVal.length - 1] === "(") return; //TH người dùng đóng ngoặc khi chưa bấm gì vào trong ngoặc
  }

  //TH người dùng nhập toán tử
  if (op.includes(inputVal)) {
    // Nếu người dùng nhậP toán tử sau dấu ngoặc
    if (currentVal[currentVal.length - 1] === "(") return;
    // Nếu người dùng vừa nhập toán tử liên tục
    if (op.includes(inputVal) && op.includes(currentVal[currentVal.length - 1]))
      return $("#display-one").val(currentVal);
    //Nếu người dùng nhập bình thường
    return $("#display-one").val(currentVal + " " + inputVal);
  }
  if (op.includes(currentVal[currentVal.length - 1]))
    return $("#display-one").val(currentVal + " " + inputVal);

  return $("#display-one").val(currentVal + inputVal);
};

const clearInputDisplay = () => {
  $("#display-one").val(" ");
};

const equal = (currentVal) => {
  let temp = currentVal;

  // Chuyển kí tự x thành phép nhân
  if (currentVal.includes("x")) {
    temp = currentVal.replaceAll("x", "*");
    console.log(currentVal);
  }

  // TH người dùng không bấm dấu nhân trước dấU ngoặc
  if (currentVal.includes("(")) {
    for (i = 0; i < temp.length; i++) {
      if (temp[i] === "(") {
        let index = i;
        if (parseInt(temp[index - 1]) || temp[index - 1] === ")") {
          temp = temp.slice(0, index) + "*" + temp.slice(index, temp.length);
          console.log(temp);
        }
      }
    }
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
