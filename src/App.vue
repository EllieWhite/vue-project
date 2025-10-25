<script setup>


// import { reactive, ref} from 'vue';
// import { useFetch } from './composables/useFetch';

//   const url = ref('http://localhost:3000/posts');


  // const {isLoading, error} = useFetch()

//   const fetchPosts = async () => {
//     const data = await fetchData('http://localhost:3000/posts');
//     posts.splice(0, posts.length, ...data)
//   }

//  const deletePost = async (id) => {
//     fetchData(`http://localhost:3000/posts/${id}`, 
//    {method: 'DELETE'}).then(()=> {
//     fetchPosts()
//    });
//   }

//   const addPost = async () => {
//     const newPostText = prompt('add text, please')
//     const newPostId = new Date();

//     const newPost = {
//       "id": newPostId.toString(),
//       "title": newPostText
//     }

//     fetchData('http://localhost:3000/posts', {
//       method: 'POST',
//       body: newPost,
//       headers: { 'Content-Type': 'application/json'}
//     }).then(()=> {
//     fetchPosts()
//    });
//   }

//   const editPost = async (post) => {
//     const newPostText = prompt('edit text, please', post.title)
//     const updatedPost = {
//       ...post,
//       "title": newPostText,

//     }

//     fetchData(`http://localhost:3000/posts/${post.id}`, {
//       method: 'PUT',
//       body: updatedPost,
//       headers: { 'Content-Type': 'application/json'}
//     }).then(()=> {
//     fetchPosts()
//    });
//   }

  // const {isLoading, error, data: posts} = useFetch(url)

  // const changeEndpoint = () => {
  //   url.value = 'https://jsonplaceholder.typicode.com/posts'
  // }

  import { db } from './firebase.js'
  import { ref, onMounted } from 'vue';
  import { collection, getDocs, doc, setDoc, deleteDoc } from "firebase/firestore"

  const posts = ref([]);
  const fetchPosts = async () => {
    const postsCollection = collection(db, 'posts')
    const postsSnapShot = await getDocs(postsCollection)
    posts.value = postsSnapShot.docs.map(doc => doc.data())
  }

  const addPost = () => {
    const newPost = {
      id: Date.now().toString(),
      title: 'new post'
    }

    const postRef = doc(db, 'posts', newPost.id);
    setDoc(postRef, newPost).then(() => {
      fetchPosts();
    })
  }

  const updatePost = (id) => {
    const newText = prompt('new twxt');
    const postRef = doc(db, 'posts', id);

    setDoc(postRef, {
      title: newText
    }, {merge: true}).then(() => {
      fetchPosts();
    })
  }

  const deletePost = (id) => {
    const postRef = doc(db, 'posts', id)
    deleteDoc(postRef).then(() => {
      fetchPosts();
    })
  }
  onMounted(() => {
    fetchPosts()
  })
</script>

<template>
  <ul>
    <li v-for="post in posts" :key="post.id">{{ post.title }}
       <button @click="updatePost(post.id)">edit</button>
      <button @click="deletePost(post.id)">delete</button>
    </li>
   
  </ul>
  <button @click="addPost">add post</button>
<!-- <ul>
  <li v-for="post in posts" :key="post.id">
    {{ post.title }}
     <button @click="deletePost(post.id)">delete post</button>
    <button @click="editPost(post)">edit post</button>
  </li>
     <button @click="addPost">add post</button>
</ul>
  <div v-show="error">произошла ошибка {{ error }}</div>
  <div v-show="isLoading">загрузка</div>
  <button @click="changeEndpoint">изменить ресурс</button> -->
</template>


<style src="./App.css"></style>
