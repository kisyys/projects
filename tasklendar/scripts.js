var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
var days2 = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
var d = new Date(); 
var d2 = new Date();
var dayName = days[d.getDay()];
var year = d2.getFullYear();
var month = d2.getMonth()+1;
var now = d2.getHours();
var today = d2.getDate();
var display = 0;
var old = 0;
var old2 = 0;
var index1 = 0;
var list_divhourtasks = [];
currentDate = new Date();
startDate = new Date(currentDate.getFullYear(), 0, 1);
var days3 = Math.floor((currentDate - startDate) / (24 * 60 * 60 * 1000));       
var weekNumber = Math.ceil(days3 / 7);

if(!localStorage.getItem("specialtasks"))  {
    var special_tasks =[];
} 
else {
    var special_tasks = JSON.parse(localStorage.getItem("specialtasks"));
}

if(!localStorage.getItem("easytasks"))  {
    var easy_tasks =["Do 10 pushups", "Do 10 abs", "Clean something", "Pick up 2 trashes outside", "Walk 10 floors up"];
} 
else {
    var easy_tasks = JSON.parse(localStorage.getItem("easytasks"));
}

if(!localStorage.getItem("hardtasks"))  {
    var hard_tasks =["Exercise for 30 min", "Clean house", "Go kayaking for 60 min", "Go biking for 60 min"];
} 
else {
    var hard_tasks = JSON.parse(localStorage.getItem("hardtasks"));
}

if(!localStorage.getItem("total"))  {
    var score_total = 0;
} 
else {
    var score_total = localStorage.getItem("total");
}

if(!localStorage.getItem("weekly_score"))  {
    var score_weekly = [];
} 
else {
    var score_weekly = JSON.parse(localStorage.getItem("weekly_score"));
}

if(!localStorage.getItem("weekly_possible"))  {
    var possible_weekly = [];
} 
else {
    var possible_weekly = JSON.parse(localStorage.getItem("weekly_possible"));
}

if(!localStorage.getItem("daily_score"))  {
    var score_daily = [];
} 
else {
    var score_daily = JSON.parse(localStorage.getItem("daily_score"));
}

if(!localStorage.getItem("daily_possible"))  {
    var possible_daily = [];
} 
else {
    var possible_daily = JSON.parse(localStorage.getItem("daily_possible"));
} 

if(!localStorage.getItem("day_history"))  {
    var history2 = [];
} 
else {
    var history2 = JSON.parse(localStorage.getItem("day_history"));
}

if(!localStorage.getItem("divhourtasks_history"))  {
    var list_divhourtasks_history = [];
} 
else {
    var list_divhourtasks_history = JSON.parse(localStorage.getItem("divhourtasks_history"));
}


function clear() {
    document.getElementById("p0").innerHTML = "";
    document.getElementById("p1").innerHTML = "";
    document.getElementById("p2").innerHTML = "";
    document.getElementById("p3").innerHTML = "";
    document.getElementById("p4").innerHTML = "";
    document.getElementById("month_year").innerHTML = "";
    document.getElementById("app-calendar1").innerHTML = "";
    document.getElementById("app-calendar2").innerHTML = "";
    document.getElementById("tasks0").innerHTML = "";
    document.getElementById("tasks01").innerHTML = "";
    document.getElementById("tasks00").innerHTML = "";
    document.getElementById("tasks001").innerHTML = "";
    document.getElementById("tasks1").innerHTML = "";
    document.getElementById("tasks2").innerHTML = "";
    document.getElementById("info0").innerHTML = "";
}


function info(){  
    clear();
    display = 1;

    document.getElementById("month_year").innerHTML = "Info";
    const back = document.querySelector("#p0");
    back.insertAdjacentHTML("beforeend", `<p id="p0" style="text-align:left" onclick="back(0)"> <b> Back to calendar </b> </p>`);   
    const information = document.querySelector("#info0");
    information.insertAdjacentHTML("beforeend", `
	<p>
    <b>Version: </b> Tasklendar 0.5
    </p>
    <p>
    <b>Purpose: </b> To gamify different kinds of tasks which you would like to achieve during a day. Tasks can be related to anything from sports to cleaning. 
    </p>
    <p>
    <b>How: </b> App will generate tasks randomly for you in the today's view between hours of 10-21 based of different task lists. You then need to do them if possible and if you have succeeded, you can swipe right to complete a task which will be recorded as a point. Swiping only works on touch screen. No alternative yet available.
    <br>
    <br> 
    In the task menu you can see a list of random tasks depending on difficulty. You can add more of those tasks if needed and you may delete the ones that you do not need. You can also add a special task for a certain date and time if needed.   
    <br>
    <br>
    In the stats menu you can track your progress. This is still very basic stats menu so more features will come. 
    </p>
    <b>Disclaimer: </b> Added tasks, stats and history are saved on your browser's local storage, so if you clear the history in your browser, all the created data in local storage will be cleared also.
    </p>
	<br>
    <p>
    <b>Development ideas </b>
    </p>
    <ul>
    <li>
    <del>
    Create info page
    </del>
    </li>
    </ul>
    <ul>
    <li>
    Better stats and history (weekly)
    </li>
    </ul>
    <ul>
    <li>
    Adjustable hours for random tasks
    </li>
    </ul>
    <ul>
    <li>
    Visualization of the frontend
    </li>
    </ul>
    <ul>
    <li>
    Optimization of the backend code
    </li>
    </ul>
    <ul>
    <li>
    Create an alternative for swipe action
    </li>
    </ul>
    <br>
    `);
}


function tasks(){  
    clear();
    display = 1;

    document.getElementById("month_year").innerHTML = "Tasks";
    const back = document.querySelector("#p0");
    back.insertAdjacentHTML("beforeend", `<p id="p0" style="text-align:left" onclick="back(0)"> <b> Back to calendar </b> </p>`);   
    const rtasks = document.querySelector("#tasks0");
    rtasks.insertAdjacentHTML("beforeend", `
	<legend>Add a random task</legend>
	<label for="etasks2">Easy task:</label>
	<input type="text" id="etasks2"></input>
	<br>
    <br>
    <button type="button" onclick="addTask(1)">Add a task</button>
    <br>
    <br>
    <br> 
	<label for="htasks2">Hard task:</label>
	<input type="text" id="htasks2"></input>
	<br>
    <br>
    <button type="button" onclick="addTask(2)">Add a task</button>
    <br>
    <br>
    <br> 
	<legend>Add a special task</legend>
	<label for="date2">Date(d/m/yyyy):</label>
	<input type="text" id="date2"></input>
	<br>
	<br>
    <label for="time2">Starting time:</label>
	<input type="text" id="time2"></input>
	<br>
	<br>
    <label for="stask2">Special task name:</label>
	<input type="text" id="stasks2"></input>
	<br>
	<br>
    <button type="button" onclick="addTask(3)">Add a task</button>
    <br>
    <br>
    <br>
    `);

    taskLists(); 
}


function taskLists() {
    const lists = document.querySelector("#tasks00");
    lists.insertAdjacentHTML("beforeend", `<legend>List of easy tasks:</legend> <select id="list1"></select> <br><br>`);
    
    var sel = document.getElementById('list1');
    for(let i = 0; i<easy_tasks.length; i++) {
        var opt = document.createElement('option');
        opt.innerHTML = easy_tasks[i];
        opt.value = easy_tasks[i];
        sel.appendChild(opt);
    }

    lists.insertAdjacentHTML("beforeend", `<button type="button" onclick="deleteTask(1)">Delete a task</button> <br><br><br>`);
    lists.insertAdjacentHTML("beforeend", `<legend>List of hard tasks:</legend> <select id="list2"></select> <br><br>`);
    
    var sel = document.getElementById('list2');
    for(let i = 0; i<hard_tasks.length; i++) {
        var opt = document.createElement('option');
        opt.innerHTML = hard_tasks[i];
        opt.value = hard_tasks[i];
        sel.appendChild(opt);
    }

    lists.insertAdjacentHTML("beforeend", `<button type="button" onclick="deleteTask(2)">Delete a task</button> <br><br><br>`);
    lists.insertAdjacentHTML("beforeend", `<legend>List of special tasks:</legend> <select id="list3"></select> <br><br>`);
    
    var sel = document.getElementById('list3');
    for(let i = 0; i<special_tasks.length; i++) {
        var opt = document.createElement('option');
        opt.innerHTML = special_tasks[i] + ", " + special_tasks[i+1] + ", " + special_tasks[i+2];
        opt.value = special_tasks[i] + ", " + special_tasks[i+1] + ", " + special_tasks[i+2];
        sel.appendChild(opt);
        i++;
        i++;
    }

    lists.insertAdjacentHTML("beforeend", `<button type="button" onclick="deleteTask(3)">Delete a task</button> <br><br><br>`);
}


