### Getting Started
Clone this repo, run ```npm i```.  

If you haven't already, make sure your machine is setup to have MongoDB running.  If you haven't installed it already I suggest getting setup with HomeBrew: http://brew.sh/ and then downloading and setting up MongoDB by following this nice little getting started guide: http://treehouse.github.io/installation-guides/mac/mongo-mac.html

You'll have to get the correct keys from me for the .env.example file for the app to actually run.  Provided you have that file then you can continue below.

After all that `npm start` should get you up and running on localhost:3000 as long as you have nodemon installed.  If you don't have nodemon run `npm install -g nodemon` before `npm start`

### Main Features
- Weekly / Monthly / Daily email send out via SendGrid with a “subscription center” front-end
- Modal asking for users to submit their email to receive Weekly / Monthly / Daily emails
- Form Validation on the www.storytimebedtime.com/submit page where stories are created
  - that textarea is under 160
  - add error handling to input directives
  - all keywords that they've entered are also keywords in the storyDiv
  - catch errors on everything
- MongoDB services to update the DB when we update versions
- Create new MongoDB collection / UI for stories that need approval
- Create Paginated API call
- Testimonials

### Other Features (after beta)
- get page titles working
- submit page preview for story card and story detail page
- possibly a blinking cursor in inputs or auto select?
- share story on facebook prompt - on success page, and at end of story
- delete stories by sending them to another collection called "deleted" or something
- change text font to "europa"
- Fix Facebook singup to work if user with email is already found
- Get "no story found" state and page
- Save story on their account / device so no "reloading" - have it local
- create 'indexes' in DB to help speed up searches
