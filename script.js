// Get the necessary elements
const calculateBtn = document.getElementById("calculate_btn");
const kitchenShareEl = document.getElementById("kitchen_share");
const personSharesEl = document.getElementById("person_shares");
const personValuePerHourEl = document.getElementById("person_value_per_hour");
const addPersonBtn = document.getElementById("add_person_btn");

// Event listener for the calculate button
calculateBtn.addEventListener("click", () => {
  // Get the total tips and kitchen percentage values
  const totalTips = parseFloat(document.getElementById("total_tips").value);
  const kitchenPercentage = parseFloat(
    document.querySelector(".active.kitchen-percentage-btn").textContent
  );

  // Calculate the kitchen share and person shares
  const kitchenShare = (totalTips * (kitchenPercentage / 100)).toFixed(2);
  const personShares = calculatePersonShares(totalTips, kitchenPercentage);

  // Calculate the average value per hour for all employees
  const valuePerHour = calculateAverageValuePerHour(personShares);

  // Update the results display
  kitchenShareEl.textContent = `Kitchen Share: $${kitchenShare}`;
  personSharesEl.innerHTML = personShares.map((share) => `<li>${share}</li>`).join("");
  personValuePerHourEl.textContent = `Average Value per Hour: $${valuePerHour}`;

  // Show the modal
  $('#resultsModal').modal('show');
});

// Function to calculate the person shares
function calculatePersonShares(totalTips, kitchenPercentage) {
  const personListItems = document.querySelectorAll("#person_list li");
  const personShares = [];

  // Calculate the total hours worked
  let totalHoursWorked = 0;
  personListItems.forEach((item) => {
    const hoursWorked = parseFloat(item.querySelector(".hours-worked").textContent);
    totalHoursWorked += hoursWorked;
  });

  personListItems.forEach((item) => {
    const personName = item.querySelector(".person-name").textContent;
    const hoursWorked = parseFloat(item.querySelector(".hours-worked").textContent);
    const personShare = (
      ((totalTips - totalTips * (kitchenPercentage / 100)) / totalHoursWorked) *
      hoursWorked
    ).toFixed(2);
    personShares.push(`${personName}: $${personShare}`);
  });

  return personShares;
}

// Function to calculate the average value per hour for all employees
function calculateAverageValuePerHour(personShares) {
  const personListItems = document.querySelectorAll("#person_list li");
  let totalPersonShares = 0;
  let totalHoursWorked = 0;

  personListItems.forEach((item, index) => {
    const hoursWorked = parseFloat(item.querySelector(".hours-worked").textContent);
    const personShare = parseFloat(personShares[index].split(": $")[1]);
    totalPersonShares += personShare;
    totalHoursWorked += hoursWorked;
  });

  const averageValuePerHour = (totalPersonShares / totalHoursWorked).toFixed(2);
  return averageValuePerHour;
}

// Event listener for the add person button
addPersonBtn.addEventListener("click", () => {
  const personNameInput = document.querySelector(".person-name");
  const hoursWorkedInput = document.querySelector(".hours-worked");
  const personName = personNameInput.value.trim();
  const hoursWorked = hoursWorkedInput.value.trim();

  if (personName !== "" && hoursWorked !== "") {
    const listItem = document.createElement("li");
    listItem.innerHTML = `
      <div class="person-item">
        <span class="person-name">${personName}</span> - 
        <span class="hours-worked">${hoursWorked}</span> hours
        <button class="remove-person-btn btn btn-danger">Remove</button>
      </div>
    `;
    document.getElementById("person_list").appendChild(listItem);

    personNameInput.value = "";
    hoursWorkedInput.value = "";

    const removeButton = listItem.querySelector(".remove-person-btn");
    removeButton.addEventListener("click", () => {
      listItem.remove();
    });
  }
});

// Kitchen percentage button click event
document.querySelectorAll(".kitchen-percentage-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".kitchen-percentage-btn").forEach((btn) => {
      btn.classList.remove("active");
    });
    btn.classList.add("active");
  });
});