function addTask(number) {
    if(number==1 && document.getElementById("etasks2").value != "") {
        var task = document.getElementById("etasks2").value;
        easy_tasks.push(task);
        localStorage.setItem("easytasks", JSON.stringify(easy_tasks));
        document.getElementById("tasks01").innerHTML = "Task added";
        setTimeout(dis,2000);
        document.getElementById("etasks2").value ="";
    }
    else if(number==2 && document.getElementById("htasks2").value != "") {
        var task = document.getElementById("htasks2").value;
        hard_tasks.push(task);
        localStorage.setItem("hardtasks", JSON.stringify(hard_tasks));
        document.getElementById("tasks01").innerHTML = "Task added";
        setTimeout(dis,2000);
        document.getElementById("htasks2").value ="";
    }

    else if(number==3 && document.getElementById("date2").value != "" && document.getElementById("time2").value != "" && document.getElementById("stasks2").value != "") {
        var date = document.getElementById("date2").value;
        var time = document.getElementById("time2").value;
        var task = document.getElementById("stasks2").value;
        special_tasks.push(date,time,task);
        localStorage.setItem("specialtasks", JSON.stringify(special_tasks));
        document.getElementById("tasks01").innerHTML = "Task added";
        setTimeout(dis,2000);
        document.getElementById("date2").value ="";
        document.getElementById("time2").value ="";
        document.getElementById("stasks2").value ="";
        
    }
    
    document.getElementById("tasks00").innerHTML = "";
    taskLists();
}


function deleteTask(number) {
    if(number==1 && document.getElementById("list1").value != "") {
        var task = document.getElementById("list1").value;
        const index = easy_tasks.indexOf(task);
        if (index > -1) { 
            easy_tasks.splice(index, 1);
        }
        localStorage.setItem("easytasks", JSON.stringify(easy_tasks));
        document.getElementById("tasks001").innerHTML = "Task deleted";
        setTimeout(dis,2000);
    }
    else if(number==2 && document.getElementById("list2").value != "") {
        var task = document.getElementById("list2").value;
        const index = hard_tasks.indexOf(task);
        if (index > -1) { 
            hard_tasks.splice(index, 1);
        }
        localStorage.setItem("hardtasks", JSON.stringify(hard_tasks));
        document.getElementById("tasks001").innerHTML = "Task deleted";
        setTimeout(dis,2000);
    }

    else if(number==3 && document.getElementById("list3").value != "") {
        var task = document.getElementById("list3").value;
        var t = task.split(", ");
        for(let i = 0;i<3;i++) {
            const index = special_tasks.indexOf(t[i]);
            if (index > -1) { 
                special_tasks.splice(index, 1);
            }
        }
        localStorage.setItem("specialtasks", JSON.stringify(special_tasks));
        document.getElementById("tasks001").innerHTML = "Task deleted";
        setTimeout(dis,2000);
        
    }
    
    document.getElementById("tasks00").innerHTML = "";
    taskLists();   
}

function dis() {
    document.getElementById("tasks001").innerHTML = ""
    document.getElementById("tasks01").innerHTML = ""
}


function refresh() {
    if(!localStorage.getItem("day_history"))  {
        history2 = [];
    } 
    else {
        history2 = JSON.parse(localStorage.getItem("day_history"));
    }
}


function stats() {   
    clear();
    display = 1;

    document.getElementById("month_year").innerHTML = "Stats";
    const back = document.querySelector("#p0");
    back.insertAdjacentHTML("beforeend", `<p id="p0" style="text-align:left" onclick="back(0)"> <b> Back to calendar </b> </p>`);

    var today_score = 0;
    var today_possible = 0;

    var thisweek_score = 0;
    var thisweek_possible = 0;

    var thisWeek = "Week "+weekNumber;
    var thisDay = today + "/" + month + "/" + year;
    
    for(let i = 0; i<score_weekly.length; i++) {
        if(score_weekly[i]==thisWeek) {
            thisweek_score = score_weekly[i+1];
            break;
        }
    }

    for(let i = 0; i<possible_weekly.length; i++) {
        if(possible_weekly[i]==thisWeek) {
            thisweek_possible = possible_weekly[i+1];
            break;
        }
    }

    for(let i = 0; i<score_daily.length; i++) {
        if(score_daily[i]==thisDay) {
            today_score = score_daily[i+1];
            break;
        }
    }

    for(let i = 0; i<possible_daily.length; i++) {
        if(possible_daily[i]==thisDay) {
            today_possible = possible_daily[i+1];
            break;
        }
    }

    const scores = document.querySelector("#tasks0");
    scores.insertAdjacentHTML("beforeend",  "<b> Today's score: " + today_score + "/" + today_possible + "</b> <br>" + "<b> This week's score: " + thisweek_score + "/" + thisweek_possible + "</b> <br>" + "<b> Total score: " + score_total + "</b> <br> <br>" + score_weekly);

    const status = document.querySelector("#tasks01");

    if(today_score/today_possible<0.5 || today_score==0) {
        status.insertAdjacentHTML("beforeend",  "<b> Daily progress: You have not done any tasks :(</b> <br>");
    }
    else if(today_score/today_possible==1) {
        status.insertAdjacentHTML("beforeend",  "<b> Daily progress: All tasks done, you can now relax for today! :)</b> <br> " +  `<img src="makeit2.gif" alt="">` );
    }
    else {
        status.insertAdjacentHTML("beforeend",  "<b> Daily progress: Good progress, keep it up! :)</b> <br>");
    }

    
}

function addStats(number,stats) {

    if(stats=="weekly") {
        var found = 0;
        var whatWeek = "Week "+weekNumber;

        for(let i = 0; i<score_weekly.length; i++) {
            if(score_weekly[i]==whatWeek) {
                score_weekly[i+1] = score_weekly[i+1] + number;
                found = 1;
                break;
            }
        }

        if(found==0) {
            score_weekly.push(whatWeek);
            score_weekly.push(number);
        }

        localStorage.setItem("weekly_score", JSON.stringify(score_weekly));
    }

    if(stats=="daily") {
        var found = 0;
        var whatDay = today + "/" + month + "/" + year;

        for(let i = 0; i<score_daily.length; i++) {
            if(score_daily[i]==whatDay) {
                score_daily[i+1] = score_daily[i+1] + number;
                found = 1;
                break;
            }
        }

        if(found==0) {
            score_daily.push(whatDay);
            score_daily.push(number);
        }

        localStorage.setItem("daily_score", JSON.stringify(score_daily));
    }

    if(stats=="weekly_pos") {
        var found = 0;
        var whatWeek = "Week "+weekNumber;

        for(let i = 0; i<possible_weekly.length; i++) {
            if(possible_weekly[i]==whatWeek) {
                possible_weekly[i+1] = possible_weekly[i+1] + number;
                found = 1;
                break;
            }
        }

        if(found==0) {
            possible_weekly.push(whatWeek);
            possible_weekly.push(number);
        }

        localStorage.setItem("weekly_possible", JSON.stringify(possible_weekly));
    }

    if(stats=="daily_pos") {
        var found = 0;
        var whatDay = today + "/" + month + "/" + year;

        for(let i = 0; i<possible_daily.length; i++) {
            if(possible_daily[i]==whatDay) {
                possible_daily[i+1] = possible_daily[i+1] + number;
                found = 1;
                break;
            }
        }

        if(found==0) {
            possible_daily.push(whatDay);
            possible_daily.push(number);
        }

        localStorage.setItem("daily_possible", JSON.stringify(possible_daily));
    }
    
}


