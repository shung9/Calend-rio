const daysTag = document.querySelector(".days"),
currentDate = document.querySelector(".current-date"),
prevNextIcon = document.querySelectorAll(".icons span");

// getting nova data, ano e mes
let date = new Date(),
currYear = date.getFullYear(),
currMonth = date.getMonth();

// nomes dos meses
const months = ["janeiro", "Fevreiro", "Março", "Abril", "Maio", "Junho", "Julho",
              "Agosto", "Setembro", "Outobro", "Novembro", "Dezembro"];


const renderCalendar = () => {
    let firstDayofMonth = new Date(currYear, currMonth, 1).getDay(), // getting primeiro dia do mes
    lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(), // utima data do mes
    lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay(), // ulimo dia do mes
    lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate(); 
    let liTag = "";

    for (let i = firstDayofMonth; i > 0; i--) { // criando li para visualizaçao 
        liTag += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`;
    }

    for (let i = 1; i <= lastDateofMonth; i++) { // criando li todos os dias do mes corrente
        // add active class no li current dia, mes ...
        let isToday = i === date.getDate() && currMonth === new Date().getMonth() 
                     && currYear === new Date().getFullYear() ? "active" : "";
        liTag += `<li class="${isToday}">${i}</li>`;
    }

    for (let i = lastDayofMonth; i < 6; i++) { // criando li para o dia seguinte
        liTag += `<li class="inactive">${i - lastDayofMonth + 1}</li>`
    }
    currentDate.innerText = `${months[currMonth]} ${currYear}`; 
    daysTag.innerHTML = liTag;
}
renderCalendar();

prevNextIcon.forEach(icon => { // prev e next icons
    icon.addEventListener("click", () => { // add click event nos icons
        currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;

        if(currMonth < 0 || currMonth > 11) { 
            date = new Date(currYear, currMonth, new Date().getDate());
            currYear = date.getFullYear(); 
            currMonth = date.getMonth(); 
        } else {
            date = new Date(); 
        }
        renderCalendar(); // chamando renderCalendar function
    });
});