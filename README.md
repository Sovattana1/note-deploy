
## Project infomation

Project Repository : https://git.clp.kr/Sovattana/personal-repository.git
Project Name : sovattana-nike-clone<br>
Project Owner : Sochit Sovattana
Project Server : GitLab

## Description 

My name is **Sochit Sovattana**, I create this project to demonstrate my web development skill 
such as `html`,`css` and `javascript` .

## installation

Clone source code

```shell
git clone 
```

##Prototype

[Prototype For Mobile](https://www.figma.com/proto/uA2uhYpro0yVhMo9ZFJEjx/nike?node-id=236-855&t=tnjS2wdiP0i2ovtX-1&scaling=scale-down&page-id=236%3A551&starting-point-node-id=236%3A855)

[Prototype For Desktop](https://www.figma.com/proto/uA2uhYpro0yVhMo9ZFJEjx/nike?node-id=191-7058&t=gMsmZ5qhg190q58J-1&scaling=scale-down&page-id=0%3A1&starting-point-node-id=52%3A467)

[UI Screen For Mobile](https://www.figma.com/design/uA2uhYpro0yVhMo9ZFJEjx/nike?node-id=236-551&t=JZdfzeDFY2G0Gwx9-1)

[UI Screen For Desktop](https://www.figma.com/design/uA2uhYpro0yVhMo9ZFJEjx/nike?node-id=0-1&t=JZdfzeDFY2G0Gwx9-1)

## Install Dependencies

npm install vite

## Program Language

- HTML
- CSS
- JavaScript

## Convention guide


## Table Of Contents

1. [Folder structure](#1-folder-structure)
2. [File Naming Rule](#2-file-naming-rule)
3. [HTML Cinvention](#3-html-convention)
4. [CSS Convention](#4-css-convention)
5. [Java Script Convention](#5-java-script-convention)
6. [Comment Notation](#6-comment-notation)
7. [Injecting Common Components](#7-injecting-common-components)
8. [Component](#8-components)
9. [Git Strategy]()

## 1. Folder Structure

![]()

## 2. File Naming Rule

- Use `lowercase` for folder and file name.
- Use `underscored` (_) to seperate word of folder or file.
- Name folder and file according to its purpose.
- Name should be meaningful.

## 3. HTML Convention

## 3.1 Indentation

- Indent your code with 2 spaces 
### Ex:
```html
<div>
  <p>
    content here
  </p>
</div>
```
## 3.2 Avoid Long codes line

Keep lines of HTML code reasonably short for readability.
Avoid excessively long lines that require horizontal scrolling.

## 4. CSS Convention

## 4.1 Class and Id 

- class and id should be named by its purpose or feature as well as connected with hyphens(-) if it is more than one word. The name should be in lowercase.

Ex: .blue-navigator

#menu-list

.icon-home

- It can be used in shortcut form but make sure to give comments above the declaration.

Ex : /* nav = navigator */

.nav

#nav

- **Inline code and internal code are not allowed.**
- **Css combinator can be used:**
- Descendant Combinator :

### Ex : 
```css
.class1 .class2 {

property: value;

}
```
- Direct Child Combinator:
```css
Ex: .class1 > .class2 {

property: value;

}
```
- **:nth-child() selector: This is optional**

Ex : a:nth-child(n) {

property: value;

}
## 4.2 Style CSS
```css

```
## 4.3 Font Size
```css

```

## 4.4 Font Family
```css
font-family:";
```
## 5. Java Script Convention

- All variables should be declared on the top of each section with const declaration.

### Ex:
```
//function to return sum

const a = 1;

const b = 2;

function(a,b){

…..

}
```
//function to return subtraction

const c = 1;

const d = 2;

function(c,d){

…..

}

- Variables will be declared in full meaning. If the variable consists of one understandable word, it is written in lowercase. Otherwise, it will be written in camel format. Whereas global variables will be written in uppercase.

### Ex:

const celsius ; (one word variable)

const buttonToggle; (multiple word variable)

const RADIUS; (global variable)

- The function's name will be in camel format in general except it is a constructor function we use pascal format.

### Ex:

function firstName (){

code here

} ****

**// general function**

function FirstName (){

code here

}

 **//constructor function**

- Use Multi-line for Object declaration.

### Ex: let person {

name : ----,

age : ----

}

- Script file or js file should be at the end of the body tag (<body></body>).
- Make sure to give comments of function’s purpose above the function declaration

### Ex:
 	
// Return sum of two values

function (a, b){

return a + b;

}

## 6. Comment Notation

- Use only single line comments in css and javascript to demonstrate the purpose of style and function.

### Ex: 

*/* common h1 size */*

	*.h1{*

*...*

*}*

*// function return sum*

	*function sum(){*

	*...*

*}*

- Use 2 lines comment in html to demonstrate the purpose of section

### Ex:  
*/*---------- start navigation bar section ----------*/*

		 *Code here*

*/*---------- end of navigation bar section----------*/*

## 7. Injecting Common Components

Inside your target html file, place include tag where you want to inject another html file, and set the src property point to the html file where you want to use.

```html
<!-- the src path start from root -->
<include src="path"></include>
```

## 8. Components

Components goes into components file and must be include all related file of the component if it has one example (css)

## 9. Git Strategy

- use `main` branch to publish to public
- use `release` branch to release the product when done with  testing the product
- use `develop` branch to develop the project
- use `feature` branch to add new feature to the project
- use `bugfix` on `release` branch if there are codes to debug - or modify
- use `hotfix` on `main` brach if there are code to modify after - publish the codes

- Always `pull` before make any changes