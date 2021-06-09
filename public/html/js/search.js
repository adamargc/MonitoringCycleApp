const baseURL = 'http://localhost:8081';
// let currentPatient
var found = false

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
            // console.log(data.status)
            let found = true;
            if (found) {
                document.getElementById("return-data").innerHTML= `<p>First Name: ${data.firstName}</p><p>Last Name: ${data.lastName}</p><p id="pn" value=${data.patient_id}>${data.patient_id}</p>`;
                document.getElementById("success").style.display = "block";
                document.getElementById("builder").style.display = "block";
                document.getElementById("test-return").innerHTML = `<p id="ptests" value=${data.testsRequested}>${data.testsRequested}</p>`;
            } 
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
                    document.getElementById("feedback").innerHTML = '<p>There is no patient with this ID</p>';
                    
                } else {
                    
                    event.preventDefault();
                    post = true;
                    searchPatient();
                    console.log('found', found)
                    // event.stopPropagation();
                }

                form.classList.add("was-validated");
            },
            false
        );



    });



});


