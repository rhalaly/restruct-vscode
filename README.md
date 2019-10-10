# Restruct - React structure templates
[![Build Status](https://dev.azure.com/Restruct/restruct-vscode/_apis/build/status/rhalaly.Restruct-vscode?branchName=master)](https://dev.azure.com/Restruct/restruct-vscode/_build/latest?definitionId=1&branchName=master)
[![VS Code Marketplace Installs](https://img.shields.io/visual-studio-marketplace/i/rhalaly.restruct-vscode)](https://marketplace.visualstudio.com/items?itemName=rhalaly.restruct-vscode)
[![Version](https://img.shields.io/visual-studio-marketplace/v/rhalaly.restruct-vscode)](https://marketplace.visualstudio.com/items?itemName=rhalaly.restruct-vscode)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/a36fac4a51c74e598119deaf92a84dd7)](https://www.codacy.com/manual/rhalaly/restruct-vscode?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=rhalaly/restruct-vscode&amp;utm_campaign=Badge_Grade)

Restruct contains common templates for React's best practices.  
It supports Javascript, Typescript and Redux and change the template based on your project.

## Features

* Create a new React component
* Create a new State (Redux action + reducer)

Both options can be triggered by context menu (right click on a folder) or by typing a command (Ctrl+Shift+P or Cmd+Shift+P) with the word "Restruct" 

## Extension Settings

This extension contributes the following settings:

* `restruct.filesNamingFormat`: The default files naming format (Camel, Pascal, Snake, Dash)
* `restruct.defaultComponentsDirectory`: The default components directory
* `restruct.newComponent.reduxInContainer`: Use Redux `connect` inside the Container (Only affects when Redux is installed)