function dayview(number, number2) {  
    clear();
    refresh();
    list_divhourtasks = [];
    display = 1;
    var x =0;
    var dayName2 = days2[number2];
    var whatDay = number + "/" + month + "/" + year;
    old = 0;
    old2 = 1;
    index1 = 0;
    
    document.getElementById("month_year").innerHTML = number + "/" + month + "/" + year;
    const back = document.querySelector("#p0");
    back.insertAdjacentHTML("beforeend", `<p id="p0" style="text-align:left" onclick="back(0)"> <b> Back to calendar </b> </p>`);
    const topic = document.querySelector("#tasks0");
    topic.insertAdjacentHTML("beforeend", `<div class="topic";> ${ "<b>" +  dayName2 +  "</b>"}</div>`);
    const etasks = document.querySelector("#tasks1");

    for(let i = 0; i<history2.length; i++) {
        if(history2[i]== whatDay) {
            old = i+1;
            old2=old;       
        }
    }

    for(let i = 0; i<list_divhourtasks_history.length; i++) {
        if(list_divhourtasks_history[i]== whatDay) {
            index1 = i+1;        
        }
    }

    if(old>0) {
        for(let hour = 1; hour <= 24; hour++) {
            etasks.insertAdjacentHTML("beforeend", history2[old]);
            old++
            if(now+1==hour && number==today && month == d2.getMonth()+1 && year == d2.getFullYear()) {
                x = hour;
            }
        }

        for(let i = 0; i<list_divhourtasks_history.length;i++) {
            if(list_divhourtasks_history[index1]=="next") {
                break;
            }
            list_divhourtasks[i] = list_divhourtasks_history[index1];
            index1++;       
        }
    } 
        
    else {     
        for(let hour = 1; hour <= 24; hour++) {
            var special = 0;
            var previous = hour-1;
            var random1 = Math.floor(Math.random() * 3);
            var random2 = easy_tasks[Math.floor(Math.random()*easy_tasks.length)];
            var random3 = Math.floor(Math.random() * 15);
            var random4 = hard_tasks[Math.floor(Math.random()*hard_tasks.length)];
    
            if(now+1==hour && number==today && month == d2.getMonth()+1 && year == d2.getFullYear()) {
                x = hour;
            }

            if(number==today && month == d2.getMonth()+1 && year == d2.getFullYear()) {

                if(hour==1) {
                    history2.push(whatDay);
                    list_divhourtasks_history.push(whatDay);
                }
                
                for(let y = 0; y<special_tasks.length;y++) {
                    if(special_tasks[y]==whatDay && special_tasks[y+1]==previous) {
                        etasks.insertAdjacentHTML("beforeend", `<div class="hourspecial"${` id="divhourtask` + hour + `";>` + `<p style="color:black";>` + previous + ":00" + "-" + hour + ":00" + "  " + "</p>" + special_tasks[y+2]}</div>`);
                        list_divhourtasks.push("divhourtask" + hour);
                        history2.push(` <div class="hourspecial"${` id="divhourtask` + hour + `";>` + `<p style="color:black";>` + previous + ":00" + "-" + hour + ":00" + "  " + "</p>" + special_tasks[y+2]}</div>`);
                        list_divhourtasks_history.push("divhourtask" + hour);
                        special = 1;
                        addStats(1,"weekly_pos");
                        addStats(1,"daily_pos");
                    }
                }
        
                if(hour==18 && number%2==0 && special==0) {
                    etasks.insertAdjacentHTML("beforeend", `<div class="hourspecial"${` id="divhourtask` + hour + `";>` + `<p style="color:black";>` + previous + ":00" + "-" + hour + ":00" + "  " + "</p>" + `<a style="color:blue" href="https://kisyys.github.io/kasvis/">Plan a dinner</a>`}</div>`);
                    list_divhourtasks.push("divhourtask" + hour);
                    history2.push(` <div class="hourspecial"${` id="divhourtask` + hour + `";>` + `<p style="color:black";>` + previous + ":00" + "-" + hour + ":00" + "  " + "</p>" + `<a style="color:blue" href="https://kisyys.github.io/kasvis/">Plan a dinner</a>`}</div>`);
                    list_divhourtasks_history.push("divhourtask" + hour);
                    addStats(1,"weekly_pos");
                    addStats(1,"daily_pos");      
                }
                else if(10<hour && 21>=hour && random3==0 && special==0) {
                    etasks.insertAdjacentHTML("beforeend", `<div class="hourhard"${` id="divhourtask` + hour + `";>` + `<p style="color:black";>` + previous + ":00" + "-" + hour + ":00" + "  " + "</p>" + random4}</div>`);
                    list_divhourtasks.push("divhourtask" + hour);
                    history2.push(` <div class="hourhard"${` id="divhourtask` + hour + `";>` + `<p style="color:black";>` + previous + ":00" + "-" + hour + ":00" + "  " + "</p>" + random4}</div>`);
                    list_divhourtasks_history.push("divhourtask" + hour);
                    addStats(1,"weekly_pos");
                    addStats(1,"daily_pos");
                }
                else if(10<hour && 21>=hour && random1==0 && special==0) {
                    etasks.insertAdjacentHTML("beforeend", `<div class="houreasy"${` id="divhourtask` + hour + `";>` + `<p style="color:black";>` + previous + ":00" + "-" + hour + ":00" + "  " + "</p>" + random2}</div>`);
                    list_divhourtasks.push("divhourtask" + hour);
                    history2.push(` <div class="houreasy"${` id="divhourtask` + hour + `";>` + `<p style="color:black";>` + previous + ":00" + "-" + hour + ":00" + "  " + "</p>" + random2}</div>`);
                    list_divhourtasks_history.push("divhourtask" + hour);
                    addStats(1,"weekly_pos");
                    addStats(1,"daily_pos"); 
                }
                else if (special==0) {
                    etasks.insertAdjacentHTML("beforeend", `<div class="hour"${` id="divhour` + hour + `";>` + `<p style="color:black";>` + previous + ":00" + "-" + hour + ":00" + "  " + "</p>"}</div>`);
                    history2.push(` <div class="hour"${` id="divhour` + hour + `";>` + `<p style="color:black";>` + previous + ":00" + "-" + hour + ":00" + "  " + "</p>"}</div>`);
                }

                if(hour==24) {
                    list_divhourtasks_history.push("next");
                }
                
            }

            else {
                for(let y = 0; y<special_tasks.length;y++) {
                    if(special_tasks[y]==whatDay && special_tasks[y+1]==previous) {
                        etasks.insertAdjacentHTML("beforeend", `<div class="hourspecial"${` id="divhourtask` + hour + `";>` + `<p style="color:black";>` + previous + ":00" + "-" + hour + ":00" + "  " + "</p>" + special_tasks[y+2]}</div>`);
                        list_divhourtasks.push("divhourtask" + hour);
                        special = 1;
                    }
                }
                if (special==0) {
                    etasks.insertAdjacentHTML("beforeend", `<div class="hour"${` id="divhour` + hour + `";>` + `<p style="color:black";>` + previous + ":00" + "-" + hour + ":00" + "  " + "</p>"}</div>`);
                }
            }                     
        }       
    }
 
    if(x>0 && !!document.getElementById(`divhour${x}`)) {
        const element = document.getElementById(`divhour${x}`);
        element.scrollIntoView();
    }

    if(x>0 && !!document.getElementById(`divhourtask${x}`)) {
        const element = document.getElementById(`divhourtask${x}`);
        element.scrollIntoView();
    }

    for(let i = 0; i<history2.length; i++) {
        if(history2[i]== whatDay) {
            old2=i+1;      
        }
    }

    localStorage.setItem("day_history", JSON.stringify(history2));
    localStorage.setItem("divhourtasks_history", JSON.stringify(list_divhourtasks_history));

    var vars = [];

    for (var i = 0; i <= 10; ++i) {
        vars[i] = "listener"+i;
    }

    if(list_divhourtasks.length<1) {

    }

    else if(list_divhourtasks.length<=1) {
        var numb2 = 0;
        vars[numb2] = document.getElementById(list_divhourtasks[numb2]);
        vars[numb2].addEventListener('touchstart', handleTouchStart, false);
        vars[numb2].addEventListener('touchmove', handleTouchMove0, false);
    }

    else if(list_divhourtasks.length<=2) {
        var numb2 = 0;
        vars[numb2] = document.getElementById(list_divhourtasks[numb2]);
        vars[numb2].addEventListener('touchstart', handleTouchStart, false);
        vars[numb2].addEventListener('touchmove', handleTouchMove0, false);
        numb2 = 1;
        vars[numb2] = document.getElementById(list_divhourtasks[numb2]);
        vars[numb2].addEventListener('touchstart', handleTouchStart, false);
        vars[numb2].addEventListener('touchmove', handleTouchMove1, false);
    }

    else if(list_divhourtasks.length<=3) {
        var numb2 = 0;
        vars[numb2] = document.getElementById(list_divhourtasks[numb2]);
        vars[numb2].addEventListener('touchstart', handleTouchStart, false);
        vars[numb2].addEventListener('touchmove', handleTouchMove0, false);
        numb2 = 1;
        vars[numb2] = document.getElementById(list_divhourtasks[numb2]);
        vars[numb2].addEventListener('touchstart', handleTouchStart, false);
        vars[numb2].addEventListener('touchmove', handleTouchMove1, false);
        numb2 = 2;
        vars[numb2] = document.getElementById(list_divhourtasks[numb2]);
        vars[numb2].addEventListener('touchstart', handleTouchStart, false);
        vars[numb2].addEventListener('touchmove', handleTouchMove2, false);
    }

    else if(list_divhourtasks.length<=4) {
        var numb2 = 0;
        vars[numb2] = document.getElementById(list_divhourtasks[numb2]);
        vars[numb2].addEventListener('touchstart', handleTouchStart, false);
        vars[numb2].addEventListener('touchmove', handleTouchMove0, false);
        numb2 = 1;
        vars[numb2] = document.getElementById(list_divhourtasks[numb2]);
        vars[numb2].addEventListener('touchstart', handleTouchStart, false);
        vars[numb2].addEventListener('touchmove', handleTouchMove1, false);
        numb2 = 2;
        vars[numb2] = document.getElementById(list_divhourtasks[numb2]);
        vars[numb2].addEventListener('touchstart', handleTouchStart, false);
        vars[numb2].addEventListener('touchmove', handleTouchMove2, false);
        numb2 = 3;
        vars[numb2] = document.getElementById(list_divhourtasks[numb2]);
        vars[numb2].addEventListener('touchstart', handleTouchStart, false);
        vars[numb2].addEventListener('touchmove', handleTouchMove3, false);
    }

    else if(list_divhourtasks.length<=5) {
        var numb2 = 0;
        vars[numb2] = document.getElementById(list_divhourtasks[numb2]);
        vars[numb2].addEventListener('touchstart', handleTouchStart, false);
        vars[numb2].addEventListener('touchmove', handleTouchMove0, false);
        numb2 = 1;
        vars[numb2] = document.getElementById(list_divhourtasks[numb2]);
        vars[numb2].addEventListener('touchstart', handleTouchStart, false);
        vars[numb2].addEventListener('touchmove', handleTouchMove1, false);
        numb2 = 2;
        vars[numb2] = document.getElementById(list_divhourtasks[numb2]);
        vars[numb2].addEventListener('touchstart', handleTouchStart, false);
        vars[numb2].addEventListener('touchmove', handleTouchMove2, false);
        numb2 = 3;
        vars[numb2] = document.getElementById(list_divhourtasks[numb2]);
        vars[numb2].addEventListener('touchstart', handleTouchStart, false);
        vars[numb2].addEventListener('touchmove', handleTouchMove3, false);
        numb2 = 4;
        vars[numb2] = document.getElementById(list_divhourtasks[numb2]);
        vars[numb2].addEventListener('touchstart', handleTouchStart, false);
        vars[numb2].addEventListener('touchmove', handleTouchMove4, false);
    }

    else if(list_divhourtasks.length<=6) {
        var numb2 = 0;
        vars[numb2] = document.getElementById(list_divhourtasks[numb2]);
        vars[numb2].addEventListener('touchstart', handleTouchStart, false);
        vars[numb2].addEventListener('touchmove', handleTouchMove0, false);
        numb2 = 1;
        vars[numb2] = document.getElementById(list_divhourtasks[numb2]);
        vars[numb2].addEventListener('touchstart', handleTouchStart, false);
        vars[numb2].addEventListener('touchmove', handleTouchMove1, false);
        numb2 = 2;
        vars[numb2] = document.getElementById(list_divhourtasks[numb2]);
        vars[numb2].addEventListener('touchstart', handleTouchStart, false);
        vars[numb2].addEventListener('touchmove', handleTouchMove2, false);
        numb2 = 3;
        vars[numb2] = document.getElementById(list_divhourtasks[numb2]);
        vars[numb2].addEventListener('touchstart', handleTouchStart, false);
        vars[numb2].addEventListener('touchmove', handleTouchMove3, false);
        numb2 = 4;
        vars[numb2] = document.getElementById(list_divhourtasks[numb2]);
        vars[numb2].addEventListener('touchstart', handleTouchStart, false);
        vars[numb2].addEventListener('touchmove', handleTouchMove4, false);
        numb2 = 5;
        vars[numb2] = document.getElementById(list_divhourtasks[numb2]);
        vars[numb2].addEventListener('touchstart', handleTouchStart, false);
        vars[numb2].addEventListener('touchmove', handleTouchMove5, false);
    }

    else if(list_divhourtasks.length<=7) {
        var numb2 = 0;
        vars[numb2] = document.getElementById(list_divhourtasks[numb2]);
        vars[numb2].addEventListener('touchstart', handleTouchStart, false);
        vars[numb2].addEventListener('touchmove', handleTouchMove0, false);
        numb2 = 1;
        vars[numb2] = document.getElementById(list_divhourtasks[numb2]);
        vars[numb2].addEventListener('touchstart', handleTouchStart, false);
        vars[numb2].addEventListener('touchmove', handleTouchMove1, false);
        numb2 = 2;
        vars[numb2] = document.getElementById(list_divhourtasks[numb2]);
        vars[numb2].addEventListener('touchstart', handleTouchStart, false);
        vars[numb2].addEventListener('touchmove', handleTouchMove2, false);
        numb2 = 3;
        vars[numb2] = document.getElementById(list_divhourtasks[numb2]);
        vars[numb2].addEventListener('touchstart', handleTouchStart, false);
        vars[numb2].addEventListener('touchmove', handleTouchMove3, false);
        numb2 = 4;
        vars[numb2] = document.getElementById(list_divhourtasks[numb2]);
        vars[numb2].addEventListener('touchstart', handleTouchStart, false);
        vars[numb2].addEventListener('touchmove', handleTouchMove4, false);
        numb2 = 5;
        vars[numb2] = document.getElementById(list_divhourtasks[numb2]);
        vars[numb2].addEventListener('touchstart', handleTouchStart, false);
        vars[numb2].addEventListener('touchmove', handleTouchMove5, false);
        numb2 = 6;
        vars[numb2] = document.getElementById(list_divhourtasks[numb2]);
        vars[numb2].addEventListener('touchstart', handleTouchStart, false);
        vars[numb2].addEventListener('touchmove', handleTouchMove6, false);
    }

    else if(list_divhourtasks.length<=8) {
        var numb2 = 0;
        vars[numb2] = document.getElementById(list_divhourtasks[numb2]);
        vars[numb2].addEventListener('touchstart', handleTouchStart, false);
        vars[numb2].addEventListener('touchmove', handleTouchMove0, false);
        numb2 = 1;
        vars[numb2] = document.getElementById(list_divhourtasks[numb2]);
        vars[numb2].addEventListener('touchstart', handleTouchStart, false);
        vars[numb2].addEventListener('touchmove', handleTouchMove1, false);
        numb2 = 2;
        vars[numb2] = document.getElementById(list_divhourtasks[numb2]);
        vars[numb2].addEventListener('touchstart', handleTouchStart, false);
        vars[numb2].addEventListener('touchmove', handleTouchMove2, false);
        numb2 = 3;
        vars[numb2] = document.getElementById(list_divhourtasks[numb2]);
        vars[numb2].addEventListener('touchstart', handleTouchStart, false);
        vars[numb2].addEventListener('touchmove', handleTouchMove3, false);
        numb2 = 4;
        vars[numb2] = document.getElementById(list_divhourtasks[numb2]);
        vars[numb2].addEventListener('touchstart', handleTouchStart, false);
        vars[numb2].addEventListener('touchmove', handleTouchMove4, false);
        numb2 = 5;
        vars[numb2] = document.getElementById(list_divhourtasks[numb2]);
        vars[numb2].addEventListener('touchstart', handleTouchStart, false);
        vars[numb2].addEventListener('touchmove', handleTouchMove5, false);
        numb2 = 6;
        vars[numb2] = document.getElementById(list_divhourtasks[numb2]);
        vars[numb2].addEventListener('touchstart', handleTouchStart, false);
        vars[numb2].addEventListener('touchmove', handleTouchMove6, false);
        numb2 = 7;
        vars[numb2] = document.getElementById(list_divhourtasks[numb2]);
        vars[numb2].addEventListener('touchstart', handleTouchStart, false);
        vars[numb2].addEventListener('touchmove', handleTouchMove7, false);
    }

    else if(list_divhourtasks.length<=9) {
        var numb2 = 0;
        vars[numb2] = document.getElementById(list_divhourtasks[numb2]);
        vars[numb2].addEventListener('touchstart', handleTouchStart, false);
        vars[numb2].addEventListener('touchmove', handleTouchMove0, false);
        numb2 = 1;
        vars[numb2] = document.getElementById(list_divhourtasks[numb2]);
        vars[numb2].addEventListener('touchstart', handleTouchStart, false);
        vars[numb2].addEventListener('touchmove', handleTouchMove1, false);
        numb2 = 2;
        vars[numb2] = document.getElementById(list_divhourtasks[numb2]);
        vars[numb2].addEventListener('touchstart', handleTouchStart, false);
        vars[numb2].addEventListener('touchmove', handleTouchMove2, false);
        numb2 = 3;
        vars[numb2] = document.getElementById(list_divhourtasks[numb2]);
        vars[numb2].addEventListener('touchstart', handleTouchStart, false);
        vars[numb2].addEventListener('touchmove', handleTouchMove3, false);
        numb2 = 4;
        vars[numb2] = document.getElementById(list_divhourtasks[numb2]);
        vars[numb2].addEventListener('touchstart', handleTouchStart, false);
        vars[numb2].addEventListener('touchmove', handleTouchMove4, false);
        numb2 = 5;
        vars[numb2] = document.getElementById(list_divhourtasks[numb2]);
        vars[numb2].addEventListener('touchstart', handleTouchStart, false);
        vars[numb2].addEventListener('touchmove', handleTouchMove5, false);
        numb2 = 6;
        vars[numb2] = document.getElementById(list_divhourtasks[numb2]);
        vars[numb2].addEventListener('touchstart', handleTouchStart, false);
        vars[numb2].addEventListener('touchmove', handleTouchMove6, false);
        numb2 = 7;
        vars[numb2] = document.getElementById(list_divhourtasks[numb2]);
        vars[numb2].addEventListener('touchstart', handleTouchStart, false);
        vars[numb2].addEventListener('touchmove', handleTouchMove7, false);
        numb2 = 8;
        vars[numb2] = document.getElementById(list_divhourtasks[numb2]);
        vars[numb2].addEventListener('touchstart', handleTouchStart, false);
        vars[numb2].addEventListener('touchmove', handleTouchMove8, false);
    }

    else if(list_divhourtasks.length<=10) {
        var numb2 = 0;
        vars[numb2] = document.getElementById(list_divhourtasks[numb2]);
        vars[numb2].addEventListener('touchstart', handleTouchStart, false);
        vars[numb2].addEventListener('touchmove', handleTouchMove0, false);
        numb2 = 1;
        vars[numb2] = document.getElementById(list_divhourtasks[numb2]);
        vars[numb2].addEventListener('touchstart', handleTouchStart, false);
        vars[numb2].addEventListener('touchmove', handleTouchMove1, false);
        numb2 = 2;
        vars[numb2] = document.getElementById(list_divhourtasks[numb2]);
        vars[numb2].addEventListener('touchstart', handleTouchStart, false);
        vars[numb2].addEventListener('touchmove', handleTouchMove2, false);
        numb2 = 3;
        vars[numb2] = document.getElementById(list_divhourtasks[numb2]);
        vars[numb2].addEventListener('touchstart', handleTouchStart, false);
        vars[numb2].addEventListener('touchmove', handleTouchMove3, false);
        numb2 = 4;
        vars[numb2] = document.getElementById(list_divhourtasks[numb2]);
        vars[numb2].addEventListener('touchstart', handleTouchStart, false);
        vars[numb2].addEventListener('touchmove', handleTouchMove4, false);
        numb2 = 5;
        vars[numb2] = document.getElementById(list_divhourtasks[numb2]);
        vars[numb2].addEventListener('touchstart', handleTouchStart, false);
        vars[numb2].addEventListener('touchmove', handleTouchMove5, false);
        numb2 = 6;
        vars[numb2] = document.getElementById(list_divhourtasks[numb2]);
        vars[numb2].addEventListener('touchstart', handleTouchStart, false);
        vars[numb2].addEventListener('touchmove', handleTouchMove6, false);
        numb2 = 7;
        vars[numb2] = document.getElementById(list_divhourtasks[numb2]);
        vars[numb2].addEventListener('touchstart', handleTouchStart, false);
        vars[numb2].addEventListener('touchmove', handleTouchMove7, false);
        numb2 = 8;
        vars[numb2] = document.getElementById(list_divhourtasks[numb2]);
        vars[numb2].addEventListener('touchstart', handleTouchStart, false);
        vars[numb2].addEventListener('touchmove', handleTouchMove8, false);
        numb2 = 9;
        vars[numb2] = document.getElementById(list_divhourtasks[numb2]);
        vars[numb2].addEventListener('touchstart', handleTouchStart, false);
        vars[numb2].addEventListener('touchmove', handleTouchMove9, false);
    }

    else if(list_divhourtasks.length<=11) {
        var numb2 = 0;
        vars[numb2] = document.getElementById(list_divhourtasks[numb2]);
        vars[numb2].addEventListener('touchstart', handleTouchStart, false);
        vars[numb2].addEventListener('touchmove', handleTouchMove0, false);
        numb2 = 1;
        vars[numb2] = document.getElementById(list_divhourtasks[numb2]);
        vars[numb2].addEventListener('touchstart', handleTouchStart, false);
        vars[numb2].addEventListener('touchmove', handleTouchMove1, false);
        numb2 = 2;
        vars[numb2] = document.getElementById(list_divhourtasks[numb2]);
        vars[numb2].addEventListener('touchstart', handleTouchStart, false);
        vars[numb2].addEventListener('touchmove', handleTouchMove2, false);
        numb2 = 3;
        vars[numb2] = document.getElementById(list_divhourtasks[numb2]);
        vars[numb2].addEventListener('touchstart', handleTouchStart, false);
        vars[numb2].addEventListener('touchmove', handleTouchMove3, false);
        numb2 = 4;
        vars[numb2] = document.getElementById(list_divhourtasks[numb2]);
        vars[numb2].addEventListener('touchstart', handleTouchStart, false);
        vars[numb2].addEventListener('touchmove', handleTouchMove4, false);
        numb2 = 5;
        vars[numb2] = document.getElementById(list_divhourtasks[numb2]);
        vars[numb2].addEventListener('touchstart', handleTouchStart, false);
        vars[numb2].addEventListener('touchmove', handleTouchMove5, false);
        numb2 = 6;
        vars[numb2] = document.getElementById(list_divhourtasks[numb2]);
        vars[numb2].addEventListener('touchstart', handleTouchStart, false);
        vars[numb2].addEventListener('touchmove', handleTouchMove6, false);
        numb2 = 7;
        vars[numb2] = document.getElementById(list_divhourtasks[numb2]);
        vars[numb2].addEventListener('touchstart', handleTouchStart, false);
        vars[numb2].addEventListener('touchmove', handleTouchMove7, false);
        numb2 = 8;
        vars[numb2] = document.getElementById(list_divhourtasks[numb2]);
        vars[numb2].addEventListener('touchstart', handleTouchStart, false);
        vars[numb2].addEventListener('touchmove', handleTouchMove8, false);
        numb2 = 9;
        vars[numb2] = document.getElementById(list_divhourtasks[numb2]);
        vars[numb2].addEventListener('touchstart', handleTouchStart, false);
        vars[numb2].addEventListener('touchmove', handleTouchMove9, false);
        numb2 = 10;
        vars[numb2] = document.getElementById(list_divhourtasks[numb2]);
        vars[numb2].addEventListener('touchstart', handleTouchStart, false);
        vars[numb2].addEventListener('touchmove', handleTouchMove10, false);
    }

    var xDown = null;                                                        
    var yDown = null;

    var date6 = document.getElementById("month_year").innerText;
    var date66 = date6.split("/");


    //done(0);

    // document.getElementById("p3").innerHTML = "";
    // const doit = document.querySelector("#p3");
    // doit.insertAdjacentHTML("beforeend", `<p id="p3" style="text-align:left" onclick="done(0)"> <b> Do it </b> </p>`);
    
    function getTouches(evt) {
        return evt.touches ||             // browser API
                evt.originalEvent.touches; // jQuery
    }                                                     
                                                                            
    function handleTouchStart(evt) {
        const firstTouch = getTouches(evt)[0];                                      
        xDown = firstTouch.clientX;                                      
        yDown = firstTouch.clientY;                                      
    };                                                
                                                                            
    function handleTouchMove0(evt) {
        if ( ! xDown || ! yDown ) {
            return;
        }

        var xUp = evt.touches[0].clientX;                                    
        var yUp = evt.touches[0].clientY;

        var xDiff = xDown - xUp;
        var yDiff = yDown - yUp;
                                                                            
        if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
            if ( xDiff > 0 ) {
                /* left swipe */
                var numb = 0;
                var content = document.getElementById(list_divhourtasks[numb]).innerHTML;
                if(display == 1 && content.includes("<del>") && date66[0]==today && date66[1] == d2.getMonth()+1 && date66[2] == d2.getFullYear())  {                
                    undone(numb);
                }
              
            } else {
                /* right swipe */
                var numb = 0;
                var content = document.getElementById(list_divhourtasks[numb]).innerHTML;
                if(display == 1 && !content.includes("<del>") && date66[0]==today && date66[1] == d2.getMonth()+1 && date66[2] == d2.getFullYear())  {                
                    done(numb);
                }
                
            }                       
        } else {
            if ( yDiff > 0 ) {
                /* down swipe */ 
            } else { 
                /* up swipe */
            }                                                                 
        }
        /* reset values */
        xDown = null;
        yDown = null;                                             
    };

    function handleTouchMove1(evt) {
        if ( ! xDown || ! yDown ) {
            return;
        }

        var xUp = evt.touches[0].clientX;                                    
        var yUp = evt.touches[0].clientY;

        var xDiff = xDown - xUp;
        var yDiff = yDown - yUp;
                                                                            
        if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
            if ( xDiff > 0 ) {
                /* left swipe */
                var numb = 1;
                var content = document.getElementById(list_divhourtasks[numb]).innerHTML;
                if(display == 1 && content.includes("<del>") && date66[0]==today && date66[1] == d2.getMonth()+1 && date66[2] == d2.getFullYear())  {                
                    undone(numb);
                }
              
            } else {
                /* right swipe */
                var numb = 1;
                var content = document.getElementById(list_divhourtasks[numb]).innerHTML;
                if(display == 1 && !content.includes("<del>") && date66[0]==today && date66[1] == d2.getMonth()+1 && date66[2] == d2.getFullYear())  {                
                    done(numb);
                }
                
            }                       
        } else {
            if ( yDiff > 0 ) {
                /* down swipe */ 
            } else { 
                /* up swipe */
            }                                                                 
        }
        /* reset values */
        xDown = null;
        yDown = null;                                             
    };

    function handleTouchMove2(evt) {
        if ( ! xDown || ! yDown ) {
            return;
        }

        var xUp = evt.touches[0].clientX;                                    
        var yUp = evt.touches[0].clientY;

        var xDiff = xDown - xUp;
        var yDiff = yDown - yUp;
                                                                            
        if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
            if ( xDiff > 0 ) {
                /* left swipe */
                var numb = 2;
                var content = document.getElementById(list_divhourtasks[numb]).innerHTML;
                if(display == 1 && content.includes("<del>") && date66[0]==today && date66[1] == d2.getMonth()+1 && date66[2] == d2.getFullYear())  {                
                    undone(numb);
                }
              
            } else {
                /* right swipe */
                var numb = 2;
                var content = document.getElementById(list_divhourtasks[numb]).innerHTML;
                if(display == 1 && !content.includes("<del>") && date66[0]==today && date66[1] == d2.getMonth()+1 && date66[2] == d2.getFullYear())  {                
                    done(numb);
                }
                
            }                       
        } else {
            if ( yDiff > 0 ) {
                /* down swipe */ 
            } else { 
                /* up swipe */
            }                                                                 
        }
        /* reset values */
        xDown = null;
        yDown = null;                                             
    };

    function handleTouchMove3(evt) {
        if ( ! xDown || ! yDown ) {
            return;
        }

        var xUp = evt.touches[0].clientX;                                    
        var yUp = evt.touches[0].clientY;

        var xDiff = xDown - xUp;
        var yDiff = yDown - yUp;
                                                                            
        if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
            if ( xDiff > 0 ) {
                /* left swipe */
                var numb = 3;
                var content = document.getElementById(list_divhourtasks[numb]).innerHTML;
                if(display == 1 && content.includes("<del>") && date66[0]==today && date66[1] == d2.getMonth()+1 && date66[2] == d2.getFullYear())  {                
                    undone(numb);
                }
              
            } else {
                /* right swipe */
                var numb = 3;
                var content = document.getElementById(list_divhourtasks[numb]).innerHTML;
                if(display == 1 && !content.includes("<del>") && date66[0]==today && date66[1] == d2.getMonth()+1 && date66[2] == d2.getFullYear())  {                
                    done(numb);
                }
                
            }                       
        } else {
            if ( yDiff > 0 ) {
                /* down swipe */ 
            } else { 
                /* up swipe */
            }                                                                 
        }
        /* reset values */
        xDown = null;
        yDown = null;                                             
    };

    function handleTouchMove4(evt) {
        if ( ! xDown || ! yDown ) {
            return;
        }

        var xUp = evt.touches[0].clientX;                                    
        var yUp = evt.touches[0].clientY;

        var xDiff = xDown - xUp;
        var yDiff = yDown - yUp;
                                                                            
        if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
            if ( xDiff > 0 ) {
                /* left swipe */
                var numb = 4;
                var content = document.getElementById(list_divhourtasks[numb]).innerHTML;
                if(display == 1 && content.includes("<del>") && date66[0]==today && date66[1] == d2.getMonth()+1 && date66[2] == d2.getFullYear())  {                
                    undone(numb);
                }
              
            } else {
                /* right swipe */
                var numb = 4;
                var content = document.getElementById(list_divhourtasks[numb]).innerHTML;
                if(display == 1 && !content.includes("<del>") && date66[0]==today && date66[1] == d2.getMonth()+1 && date66[2] == d2.getFullYear())  {                
                    done(numb);
                }
                
            }                       
        } else {
            if ( yDiff > 0 ) {
                /* down swipe */ 
            } else { 
                /* up swipe */
            }                                                                 
        }
        /* reset values */
        xDown = null;
        yDown = null;                                             
    };

    function handleTouchMove5(evt) {
        if ( ! xDown || ! yDown ) {
            return;
        }

        var xUp = evt.touches[0].clientX;                                    
        var yUp = evt.touches[0].clientY;

        var xDiff = xDown - xUp;
        var yDiff = yDown - yUp;
                                                                            
        if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
            if ( xDiff > 0 ) {
                /* left swipe */
                var numb = 5;
                var content = document.getElementById(list_divhourtasks[numb]).innerHTML;
                if(display == 1 && content.includes("<del>") && date66[0]==today && date66[1] == d2.getMonth()+1 && date66[2] == d2.getFullYear())  {                
                    undone(numb);
                }
              
            } else {
                /* right swipe */
                var numb = 5;
                var content = document.getElementById(list_divhourtasks[numb]).innerHTML;
                if(display == 1 && !content.includes("<del>") && date66[0]==today && date66[1] == d2.getMonth()+1 && date66[2] == d2.getFullYear())  {                
                    done(numb);
                }
                
            }                       
        } else {
            if ( yDiff > 0 ) {
                /* down swipe */ 
            } else { 
                /* up swipe */
            }                                                                 
        }
        /* reset values */
        xDown = null;
        yDown = null;                                             
    };

    function handleTouchMove6(evt) {
        if ( ! xDown || ! yDown ) {
            return;
        }

        var xUp = evt.touches[0].clientX;                                    
        var yUp = evt.touches[0].clientY;

        var xDiff = xDown - xUp;
        var yDiff = yDown - yUp;
                                                                            
        if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
            if ( xDiff > 0 ) {
                /* left swipe */
                var numb = 6;
                var content = document.getElementById(list_divhourtasks[numb]).innerHTML;
                if(display == 1 && content.includes("<del>") && date66[0]==today && date66[1] == d2.getMonth()+1 && date66[2] == d2.getFullYear())  {                
                    undone(numb);
                }
              
            } else {
                /* right swipe */
                var numb = 6;
                var content = document.getElementById(list_divhourtasks[numb]).innerHTML;
                if(display == 1 && !content.includes("<del>") && date66[0]==today && date66[1] == d2.getMonth()+1 && date66[2] == d2.getFullYear())  {                
                    done(numb);
                }
                
            }                       
        } else {
            if ( yDiff > 0 ) {
                /* down swipe */ 
            } else { 
                /* up swipe */
            }                                                                 
        }
        /* reset values */
        xDown = null;
        yDown = null;                                             
    };

    function handleTouchMove7(evt) {
        if ( ! xDown || ! yDown ) {
            return;
        }

        var xUp = evt.touches[0].clientX;                                    
        var yUp = evt.touches[0].clientY;

        var xDiff = xDown - xUp;
        var yDiff = yDown - yUp;
                                                                            
        if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
            if ( xDiff > 0 ) {
                /* left swipe */
                var numb = 7;
                var content = document.getElementById(list_divhourtasks[numb]).innerHTML;
                if(display == 1 && content.includes("<del>") && date66[0]==today && date66[1] == d2.getMonth()+1 && date66[2] == d2.getFullYear())  {                
                    undone(numb);
                }
              
            } else {
                /* right swipe */
                var numb = 7;
                var content = document.getElementById(list_divhourtasks[numb]).innerHTML;
                if(display == 1 && !content.includes("<del>") && date66[0]==today && date66[1] == d2.getMonth()+1 && date66[2] == d2.getFullYear())  {                
                    done(numb);
                }
                
            }                       
        } else {
            if ( yDiff > 0 ) {
                /* down swipe */ 
            } else { 
                /* up swipe */
            }                                                                 
        }
        /* reset values */
        xDown = null;
        yDown = null;                                             
    };

    function handleTouchMove8(evt) {
        if ( ! xDown || ! yDown ) {
            return;
        }

        var xUp = evt.touches[0].clientX;                                    
        var yUp = evt.touches[0].clientY;

        var xDiff = xDown - xUp;
        var yDiff = yDown - yUp;
                                                                            
        if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
            if ( xDiff > 0 ) {
                /* left swipe */
                var numb = 8;
                var content = document.getElementById(list_divhourtasks[numb]).innerHTML;
                if(display == 1 && content.includes("<del>") && date66[0]==today && date66[1] == d2.getMonth()+1 && date66[2] == d2.getFullYear())  {                
                    undone(numb);
                }
              
            } else {
                /* right swipe */
                var numb = 8;
                var content = document.getElementById(list_divhourtasks[numb]).innerHTML;
                if(display == 1 && !content.includes("<del>") && date66[0]==today && date66[1] == d2.getMonth()+1 && date66[2] == d2.getFullYear())  {                
                    done(numb);
                }
                
            }                       
        } else {
            if ( yDiff > 0 ) {
                /* down swipe */ 
            } else { 
                /* up swipe */
            }                                                                 
        }
        /* reset values */
        xDown = null;
        yDown = null;                                             
    };

    function handleTouchMove9(evt) {
        if ( ! xDown || ! yDown ) {
            return;
        }

        var xUp = evt.touches[0].clientX;                                    
        var yUp = evt.touches[0].clientY;

        var xDiff = xDown - xUp;
        var yDiff = yDown - yUp;
                                                                            
        if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
            if ( xDiff > 0 ) {
                /* left swipe */
                var numb = 9;
                var content = document.getElementById(list_divhourtasks[numb]).innerHTML;
                if(display == 1 && content.includes("<del>") && date66[0]==today && date66[1] == d2.getMonth()+1 && date66[2] == d2.getFullYear())  {                
                    undone(numb);
                }
              
            } else {
                /* right swipe */
                var numb = 9;
                var content = document.getElementById(list_divhourtasks[numb]).innerHTML;
                if(display == 1 && !content.includes("<del>") && date66[0]==today && date66[1] == d2.getMonth()+1 && date66[2] == d2.getFullYear())  {                
                    done(numb);
                }
                
            }                       
        } else {
            if ( yDiff > 0 ) {
                /* down swipe */ 
            } else { 
                /* up swipe */
            }                                                                 
        }
        /* reset values */
        xDown = null;
        yDown = null;                                             
    };

    function handleTouchMove10(evt) {
        if ( ! xDown || ! yDown ) {
            return;
        }

        var xUp = evt.touches[0].clientX;                                    
        var yUp = evt.touches[0].clientY;

        var xDiff = xDown - xUp;
        var yDiff = yDown - yUp;
                                                                            
        if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
            if ( xDiff > 0 ) {
                /* left swipe */
                var numb = 10;
                var content = document.getElementById(list_divhourtasks[numb]).innerHTML;
                if(display == 1 && content.includes("<del>") && date66[0]==today && date66[1] == d2.getMonth()+1 && date66[2] == d2.getFullYear())  {                
                    undone(numb);
                }
              
            } else {
                /* right swipe */
                var numb = 10;
                var content = document.getElementById(list_divhourtasks[numb]).innerHTML;
                if(display == 1 && !content.includes("<del>") && date66[0]==today && date66[1] == d2.getMonth()+1 && date66[2] == d2.getFullYear())  {                
                    done(numb);
                }
                
            }                       
        } else {
            if ( yDiff > 0 ) {
                /* down swipe */ 
            } else { 
                /* up swipe */
            }                                                                 
        }
        /* reset values */
        xDown = null;
        yDown = null;                                             
    };
}


