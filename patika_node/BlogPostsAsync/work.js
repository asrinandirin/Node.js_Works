const posts = [
    {title: "title1", author: "author1"},
    {title: "title2", author: "author2"},
    {title: "title3", author: "author3"},
]

const value = true;

const listPost = () => {
    return new Promise((resolve,reject) => {
        if(value){
            console.log(posts);
            resolve("Posts Listed");
        }else{
            reject("There is an error");
        }
    });
}

const addPost = (post) => {
    return new Promise((resolve,reject) => {
        if(value){
            setTimeout(() => {
                posts.push(post);
                resolve("Post Added");
            },2000); 
        }else{
            reject("There is an error");
        }
    });
}

const showPosts = async () => {
    await addPost({title: "title4", author: "author4"});
    listPost();
}

showPosts();
