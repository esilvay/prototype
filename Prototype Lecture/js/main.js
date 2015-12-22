
//application scope (self-executing function)
//For scoping - variables declared in the self executing function are, by default, 
//only available to code within the self executing function.


(function(){


//constructors are a special category of functions
//in syntax, they are no different than any other function
//what changes is the invocation (how the function is called and ran) 


var blog = function(){};
var result = blog(); //<-- result becomes the return value


//if a function is invoked using the keyword new, it is executed as a constructor 
//the constructor is called to initialize an object upon creation


var blog = function(){};
var result = new blog(); //<-- result is an object


//just like any other function we can pass an argument to it


var blog = function(str, date){ //<-- constructor
    //code goes here
}

var blog = [new blog("here is my string", 01/16/16)]; //<-- installation


//the constructors job is establishing the properties of an object along with their inital values
//to create a property within a construtor, you set the property using the JavaScript keyword, this
//this, assigns ownership of the property to the object, and sets its initial value
//we are assigning a property that belongs to THIS object, as oppose to just a local variable within the constructor
//the keyword this is essentially a reference to the object that owns the function it is being used in
//because it is a reference, any changes or updates made to this are reflected in the owner object
//using the this keyword, any properties or methods on the owner object are accessible as if this was the object itself
//this becomes a reference to the object that the constructor creates
//object properties are created and initialized in a constructor by using dot notation and the this keyword
//note that if we pass arguments into the constructor, they become part of the constructor’s scope, as opposed to properties...


var blog = function(str, date){
    this.body = str; //<-- object property
    this.date = date; //<-- object property
};

var blog = [new blog("here is my string", 01/16/16)]; //<-- instantiation

//similarly, any variables declared inside the constructor function’s scope are considered local to the function (cannot be accessed outside of it)

var blog = function(str, date){
    var text = 'haha'; //<-- local variable ONLY
    this.body = str; //<-- object property
    this.date = date; //<-- object property
};

var blog = [new blog("here is my string", 01/16/16)]; //<-- instantiation

//since this references the new object, we can create methods in that object as well
//methods will have access to both local variables and the object’s this

var blog = function(str, date){
    var text = 'haha'; //<-- local variable ONLY
    this.body = str; //<-- object property
    this.date = date; //<-- object property

    this.toHTML = function(){
        alert( this.body ); //<-- alert would be "here is my string"
        alert( text ); //<-- alert would be "haha"
    }
};

var blog = [new blog("here is my string", 01/16/16)]; //<-- instantiation


//functions in a constructor are declared as normal, with the var keyword
//like local variables, they are accessible only inside the constructor...
//constructors are used to bring instances to life - therefore are NOT capable of creating a class properties - class properties most be created outside of the constructor

//the only way to remove an object property is to use the delete operator

delete obj.property;

//example
delete chapter.title;


//objects inherit from other objects
//at the core of javascript, all objects inherit from a foundation, the prototype object
//the prototype object is an automatic part of every constructor, and is what all objects inherit from
//think of prototype as the cookie cutter that creates all objects in javascript


//every constructor in javascript is automatically given an internal prototype object
//whenever an object is created, it is inheriting from the constructor’s prototype - this is referred to as prototype chain, and is what defines prototypal inheritance  
//if our constructor was Person ...

var myObj = new Person();
//myObj is inheriting Person.prototype


//so what does this mean?
//any constructor’s prototype property can be accessed and even modified
//we can access the .prototype property of our constructors to add new properties and methods on the fly, or change existing ones


var Person = function(name){
    this.name = name;
};

Person.prototype.newMethod = function(){};
Person.prototype.newProperty = "I am new!";
Person.prototype.name = "John Doe";

//it is extremely important to note that any methods created using .prototype will NOT have access to local variables inside the constructor
//we can still utilize the this variable to reference public members:


var Person = function(name){
    this.name = name;
    var species = "non-human";
};

Person.prototype.sayHi = function(){
    alert(this.name); //<-- works
    alert(species); //<-- causes error
}

//the next important concept is that any object created from a constructor will automatically inherit any prototype changes, even after being created


var Person = function(name){
    this.name = name;
}

var me = new Person("Jane Doe");

Person.prototype.sayHi = function(){
    alert(this.name);
};

me.sayHi(); //<-- alerts "Jane Doe"


//one efficient use of prototype we will see is to create a method based on what browser the user has
//by using the prototype object, we can do the browser check during the declaration
//we can also use prototype to extend javascript’s existing constructors


//Week Assignment - create a blog ********************************

    // get the location of the blog button
    var button = document.getElementById('blog_btn');

    var Blog = function(str, date){
        this.body = str; //property
        this.date = date; //property
    
        Blog.prototype.toHTML = function(highlight){
            var blogHTML = "";
            blogHTML += highlight ? "<p style='background-color:#EEEEEE'>" : "<p>";

            blogHTML += "<strong>" + (this.date.getMonth() + 1) + "/" + this.date.getDate() + "/" +
            this.date.getFullYear() + "</strong><br>" + this.body + "</p>";
            return blogHTML;
        };

        Blog.prototype.toString = function(){
            console.log((this.date.getMonth() + 1) + "/" + this.date.getDate() + "/" +
            this.date.getFullYear() + this.body);
        };
    };

    Blog.prototype.companyName = "Marketing Agency";

    // array of blog items
    // each blog item will use the Blog constructor as its template to create each
    //    object

    // manually create an object using the Blog constructor to establish the objects
    //      structure and display all the information in the body of the HTML

   var blog = [
       new Blog('Learned about functions, and how to pass parameters into them.', new Date('04/2/2013')),
       new Blog('Learned about objects, and how to set keys and get values.', new Date('04/15/2013')),
       new Blog('I love reading regular expressions.  I normally read a few lines right before falling asleep.', new Date('04/18/2013')),
       new Blog('What\'s all this new object stuff (i.e THIS, prototype, etc...)', new Date('08/21/2008'))
   ];

   var showBlog = function(e){
        var i = 0,
            blogText = "";

        while(i<blog.length){

            blogText += blog[i].toHTML(i % 2 === 0);
            blog[i].toString();

            i++;
        };
        
        console.log(blog[0].companyName);
        console.log(blog[1].companyName);
        console.log(blog[2].companyName);
        console.log(blog[3].companyName);


        document.getElementById("blog").innerHTML = blogText;
        e.preventDefault();
        return false;
   };

   button.onclick = showBlog;

})();  // end self executing function