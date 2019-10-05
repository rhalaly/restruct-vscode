# Restruct - React structure templates
[![Build Status](https://dev.azure.com/Restruct/restruct-vscode/_apis/build/status/rhalaly.Restruct-vscode?branchName=master)](https://dev.azure.com/Restruct/restruct-vscode/_build/latest?definitionId=1&branchName=master)
[![VS Code Marketplace Downloads](https://img.shields.io/visual-studio-marketplace/d/rhalaly.restruct-vscode)](https://marketplace.visualstudio.com/items?itemName=rhalaly.restruct-vscode)
[![VS Code Marketplace Installs](https://img.shields.io/visual-studio-marketplace/i/rhalaly.restruct-vscode)](https://marketplace.visualstudio.com/items?itemName=rhalaly.restruct-vscode)
[![Version](https://img.shields.io/visual-studio-marketplace/v/rhalaly.restruct-vscode)](https://github.com/rhalaly/restruct-vscode)

The Restruct Visual Studio Code extenstion will make you React project well structured with common React templates. It contains templates for best React structure partices.  
It supports Javascript, Typescript and Redux and change the template based on your project.

## Features

* Create a new React component
* Create a new State (Redux action + reducer)

## Extension Settings

This extension contributes the following settings:

* `restruct.filesNamingFormat`: The default files naming format (Camel, Pascal, Snake, Dash)
* `restruct.defaultComponentsDirectory`: The default components directory
* `restruct.newComponent.reduxInContainer`: Use Redux `connect` inside the Container (Only affects when Redux is installed)
