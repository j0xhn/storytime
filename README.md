### Getting Started
Clone this repo, run `npm i` and `npm start`.  If you haven't already, make sure your machine is setup to have MongoDB running.  If you haven't installed it already I suggest getting setup with HomeBrew: http://brew.sh/ and then downloading MongoDB via the command: `brew install mongodb` then starting it with `mongod`.  After all that `npm start` should get you up and running on localhost:3000

### Main Features
- Weekly / Monthly / Daily email send out via SendGrid with a “subscription center” front-end
- Modal asking for users to submit their email to receive Weekly / Monthly / Daily emails
- E-commerce API through Braintree to purchase “coins” to be used in-app
- E-commerce front-end (UX) to handle purchasing paths
- Form Validation on the www.storytimebedtime.com/submit page where stories are created
  - that textarea is under 160
  - all keywords that they've entered are also keywords in the storyDiv
  - catch errors on everything
- MongoDB services to update the DB when we update versions
- Create new MongoDB collection / UI for stories that need approval
- Create Paginated API call

### Other Features (after beta)
- get page titles working
- testimonials
- possibly a blinking cursor in inputs or auto select?
- share story on facebook prompt - on success page, and at end of story
- delete stories by sending them to another collection called "deleted" or something
- change text font to "europa"
- add error handling to input directives
- Fix Facebook singup to work if user with email is already found
- lazy load scroll feed directive
- Get "no story found" state
- No story found page
- Save story on their account / device so no "reloading" - have it local
- create 'indexes' in DB to help speed up searches
