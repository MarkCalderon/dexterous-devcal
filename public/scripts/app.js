Vue.use(VueResource);

new Vue({

    el: '#dex-body',
    data: {
        formStatus: false,
        formSubmitted: false,
        formModify: false,
        signedIn: false,
        profile: "",
        blog: [
            {
            title: "",
            content: "",
            image: ""
            }
        ],
        blogData: [
            {
            title: "",
            content: "",
            image: ""
            }
        ]
    },
    methods: {
        posts: function(){
            this.$http.post('https://dexterous-news.firebaseio.com/posts.json',{
            title: this.blog.title,
            content: this.blog.content,
            image: this.blog.image
        
            }).then(function(data){
                    console.log(data);
                    this.signedIn = true;
                    this.formSubmitted = true;
                    this.formStatus = false;
                
            });
        },

        onSignIn: function(googleUser){
            this.signedIn = true;
                var profile = googleUser.getBasicProfile();
                console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
                console.log('Name: ' + profile.getName());
                console.log('Image URL: ' + profile.getImageUrl());
                console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
        }
    },

    created(){
        this.$http.get('https://dexterous-news.firebaseio.com/posts.json').then(function(data){
            return data.json();
        }).then(function(data){
            var blogsArray = [];
            for(let key in data){
                data[key].id = key
                blogsArray.push(data[key]);
            }
        console.log(blogsArray);
            this.blogData = blogsArray;
        })
    }
})