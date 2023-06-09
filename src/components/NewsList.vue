<template>
  <div class="my-list-group">
    <div
      v-for="(newsItem, index) in this.newsList"
      :key="index"
      class="my-list-group-item"
      :class="{ active: isActiveIndex === index }"
      @mouseenter="isActiveIndex = index"
      @mouseleave="isActiveIndex = null"
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
    <hr />
    <nav v-if="totalPages > 1" aria-label="Page navigation">
      <ul class="pagination">
        <li class="page-item" :class="{ 'disabled': currentPage === 1 }">
          <button class="page-link" @click="prevPage">이전</button>
        </li>
        <li
          class="page-item"
          v-for="page in totalPages"
          :key="page"
          :class="{ 'active': page === this.currentPage }"
        >
          <button class="page-link" @click="goToPage(page)">{{ page }}</button>
        </li>
        <li class="page-item" :class="{ 'disabled': this.currentPage === totalPages }">
          <button class="page-link" @click="nextPage">다음</button>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import axios from "axios";
import authService from "../authService.js";

export default {
  data() {
    return {
      props: ['newsId'],
      newsList: [],
      currentPage: 1,
      totalPages: 0,
      pageSize: 10, // 페이지당 아이템 수
      isActiveIndex: null, // 수정된 부분: isActiveIndex 추가
    };
  },
  mounted() {
    this.fetchNews();
  },
  
  methods: {
    fetchNews() {
      console.log(this.currentPage);
      const apiUrl = `http://15.164.220.194:8080/api/news?job=all&page=${this.currentPage}`;
      console.log(apiUrl);

      axios
        .get(apiUrl)

        .then((response) => {
          this.newsList = response.data.newsList;
          console.log(this.newsList);
          this.totalPages = response.data.totalPages;
        })
        .catch((error) => {
          console.error("API 오류:", error);
        });
    },
    goToPage(page) {
      if (page !== this.currentPage) {
        this.currentPage = page;
        this.fetchNews();
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.fetchNews();
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
        this.fetchNews();
      }
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

