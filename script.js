const itemsArray = localStorage.getItem("items")
  ? JSON.parse(localStorage.getItem("items"))
  : [];

const addTaskBtn = document.querySelector("#addTaskBtn");
const item = document.querySelector("#item");

function toggleButton() {
  if (document.querySelector("#item").value === "") {
    addTaskBtn.disabled = true;
  } else {
    addTaskBtn.disabled = false;
  }
}

addTaskBtn.addEventListener("click", () => {
  const item = document.querySelector("#item");
  createItem(item);
  item.value = "";
});

item.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    const item = document.querySelector("#item");
    createItem(item);
    item.value = "";
  }
});

function createItem(item) {
  itemsArray.push(item.value);
  localStorage.setItem("items", JSON.stringify(itemsArray));
  console.log(itemsArray);
  addTaskBtn.disabled = true;

  displayItems();
}

function displayItems() {
  let items = "";
  let item;
  for (let i = 0; i < itemsArray.length; i++) {
    item = itemsArray[i];
    items += `<div class="list-group">
                <div class="list-group-item">
                    <div class="row full-row">

                        <div class="col-lg-10 col-md-10 col-sm-10 d-flex flex-column align-items-start input-box">
                        <input type="text" class="form-control inputBox" value="${item}" disabled/>
                            <div class="update-control">
                                <button class="btn btn-success saveBtn">save</button>
                                <button class="btn btn-secondary cancelBtn">cancel</button>
                            </div>
                        </div>

                        <div class="col-lg-2 col-md-2 col-sm-2 d-flex align-items-center justify-content-end"> 
                        <div class="input-control">
                        <button class="btn btn-info editBtn">edit</button>
                        <button class="btn btn-info deleteBtn">delete</button>                       
                        </div>
                        </div>
                    </div>
                </div>
            </div>`;
  }

  document.querySelector(".task-list").innerHTML = items;
  //   console.log(items);
  activateDeleteListeners();
  activateEditListeners();
  activateSaveListeners();
  activateCancelListeners();
}

/* Delete button logic */
function activateDeleteListeners() {
  const deleteBtn = document.querySelectorAll(".deleteBtn");
  deleteBtn.forEach((db, i) => {
    db.addEventListener("click", () => deleteItem(i));
  });
}

function deleteItem(i) {
  itemsArray.splice(i, 1);
  localStorage.setItem("items", JSON.stringify(itemsArray));
  displayItems();
}
/* Delete button logic */

/* Edit button logic */

function activateEditListeners() {
  const editBtn = document.querySelectorAll(".editBtn");
  const inputControl = document.querySelectorAll(".input-control");
  const updateControl = document.querySelectorAll(".update-control");
  const inputs = document.querySelectorAll(".input-box input");

  editBtn.forEach((eb, i) => {
    eb.addEventListener("click", () => {
      inputControl[i].style.display = "none";
      updateControl[i].style.display = "block";
      inputs[i].disabled = false;
      inputs[i].style.width = "120%";
    });
  });
}
/* Edit button logic */

/* Save button logic */

function activateSaveListeners() {
  const saveBtn = document.querySelectorAll(".saveBtn");
  const inputs = document.querySelectorAll(".input-box input");
  saveBtn.forEach((sb, i) => {
    sb.addEventListener("click", () => {
      updateItem(inputs[i].value, i);
      inputs[i].disabled = true;
    });
  });
}

function updateItem(text, i) {
  itemsArray[i] = text;
  console.log(text);
  localStorage.setItem("items", JSON.stringify(itemsArray));
  console.log(itemsArray);
  displayItems();
}
/* Save button logic */

/* Cancel button logic */

function activateCancelListeners() {
  const cancelBtn = document.querySelectorAll(".cancelBtn");
  const updateControl = document.querySelectorAll(".update-control");
  const inputControl = document.querySelectorAll(".input-control");
  const inputs = document.querySelectorAll(".input-box input");
  cancelBtn.forEach((cb, i) => {
    cb.addEventListener("click", () => {
      updateControl[i].style.display = "none";
      inputControl[i].style.display = "flex";
      inputs[i].disabled = true;
      console.log("clicked");
    });
  });
}

/* Save button logic */
window.onload = function () {
  console.log(itemsArray);
  displayItems();
};
