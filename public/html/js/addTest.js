// const baseURL = 'http://localhost:8081';

var found = false

"use strict";

function addTest(testVal) {
    let currentPatient = document.getElementById("pn").innerText;
    let currentTests = document.getElementById("ptests").innerText;

    console.log(currentTests)
    console.log(testVal)
    console.log(document.getElementById("pn").innerText)

    if (currentTests.includes(testVal)) {
        console.log('exists');
        return;
    }

    let addTESTS = {
        testsRequested: [currentTests, testVal]
    }
    
    console.log('addTest')
    console.log('pn')
    console.log('added')
    fetch(`/patients/${currentPatient}`, {
        method: 'PATCH', 
        headers: {
            'Content-Type': 'application/json'
        }, 
        body: JSON.stringify(addTESTS)
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
                document.getElementById("return-data").innerHTML = `<p>First Name: ${data.firstName}</p><p>Last Name: ${data.lastName}</p><p id="pn" value=${data.patient_id}>${data.patient_id}</p>`;
                document.getElementById("success").style.display = "block";
                document.getElementById("builder").style.display = "block";
                document.getElementById("test-return").innerHTML = `<p id="ptests" value=${data.testsRequested}>${data.testsRequested}</p>`;
            } 
        })
        .catch(err => {
            console.log(err);
        });

    }