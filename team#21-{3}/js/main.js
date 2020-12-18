var symid, gender, dob, i = 0;

var authtoken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImJpcmFnMjY0MTVAZWNvbmVvbS5jb20iLCJyb2xlIjoiVXNlciIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL3NpZCI6IjU3MDciLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3ZlcnNpb24iOiIxMDkiLCJodHRwOi8vZXhhbXBsZS5vcmcvY2xhaW1zL2xpbWl0IjoiMTAwIiwiaHR0cDovL2V4YW1wbGUub3JnL2NsYWltcy9tZW1iZXJzaGlwIjoiQmFzaWMiLCJodHRwOi8vZXhhbXBsZS5vcmcvY2xhaW1zL2xhbmd1YWdlIjoiZW4tZ2IiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL2V4cGlyYXRpb24iOiIyMDk5LTEyLTMxIiwiaHR0cDovL2V4YW1wbGUub3JnL2NsYWltcy9tZW1iZXJzaGlwc3RhcnQiOiIyMDIwLTEyLTE4IiwiaXNzIjoiaHR0cHM6Ly9hdXRoc2VydmljZS5wcmlhaWQuY2giLCJhdWQiOiJodHRwczovL2hlYWx0aHNlcnZpY2UucHJpYWlkLmNoIiwiZXhwIjoxNjA4Mjc0MDAzLCJuYmYiOjE2MDgyNjY4MDN9.yOokptlwqpn_SACIJ2usiUNgAeinYrWeOZ3_S-SN2KE";
const api1 = `https://healthservice.priaid.ch/symptoms?token=${authtoken}&format=json&language=en-gb`;
fetch(api1)
    .then(response => {
        return response.json();
    })
    .then(data => {
        symdata = data;
        //console.log(data);

    });

function find() {
    symt = document.getElementById('sym').value;
    // gender = document.getElementById('gen').value;
    dob = document.getElementById('age').value;

    if (document.getElementById('malRad').checked) {
        gender = "Male";
    }
    else if (document.getElementById('femRad').checked) {
        gender = "Female";
    }

    for (i = 0; i < 281; i++) {
        if (symt == symdata[i].Name) {
            symid = symdata[i].ID;
        }
    }

    const api2 = `https://healthservice.priaid.ch/diagnosis?symptoms=[${symid}]&gender=${gender}&year_of_birth=${dob}&token=${authtoken}&format=json&language=en-gb`;
    fetch(api2)
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log(data);

            document.getElementById('soln').innerHTML = data.map(sol =>
                `<div class="sympData">
                
                    <h2 class="heading-tertiary no-bg" id="icdname">
                        ${sol.Issue.IcdName}
                    </h2>
                    <p class="paragraph no-margin" id="solname">
                        ${sol.Issue.Name}
                    </p>
                    <br>
                    <h2 class="heading-tertiary no-bg">Solution</h2>
                    ${sol.Specialisation.map(spe =>
                    `<li class="paragraph no-margin">${spe.Name}</li>`
                ).join('')}
                
                <br><br>
                <hr>
                <br>
                </div>`
            ).join('')
        });
}

function run() {
    drug = document.getElementById('drugname').value;

    const api1 = `https://api.fda.gov/drug/label.json?search=${drug}`;
    fetch(api1)
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log(data);
            var res1 = data.results[0].information_for_patients[0].split(".", 4);
            var res2 = data.results[0].adverse_reactions[0].split(".", 3);

            document.getElementById('soln').innerHTML =
                `<div class="medData">
                        <h2 class="heading-secondary no-bg" >${drug}</h2>
                        <br><br>
                        <h3 class="fhide heading-tertiary">Patient Advice</h3>
                        <p class="thide paragraph">${data.results[0].information_for_patients[0]}</p>
                        <br>
                        <h3 class="fhide heading-tertiary">Adverse Reaction</h3>
                        <p class="thide paragraph">${data.results[0].adverse_reactions[0]}</p>                                            
                        <br>
                        <h3 class="fhide heading-tertiary">Overdosage</h3>
                        <p class="thide paragraph">${data.results[0].overdosage[0]}</p>                                            
                        <br>
                        <h3 class="fhide heading-tertiary">Pregnancy</h3>
                        <p class="thide paragraph">${data.results[0].pregnancy[0]}</p>                                            
                        <br>
                        <h3 class="fhide heading-tertiary">Elements</h3>
                        <p class="thide paragraph">${data.results[0].spl_product_data_elements[0]}</p>                                            
                        <br>
                    <br><br>
                    <hr>
                    <br>
                    </div>`

        });
}
