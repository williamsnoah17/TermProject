![image](https://user-images.githubusercontent.com/22204111/49348949-450f3b00-f676-11e8-9767-842f67799ddf.png)
# Null Class @ UF

## Product Overview

Null Class @ UF is a Web Application built using the MEAN STACK - Mongo (M), Express (E), AngularJS (A), and Node (N). Everyday, countless classrooms on the University of Florida campus remain unlocked and unoccupied. At Null Space we are looking to change that by creating an application that will help students avoid overcrowded libraries and allow them to find, rate and share vacant classrooms based on their study environment.
 ![](data:image/*;base64,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33D+laAIYAg5BrIqa3uDEcHlD+lBEKttGaNFICGAIOQaWg6QopKKBBRSZooAKKKSgBaSiigArmL/AP10/wD10P8AOunrl7//AFs/++f50Hg59/Dh6lGikoqz5cWikooAWikooAWikooAWikooAWikooAWikooAWikooAWikooAWikooAWikooA6HQ/8Aj+f/AK5n+YrfrA0T/j9f/rmf5it6oPssl/3VerFpKKKD1gopM0UAFFFFAgpKKa7BELEdKAEklWJdzH8PWs6SVpW3H8B6UksrSvub8B6UygwlO+wtLSUUCTFpaSigtMWgnHJpVVnOFGTUTE5OeMdqAnLlQhOaKKKDmbuFFFFAia3uDEcHlT+laAIIBByDWTU9vMY22nlT29KDanUtoy/SUUUHQFFJmigAooooAKSiigArmL//AFtx/vn+ddPXMah/rbj/AHz/ADoPBz7+HD1M/NGaKKo+XDNGaKKADNGaKKADNGaKKADNGaKKADNGaKKADNGaKKADNGaKKADNGaKKADNGaKKADNFFFAHQ6J/x+v8A9cz/ADFb9YGif8fr/wDXM/zFb2ak+yyX/dV6sWkoooPVCiikoAKKKKACop/9Q1SVHP8A6lvpQDM0juKbmpKaR3FBhOHVCUtJRQZpi05ELttUc0iIXbao5rQiiWJcDr3PrQawVwjjES4HXufWori3EnzL9/8AnViig0aTVmZBBBxRV64txJ8y/e/nVEgg4oOWcHFhRRQBmggAM1Ii4I9c0KuKcOooOiELasv0lFFBsFFFJQAUUUUAFFJmigArmdQ/1s/++f5101czqH+suP8AfP8AOg8HPv4cPUzqKSiqPlxaKSigBaKSigBaKSigBaKSigBaKSigBaKSigBaKSigBaKSigBaKSigBaKSigDo9E/4/H/65n+YrerB0T/j8f8A65n+YreqT7HJf91XqwpKKKD1goopKADNFFFABUU/+pf6VJUc/wDqWoBlCiiigkaR3FCI0jbVHNOqa3kVCQQAD3oM3BN3LEUSxLgcnufWpKTNFBrsFFFFABVe4txJ8y/f/nU9IzBVyTgCgUkmrMy8HOMc1Iq4pZJA8hbGBRQZU4oKVeo+tJQOo+tBqX6SiigYUUUlABmiiigAoopKACua1D/WXH++f510tczqP37j/fP86Dwc+/hw9TNzRmiiqPlwzRmiigAz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)

How It Works...

Students will add classrooms to our database as well as whether it is currently available for use. Others are then able to find and use classrooms based on a building search and upvote or downvote them so others can see the top-rated rooms.

Why We Are Different.

Our application allows students to not only add and rate classrooms but also provides a more thorough description depending on the students unique study habits. Our classroom descriptions will also show details such as: type of seating (wooden desks vs. tables), study mediums (chalkboards vs. whiteboards vs. projectors), number of outlets, and the type of study environment (collaborative vs. silent).

How To Get Started:

Students can easily start using Null Class by signing up using their @ufl.edu email address. Once they are signed up they can login with their @ufl.edu email and password used to signup.
![image](https://user-images.githubusercontent.com/22204111/49348530-f52f7480-f673-11e8-812f-c9259cd4d006.png)

Once signed up to use Null Class students can now see a map of the University of Florida implemented using the MapBox API. 
![image](https://user-images.githubusercontent.com/22204111/49348595-450e3b80-f674-11e8-8dfd-cbdcdc6f118a.png)

Students can also:
  Select a Building and see all Classrooms associated with it:
  ![image](https://user-images.githubusercontent.com/22204111/49348822-b8fd1380-f675-11e8-9d35-3821b91b0695.png)

  Add a custom class room:
  ![image](https://user-images.githubusercontent.com/22204111/49348875-fbbeeb80-f675-11e8-947d-47a406bb4258.png)

  View detailed room Descriptions:
  ![image](https://user-images.githubusercontent.com/22204111/49348804-9b2fae80-f675-11e8-8f52-29a121ead7b7.png)

## Team Members:

McKenna Ville - Scrum Master

Alex Katros - Product Manager

Noah Williams - Backend Dev

Matthew Barta - Frontend Dev

Nicholas "Gone but not Forgotten" Miller - Updated the Blog Once/Credited for coming up with "Null Class"
