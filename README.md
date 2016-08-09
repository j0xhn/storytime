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

    3. Security
    [ ] cache user
        -- in angularApp.js route for individual stories
