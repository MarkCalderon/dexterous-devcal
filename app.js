Vue.use(VueResource);

new Vue({

    el: '#dex-body',
    data: {
        formStatus: false,
        formSubmitted: false,
        formModify: false,
        signedIn: false,
        blog: [
            {
            id: '',
            title: '',
            content: ''
            }
        ],
        blogData: [
            {
            id: '',
            title: '',
            content: ''
            }
        ]
    },
    methods: {
        posts: function(){
            this.$http.post('http://jsonplaceholder.typicode.com/posts',{
                title: this.blog.title,
                body: this.blog.content,
                userId:1
            }).then(function(data){
                console.log(data);
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
        this.$http.get('http://jsonplaceholder.typicode.com/posts').then(function(data){
            this.blogData = data.body.slice(0,10);
        })
    }
})