angular.module('storiesService', [])
.service('storiesService', function ($http) {
  var allStories = {
    1: {
      title: "Preperation for the Sun",
      desc: "Sunblock and hats save the day when Intense Sunlight is needed to fight off bad guys",
      photoUrl:"http://worldartsme.com/images/small-sun-clipart-1.jpg",
      author: 'Michelle Storey',
      price: 1,
      tags: ['friend','vehicle','sunscreen','sunblock','darkness','sunlight'],
      id: 1,
      inputs:{
        main:       { title:'Main Character', type: 'text'},
        sub:        { title:'Friend of Main Character',type: 'text'},
        vehicle:    { title:'Favorite Vehicle',type: 'text'},
        vgroup:     { title:'Type of Monster',type: 'text'},
        vvehicle:   { title:"Monster's Vehicle",type: 'text'}
      },
      html:'In a small village lived a little boy/girl <b ng-bind="main"></b> and his friend  <b ng-bind="sub"></b>.  <b ng-bind="main"></b> was an apprentice learning how to make weapons in a blacksmith shop.  He worked long hours to make his swords and arrows just right and his/her friend often liked to watch and help. <br><br> One night while <b ng-bind="main"></b> was up working well past the time his friend had gone to bed, there was a loud disturbance outside.  <b ng-bind="main"></b> looked out the door and up the street to see a large band of <b ng-bind="vgroup"></b>s coming down the street.  <b ng-bind="main"></b> grabbed some of his/her finest weapons and charged into battle.  It wasn&#39;t long til <b ng-bind="sub"></b> was fighting right by his side.  "I thought you were in bed!?" <b ng-bind="main"></b> said.  <br/><br/>"How could I sleep with all this noise? And besides, I wasn&#39;t about to let you have all the fun!" <b ng-bind="sub"></b> said while wielding a sword at an oncoming <b ng-bind="vgroup"></b>.<br/><br/>There was a loud "boom" and right in the middle of the street appeared an old man with a long beard.  The <b ng-bind="vgroup"></b>s seemed to recognize him and immediately started running from the street.  "Take a hostage!," one of the <b ng-bind="vgroup"></b>&#39;s yelled as they all headed for the hills.<br/><br/>"<b ng-bind="sub"></b>" gasped <b ng-bind="main"></b> "where&#39;s my friend?" he shouted, "<b ng-bind="main"></b>!"  He heard <b ng-bind="sub"></b> screaming out his/her name as he saw his friend being carried off by the the <b ng-bind="vgroup"></b> in their <b ng-bind="vvehicle"></b>s.  <br/><br/><b ng-bind="main"></b> ran after the <b ng-bind="vgroup"></b>s but they were too fast.  He would never catch them on foot.  <br/><br/>The old man who had appeared out of thin air in the middle of the battle said, "If you want to get your friend back, we&#39;ll need to gather some supplies.  I have a powerful weapon we can use against them to get him/her back."<br/><br/>"Who are you?" <b ng-bind="main"></b> asked.  <br/><br/>"You can call me Bolt" the man replied.  I have power over light and electricity. <br/><br/>Those bully <b ng-bind="vgroup"></b>s hate the light and we can use it get your friend back."<br/><br/>"Then you know where they have taken him/her?" <b ng-bind="main"></b> asked hopefully.<br/><br/>"Yes, to the caves of darkness."  Bolt replied. "But if you are going to come with me, you will need to be prepared for intense brightness.  You will need sunglasses, sunscreen, and a hat.  And Hurry! We need to leave right away!"<br/><br/><b ng-bind="main"></b> quickly ran to his workshop and shoved a bottle of sunscreen into his backpack along with his sunglasses and his cap.  When he ran back out to the street.  Bolt was waiting for him in his awesome <b ng-bind="vehicle"></b>.  "Hop in!" Bolt said.  <br/><br/><b ng-bind="main"></b> jumped right in and got to work applying sunscreen to all of his skin while they drove to the caves of darkness.<br/><br/>Once they got arrived.  They walked right up to the entrance of the cave and Bolt pulled a beautiful sword from it&#39;s sheath at his hip.  He swung it through the air a few times and it began to glow.  "Hand over <b ng-bind="sub"></b>!" He yelled to the <b ng-bind="vgroup"></b>s.  They did nothing so Bolt turned and nodded at <b ng-bind="main"></b>, which was a the signal to put on his sunglasses and hat.  <b ng-bind="main"></b> quickly put them on and Bolt plunged the sword into the ground of cave.  Light burst out through the crack in the ground where the sword had hit.  Light so intense and bright that the <b ng-bind="vgroup"></b>s all screamed and covered their eyes.  Their skin started to sizzle and burn.  As they crumpled helpless to the ground under the intense light.  <b ng-bind="main"></b> ran through the cave and found his friend.  She/he couldn&#39;t see because she/he didn&#39;t have sunglasses so <b ng-bind="main"></b> picked her up and gave her/him his/her hat for some protection from the bright light as he/she ran out of the cave.  <br/><br/>Once they were safely out, Bolt removed his sword from the ground and followed them out to the <b ng-bind="vehicle"></b>.  <b ng-bind="sub"></b> was luckily wearing long sleeves and pants and with the addition of <b ng-bind="main"></b>&#39;s hat, she/he had not been burned by the bright light. <br/><br/>"What was that?" <b ng-bind="sub"></b> asked. <br/><br/>"Intensified sunlight." Bolt responded as he drove them back to their village.  I don&#39;t think you&#39;ll have anymore problems from those <b ng-bind="vgroup"></b>&#39;s now.  <br/><br/>They thanked Bolt for his help and told him he was welcome to come visit them anytime.  He said it was his pleasure to help and disappeared in a flash of light.<br/><br/><b ng-bind="main"></b> and <b ng-bind="sub"></b> were happy to be home again and after seeing how much damage that intense sunlight could do.  They always applied sunscreen and wore sunglasses and hats whenever they were in the sun.   The End.'
    },
    2: {
      title: "Let's Go On A Trip",
      desc: "Speedy McQueen takes some lucky kids on a trip!",
      photoUrl:"http://screenshots.en.sftcdn.net/en/scrn/82000/82722/cars-rayo-mcqueen-5.jpg",
      author: 'Test Author',
      tags: ['friend','vehicle','test','travel','road rage'],
      price: .99,
      id: 2,
      inputs:{
        first:   { title:"Temporary Variable", type: 'text'},
        main:   { title:"Does This Mimic Above?", type: 'text'}
      },
      html:'Here is a sample story,<b ng-bind="main"></b> lets see if this works <b ng-bind="first"></b>'
    },
    3: {
      title: "A Special Surprise",
      price: .25,
      desc: "Friends find a new puppy to play with... rabis?",
      photoUrl:"http://t2.uccdn.com/en/images/6/2/1/img_how_much_should_my_labrador_puppy_eat_126_100_square.jpg",
      author: 'Kerry Reynolds',
      tags: ['puppy','sickness'],
      id: 3,
      inputs:{
        first:   { title:"Temporary Variable", type: 'text'},
        main:   { title:"Does This Mimic Above?", type: 'text'}
      },
      html:'Here is a sample story,<b ng-bind="main"></b> lets see if this works <b ng-bind="first"></b>'
    },
    4: {
      title: "The Mysterious Rocklands - cultivate curiosity",
      desc: "Extraordinary things in life are only found if you are curious enough to seek them out",
      photoUrl:"http://www.duluthnewstribune.com/sites/default/files/styles/square_100/public/field/image/ROCKS0628c5_0.jpg?itok=m_Oj4jj4",
      author: 'Old Wire Whiskers',
      tags: ['friend','vehicle','curiosity','rocklands','mystery','preparation'],
      id: 4,
      inputs:{
        main:       { title:'Your Name and Character ie- Batman Ben', type: 'text'},
        vehicle:    { title:'A Protective Vehicle',type: 'text'},
        vgroup:     { title:'Color and Details About Chosen Vehicle',type: 'text'},
        vvehicle:   { title:"Two Friends",type: 'text'}
      },
      html: 'Far away in a desert wasteland, there is a mysterious village called The Rocklands.  Those who have been there will only say that you have to see it to believe it.  They refrain from talking about it because they don&#39;t want anyone to think they are crazy.  They say that what can be witnessed there is just too unbelievable. <br><br> <b ng-bind="main"></b> thought, "What could be so unbelievable that people refuse to talk about it?"  He/she was very curious to go explore The Rocklands for him/herself.  The thought of going to an unknown place also made him/her a little edgy.   Whenever <b ng-bind="main"></b> was edgy, he/she knew that whatever he/she was planning to do needs preparation.  <b ng-bind="main"></b> thought about how to prepare for his/her adventure and decided to build a vehicle so protected and fast that he/she would be able to get out fast if and when the need arises. <br><br> <b ng-bind="main"></b> decided to go to work immediately to build a <b ng-bind="vehicle"></b>.  The <b ng-bind="vehicle"></b> took <b ng-bind="main"></b> many long hours to construct, but when he/she was done, it was <b ng-bind="vgroup"></b>.  <b ng-bind="main"></b> wanted to be sure that his/her <b ng-bind="vehicle"></b> would be able to withstand anything that might be encountered in The Rocklands so he decided to go ask <b ng-bind="vvehicle"></b> if they thought his/her preparation was adequate. <br><br> When <b ng-bind="vvehicle"></b> saw <b ng-bind="main"></b> coming down the street in his/her <b ng-bind="vehicle"></b>, they were alarmed and said, "You are not thinking of going to The Rocklands in that are you?!" <br><br> <b ng-bind="main"></b> just smiled and said, "I&#39;m just so curious! I have to know what it is like there.  I have prepared this vehicle and came to ask if you thought it will be able to protect me on my adventure." <br><br>  <b ng-bind="vvehicle"></b> didn’t like thinking about <b ng-bind="main"></b> going to an unknown place, but when they saw that his/her vehicle was well equipped for the journey they softened to the idea.  <b ng-bind="vvehicle"></b> suggested they go ask their ancient neighbor, Wire Whiskered Harry, who had been to The Rocklands if the <b ng-bind="vehicle"></b> could get them in and out safely.  <b ng-bind="main"></b> could see the wisdom in asking someone who had been there before and so they went to talk to Old Wire Whiskers.  <br><br>  Old Wire Whiskers was wrinkled with long gray hair and walked with slow footsteps.  He put on his thick rectangular glasses and inspected every inch of the <b ng-bind="vehicle"></b>.  Finally, he nodded and said, "I wish that I had one of these when I went to The Rocklands!  If I had, I probably would have made it out without this..." He lifted his pant leg and showed them a gnarly scar on his foot.  "With a vehicle like this, you should be fine.  But, you should tie a baseball glove on the back, just trust me on this one." <br><br>  With Old Wire Whisker’s approval and a baseball glove added for good measure, <b ng-bind="vvehicle"></b> asked if <b ng-bind="main"></b> would help them make more <b ng-bind="vehicle"></b>s so they could join him/her and go too!  <b ng-bind="main"></b> agreed to help his/her friends and was now confident that he could journey to The Rocklands safely.  After <b ng-bind="vvehicle"></b> had their <b ng-bind="vehicle"></b>s made, the whole fleet was ready and took off toward The Rocklands together with <b ng-bind="main"></b> leading the way. <br><br>  When they got there, <b ng-bind="main"></b> saw orange red sand as far as the eye could see.  The sand looked like rolling waves across the desert.   All across the sand there were little piles of round red rocks and in the distance he/she could make out the remain of on old baseball stadium.  The rocks were stacked on top of each other five or six rocks high and there got to be more and more as they approached the ruins of the the stadium.  As <b ng-bind="main"></b> slowed and came in for a closer look, he/she thought he/she saw something move out of the corner of his/her eye.  When he/she turned his/her head to look again there was an army of little stone men chasing them.  "Are you guys seeing this!!?" <b ng-bind="vehicle"></b> yelled to <b ng-bind="vvehicle"></b>. <br><br>  "Lets get out of here!" <b ng-bind="vvehicle"></b> called back.  They all notched up to full speed when <b ng-bind="main"></b> noticed the rocks were no longer chasing them.  They were arranging themselves in a strange pattern on the ground.  "What are they doing?" he/she thought.  "Hey guys," <b ng-bind="main"></b> called to his friends, "I&#39;m headed back for a second look."  <br><br>  "Are you crazy?  Those rocks are alive!" they replied.  <br><br>  <b ng-bind="main"></b> could see they were arranging themselves into letters and he/she was curious about what they were trying to tell him/her.  As he/she approached the rocks were perfectly still, he/she could make words formed by the red rocks in the dusty sand: We are friends, STAY and PLAY followed by what looked like an image of a baseball and bat.  <b ng-bind="main"></b> put his/her finger in the warm gritty sand and used it to spell out: OK.  The rocks jumped up and took the outfield. <br><br>  "They are friendly!" <b ng-bind="main"></b> called to his/her friends.  "They want us to play a little game of baseball with them.  Whose up for it?  I&#39;m staying." <br><br> "Baseball sounds like fun. We&#39;re in too!" said <b ng-bind="vvehicle"></b> coming to join <b ng-bind="main"></b> at the ruins of the stadium.  They played a few innings and had a fantastic time before saying goodbye to their new rock friends and headed for home. <br><br> "You know no one will believe us if we tell anyone back home what happened," <b ng-bind="main"></b> commented to his/her friends. <br><br> "Let&#39;s let anyone curious borrow our <b ng-bind="vehicle"></b>s and they can come find out for themselves," <b ng-bind="vvehicle"></b> replied with a smirk.  "You never know what extraordinary things you might find if you are curious enough to go looking."   The End.'
    },
    5: {
      title: "The Flood",
      desc: "Develop a relationship with God, he’ll protect you",
      photoUrl:"http://www.toonpool.com/user/589/thumbs/early_warning_system_137736.jpg",
      author: 'Michelle',
      tags: ['Noah','flood','prayer','God','rain','protection'],
      id: 5,
      inputs:{
        main:       { title:'Your Character and Name ie- Batman Ben', type: 'text'},
        dcity:    { title:'Evil City i.e.- Gotham City',type: 'text'},
        dvillian:     { title:'Villian(s) i.e.- Joker and Poison Ivy',type: 'text'},
        dvehicle:   { title:"Favorite vehicle - i.e.- Batmobile",type: 'text'}
      },
      html: '<b ng-bind="dcity"></b> was plagued with thieves, plunderers, gangsters, and criminals of all kinds.  <b ng-bind="main"></b> wasn&#39;t the only one concerned for the welfare of the people.  God had heard the prayers of <b ng-bind="main"></b> on behalf of the good people and decided to intervene.  God told <b ng-bind="main"></b> that he would send a mighty rain to flood the land and wash away the crime so the city could start fresh.  God told <b ng-bind="main"></b> that he would need a boat and supplies and that he should warn the people. <br><br> <b ng-bind="main"></b> told the people that he had prayed for their city, and God had promised to send a flood.  He advised them to build ships, so they wouldn&#39;t drown.  The people all laughed and ignored him, especially <b ng-bind="dvillian"></b>.  <br><br> They watched as <b ng-bind="main"></b> pulled out his <b ng-bind="dvehicle"></b>.  He prayed that God would tell him how to modify the <b ng-bind="dvehicle"></b> so it could float and hold all the needed supplies.  God answered <b ng-bind="main"></b> prayer and enlightened his mind with new constructions.  As <b ng-bind="main"></b> was making his <b ng-bind="dvehicle"></b> much larger, <b ng-bind="dvillian"></b> laughed and taunted <b ng-bind="main"></b> saying that his modifications were making the <b ng-bind="dvehicle"></b> slow and less maneuverable.   <b ng-bind="dvillian"></b> told <b ng-bind="main"></b> he would never be able to rid the city of crime in that monstrosity. <br><br> <b ng-bind="main"></b> didn&#39;t listen to the laughing around him and counseled all the good people of the city that they should do the same.  They finished their boats and waited. <br><br> Dark clouds began forming.  The rain started to pour down soaking <b ng-bind="dvillian"></b>.  <b ng-bind="main"></b> entered his <b ng-bind="dvehicle"></b> and said a prayer of thanks to God.  He was thankful that he would be protected from the storm.  The End'
    },
    6: {
      title: "Making Choices",
      desc: "Make a thoughtful choice and be happy with it",
      photoUrl:"http://a2.mzstatic.com/us/r30/Purple/v4/d8/3b/78/d83b78da-0424-0945-3b4c-43579556c103/icon100x100.png",
      author: 'Michelle Reynolds',
      tags: ['choices','decision','consumerism','contentment'],
      id: 6,
      inputs:{
        main:       { title:'Your Name', type: 'text'},
        dfun:        { title:'Activity you like to do',type: 'text'},
        dsupplies:     { title:'Supplies needed for the activity',type: 'text'},
        lsetting:   { title:"Best location for activity",type: 'text'}
      },
      html: '<b ng-bind="main"></b> was having a fantastic day.  He/She had been up early getting chores done and was now free to <b ng-bind="dfun"></b>.  He/she began to gather the <b ng-bind="dsupplies"></b> but noticed that his/her arms were quickly filling and he/she couldn&#39;t hold everything.  He/she had to decide what was the most important.  He/she looked over all the supplies and thought playing eenie-meenie-miney-mo with them might help him/her choose.  But he/she knew some supplies were more important than others and didn&#39;t like the thought of leaving this decision to chance.  After all, what if it meant leaving (Insert the most important supply).  No, he/she could not let that happen! So <b ng-bind="main"></b> carefully thought about the pros and cons to each item.  (Insert  a few pros and cons to some supplies).  Ultimately, <b ng-bind="main"></b> decided that he/she could leave behind the (Insert supply with the most cons) and set off for the <b ng-bind="lsetting"></b>. (Add description of setting: items to touch, smell, see, hear, taste) <br><br>.  <b ng-bind="main"></b> was having so much fun using the (insert item with the most pros) (Show <b ng-bind="main"></b> using the item - what do you do with it, how does it feel, sound, taste, smell, look) that he/she didn&#39;t even miss the (Insert item left behind). <b ng-bind="main"></b> was glad he/she had made a thoughtful choice! The End'
    },
    7: {
      title: "Problem Resolution",
      desc: "Talking helps solve problems",
      photoUrl:"http://thumb7.shutterstock.com/thumb_small/498865/498865,1280129929,1/stock-vector-cartoon-parrot-presenting-with-his-wing-57833164.jpg",
      author: 'Michelle Reynolds',
      tags: ['tricksters','squaak','problem','resolution'],
      id: 7,
      inputs:{
        main:       { title:'Your Name', type: 'text'},
        danimal:        { title:'Favorite 4 legged animal',type: 'text'},
        dfriend1:     { title:'Name of a Friend #1',type: 'text'},
      },
      html: 'Once upon a time, there was a <b ng-bind="danimal"></b> named <b ng-bind="main"></b>.  <b ng-bind="main"></b> loved to play in the forest with his/her other <b ng-bind="danimal"></b> friends.  They loved to run and jump and sometimes they liked to plan surprises for other animals.  After all, they were very clever <b ng-bind="danimal"></b>s.  One day, as <b ng-bind="danimal"></b> <b ng-bind="main"></b> was playing he/she heard a loud “squaaaK!” and looked up to the sky to see a pesky bird.  <br><br> “Those birds are so annoying” he/she thought, “I&#39;d like to play a little trick on them.” <br><br> That night over dinner, <b ng-bind="main"></b> and his/her friends where discussing the squaaking birds and made a plan to scare the “squaaaks” right out them.  They would engineer a rocket backpack and launch themselves right up at the cliffs in the mountains where the birds slept in their nests.  <br><br> <b ng-bind="main"></b> and his friends had a good laugh thinking about how the birds would freak out when they parachuted down right by their nest. <br><br> It took a lot of thinking and planning to build the rocket-packs.  But before long they were ready to launch.  <b ng-bind="main"></b> and his/her closest two friends, packed their parachutes and strapped on their rocket-packs.  <br><br> It was a little before sunrise when the countdown commenced...10, 9, 8, 7, 6, 5, 4, 3, 2, and 1...BLAST OFF! <br><br> The <b ng-bind="danimal"></b> s fired off into the sky and as they passed the birds nest, the loud sound awoke the birds sleeping in their nests and gave them such a scare they panicked and flew out of their nests.  One little baby bird that hadn&#39;t learned to fly yet, was so scared that he too jumped out of the nest.  He flapped with all his might but it was no use.  He was falling fast and started to scream.  <br><br> The birds watching screeched in horror as the baby was falling too fast for them to catch-up and save him. <br><br> <b ng-bind="main"></b> saw what was happening and radio’d to his/her friends <b ng-bind="dfriend1"></b> to tell them that a little bird was in trouble.  They immediately broke into a dive and hit the turbo boost button on their packs and raced after the falling baby bird.  <br><br> “I&#39;ve got him guys!” <b ng-bind="main"></b> yelled to his/her friends and he/she reached his/her front arms out and cradled the baby into safety.  Once he/she had the baby bird securely attached to his/her own pack, he/she pulled the parachute string and floated safely to the ground. <br><br> On the ground the birds swarmed over to make sure the baby was safe.  Once they hugged and kissed the baby, the birds said to the <b ng-bind="danimal"></b>s, “what was the meaning of that stunt?! This baby could have been killed!” <br><br> <b ng-bind="main"></b> and his/her friends were also shaken up.  The said, “we are so sorry, we never meant to hurt anyone!” <br><br> “Yeah,” said <b ng-bind="dfriend1"></b>, “honestly we only meant to scare the squaaaks out of you.” <br><br> “What do you mean squaaks?” said the birds <br><br> “All that squaaking you guys do really bugs us,” said the <b ng-bind="danimal"></b>s “We thought we could scare it out of you so you wouldn&#39;t do it anymore but we were wrong! Scaring you only made the squaaking even louder! We should have just talked to you how it bothered us instead of reacting like we did.” <br><br> “We are sorry,” said the birds, “We didn&#39;t realize it bothered you. We will do our best not to be so squaaky anymore if you guys promise to not scare us anymore.” <br><br> “It&#39;s a deal!” said the <b ng-bind="danimal"></b> s.  And from that day on they learned to talk about their concerns and resolve issues with words so nobody would get hurt.    The End.'
    },
    8: {
      title: "5 Owls - participation story",
      desc: "Audience helps in this story about taking action",
      photoUrl:"https://s-media-cache-ak0.pinimg.com/236x/13/0c/98/130c984f18f52ed45ee8175a40388eec.jpg",
      author: 'Wendy',
      tags: ['owl','participation','action','tonight','rain','5'],
      id: 8,
      html: 'Five little owls slept in a tree <br><br>When they woke up, the moon was just rising! <br><br> <br><br> - Tell audience to now repeat everything you say and do everything you do. <br><br> <br><br> The moon is rising  -  Make moon over head with arms <br><br> Let&#39;s play!		- Act out flying though the air <br><br> <br><br>Soar through the sky, soar through the sky .... Hoot Hi! <br><br>Soar through the sky, soar through the sky .... Hoot Hi! <br><br> <br><br> - Pause then.... <br><br> <br><br>Let&#39;s play tag! <br><br> <br><br> - suggest listeners to softly tag someone on their right, then their left. <br><br> <br><br> Hoo-hoo-hoo ....Got you!    -  spread arms to Fly.....reach out and tag <br><br> Hoo-hoo-hoo ....Got you!	-  spread arms to Fly.....reach out and tag <br><br> <br><br> - rapidly pat legs to sound like rain <br><br> <br><br> Rain! Rain! Rain!<br><br> I&#39;m wet!<br><br> I&#39;m cold!<br><br> Let&#39;s build a house. <br><br> <br><br> - pause to think about it <br><br> <br><br> Later! <br><br> Tomorrow? <br><br> Tomorrow! <br><br> <br><br> Next evening.... <br><br> The moon was rising! <br><br> Let&#39;s play! <br><br> <br><br> Soar through the sky, soar through the sky .... Hoot Hi! <br><br> Soar through the sky, soar through the sky .... Hoot Hi! <br><br> <br><br> Let&#39;s play tag! <br><br> Hoo-hoo-hoo ....Got you! <br><br> Hoo-hoo-hoo ....Got you! <br><br> <br><br> Rain! Rain! Rain! <br><br> I&#39;m wet! <br><br> I&#39;m cold! <br><br> Let&#39;s build a house. <br><br> Later! <br><br> Tomorrow? <br><br> Tomorrow! <br><br> <br><br> Next evening.... <br><br> The moon was rising! <br><br> Let&#39;s play! <br><br> <br><br> Soar through the sky, soar through the sky .... Hoot Hi! <br><br> Soar through the sky, soar through the sky .... Hoot Hi! <br><br> <br><br> Let&#39;s play tag! <br><br> Hoo-hoo-hoo ....Got you! <br><br> Hoo-hoo-hoo ....Got you! <br><br> <br><br> Rain! Rain! Rain! <br><br> I&#39;m wet! <br><br> I&#39;m cold! <br><br> Let&#39;s build a house <br><br> Later! <br><br> Tomorrow? <br><br> Tomorrow! <br><br> <br><br> - Keep questioning “Tomorrow?” until someone says, “Tonight!” Acknowledge the answer and deliver end of story. <br><br> <br><br> Don&#39;t be like the silly owls, <br><br> Do it....NOW! The End'
    }

  };

  return {
    getStories: function () {
      return allStories;
    },
    getSingleStory: function(id) {
      return allStories[id]
    },
    postStory: function(storyObj) {
      $http({
        method: 'POST',
        data: storyObj,
        url: '/story/submit'
      })
    }
  };
});
