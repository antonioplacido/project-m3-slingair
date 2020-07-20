const flightInput = document.getElementById("flight");
const seatsDiv = document.getElementById("seats-section");
const confirmButton = document.getElementById("confirm-button");
const idButton = document.getElementById("verify");
let selection = "";
let randomNumber = Math.floor(Math.random() * 6000) + 1;
let failnumber = randomNumber + 1;
console.log(randomNumber);
function processFlights() {
  fetch("/flights")
    .then((resp) => resp.json())
    .then((flights) => {
      flights.forEach((id) => {
        const option = document.createElement("option");
        option.innerText = id;
        option.value = id;
        flightInput.appendChild(option);
      });
    });
}
const renderSeats = (seatData) => {
  document.querySelector(".form-container").style.display = "block";
  seatsDiv.innerHTML = " ";
  const alpha = ["A", "B", "C", "D", "E", "F"];
  for (let r = 1; r < 11; r++) {
    const row = document.createElement("ol");
    row.classList.add("row");
    row.classList.add("fuselage");
    seatsDiv.appendChild(row);
    for (let s = 1; s < 7; s++) {
      const seatNumber = `${r}${alpha[s - 1]}`;
      const seat = document.createElement("li");
      // Two types of seats to render
      let checkSeat = seatData.find((seat) => {
        return seat.id === seatNumber;
      });
      console.log(checkSeat);
      const seatOccupied = `<li><label class="seat"><span id="${seatNumber}" class="occupied">${seatNumber}</span></label></li>`;
      const seatAvailable = `<li><label class="seat"><input type="radio" name="seat" value="${seatNumber}" /><span id="${seatNumber}" class="avail">${seatNumber}</span></label></li>`;
      if (checkSeat.isAvailable === true) {
        seat.innerHTML = seatAvailable;
      } else {
        seat.innerHTML = seatOccupied;
      }
      // TODO: render the seat availability based on the data...
      row.appendChild(seat);
    }
  }
  let seatMap = document.forms["seats"].elements["seat"];
  seatMap.forEach((seat) => {
    seat.onclick = () => {
      selection = seat.value;
      seatMap.forEach((x) => {
        if (x.value !== seat.value) {
          document.getElementById(x.value).classList.remove("selected");
        }
      });
      document.getElementById(seat.value).classList.add("selected");
      document.getElementById("seat-number").innerText = `(${selection})`;
      confirmButton.disabled = false;
    };
  });
};
const toggleFormContent = (event) => {
  const flightNumber = flightInput.value;
  console.log("toggleFormContent: ", flightNumber);
  fetch(`/flights/${flightNumber}`)
    .then((res) => res.json())
    .then((data) => {
      renderSeats(data);
    });
};
const handleConfirmSeat = (event) => {
  event.preventDefault();
  console.log("clicked");
  console.log(document.getElementById("seat-number").innerText);
  fetch("/users", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: randomNumber.toString(),
      givenName: document.getElementById("givenName").value,
      flight: flightInput.value,
      seat: document.getElementById("seat-number").innerText,
      surname: document.getElementById("surname").value,
      email: document.getElementById("email").value,
    }),
  })
    .then((response) => response.text())
    .then((data) => {
      if (data === "200") {
        location.replace(`/${randomNumber}`);
      } else if (data === "404") {
        location.replace(`/${failnumber}`);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};
function handleCheckReservation(event) {
  let resNumber = document.getElementById("idInput").value;
  console.log(resNumber);
  console.log("click");
  location.replace(`/info/${resNumber}`);
}
idButton.addEventListener("click", handleCheckReservation);
flightInput.addEventListener("change", toggleFormContent);
confirmButton.addEventListener("onClick", handleConfirmSeat);
processFlights();
