# ApexTasks

A basic task and project management application running on NestJS, Prisma, PostgreSQL, and React.

## Getting Started

To build and run the application, run the following commands from the repository's root (please make sure that ports
3000 and 80 are available):

```` 
docker compose build
````

````
docker compose up
````

## Usage

When starting up the app for the first time, you will see that the project has no tasks yet. To start using the
application
and adding tasks, you need to *register*.

### Registering

Click on the "Log In" item of the menu, then click on "register now!" below the login form.
You will need to enter an email, a username, and a password which will need to be confirmed.
After successful registration, you will be logged in and redirected to the "Your Tasks" page, where
you can begin adding tasks to the project.

### Adding and Editing Tasks

On "Your Tasks" page there are three columns for the three statuses that tasks can have: "Not Started", "In Progress",
and "
Done". Pressing the "Add"
button in the header of a column will create a blank task of the corresponding status. To edit it, click on the name or
description of the task and
begin typing: you will be prompted to save or discard changes by the checkmark and cross buttons that will appear on the
task card. You can also
change task status or delete it by clicking the corresponding items in the dropdown menu to the right of the task
creation time. You can also check when a certain task has been edited by hovering the task creation time.

### Project Overview

This page displays all tasks in the project that are still not done. If the task has been created by a different user
from the one
currently logged on, the task creator's username will be displayed and the task will not be editable.

### Changing Theme

To change the color theme of the app, click on your username in the menu: a submenu will appear, containing a color
picker.

**Note**: this feature is experimental, some choices can result in unappealing looks and/or unreadable text.