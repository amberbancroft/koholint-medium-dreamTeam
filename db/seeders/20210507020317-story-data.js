'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    options.tableName = 'Stories';
    return queryInterface.bulkInsert(options, [
      {title: "Living Life as a Pro Gamer", likesId:1, imgUrl:"https://www.missingkids.org/content/dam/netsmartz/herobanner/herobanner_gaming.jpg", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do seiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", userId: 2},
      {title: "The Wonderful Magic of Painting", likesId:2, imgUrl:"https://specials-images.forbesimg.com/imageserve/5d758fda5b52ce000882a5c4/960x0.jpg?fit=scale", content: "Sed ut perspiciatis unde omnis iste natus errgor sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?", userId: 1},
      {title: "Seeking the Beauty in Tidying Up", likesId:3, imgUrl: "https://www.clorox.com/wp-content/uploads/2020/06/clx-hub-cleaning-sanitizing-730.png" , content: "At vero eos et accusamus et iusto odio dignissidmos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.", userId: 3},
      {title: "The Magical Wonder of Cooking", likesId:4, imgUrl:"https://media3.s-nbcnews.com/j/newscms/2019_41/3044956/191009-cooking-vegetables-al-1422_ae181a762406ae9dce02dd0d5453d1ba.nbcnews-fp-1200-630.jpg", content: "On the othere hand, we denounce with righteofus ivndignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted. The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse pains.", userId: 4},
      {title: "What it Means to Dance", likesId:5, imgUrl:"https://cdn.cnn.com/cnnnext/dam/assets/190625093403-kathryn-morgan-1-live-video.jpg", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", userId: 5},
      {title: "Coding 101", likesId:6, imgUrl:"https://static.vecteezy.com/system/resources/previews/001/218/548/original/computer-hacking-code-vector.jpg", content: "Lorem ipsum dolors sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", userId: 1},
      {title: "Why Paintball is Awesome", likesId:7, imgUrl:"https://media3.s-nbcnews.com/j/newscms/2019_41/3044956/191009-cooking-vegetables-al-1422_ae181a762406ae9dce02dd0d5453d1ba.nbcnews-fp-1200-630.jpg", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Senectus et netus et malesuada fames ac turpis. Eros donec ac odio tempor orci dapibus. Dictum varius duis at consectetur lorem donec massa sapien faucibus. Et netus et malesuada fames ac turpis egestas sed. Gravida neque convallis a cras semper auctor neque vitae tempus. Neque volutpat ac tincidunt vitae semper quis lectus. Mauris ultrices eros in cursus. Turpis egestas maecenas pharetra convallis posuere morbi leo urna. Integer vitae justo eget magna fermentum iaculis eu. Ac turpis egestas sed tempus urna et. Auctor augue mauris augue neque. Vel risus commodo viverra maecenas. Massa vitae tortor condimentum lacinia quis vel eros donec. Auctor elit sed vulputate mi sit amet mauris commodo quis. Orci eu lobortis elementum nibh tellus molestie nunc. At consectetur lorem donec massa sapien faucibus et molestie. Interdum velit euismod in pellentesque massa placerat. Amet mattis vulputate enim nulla aliquet porttitor lacus luctus", userId: 3},
      {title: "Top 10 Reasons to Watch Anime", likesId:8, imgUrl:"https://assets3.thrillist.com/v1/image/2855068/1200x630/flatten;crop_down;jpeg_quality=70" , content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vestibulum lorem sed risus ultricies tristique. Auctor neque vitae tempus quam pellentesque nec. In iaculis nunc sed augue. Neque gravida in fermentum et sollicitudin ac orci. Diam maecenas sed enim ut sem viverra. Suscipit adipiscing bibendum est ultricies. Non blandit massa enim nec dui nunc. Cursus euismod quis viverra nibh cras. Natoque penatibus et ma.", userId: 2},
      {title: "Why You Should Get Into Knitting", likesId:9, imgUrl: "https://cdn.shopify.com/s/files/1/2292/8603/articles/4-Steps-To-Learning-How-to-_Read_-Your-Knitting_1600x.jpg?v=1535729137", content: "Lorem tipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vestibulum lorem sed risus ultricies tristique. Auctor neque vitae tempus quam pellentesque nec. In iaculis nunc sed augue. Neque gravida in fermentum et sollicitudin ac orci. Diam maecenas sed enim ut sem viverra. Suscipit adipiscing bibendum est ultricies. Non blandit massa enim nec dui nunc. Cursus euismod quis viverra nibh cras. Natoque penatibus et ma.", userId: 2},
      {title: "Why I Eat Avocados In Every Meal", likesId:10, imgUrl: "http://cdn.shopify.com/s/files/1/0271/7209/files/avocado-latte-worlds-strongest-coffee.png?v=1535468249", content: "Lorem s dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vestibulum lorem sed risus ultricies tristique. Auctor neque vitae tempus quam pellentesque nec. In iaculis nunc sed augue. Neque gravida in fermentum et sollicitudin ac orci. Diam maecenas sed enim ut sem viverra. Suscipit adipiscing bibendum est ultricies. Non blandit massa enim nec dui nunc. Cursus euismod quis viverra nibh cras. Natoque penatibus et ma.", userId: 2},
    ])
  },

  down: (queryInterface, Sequelize) => {
    options.tableName = 'Stories';
    return queryInterface.bulkDelete(options, null, {});
  }
};
