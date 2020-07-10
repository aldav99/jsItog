// let url = "https://api.github.com/repos/octocat/Hello-World/issues/1347";

let elem = document.getElementById('btn');

elem.addEventListener('click', fetchIssue);

// let url = "https://api.github.com/repos/octocat/Hello-World/issues";


// let url = "https://github.com/repos/aldav99/jsItog/issues/1";

// https://github.com/facebook/react/issues

async function fetchAsync() {
    let inptUrl = document.getElementById('url');
    let url = inptUrl.value;
    // await response of fetch call
    // let response = await fetch(url, { filter: 'subscribed' });
    let response = await fetch(url);
    // let response = await fetch(url, {
    //     headers: new Headers({
    //         'Access-Control-Allow-Origin': '*'
    //     })
    // });
    // only proceed once promise is resolved
    let data = await response.json();
    // only proceed once second promise is resolved
    return data;
}

// trigger async function
// log response or catch error of fetch promise
function fetchIssue() {
    fetchAsync()
        .then(data => data.map(function (element) {
            // console.table(element.number,
            //     element.created_at, element.title, element.body)
            return addResultData(element);
        }))
        .catch(reason => console.log(reason.message))
}

function addResultData(data) {
    let resultOutput = document.getElementById('result');
    let divCore = document.createElement('div');
    divCore.classList.add("core-border", "parent");
    let tr1 = document.createElement('tr');

    let tdNumber = document.createElement('td');
    let textNumber = document.createTextNode(data.number);
    tdNumber.classList.add("number-before");
    tdNumber.appendChild(textNumber);

    let tdCreatedAt = document.createElement('td');
    let textCreatedAt = document.createTextNode(data.created_at.trim());
    tdCreatedAt.classList.add("data-before");
    tdCreatedAt.appendChild(textCreatedAt);

    tr1.appendChild(tdNumber);
    tr1.appendChild(tdCreatedAt);

    console.log(tr1.children)

    let tr2 = document.createElement('tr');

    // let divTitle = document.createElement('div');
    let textTitle = document.createTextNode(data.title);
    tr2.appendChild(textTitle);

    let tr3 = document.createElement('tr');

    // let divBody = document.createElement('div');
    let textBody = document.createTextNode(data.body);
    tr3.appendChild(textBody);

    divCore.appendChild(tr1);
    divCore.appendChild(tr2);
    divCore.appendChild(tr3);
    // divCore.appendChild(divBody);

    resultOutput.appendChild(divCore);
}
