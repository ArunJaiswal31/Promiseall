const Posts = [];
      console.log(Posts);
      function CreatePost(post) {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            Posts.push(post);
            resolve("Promise1 resolved");
          }, 1000);
        });
      }
      function updateLastUserActivityTime(){
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            let date = new Date();
            Posts[Posts.length - 1] = { ...Posts[Posts.length - 1],
                 time: `updated time ${date}` };
            resolve("Promise2 resolved");
          }, 1000);
        });
        
      }
      function DeletePost() {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            if (Posts.length > 0) {
              const popElement = Posts.pop();
              resolve(popElement);
            } else {
              reject("ERROR");
            }
          }, 1000);
        });
      }
      function getPost() {
        let op = "";
        Posts.forEach((post) => {
          op += `<li>${post.name} ${post.time}</li>`;
        });
        document.body.innerHTML = op;
      }

      Promise.all([CreatePost({ name: "Arun 1" }), 
      updateLastUserActivityTime()]).then(() => {
        getPost();
        Promise.all([CreatePost({ name: "Arun 2" }), updateLastUserActivityTime()])
          .then(() => {
            getPost();
            Promise.all([CreatePost({ name: "Arun 3" }), updateLastUserActivityTime()]).then(() => {
              getPost();
              DeletePost()
                .then(() => {
                  getPost();
                })
                .then(() => {
                  DeletePost().then(() => {
                    getPost();
                    DeletePost().then(() => {
                      getPost();
                    });
                  });
                });
            });
          })
          .catch((e) => {
            console.log(e);
          });
      });
