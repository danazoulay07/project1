var arr_tasks = [];
var id_current = 0;
window.onload = Init;

function Init() {
    if (localStorage.getItem("id_current")) {
        id_current = localStorage.getItem("id_current"); //recupere le id_current du localstorage
    }
    if (JSON.parse(localStorage.getItem("tasks")) === null) { return }
    var strg_tasks = localStorage.getItem("tasks"); //recupere le tasks du localstorage
    arr_tasks = JSON.parse(strg_tasks); //met le tasks du localstorage dans le arr_tasks
    AddAllInit()
}

function AddAllInit() {  // cette fonction ajoute tous les papiers au demarage dans la page html
    var board = document.getElementById("board");
    for (var i = 0; i < arr_tasks.length; i++) {
        board.innerHTML += `<div class="paper">
            <div id="xdelete" onclick="Delete(${arr_tasks[i].id},event)" class="glyphicon glyphicon-remove"></div>
            <div class="paper_task">${arr_tasks[i].task}</div>
            <div class="paper_date">${arr_tasks[i].date}</div>
            <div class="paper_time">${arr_tasks[i].time}</div>
        </div>`;// a la place du X (delete) il faut changer et utiliser glyphicon voir feuille projet
    }
    
}

function Add() {  //cette fonction ajoute le papier dans la page,dans le arr_tasks et dans le localstorage
    if (!Verif()) { return } // si la fonction verif return false alors on ajoute pas le task
    var task = document.getElementById("task").value;
    var date = document.getElementById("date").value;
    var time = document.getElementById("time").value;
    var board = document.getElementById("board");
    board.innerHTML += `<div class="paper">
        <div id="xdelete" onclick="Delete(${id_current},event)" class="glyphicon glyphicon-remove"></div>
        <div class="paper_task">${task}</div>
        <div class="paper_date">${date}</div>
        <div class="paper_time">${time}</div>
    </div>`;// a la place du X (delete) il faut changer et utiliser glyphicon voir feuille projet

    var for_arr_task = `{"id":${id_current}, "task":"${task}", "date":"${date}", "time":"${time}"}`;
    arr_tasks.push(JSON.parse(for_arr_task));
    var arr_localstrg = JSON.stringify(arr_tasks);
    localStorage.setItem("tasks", arr_localstrg);

    id_current++;
    localStorage.setItem("id_current", id_current);
    Clear();
}

function Clear() {
    document.getElementById("task").value="";
    document.getElementById("date").value="";
    document.getElementById("time").value="";
}

function Verif() {
    var buffer="";
    if(document.getElementById("task").value===""){
        buffer += "the task is empty ";
       }
    if(document.getElementById("date").value===""){
        buffer += "the date is empty";
    }
    if(buffer===""){return true;}
    alert(buffer);
    return false;

    //ici on fait toute les verifications pour voir si les donnees sont
    //conrrete si oui il faut faire return true sinon return false avec un message d'erreur
    //!!! le task et la date sont obligatoire mais pas le time !!!
 
}

function Delete(id_delete, e) { //cette fonction supprime le papier de la page , du arr_tasks et du local storage
    var board = document.getElementById("board");
    e.target.parentElement.remove();
    for (var i = 0; i < arr_tasks.length; i++) {
        if (arr_tasks[i].id === id_delete) {
            arr_tasks.splice(i, 1);
            var arr_localstrg = JSON.stringify(arr_tasks);
            localStorage.setItem("tasks", arr_localstrg);
            return
           /* divnote.style.WebkitAnimation = "fadeout 2s 1";*/
        }
    }
}