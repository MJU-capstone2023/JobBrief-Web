<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-md-4">
        <form @submit.prevent="register" class="card">
          <h2 class="card-header">회원가입</h2>
          <div class="card-body">
            <div class="form-group">
              <label for="name">이름</label>
              <input type="text" class="form-control" id="name" v-model="name">
            </div>
            <div class="form-group">
              <label for="userId">아이디</label>
              <input type="text" class="form-control" id="userId" v-model="userId">
            </div>
            <div class="card-footer">
              <button type="button" @click="idConfirm" class="btn btn-primary btn-block">아이디 중복확인</button>
            </div>
            <div class="form-group">
              <label for="password">비밀번호</label>
              <input type="password" class="form-control" id="password" v-model="password">
            </div>
            <div class="form-group">
              <label for="phoneNumber">연락처</label>
              <input type="text" class="form-control" id="phoneNumber" v-model="phoneNumber">
            </div>
            <div class="form-group">
              <label for="email">이메일</label>
              <input type="email" class="form-control" id="email" v-model="email">
            </div>
            <div class="form-group">
              <label for="studentid">학번</label>
              <input type="text" class="form-control" id="studentid" v-model="studentid">
            </div>
          </div>
          <div class="card-footer">
            <button type="submit" class="btn btn-primary btn-block">가입</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      userId:"",
      name:"",
      password:"",
      phoneNumber:"",
      email:"",
      studentId:""
    };
  },

  methods: {
    register() {
      const apiUrl = 'http://localhost:8082/api/member/join';
      const requestData = {
        name: this.name,
        userId: this.userId,
        password: this.password,
        phoneNumber: this.phoneNumber,
        email: this.email,
        studentid: this.studentid,
      };

      axios.post(apiUrl, requestData)
        .then(response => {
          console.log(response.data);
          alert('회원가입이 완료되었습니다.');
          this.$router.push('/login'); 
        })
        .catch(error => {
          console.error(error);
          alert('회원가입에 실패했습니다. 다시 시도해주세요.');
        });
    },

    idConfirm() {
      const apiUrl = 'http://localhost:8082/api/member/id-check';
      const requestData = {
        userId: this.userId,
      };

      axios.post(apiUrl, requestData)
        .then(response => {
          if (response.data.duplicated) {
            alert('중복된 아이디입니다. 다른 아이디를 사용해주세요.');
          } else {
            alert('사용 가능한 아이디입니다.');
          }
        })
        .catch(error => {
          console.error(error);
          alert('아이디 중복 확인에 실패했습니다. 다시 시도해주세요.');
        });
    }
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