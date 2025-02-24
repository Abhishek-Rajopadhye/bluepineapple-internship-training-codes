var count = 0;

document.getElementById("addItem").addEventListener("click", function(){
    count++;
    var li = document.createElement("li");
    li.innerText = "Item " + count;
    document.getElementById("list").appendChild(li);
});