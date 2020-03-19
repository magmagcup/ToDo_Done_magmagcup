function moving() {

    var moving_text = document.getElementById("Move_this");
    var pad_position = 0;
    // moving_text.style.textAlign = "left";
    
    var time_in = setInterval(frames, 6);
    first_run = false;

    function frames() {
        if (pad_position >= 40) {
            clearInterval(time_in);
            clear_text();
            moving_text.style.textAlign = "left";

        } else {
            pad_position += 0.5;
            moving_text.style.paddingLeft = 40 - pad_position +  "%";
        }
    }
    moving_text.onmouseover = "";

}

// clear title text and show application page

function clear_text() {

    document.getElementById("Move_here").appendChild(document.getElementById("Move_this"));
    // document.getElementById("to do").style.display = "inline-block"
    // document.getElementById("done").style.display = "inline-block"
    document.getElementById("banner").style = "padding-top: 10px;"

    document.getElementById("application_table_1").style.display = "inline-block";
    document.getElementById("application_table_2").style.display = "inline-block";

}

//Show add button when mouse on todo

function showAdd() {
    var elem = document.getElementById("add button");
    elem.style.display = "inline-block";
}

function hideAdd() {
    var elem = document.getElementById("add button");
    elem.style.display = "none";
}

//


// id num for each elements in TODO/DONE 

var id_todo_num = 0;
var id_done_num = 0;


function AddList(table_name, id_name , input_text) {
    /* 
    table_name (id of base table for appending text): String
    id_name (todo / done) : String
    input_text : String   
    */

    //TODO
    var elem = document.getElementById(table_name);
    var para = document.createElement("h3");

    // add class to para
    para.classList.add("TODO_DONE_TEXT");

    var id_of_root_text = id_name;
    if (id_name == "todo") {
        id_todo_num++;

        id_of_root_text += id_todo_num;

    } else {
        id_done_num++;

        id_of_root_text += id_done_num;
    };
    para.id = id_of_root_text;

    addText(para, input_text, id_of_root_text);
    
    para.appendChild(createButtons(id_name));

    para.addEventListener("mouseover", function(){showButton(id_of_root_text + "button")});
    para.addEventListener("mouseout", function(){hideButton(id_of_root_text + "button")});

    elem.appendChild(para)
}

// Show button

function addText(para ,text , id) {
    var textnode = document.createTextNode(text);
    var elem = document.createElement("p");

    elem.appendChild(textnode);
    elem.id = id + "text";

    para.appendChild(elem);

}

function showButton(id_name) {
    var elem = document.getElementsByClassName(id_name);
    for (const each_button of elem) {
        each_button.style.display = "inline-block";
    }
    // elem.style.display = "block";
}

function hideButton(id_name) {
    var elem = document.getElementsByClassName(id_name);
    for (const each_button of elem) {
        each_button.style.display = "none";
    }
    // elem.style.display = "none";
}

//

function createButtons(type_of_table) {
    /* 
        type_of_table:String
    */

    var para = document.createElement("div");
    var class_num = id_done_num;
    // button for todo / done
    if (type_of_table == "todo") {
        class_num = id_todo_num;
        var butt = createButton("move to done", type_of_table, class_num);
        para.appendChild(butt);
    }
    var butt = createButton("delete", type_of_table, class_num);
    para.appendChild(butt);
    return para;
}

function createButton(button_type, type_of_table, class_num) {
    var butt = document.createElement("button");
    butt.classList.add("borderless_button");
    butt.classList.add(type_of_table + class_num + "button");

    var butt_text = document.createTextNode(button_type);
    butt.appendChild(butt_text);

    add_button_event(button_type, butt, type_of_table + class_num);
    return butt;
}



function add_button_event(button_type, butt, id_of_text) {
    if (button_type == "move to done") {
        butt.addEventListener("click", function(){MoveToDone(id_of_text)});

    } else {
        butt.addEventListener("click", function(){RemoveList(id_of_text)});
    }

}

function RemoveList(id_of_text) {
    var elem = document.getElementById(id_of_text);
    elem.parentNode.removeChild(elem);
}

function MoveToDone(id_of_text) {
    AddList("DO_table", "done", document.getElementById(id_of_text + "text").textContent);
    RemoveList(id_of_text);
}