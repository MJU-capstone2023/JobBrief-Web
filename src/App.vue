<template id="app">
  <div class="container">
    <div>
      <img src="@/assets/배너.png" @click="goToNewsList"/>
    </div>
    <hr>
    <div class="nav-bar">
      <router-link class="button" to="/newslist">전체</router-link>
      <router-link class="button" to="/newslistPQ">생산관리</router-link>
      <router-link class="button" to="/newslistIT">IT개발</router-link>
      <router-link class="button" to="/newslistHA">인사/총무</router-link>
      <router-link class="button" to="/newslistFA">재무/회계/금융</router-link>
      <router-link class="button" to="/newslistD">디자인</router-link>
      <router-link class="button" to="/newslistMM">마케팅/MD/기획</router-link>
      <router-link class="button" to="/collection">컬렉션</router-link>
      <router-link class="button" to="/mypage">마이페이지</router-link>
      <router-link class="button" to="/login">로그인</router-link>
      <router-link class="button" to="/join">회원가입</router-link>    
    </div>
    <hr>
    <router-view/>    
  </div>
  <div>
  </div>
</template>

<script>

export default {
  methods: {
    goToNewsList() {
      this.$router.push('/newslist');
    },
  },
  
  name: 'App',
  components: {
  }
  
}
</script>
 
<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;  
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-bottom: 100px;
  }
  #container {
  display: flex; 
  flex-direction: row; 
  justify-content: space-between; 
  margin: 20px 0; 
  }
  .nav-bar {
    background-color: #fff;
    padding: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .button {
    margin: 0 10px;
    padding: px 10px;
    text-decoration: none;
    color: #333;
    transition: background-color 0.3s ease;
  }

  .button:hover {
    background-color: #333;
    color: #fff;
  }

</style>