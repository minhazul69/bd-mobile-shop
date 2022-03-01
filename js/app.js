// SPINER START AND END ADDED
const startSpiner = (spiner) => {
  document.getElementById("spiner").style.display = spiner;
};
// LOAD PHONES DATA AND PHONES LINK ADDED

const loadPhones = () => {
  const searchInput = document.getElementById("search-input");
  const searchInputText = searchInput.value;
  startSpiner("block");
  searchInput.value = "";
  if (searchInputText === "") {
    return alert("hello");
  }
  fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchInputText}`
  )
    .then((res) => res.json())
    .then((data) => displayPhones(data.data));
};

// SHOW DISPLAY PHONE DATA

const displayPhones = (phones) => {
  const phoneItem = document.getElementById("phone-item");
  const phoneSlice = phones.slice(0, 20);
  const itemNoneAlert = document.getElementById("danger1");
  if (phones.length === 0) {
    itemNoneAlert.style.display = "block";
    phoneItem.textContent = "";
    startSpiner("none");
    return itemNoneAlert;
  } else {
    itemNoneAlert.style.display = "none";
    phoneItem.textContent = "";
    for (const phone of phoneSlice) {
      // console.log(phone);
      // console.log(phone.slug);
      const div = document.createElement("div");
      div.classList = "col";
      div.innerHTML = ` <div class="col">
                        <div class="card h-100">
                      <img src="${phone.image}" class="card-img-top" alt="..." />
                        <div class="card-body">
                      <h5 class="card-title">${phone.phone_name}</h5>
                       <p class="card-text">${phone.brand}</p>
                    <button onclick="loadPhonesDetails('${phone.slug}')" class="btn btn-outline-primary">Details</button>
                   </div>
                   </div>
                  </div>`;
      phoneItem.appendChild(div);
    }
    startSpiner("none");
  }
};
// LOAD PHONE DETAILS ADDED
const loadPhonesDetails = (detail) => {
  fetch(`https://openapi.programming-hero.com/api/phone/${detail}`)
    .then((res) => res.json())
    .then((data) => displayPhoneDetails(data));
};

const displayPhoneDetails = (phoneDetail) => {
  console.log(phoneDetail);
  const phone = phoneDetail.data;
  const phoneDetails = document.getElementById("phone-details");
  const div = document.createElement("div");
  // const phoneOther = phone.others;
  div.classList = "col-md-8 mb-3 rounded";
  div.style.maxWidth = "540px";
  if (phone.others === undefined) {
    div.innerHTML = `<div class="card h-100">
    <img src="${phone.image}" class="card-img-top" alt="..." />
    <div class="card-body">
      <h5 class="card-title text-center mt-3 mb-3">${phone.name} Full Specifications</h5>
      <table class="table card-text">
  <tbody class="border">
    <tr class="border">
      <th class="border-end">Name</th>
      <td>${phone.name}</td>
      <td></td>
      </tr>
    <tr class="border">
      <th class="border-end">Brand</th>
      <td>${phone.brand}</td>
      </tr>
    <tr class="border">
      <th class="border-end">First Release</th>
      <td>${phone.releaseDate}</td>
      </tr>
    <tr class="border">
      <td class=""> Connectivity</td>
      </tr>
    <tr class="border">
      <th class="border-end">Display Size</th>
      <td >${phone.mainFeatures.displaySize}</td>
      </tr>
    <tr class="border">
      <th class="border-end">Memory</th>
      <td >${phone.mainFeatures.memory}</td>
      </tr>
    <tr class="border">
      <th class="border-end">Others</th>
      <td >No Other Feturs</td>
      </tr>
  </tbody>
</table>
    </div>
  </div>`;
    phoneDetails.appendChild(div);
    return;
  }
  console.log(phone.others);
  div.innerHTML = `
  <div class="card h-100">
    <img src="${phone.image}" class="card-img-top" alt="..." />
    <div class="card-body">
      <h5 class="card-title text-center mt-3 mb-3 ">${phone.name} Full Specifications</h5>
      <table class="table card-text">
  <tbody class="border">
    <tr class="border">
      <th class="border-end">Name</th>
      <td>${phone.name}</td>
      </tr>
    <tr class="border">
      <th class="border-end">Brand</th>
      <td>${phone.brand}</td>
      </tr>
    <tr class="border">
      <th class="border-end">First Release</th>
      <td>${phone.releaseDate}</td>
      </tr>
      <tr class="border">
      <td class=""> Connectivity</td>
      </tr>
    <tr class="border">
      <th class="border-end">Display Size</th>
      <td >${phone.mainFeatures.displaySize}</td>
      </tr>
    <tr class="border">
      <th class="border-end">Memory</th>
      <td >${phone.mainFeatures.memory}</td>
      </tr>
    <tr class="border">
      <th class="border-end">WLAN</th>
      <td >${phone.others.WLAN}</td>
      </tr>
    <tr class="border">
      <th class="border-end">Bluetooth</th>
      <td >${phone.others.Bluetooth}</td>
      </tr>
    <tr class="border">
      <th class="border-end">GPS</th>
      <td >${phone.others.GPS}</td>
      </tr>
    <tr class="border">
      <th class="border-end">NFC</th>
      <td >${phone.others.NFC}</td>
      </tr>
    <tr class="border">
      <th class="border-end">Radio</th>
      <td >${phone.others.Radio}</td>
      </tr>
    <tr class="border">
      <th class="border-end">USB</th>
      <td >${phone.others.USB}</td>
      </tr>
  </tbody>
</table>
    </div>
  </div>`;

  phoneDetails.appendChild(div);
};