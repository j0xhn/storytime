### Storytime

  ## User Stories
    1. Customer
    [ ] Greeted with Landing Page
      - get page titles working
      - brief explination
      - testimonials
      - design reset password & welcome & marketing emails
      - create a "feedback" form - hookup to another service?
      - possibly a blinking cursor in inputs or auto select?
      - create a "create account" link on login page
      - login returns a message rather than a redirect if wrong
      - share story on facebook - on success page, and at end of story
      - figure out why flash isn't working on login / signup attempt
      - delete stories by sending them to another collection called "deleted" or something
      - change title font to Alegreya Sans
      - change text font to "europa"

    [ ] Directed to signup
      - signup / login
      - Fix Facebook singup to work if user is already found

    [ ] Browse stories
      - lazy load scroll

    [ ] Story Page
      - Get "no story found" state


    [ ] View Complete Story info
      - Design page
      - No story found page

    [ ] Checkout
      - Single click checkout from Stripe
      - Display success message using 'flash'

    [ ] Save story on their account / device so no "reloading" - have it local

    2. Author
    [ ] get gender tags working
    [ ] navigate to submit page - authenticate
    [ ] validate all the fields
      - that textarea is under 160
      - all keywords that they've entered are also keywords in the storyDiv
      - validate serverside that it fits the schema required
      - catch errors on everything

    [ ] Improve Story Submit
      - add "edit" button if being viewed by author
      - get "male / female" working
      - create "example" form to point people to

    3. Security, Performance, Technical
    [ ] cache user - most likely in the userService used in
        - angularApp.js route for individual stories
        - make all our email services the official 'send grid' (like contact) contact which uses nodemailer implementation of sendgrid.
        - think through "example stories" better, how to use on main landing, also on story submital form helper
        - create 'indexes' in DB to help speed up searches
