<template>
    <div class="nav-bar">
      <router-link class="button" to="/newslistbookmark">북마크</router-link>
      <router-link class="button" to="/newslistscrap">스크랩</router-link>
      <router-link class="button" to="/newslistrecent">최근 본 뉴스</router-link>
      </div>
      <router-view/>
</template>

<script>
export default {

}
</script>

<style>
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