function done(numberx) {
    score_total++;
    localStorage.setItem("total", score_total);
    addStats(1,"weekly");
    addStats(1,"daily");  
    var div = document.getElementById(list_divhourtasks[numberx]);
    var t = div.textContent;
    var t2 = t.split("  ");
    div.innerHTML = `<p style="color:black";>` + t2[0] + "  " + "</p>" +  "<del>" + t2[1] + "</del>";
    var t3 = t.split(":");
    //console.log(parseInt(old2)+parseInt(t3[0]));
    //console.log(history2[parseInt(old2)+parseInt(t3[0])]);

    history2[parseInt(old2)+parseInt(t3[0])] = div.outerHTML;
    localStorage.setItem("day_history", JSON.stringify(history2)); 
    document.getElementById("tasks2").innerHTML = "";
    const score2 = document.querySelector("#tasks2");
    score2.insertAdjacentHTML("beforeend", "<b> Score: " + score_total + "</b>");      
}


function undone(numberx) {
    score_total--;
    localStorage.setItem("total", score_total);
    addStats(-1,"weekly");
    addStats(-1,"daily");
    var div = document.getElementById(list_divhourtasks[numberx]);
    var t = div.textContent;
    var t2 = t.split("  ");
    div.innerHTML = `<p style="color:black";>` + t2[0] + "  " + "</p>"  + t2[1];
    var t3 = t.split(":");
    history2[parseInt(old2)+parseInt(t3[0])] = div.outerHTML;
    localStorage.setItem("day_history", JSON.stringify(history2)); 
    document.getElementById("tasks2").innerHTML = "";
    const score2 = document.querySelector("#tasks2");
    score2.insertAdjacentHTML("beforeend", "<b> Score: " + score_total + "</b>");        
}


