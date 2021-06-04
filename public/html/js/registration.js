const baseURL = 'http://localhost:8081';
let currentPatient

"use strict";

function createPatient() {
    let firstName = document.getElementById("validationCustom01").value
    let lastName = document.getElementById("validationCustom02").value
    let patientID = document.getElementById("validationPatientNumber").value

    let patientPOST = {
        firstName: firstName, 
        lastName: lastName, 
        patient_id: patientID
    }
    console.log(patientPOST)
    fetch('/patients', {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(patientPOST)
        })

        .then((response) => {
            console.log(response)
            if (!response.ok) {
                throw Error(response.statusText);
            } else {
                return response.json();
            }
        })
        .then(data => {
            console.log('Success:', data);
            document.getElementById("return-data").innerHTML= `<p>First Name: ${firstName}</p><p>Last Name: ${lastName}</p><p>Patient Number: ${patientID}</p>`;
        })
        .catch(err => {
            console.log(err);
        });

    }



document.addEventListener("DOMContentLoaded", function () {

    var forms = document.querySelectorAll(".needs-validation");
    let post = false;

    Array.prototype.slice.call(forms).forEach(function (form) {
        form.addEventListener(
            "submit", 
            function (event) {
                if (!form.checkValidity()) {
                    event.preventDefault();
                    event.stopPropagation();
                    
                } else {
                    document.getElementById("success").style.display = "block";
                    event.preventDefault();
                    post = true;
                    createPatient();
                    // event.stopPropagation();
                }

                form.classList.add("was-validated");
            },
            false
        );



    });



});


