This is a template for the **EEL3705 Digital Logic Lab** report. This runs on another
one of my projects called *twigtex* which can be found [here](https://github.com/Henguin1001/twigtex).
In order to use this template twigtex must be installed.
### Installing twigtex
Assuming Nodejs and npm are installed, run:
```
npm install -g twigtex
```
then clone:
```
git clone https://github.com/Henguin1001/EEL3705-Lab-Template.git
```
## Some resources
The template is based off of Latex and uses the Twig templating language and the documentation
below should be helpful.
* [Latex introduction](http://ricardo.ecn.wfu.edu/~cottrell/ecn297/latex_tut.pdf): an introduction to latex
but a simple google search for what you need will work (ex: 'latex bulleted list').
* [Twig introduction](http://twig.sensiolabs.org/doc/2.x/templates.html): overview of the twig language.
* [Twig documentation](http://twig.sensiolabs.org/doc/2.x/): documentation for the language.
* [Twigjs implementation](https://github.com/twigjs/twig.js/wiki/Implementation-Notes): as the program is written
in javascript the templating language is only a javascript implementation of twig. This page shows the functions and filters
that are actually implementated.

## Using the template
The template can be run by simply issuing the command:
```bash
twigtex body.twig.tex
```
This will run both the template compiler and the latex compiler, currently the only way
 to disable the latex compiler is to name files without the .tex extension or run
```bash
twigtex body.twig.tex -k
```
In which the output will be sent to the stdout.
Arguments can be sent to the document as well. The template is set up to accept the argument `--ignore`
where certain parts of the document won't get rendered. For example
```bash
twigtex body.twig.tex --ignore=ti
```
In which the title and introduction would be ignored. For the other sections the following apply
* title: t
* intro: i
* design: d
* results: r

### Settings
To get started using the template just enter the relevant information into the settings.json file (name, partner, instructor, etc.)
then the content files can be filled with the actual content of the report. Below is the original settings followed by the settings
with some of the values replaced
```json
{
  "title":{
    "Section No":"<section>",
    "Lab Instructor":"<instructor>",
    "Lab No":"<lab number>",
    "Lab Title":"<lab name>",
    "Name":"<name>",
    "Partner’s Name":"<partner>",
    "Date Performed":"<date Performed>"
  }
}
```
```json
{
  "title":{
    "Section No":"1",
    "Lab Instructor":"Captain Morgan",
    "Lab No":"3",
    "Lab Title":"BCD Decoder",
    "Name":"John Jameson",
    "Partner’s Name":"Jack Daniels",
    "Date Performed":"Wednesday"
  }
}
```
### Content
The document is separated into intro, design, results, and conclusion. These sections can be accessed inside the content directory.
The following is a snippet from the the intro file after being edited.
```latex
\section{Abstract}
\label{sec:Abstract}
This lab covers the ever expanding field of voltage dividers. There is so much to learn about voltage dividers that labs like these are required to even scratch the surface of such an immense topic.

\section{Introduction}
\label{sec:Introduction}
Inline math $V_{in} = 5$ \\
Multiline math:
\[
  V_{in} = \frac{1}{2} \times V_{out}
\]
```
This resulted in the following
![Imgur](http://i.imgur.com/g5PKcL2.png)
### Objects
* Inside the `lib/` directory there are macros that can be used in the document (table, truth table, kmaps). These are provided.
* Inside the `obj/` directory macros can be added on a per lab basis such as defining a set of images or tables specific
to the specifications of that lab.

An example of using one of the table macros
```twig
{% import '../lib/tables.twig.tex' as tables %}
{% set myTableCSV %}
  1,2,3
  4,5,6
  7,8,9
{% endset%}
{% set myTable = CSV(myTableCSV)%}
{{tables.simpleTable(myTable, 'Sample Table')}}
```
This results in: ![Imgur](http://i.imgur.com/0yrReRV.png)

The import statement defines all of the macros in the `../lib/tables.twig.tex` file
under the name tables. This snippet shows two types of set notations. The block type and
line type. The block is setting the variable myTableCSV as a string defined by `1,2...`.
Since this is formatted in  *comma separated values* the string can then be put through the CSV function
to gain the functionality of table. The output of the function is stored in the myTable variable.
Finally, the macro *simpleTable* is called with the table and the name of the table as parameters. This
function also has a third optional parameter which is the label. The table can be identified by this label.
Such as:
```latex
See Table \ref{tab:example}
{{tables.simpleTable(myTable, 'Sample Table', 'example')}}
```
