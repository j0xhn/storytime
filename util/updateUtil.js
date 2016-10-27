const Story = require('../models/Story');

const updateUtil = {};
updateUtil.giveAllInputsType = function(query){
  console.log('made it here');
  Story.find({}).exec(function(err, users){
    console.log('made it here', users);
  });
  db.stories.find().forEach(
    function(doc){doc.inputs.forEach(
      function(input){
        print(input)
      }
    )
  )
  db.stories.find().forEach(
    function(doc){

    }
  )
  // Story.find().forEach(function(doc){
  //   doc.inputs.forEach(function(input){
  //       console.log(input.type);
  //   });
  // });
};
module.exports = updateUtil;
