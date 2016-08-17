### Storytime

  ## User Stories
    1. Customer
    [ ] Greeted with Landing Page
      - get page titles working
      - brief explination
      - try it out
      - testimonials

    [ ] Directed to signup
      - signup / login
      - Fix Facebook singup to work if user is already found
      - account stuff
      - get side nav working correctly

    [ ] Browse stories
      - tag filtering
      - searching
      - lazy load scroll

    [ ] View Complete Story info
      - Design page

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

    3. Security & Performance
    [ ] cache user - most likely in the userService used in
        - angularApp.js route for individual stories
        - setting right now to _user
