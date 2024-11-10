I learned about git :O

my web ip - 44.212.20.47

I created my basic website html, including one quiz. With this basic template I can eventually create many more quizzes. I also have placeholders for what javascript and react will eventually do, including the radio buttons for difficulty which will alter the display settings for the quiz tables. Also on the profile page after you log in it will show your user data.

Application data - FrenchRevQuiz.html (all buttons, inputs, etc related to this)
Authentication - profile.html (login placeholders)
Database data - leaderboard data, user data
websocket data - real-time leaderboard, comments

eeeeeee

midterm review:

I created a css theme throughout and deployed my files to my website

In the following code, what does the link element do?
In the following code,  what does a div tag do?
In the following code, what is the difference between the #title and .grid selector?
In the following code, what is the difference between padding and margin?
Given this HTML and this CSS how will the images be displayed using flex?
What does the following padding CSS do?
What does the following code using arrow syntax function declaration do?
What does the following code using map with an array output?
What does the following code output using getElementByID and addEventListener?
What does the following line of Javascript do using a # selector?
Which of the following are true? (mark all that are true about the DOM)
By default, the HTML span element has a default CSS display property value of: 
How would you use CSS to change all the div elements to have a background color of red?
How would you display an image with a hyperlink in HTML?
In the CSS box model, what is the ordering of the box layers starting at the inside and working out?
Given the following HTML, what CSS would you use to set the text "trouble" to green and leave the "double" text unaffected?
What will the following code output when executed using a for loop and console.log?
How would you use JavaScript to select an element with the id of “byu” and change the text color of that element to green?
What is the opening HTML tag for a paragraph, ordered list, unordered list, second level heading, first level heading, third level heading?
How do you declare the document type to be html?
What is valid javascript syntax for if, else, for, while, switch statements?
What is the correct syntax for creating a javascript object?
Is it possible to add new properties to javascript objects?
If you want to include JavaScript on an HTML page, which tag do you use?
Given the following HTML, what JavaScript could you use to set the text "animal" to "crow" and leave the "fish" text unaffected?
Which of the following correctly describes JSON?
What does the console command chmod, pwd, cd, ls, vim, nano, mkdir, mv, rm, man, ssh, ps, wget, sudo  do?
Which of the following console command creates a remote shell session?
Which of the following is true when the -la parameter is specified for the ls console command?
Which of the following is true for the domain name banana.fruit.bozo.click, which is the top level domain, which is a subdomain, which is a root domain?
Is a web certificate is necessary to use HTTPS.
Can a DNS A record can point to an IP address or another A record.
Port 443, 80, 22 is reserved for which protocol?
What will the following code using Promises output when executed?


AI Overview of some of these topics: 

<link> Element:

The <link> element is used in HTML to link external resources like stylesheets or preloaded assets to the document. For example, <link rel="stylesheet" href="styles.css"> links an external CSS file.
<div> Tag:

The <div> tag is a block-level HTML element used to group content for styling or scripting purposes. It doesn’t add any visual effect by itself but is used as a container for other elements.
Difference Between #title and .grid Selectors:

#title targets an element with the ID "title". IDs are unique to a single element.
.grid targets all elements with the class "grid". Classes can be shared across multiple elements.
Difference Between Padding and Margin:

Padding: Space between the content and the border of an element.
Margin: Space outside the border, separating the element from other elements.
Images Display Using Flexbox:

When using CSS flexbox, images can be aligned, spaced, and sized based on flex properties like justify-content, align-items, and flex-direction.
Padding in CSS:

Padding specifies the space between the content and the element's border. For example, padding: 10px; adds 10 pixels of space on all sides.
Arrow Function Syntax in JavaScript:

Arrow functions are a concise way to write functions. For example, (a, b) => a + b returns the sum of a and b.
Using map with an Array in JavaScript:

The map method creates a new array populated with the results of calling a function on every element in the array.
Using getElementById and addEventListener:

This combination is used to select an element by its ID and then attach an event listener (like a click or keypress) to it, which executes a function when the event occurs.
JavaScript Using a # Selector:

The # symbol in JavaScript (typically in CSS selectors) indicates an ID selector. It selects elements with a specific ID.
Facts About the DOM:

The Document Object Model (DOM) is an interface that represents the structure of an HTML document and allows for manipulation of the content and structure.
Default CSS Display Property of <span>:

By default, the <span> element has a display value of inline.
Change All <div> Elements' Background Color to Red:

Use the CSS: div { background-color: red; }.
Display an Image with a Hyperlink in HTML:

Example: <a href="url"><img src="image.jpg" alt="Description"></a>.
CSS Box Model Order:

From the inside out: content → padding → border → margin.
Set "trouble" Text to Green in HTML/CSS:

HTML: <span class="trouble">trouble</span> double
CSS: .trouble { color: green; }.
For Loop with console.log Output:

A for loop will execute code a certain number of times and output each iteration's result with console.log.
Select Element by ID and Change Color Using JavaScript:

Example: document.getElementById("byu").style.color = "green";.
Opening Tags for HTML Elements:

Paragraph: <p>
Ordered list: <ol>
Unordered list: <ul>
Second-level heading: <h2>
First-level heading: <h1>
Third-level heading: <h3>
Declare Document Type as HTML:

<!DOCTYPE html>
Valid JavaScript Syntax for Statements:

if, else, for, while, and switch statements have specific syntax rules for conditions, loops, and case checks.
Correct Syntax for Creating a JavaScript Object:

Example: let obj = { key: "value", anotherKey: 2 };
Adding New Properties to JavaScript Objects:

It is possible to add new properties dynamically using dot notation or bracket notation.
Tag for Including JavaScript in HTML:

<script> is used to include JavaScript code.
Change "animal" to "crow" Using JavaScript:

Example: document.getElementById("animal").textContent = "crow";.
JSON Description:

JSON (JavaScript Object Notation) is a lightweight data-interchange format that uses key-value pairs and arrays.
Console Command Functions:

chmod changes file permissions, pwd shows the current directory, cd changes directories, ls lists files, vim and nano are text editors, mkdir creates directories, mv moves files, rm deletes files, man displays manual pages, ssh opens remote shell sessions, ps lists processes, wget downloads files, and sudo executes commands with superuser privileges.
Command for Remote Shell Sessions:

ssh creates a remote shell session.
Using ls -la:

The -la parameters show a detailed list of files, including hidden files.
Domain Name Components:

The top-level domain is "click", the subdomain is "banana", and the root domain is "bozo.fruit.click".
Web Certificate for HTTPS:

A web certificate is required for HTTPS, which ensures secure communication.
DNS A Record Pointing Capabilities:

A DNS A record can point to an IP address, but not another A record.
Port Reservations:

Port 443 is for HTTPS, 80 is for HTTP, and 22 is for SSH.
Output of Promises in JavaScript:

The output will depend on whether the promises resolve or reject and what functions are defined in .then() or .catch().
