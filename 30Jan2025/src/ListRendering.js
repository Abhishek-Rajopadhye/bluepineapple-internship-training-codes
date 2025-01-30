import { useState } from "react";

function ListModule(){
    const tasks = [
        {id:1, taskName:"Do Something1"},
        {id:2, taskName:"Do Something2"},
        {id:3, taskName:"Do Something3"},
        {id:4, taskName:"Do Something4"},
    ];

    const listItems = tasks.map(task=>
        <li key={task.id}>
          {task.taskName}
        </li>
    );

    return (
        <ol>{listItems}</ol>
    );
}

module.exports = ListModule;
