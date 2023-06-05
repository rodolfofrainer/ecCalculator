var workers = [];

function addPerson() {
  var name = document.getElementById("person_name").value;
  var hoursWorked = parseFloat(document.getElementById("hours_worked").value);
  
  workers.push({ name: name, hoursWorked: hoursWorked });
  
  document.getElementById("person_name").value = '';
  document.getElementById("hours_worked").value = '';
  
  displayPersons();
}

function removePerson(index) {
  workers.splice(index, 1);
  displayPersons();
}

function displayPersons() {
  var list = document.getElementById("person_list");
  list.innerHTML = '';

  workers.forEach(function (worker, index) {
    var listItem = document.createElement("li");
    var workerName = capitalizeName(worker.name);
    listItem.textContent = workerName + " - " + worker.hoursWorked + " hours worked";

    var removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.addEventListener("click", function () {
      removePerson(index);
    });

    listItem.appendChild(removeButton);
    list.appendChild(listItem);
  });
}

function capitalizeName(name) {
  var names = name.split(" ");
  var capitalizedNames = names.map(function (namePart) {
    return namePart.charAt(0).toUpperCase() + namePart.slice(1);
  });
  return capitalizedNames.join(" ");
}

function calculateTips() {
  var totalTips = parseFloat(document.getElementById("total_tips").value);
  var kitchenPercentage = parseFloat(document.getElementById("kitchen_percentage").value);
  
  var kitchenTips = totalTips * (kitchenPercentage / 100);
  var totalHoursWorked = workers.reduce((sum, worker) => sum + worker.hoursWorked, 0);
  
  var serverTips = totalTips - kitchenTips;
  var workerTips = serverTips / totalHoursWorked;
  
  var kitchenInfo = document.createElement("p");
  kitchenInfo.textContent = "Kitchen Tips: $" + kitchenTips.toFixed(2);
  
  var serverInfo = document.createElement("p");
  serverInfo.textContent = "Server Tips: $" + serverTips.toFixed(2);
  
  var workersInfo = document.createElement("div");
  workersInfo.innerHTML = "<h3>Worker Tips:</h3>";
  
  workers.forEach(function(worker) {
    var workerAmount = worker.hoursWorked * workerTips;
    var workerElement = document.createElement("p");
    workerElement.textContent = worker.name + ": $" + workerAmount.toFixed(2);
    workersInfo.appendChild(workerElement);
  });
  
  var container = document.getElementById("tips_container");
  container.innerHTML = "";
  container.appendChild(kitchenInfo);
  container.appendChild(serverInfo);
  container.appendChild(workersInfo);
}
