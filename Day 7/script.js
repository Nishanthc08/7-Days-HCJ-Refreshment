document.addEventListener('DOMContentLoaded', () => {
    const postForm = document.getElementById('post-form');
    const postInput = document.getElementById('post-input');
    const postList = document.getElementById('post-list');
    const followBtn = document.getElementById('follow-btn');
    const followerCount = document.getElementById('follower-count');

    let isFollowing = false;
    let followers = 0;

    postForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const postText = postInput.value;
        if(postText === '') return;

        const post = document.createElement('div');
        post.classList.add('post');
        post.textContent = postText;

        postList.prepend(post);
        postInput.value = '';
    });

    followBtn.addEventListener('click', () => {
        isFollowing = !isFollowing;
        followers += isFollowing ? 1 : -1;
        followerCount.textContent = followers;
        followBtn.textContent = isFollowing ? 'Unfollow' : 'Follow';
    });

    function loadPosts() {
        const savedPosts = JSON.parse(localStorage.getItem('posts')) || [];
        savedPosts.forEach(postText => {
            const post = document.createElement('div');
            post.classList.add('post');
            post.textContent = postText;
            postList.appendChild(post);
        });
    }

    function savePosts() {
        const posts = [];
        postList.querySelectorAll('.post').forEach(post => {
            posts.push(post.textContent);
        });
        localStorage.setItem('posts', JSON.stringify(posts));
    }

    window.addEventListener('beforeunload', savePosts);
    loadPosts();

});