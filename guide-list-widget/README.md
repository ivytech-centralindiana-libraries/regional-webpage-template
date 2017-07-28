# guide list widget

## what is this?

This is a script that organizes a list of LibGuides. 

## what does it do?

A simple(ish) answer to a complex question:

- makes an AJAX request to the LibApps API for a list of guides tagged "Central Indiana"
- puts all of that data in a series of arrays that filter it in different ways, but especially by subject ID and alphabetically
- eventually spits out html that represents a bootstrap accordion-style list of guides divided by subject

## can i do it?

Yep!

### Springshare odds and ends

You'll first need to set up some things in LibGuides.

1. Create a tag using your region, *e.g. Central Indiana Region*
2. Create subjects for your guides to be divided into. You can see a list of the subjects I chose (borrowed from [PCC's library](http://guides.pcc.edu)) on our [Guides page](http://library.ivytech.edu/central-indiana/guides)
	2a. *If you'd rather use the subjects I've set up, skip this step*
3. Tag the guides you want to show up in your list with the region tag you created
4. Put guides into the subjects you created in step 2
	4a. **Tip**: Populate a few to start with just to make sure the script is working, then go back and add more

### subject IDs

With your fancy new subjects set up, you'll need to copy those subject IDs down and replace them in the code.

At the top of the script, you'll find a section titled **global variables**. The first variable, aptly named *var subjectIDs*, is an array that contains all the subjects I chose to use. If you're choosing to use the subjects I set up, you will just leave this array alone. If you created your own subjects, replace the integers in this array with your subject IDs, each one separated by a comma.

### API URL

You then need to change the text in *var regionSlug*. This should be a few variables down from the subjectIDs variable under **global variables**. You'll see that Central Indiana's tag looks like this: `` `Central%20Indiana%20Region` ``. Those `%20` bits in between the words represent a non-breaking space in the language or URLs. 

If you're making a tag for, let's say, Arrested Development Quotes, you'd need to insert a `%20` between each word. It would look like this: `Arrested%20Development%20Quotes`. It's also important that this URL slug is wrapped in back ticks. The whole variable should look like this:

``var regionSlug = `Arrested%20Development%20Quotes`; ``

Without the back ticks and closing semi-colon, you will feel a lot like our friend Gob here:

![I've made a huge mistake.](https://media.giphy.com/media/9jObH9PkVPTyM/giphy.gif "Huge Mistake")

### copy & paste

The rest is simply a copy & paste maneuver. Copy the whole bit of code into a box on your guide page. Once you've checked that it's populating correctly, you can go back and add tags and subjects to all your guides!

## technical bits (in case you want to tinker)

This code is probably more complicated than it needs to be. I messed with it until it worked for me. I should probably refactor it, but that's a problem for another day.

### libraries

I used both jQuery (because LibGuides loads it whether I use it or not) and lodash (because it's awesome at filtering). I also used ES6 techniques that might not work on older browsers like IE8 and older.

### looping logic

Let's see if I can explain this.

The whole script is wrapped in a callback function that uses the JSON data from the AJAX request URL we crafted at the top of the file. 

There are then three main "for"-style loops (with more "for"-style loops inside) that do the rest of the magic:

#### 1. for each guide in the JSON data

This bit loops through the data that we get back from Springshare. Each point of data is a guide that has been tagged Central Indiana Region (for me). It looks at each guide individually and more or less asks "Is there a subject? If so, does the ID match the IDs we listed in that array at the top of the file? If so, push the name, subject(s), and URL of that guide into a new array called *guideSubjectArray*."

#### 2. for each guide from the filtered array

The new array we made in the last loop, *guideSubjectArray*, is almost ready for parsing. The problem is that this array is full of objects/guides that may or may not have multiple subjects associated with it. Without another loop, we would only be able to access the first or a specific index number of subjects. 

This second loop takes all the guides in *guideSubjectArray* and asks a few questions of each *subject* of each guide. The last loop just asked questions of the guides, but in this case, the subject of the guide is the important piece. "Here's a subject within a guide; let's assign the guide's name, URL, and this subject to a new object and push that to our array called *allGuides*. Are there any more subjects associated with this guide? If yes, create a new object for those. If no, move on to the next guide in the list."

#### 3. for each unique subject

This last loop does all the fun stuff. 

Right before this loop starts, there are a few variables that hold important information. 

1.  *sortedArray* uses lodash to sort the *allGuides* array we just built in step 2 and sorts it alphabetically by subject. This means all the Art guides come first, sorted alphabetically by name, then all the Business guides sorted alphabetically by name, and so on.

2. *uniqueArray* uses lodash to count the number of guides in each subject. 

3. *panelCounter* will be useful soon. Just you wait.

4.  *subjectList* is the culmination of this whole script. This holds all the html that will eventually be appended to the DOM and display our guide list.

Now, the third and final loop!

This takes all the unique subjects and the count of guides in that subject (stored in *uniqueArray*) and injects it into html. You'll see the interpolation version of a variable, like `${subject}` and `${count}`, in the middle of the HTML, and that's where javascript injects the stored variables we've been working through. 

This is also where *panelCounter* comes into play. We set *panelCounter* to `0` before the loop started. The boostrap code for the [accordian-style list](https://www.w3schools.com/bootstrap/bootstrap_collapse.asp) requires that each panel have a unique ID that links the panel link to the panel body text (when you click the panel link, *e.g. Art*, it opens the accordion and shows the body text of the panel, *e.g. links to Art guides*). Where you see `${panelCounter}`, that number is being injected. In the case of the first time through the loop, it injects `0`. If you jump to the end of the loop, you'll see `panelCounter += 1;` which adds one to the current number of the loop. The next time it goes through the loop, it will inject `1` into the HTML, the next time will be `2`, and so on, until the loop ends.

So far, we've made panels with links for each subject, but there's no content in the panel body. Would you be surprised if I told you there's *yet another* loop? Surprise!

The loop within this loop takes the *allSubjects* array we created back in step 2 and asks if the subject we're dealing with in step 3 (Art, since we're still in the first time through the loop) matches the subject from *allSubjects*, add the link to the panel body. Once it's looped through all the guides in *allSubjects* it ends the loop, and the code continues by closing the list and adding to the panel counter. 

Then it goes back to the beginning of the loop and does it all over with the next subject, Business. It prints the subject, **Business**, and the count of how many Business guides there are, **3**, then injects the panelCounter number to link the link to the panel body. Then loops through all Business guides and prints the link for those guides. Finishes the list and adds to the panelCounter. Then goes back to the beginning of the loop until there are no more subjects.

Last step! *subjectList* has been storing all the HTML generated from this looping in step 3. The last few lines of code appends it to the DOM-- in this case, it's appended to a `div` with an ID `#published-guides`. 

Voila!

Miraculously, this all happens in milliseconds. The reason it loads so slowly is that AJAX requests are slow.