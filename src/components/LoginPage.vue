<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-md-4">
        <form @submit.prevent="login" class="card">
          <h2 class="card-header">로그인</h2>
          <div class="card-body">
            <div class="form-group">
              <label for="username">아이디</label>
              <input type="text" class="form-control" id="userId" v-model="userId">
            </div>
            <div class="form-group">
              <label for="password">비밀번호</label>
              <input type="password" class="form-control" id="password" v-model="password">
            </div>
          </div>
          <div class="card-footer">
            <button type="submit" class="btn btn-primary btn-block">로그인</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      userId: "",
      password: "",
      showLoginAlert: false,
    };
  },
  methods: {
    login() {
      const apiUrl = 'https://job-brief-mjucapstone.com/api/auth/login';
      const requestData = {
        userId: this.userId,
        password: this.password
      };

      axios.post(apiUrl, requestData)
        .then(response => {
          const accessToken = response.data.accessToken;
          localStorage.setItem('accessToken', accessToken);
          alert('로그인 되었습니다');          
          this.$router.push('/newslist');
        })
        .catch(error => {
          alert('로그인 실패했습니다. 아이디와 비밀번호를 확인하세요');
          console.error('API 오류:', error);
        });
    },
  },
};
</script>



<style scoped>
.card {
  margin-top: 50px;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
}
.card-header {
  background-color: #f5f5f5;
}
.card-footer {
  background-color: #f5f5f5;
}
</style>