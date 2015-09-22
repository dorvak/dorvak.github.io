Title: Closures in R and Python
Author: Till Keyling
Tags: Python, R, Programming
Summary: Difference between Closures in Python and R
Category: Blog
Date: 2015-04-05

Seems like my "intermediate" Python knowledge benefits from (re-)learning R again with this [Coursera-MOOC](https://www.coursera.org/course/compdata). Stumbling over closures from Wes McKinney's ["Python for Data Analysis"](http://shop.oreilly.com/product/0636920023784.do)-Book, here is a short comparison of closures in R and Python, respectively:

# Closures in Python

In Python, closures are function that return function (dynamically), while preserving/accessing the namespace of the "caller"-function and having access to this "outer" function enviroment (["referencing enviroment"](http://en.wikipedia.org/wiki/Closure_(computer_science)))

    #!python
    def make_power(n):
        #Set 'n' as the power and create the n**power-function

        def power_by_n(b):
            #this function has access to the 'make_power'namespace and arguments --> n
            #Level the base by the power of 'n'
            return b**n
        #return the custom-power function
        return power_by_n

With this *closure*, one could use it as like this:

    #!python
    cubic = make_power(3)
    square = make_power(2)

    print cubic(10)  #-->1000
    print square(10) #-->100

One could inspect the closure-functions, f.e. via it's attributes:

    #!python
    cubic.func_closure[0].cell_contents
    >>>3

#Closures in R

Similar to python (of course with more curly brackets), closures are quite simple in R.

    #!R
    make.power <- function(n) {
                pow <- function(x) {
                        x^n
                     }
                pow
                }

    cube <- make.power(3)
    square <- make.power(2)

Again, inspection is easy using the 'enviroment','ls' and 'get'-functions.

    #!r
    ls(environment(cube))

Although beeinf very similar, one should keep possible different scoping rules in R and Python in mind. As a first guess and because they are both using lexical scoping, they do not seem to differ that much (but I might be wrong!!):

In R, this would throw an 'undefined'-error (as well as in Python; the R code is used from the Coursera course mentioned above):

    #!R
    f <- function(x) {
                y <- 2
                y^2 + g(x)
                    }
    g <- function(x) {
                x*y
                    }
    f(3)

This __lexical-scoping__ is used by python as well (maybe it's not pure lexical scoping, but others should argue wether Python is call-by-reference or whatever, has scoping *xy* and so on; [this](https://www.inkling.com/read/learning-python-mark-lutz-4th/chapter-17/python-scope-basics) is a handy & short explanation of Python scoping rules; and [that](http://adv-r.had.co.nz/) might be worth reading as well.
