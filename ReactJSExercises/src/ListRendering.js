import { useState } from "react";

function ListModule(){
    /** The list of tasks */
    const tasks = [
        {id:1, taskName:"Do Something1"},
        {id:2, taskName:"Do Something2"},
        {id:3, taskName:"Do Something3"},
        {id:4, taskName:"Do Something4"},
    ];
    /** Mapping the list of taks to render the tasks and setting the id as key */
    const listItems = tasks.map(task=>
        <li key={task.id}>
          {task.taskName}
        </li>
    );
    /** Returning the module with the mapped tasks as list items and encapsulating in an ol tag */
    return (
        <ol>{listItems}</ol>
    );
}

module.exports = ListModule;