function step(number) {
    document.getElementById("app-calendar1").innerHTML = "";
    document.getElementById("app-calendar2").innerHTML = "";
    document.getElementById("month_year").innerHTML = "";
    document.getElementById("tasks0").innerHTML = "";
    document.getElementById("tasks01").innerHTML = "";
    document.getElementById("tasks00").innerHTML = "";
    document.getElementById("tasks001").innerHTML = "";
    document.getElementById("tasks1").innerHTML = "";
    document.getElementById("tasks2").innerHTML = "";
    document.getElementById("info0").innerHTML = "";

    whatMonth(number);
}

function back(number) {
    display = 0;
    document.getElementById("p0").innerHTML = "";
    document.getElementById("p1").innerHTML = "";
    document.getElementById("p2").innerHTML = "";
    document.getElementById("p3").innerHTML = "";
    document.getElementById("p4").innerHTML = "";
    
    const previous = document.querySelector("#p0");
    const info = document.querySelector("#p1");
    const tasks = document.querySelector("#p2")
    const stats = document.querySelector("#p3");
    const next = document.querySelector("#p4");
    
    previous.insertAdjacentHTML("beforeend", `<p id="p0" style="text-align:left" onclick="step(0)"> <b> Previous </b> </p>`);
    info.insertAdjacentHTML("beforeend", `<p id="p1" style="text-align:left" onclick="info()"> <b> Info </b> </p>`);
    tasks.insertAdjacentHTML("beforeend", `<p id="p2" style="text-align:center" onclick="tasks()"> <b> Tasks </b> </p>`);
    stats.insertAdjacentHTML("beforeend", `<p id="p3" style="text-align:center" onclick="stats()"> <b> Stats </b> </p>`);
    next.insertAdjacentHTML("beforeend", `<p id="p4" style="text-align:right" onclick="step(0)"> <b> Next </b> </p>`);
    
    step(number+1);
}


