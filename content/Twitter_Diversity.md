Title: Twitter "Diversity" Dataset and Python's Pandas Time Series Introduction
Author: Till Keyling
Tags: Python, Pandas, Twitter, Reproducible
Date: 2014-05-06
Summary: Open-Data Analysis with Pandas

This is just a short introduction/how-to to time-series analysis with open-data. The *twitter-diversity* dataset is available  [here](https://github.com/trifle/twitter-diversity). Clone it into your folder, `cd` into it and start this IPython notebook. Pytho's Pandas-Module, Matplotlib and NumPy are necessary imports. 

_Thanks to @pascal and @ajungherr making the data available. Read and replicate the corresponding [paper](http://andreasjungherr.net/2013/08/22/new-publication-forecasting-the-pulse-how-deviations-from-regular-patterns-in-online-data-can-identify-offline-phenomena/)_.

## Imports
First of all, import pandas and activate the `pylab` mode in IPython. Graphics are displayed inside the IPython-Notebook itself .For an introduction to IPython in general, visit the [website](http://ipython.org/). (R-Users: IPython is like a boosted, fast version of RStudio/knittr ;)) 



    import pandas as pd
    %pylab inline

    Populating the interactive namespace from numpy and matplotlib
    

## Datetime parsing
To parse the datestrings in the csv-file, we need to write a little parser, using the standardlib's `datetime` module. To inspect the documentation within the Notebook, use IPythons *?*oOperator:

    datetime?

This is the parser-function. It takes a string representation of a datetime and applies the conversion specified via the conversion string ` '%Y%m%d%H'.


    def dateparser(datestring):
        return datetime.datetime.strptime(datestring,'%Y%m%d%H')

## Read the data
Using pandas excellent `read_`-functions in combination with our parser, we can load the dataset within a single line of code. Furthermore, we should rename the columns (the original column-names include whitespace, and whitespace is sort of evil, when working with attributes in pandas).


    total= pd.read_csv('total-volume.csv',parse_dates=[0],date_parser=dateparser)
    total.columns=["date","tweets"]

Let's have a look at the dataset:


    total.head()




<div style="max-height:1000px;max-width:1500px;overflow:auto;">
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>date</th>
      <th>tweets</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>2012-01-31 22:00:00</td>
      <td>   33835</td>
    </tr>
    <tr>
      <th>1</th>
      <td>2012-01-31 23:00:00</td>
      <td> 1090096</td>
    </tr>
    <tr>
      <th>2</th>
      <td>2012-02-01 00:00:00</td>
      <td> 1096715</td>
    </tr>
    <tr>
      <th>3</th>
      <td>2012-02-01 01:00:00</td>
      <td> 1145446</td>
    </tr>
    <tr>
      <th>4</th>
      <td>2012-02-01 02:00:00</td>
      <td> 1114102</td>
    </tr>
  </tbody>
</table>
</div>



To work with the time-series, it's useful to set the *index* (an index is, roughly spoken, the row-number in an Excel-Sheet) to the date-variable (One could have done this in the read_csv section):


    total.index = total.date

## Plot the data
Finally, plot the whole stuff with matplotlib. Adjust the size with the *rcParams* or delete the *inline* in the import section to plot outside of the IPython Notebook.


    pylab.rcParams['figure.figsize'] = (16.0, 8.0)
    total.plot(marker="o",markerfacecolor="red")




    <matplotlib.axes.AxesSubplot at 0x104151550>




![png]({filename}/images/Twitter_Diversity_14_1.png)


## Resample the data

To resample the time-series data, f.e. summing up weekly each monday, use the pandas excellent resampling methods. Plot the results to inspect the data. Change titles, axis labels etc. via pylab-methods


    perday = total.resample("W-Mon",how="sum").plot(kind="bar")
    title("Tweets per Week")
    xlabel("Sum of Tweets per Week")




    <matplotlib.text.Text at 0x104205350>




![png]({filename}/images/Twitter_Diversity_16_1.png)


## Regress the data

A simple (and a bit useless, but it's just for the sake of example) OLS-Regression with the shifted tweets (lag: 1 Day) can be done quite easy. Users familiar with R will note the differences (*writing* models in Python like *y~x+whatever* is [possible](http://mpastell.com/2013/04/19/python_regression/) as well). Specify the model and print a short summary:



    model = pd.ols(y=log(total.tweets[:400]), x=total.tweets[:400].shift(-1), intercept=True)
    
    print model.summary
    

    
    -------------------------Summary of Regression Analysis-------------------------
    
    Formula: Y ~ <x> + <intercept>
    
    Number of Observations:         399
    Number of Degrees of Freedom:   2
    
    R-squared:         0.3118
    Adj R-squared:     0.3101
    
    Rmse:              0.4055
    
    F-stat (1, 397):   179.8771, p-value:     0.0000
    
    Degrees of Freedom: model 1, resid 397
    
    -----------------------Summary of Estimated Coefficients------------------------
          Variable       Coef    Std Err     t-stat    p-value    CI 2.5%   CI 97.5%
    --------------------------------------------------------------------------------
                 x     0.0000     0.0000      13.41     0.0000     0.0000     0.0000
         intercept    12.6846     0.0876     144.72     0.0000    12.5128    12.8564
    ---------------------------------End of Summary---------------------------------
    
    

And plot the fitted values (*blue*) for the first 400 cases afterwards against the empirical observations from the dataset (*red*)


    fig=figure()
    sub=fig.add_subplot(111)
    plot(model.sm_ols.model.fit().fittedvalues,linewidth=0,marker="o")
    plot(log(total.tweets[:400]),color="red",marker="o",linewidth=0)




    [<matplotlib.lines.Line2D at 0x105ebea10>]




![png]({filename}/images/Twitter_Diversity_20_1.png)



    t=total.tweets.tolist()
    t1=total.tweets.shift(-1).tolist()
    

## Push the data to R

While IPython becomes more and more language-independent, the rmagic and cell-magic functions are absolutely terrific! Using the rpy2 interface (I hope seamless conversion from numpy to R will improve further), it's almost too easy to pass data to R an use R's huge statistical  library . Of course, *ggplot* excels *matplotlib* in many, many ways. Let' plot the Tweets vs "lagged" Tweets and fit a simple OLS-Regression (see example above): 


    %load_ext rmagic
    tweettoday = total.tweets.tolist()
    tweetyesterday =  total.tweets.shift(1).tolist()

    The rmagic extension is already loaded. To reload it, use:
      %reload_ext rmagic
    


    %%R -i tweettoday,tweetyesterday
    require(ggplot2) 
    print(qplot(x=tweettoday,y=tweetyesterday,alpha=.5))
    print(summary(lm(tweettoday~tweetyesterday)))


    
    Call:
    lm(formula = tweettoday ~ tweetyesterday)
    
    Residuals:
         Min       1Q   Median       3Q      Max 
    -1314088   -68943     -131    61755  1018282 
    
    Coefficients:
                    Estimate Std. Error t value Pr(>|t|)    
    (Intercept)    8.663e+04  7.490e+03   11.57   <2e-16 ***
    tweetyesterday 9.211e-01  6.566e-03  140.28   <2e-16 ***
    ---
    Signif. codes:  0 ‘***’ 0.001 ‘**’ 0.01 ‘*’ 0.05 ‘.’ 0.1 ‘ ’ 1
    
    Residual standard error: 127600 on 3466 degrees of freedom
      (1 observation deleted due to missingness)
    Multiple R-squared:  0.8503,	Adjusted R-squared:  0.8502 
    F-statistic: 1.968e+04 on 1 and 3466 DF,  p-value: < 2.2e-16
    
    



![png]({filename}/images/Twitter_Diversity_24_1.png)

