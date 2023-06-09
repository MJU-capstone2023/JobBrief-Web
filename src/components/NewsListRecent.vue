<template>
  <div class="my-list-group">
    <div
      v-for="(newsItem, index) in recentnewsList"
      :key="index"
      class="my-list-group-item"

      @click="goToNews(newsItem.id)"
    >
      <div class="my-list-group-item-header">
        <h5 class="my-list-group-item-title">{{ newsItem.title }}</h5>
        <small class="my-list-group-item-date">{{ newsItem.pub_date }}</small>
      </div>
      <p class="my-list-group-item-content">
        {{ newsItem.summary }}
      </p>
      <small class="my-list-group-item-footer">{{ newsItem.reporter }}</small>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      props: ['newsId'],
      recentnewsList: [],
      isActiveIndex: null,
    };
  },
  mounted() {
    this.fetchNews();
  },
  
  methods: {
    fetchNews() {
      const apiUrl = "https://job-brief-mjucapstone.com/api/recent-news";
      const accessToken = localStorage.getItem("accessToken");
      axios
        .get(apiUrl, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((response) => {
          this.recentnewsList = response.data.recentnewsList;
          console.log(this.recentnewsList);
        })
        .catch((error) => {
          console.error("API 오류:", error);
        });
    },
    goToNews(newsId) {
      this.$router.push(`/newspage/${newsId}`);
    },
  },
};
</script>



<style>
  .my-list-group-item {
    padding: 1rem;
    border: 1px solid #ccc;
    border-radius: 0.25rem;
    margin-bottom: 1rem;
    padding: 10px;
    cursor: pointer;
  }
  
  .my-list-group-item.active {
    background-color: #f8f9fa;
    border-color: #f8f9fa;
  }

  .my-list-group-item-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.5rem;
  }

  .my-list-group-item-title {
    margin-bottom: 0;
  }

  .my-list-group-item-date,
  .my-list-group-item-footer {
    color: #6c757d;
  }

  .my-list-group-item-content {
    margin-bottom: 0.5rem;
  }

  .my-list-group-item-footer {
    font-size: 0.875rem;
  }

  .pagnation{
    align-items: center;
  }
</style>