function whatMonth(number) {
    const calendar1 = document.querySelector("#app-calendar1");
    const calendar2 = document.querySelector("#app-calendar2");
    const month_year = document.querySelector("#month_year");
    
    var newDate = new Date(d.setMonth(d.getMonth()+number));
    var beginning = new Date(newDate.setDate(newDate.getDate()-(newDate.getDate()-1)));
    month = month+number;

    if(month>12) {
        month = 1;
        year = year + 1;
    }

    if(month<1) {
        month = 12;
        year = year - 1;
    }

    month_year.insertAdjacentHTML("beforeend", `${month +"/"+year}`);
    var monthDays = 0;

    if(month==1) {
        monthDays = 31;
    }

    if(month==2) {
        if(year % 4 ==0 && year % 100 == 0 && year % year == 0) {
            monthDays = 29;          
        } else if (year % 4 ==0 && year % 100 == 0 && year % 400 != 0) {
            monthDays = 28;
        } else if (year % 4 ==0) {
            monthDays = 29;
        } else {
            monthDays = 28;
        }
    }

    if(month==3) {
        monthDays = 31;
    }

    if(month==4) {
        monthDays = 30;
    }

    if(month==5) {
        monthDays = 31;
    }

    if(month==6) {
        monthDays = 30;
    }

    if(month==7) {
        monthDays = 31;
    }

    if(month==8) {
        monthDays = 31;
    }

    if(month==9) {
        monthDays = 30;
    }

    if(month==10) {
        monthDays = 31;
    }

    if(month==11) {
        monthDays = 30;
    }

    if(month==12) {
        monthDays = 31;
    }

    var grid = 1;
    var g = 0;
        
    for(let i = 1; i < days.length; i++) {
        calendar1.insertAdjacentHTML("beforeend", `<div class="daynames"><b>${days[i]}</b></div>`);
    }

    calendar1.insertAdjacentHTML("beforeend", `<div class="daynames"><b>${days[0]}</b></div>`);

    while(grid<=42) {

        if(g>6) {
            g = 0;
        }
    
        if(grid==beginning.getDay() || beginning.getDay()==1 && grid<8 || grid==7 ) {

            for(let day = 1; day <= monthDays; day++) {

                if(g>6) {
                    g = 0;
                }
          
                if(day==today && month == d2.getMonth()+1 && year == d2.getFullYear()) {
                    calendar2.insertAdjacentHTML("beforeend", `<div class="today"${` id="divday` + day + `" onclick="dayview(` + day + "," + g +`)";>` + "<b>" + day + "</b>" + " <br> " + "<b>" + "Today" + "</b>"}</div>`);
                }

                else {
                    calendar2.insertAdjacentHTML("beforeend", `<div class="day"${` id="divday` + day + `" onclick="dayview(` + day + "," + g +`)";>` + day}</div>`);
                }
                        
                grid++;
                g++;               
            }

            if(grid==36) {
                break;
                
            }

            if(grid<=36) {
                grid = grid + 7;
            }
        }

        calendar2.insertAdjacentHTML("beforeend", `<div class="noday"></div>`);

        grid++;
        g++;       
    }   
}

document.addEventListener('touchstart', handleTouchStart, false);   
document.addEventListener('touchmove', handleTouchMove, false);

var xDown = null;                                                        
var yDown = null;


function getTouches(evt) {
return evt.touches ||             // browser API
        evt.originalEvent.touches; // jQuery
}                                                     


function handleTouchStart(evt) {
    const firstTouch = getTouches(evt)[0];                                      
    xDown = firstTouch.clientX;                                      
    yDown = firstTouch.clientY;                                      
};                                                


function handleTouchMove(evt) {
    if ( ! xDown || ! yDown ) {
        return;
    }

    var xUp = evt.touches[0].clientX;                                    
    var yUp = evt.touches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;
                                                                        
    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
        if ( xDiff > 0 ) {
            /* left swipe */
            if(display == 0) {
                step(1);
            }
            
        } else {
            /* right swipe */
            if(display == 0) {
                step(-1);
            }
            
        }                       
    } else {
        if ( yDiff > 0 ) {
            /* down swipe */ 
        } else { 
            /* up swipe */
        }                                                                 
    }
    /* reset values */
    xDown = null;
    yDown = null;                                             
};