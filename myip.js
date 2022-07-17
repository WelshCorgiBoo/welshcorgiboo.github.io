const myipText = document.querySelector("#myIp");

function getIp() {
    try {
        fetch(`https://api.ip.pe.kr/json`)
            .then((res) => {
                 return res.json();
            })
            .then((response) => {
                // console.log(response.ip, response.country_code, response.country_name.ko);
                const ip = response.ip;
                const country = response.country_name.en;
                myipText.innerText = `${ip} / ${country}`;
            })
            .catch((err) => {
                console.log(err);
            });
    } catch (err) {} finally {
        myipText.innerText = 'Internet Disconnected!';
    }
}
getIp();