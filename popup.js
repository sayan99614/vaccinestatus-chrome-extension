const form = document.getElementById("check_avl");
const ctn = document.getElementById("flex-container");
form.addEventListener("submit", async event => {
  event.preventDefault();
  const pin = document.getElementById("pincode").value;
  const date = document.getElementById("date").value;
  const arr = date.split("-");
  const ac_date = `${arr[2]}-${arr[1]}-${arr[0]}`;
  try {
    const res = await fetch(
      `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin?pincode=${pin}&date=${ac_date}`
    );
    const data = await res.json();
    if (!data) {
      return (ctn.innerHTML = `<h3 class="text-uppercase text-center bg-warning">Check your pin code and date <h3>`);
    }
    ctn.innerHTML = `<h3 class="text-uppercase text-center">Vaccine centers<h3>`;
    data.centers.map((elm, index) => {
      ctn.insertAdjacentHTML(
        "afterend",
        `<div class="card-div text-center mb-2">
        <div class="card shadow-sm p-1" style="width:270px">
        <h6><i class="far fa-hospital fa-1x"></i>&nbsp;${elm.name}</h6>
        <h6><i class="fas fa-compass"></i>Pincode:&nbsp;${elm.pincode}</h6>
        <h6><i class="fas fa-arrow-alt-circle-right"></i>Block:&nbsp;${
          elm.block_name
        }</h6>
        <h6><i class="fas fa-map-marked-alt"></i>State:&nbsp;${
          elm.state_name
        }</h6>
        <h6><i class="fas fa-directions"></i>District:&nbsp;${
          elm.district_name
        }</h6> 
        <h6><i class="fas fa-rupee-sign"></i>Fee:&nbsp;<span class="bg-success text-white p-1">${
          elm.fee_type
        }</span></h6>
        <h6><i class="fas fa-syringe"></i>vaccine:&nbsp;${
          elm.sessions[0].vaccine
        }</h6>
        ${
          elm.sessions[0].available_capacity_dose1 === 0
            ? `<h6 class="bg-warning p1"><i class="fas fa-syringe"></i>Dose 1 avalible:&nbsp;${elm.sessions[0].available_capacity_dose1}</h6>`
            : `<h6 class="bg-success p1"><i class="fas fa-syringe"></i>Dose 1 avalible:&nbsp;${elm.sessions[0].available_capacity_dose1}</h6>`
        }
        ${
          elm.sessions[0].available_capacity_dose2 === 0
            ? `<h6 class="bg-warning p1"><i class="fas fa-syringe"></i>Dose 2 avalible:&nbsp;${elm.sessions[0].available_capacity_dose2}</h6>`
            : `<h6 class="bg-success p1"><i class="fas fa-syringe"></i>Dose 2 avalible:&nbsp;${elm.sessions[0].available_capacity_dose2}</h6>`
        }
        ${
          elm.sessions[0].available_capacity_dose1 !== 0 ||
          elm.sessions[0].available_capacity_dose2 !== 0
            ? `<a class="btn btn-success" href="https://selfregistration.cowin.gov.in/">Book vaccine</a>`
            : `<h6 class="bg-danger text-white p1"><i class="fas fa-exclamation"></i>&nbsp;No slot avalible at this moment</h6>`
        }
        </div>
      </div>`
      );
    });

    //   ctn.innerHTML = `<div class="text-center">
    //   <div class="card shadow-sm p-1" style="width:270px">
    //   ${data.centers[0].name}
    //   </div>
    // </div>`;
  } catch (error) {
    ctn.insertAdjacentHTML(
      "afterend",
      `
      <img src="warning.png"/>
      `
    );
  }
});
