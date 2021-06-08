const baseURL = 'http://localhost:8081';
let currentPatient

"use strict";

function searchPatient() {
    let search = document.getElementById("validationCustom01").value
    
    console.log(search)
    fetch(`/patients/${search}`, {
        method: 'GET'
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
            document.getElementById("return-data").innerHTML= `<p>First Name: ${data.firstName}</p><p>Last Name: ${data.lastName}</p><p>Patient Number: ${data.patient_id}</p>`;
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
                    searchPatient();
                    // event.stopPropagation();
                }

                form.classList.add("was-validated");
            },
            false
        );



    });



});


