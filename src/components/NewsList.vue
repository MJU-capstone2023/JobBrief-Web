<template>
  <div class="my-list-group">
    <div class="container my-5">
      <div style="display: flex;">
          <div class="search-bar" style="display:flex; align-items: center;">
            <div style="margin-right: 10px; width: 200px">
              <select name="cards_id"  class="form-select form-control"  v-model="selectedType">
                <option value="" disabled selected hidden>선택하세요</option>
                <option value="title">제목</option>
                <option value="reporter">기자</option>
                <option value="content">본문</option>
                <option value="press">언론사</option>
              </select>
            </div>
          </div>
          <div class="col-8">  
              <b-form-input v-model="searchValue" placeholder="검색하세요"></b-form-input>
          </div>
          <div class="col-2">     
              <button @click="sendData" class="btn btn-primary btn-block search-button" type="button">검색</button>
          </div>
      </div>
    </div>
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
          v-for="page in visiblePages"
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
import  authService from "../authService.js";

export default {
  data() {
    return {
      props: ['newsId'],
      newsList: [],
      currentPage: 1,
      totalPages: 0,
      pageSize: 10, // 페이지당 아이템 수
      isActiveIndex: null, // 수정된 부분: isActiveIndex 추가.
      searchValue: '',
      selectedType: ''
    };
  },
  mounted() {
    this.fetchNews();
  },

  computed: {
    visiblePages() {
      const pageRange = Math.floor(this.pageSize / 2);
      let startPage = this.currentPage - pageRange;
      let endPage = this.currentPage + pageRange;

      if (startPage <= 0) {
        startPage = 1;
        endPage = Math.min(this.totalPages, this.pageSize);
      } else if (endPage > this.totalPages) {
        endPage = this.totalPages;
        startPage = Math.max(1, this.totalPages - this.pageSize + 1);
      }

      return Array(endPage - startPage + 1)
        .fill()
        .map((_, index) => startPage + index);
    },
  },

  
  methods: {
    fetchNews() {
      console.log(this.currentPage);
      const apiUrl = `https://job-brief-mjucapstone.com/api/news?job=all&page=${this.currentPage}`;
      console.log(apiUrl);

      axios
        .get(apiUrl)
        .then((response) => {
          this.newsList = response.data.newsList;
          this.totalPages = response.data.totalPages;
        })
        .catch((error) => {
          console.error("API 오류:", error);
        });
    },
    goToPage(page) {
      if (page !== this.currentPage) {
        this.currentPage = page;

        // 검색 결과 페이지에서는 검색 결과를 가져오도록 수정
        if (this.searchValue && this.selectedType) {
          this.searchNews();
        } else {
          this.fetchNews();
        }
      }
    },

    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        // 검색 결과 페이지에서는 검색 결과를 가져오도록 수정
        if (this.searchValue && this.selectedType) {
          this.searchNews();
        } else {
          this.fetchNews();
        }
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
        // 검색 결과 페이지에서는 검색 결과를 가져오도록 수정
        if (this.searchValue && this.selectedType) {
          this.searchNews();
        } else {
          this.fetchNews();
        }
      }
    },
    goToNews(newsId) {
      this.$router.push(`/newspage/${newsId}`);
    },
    sendData(){
      console.log(this.selectedType, this.searchValue)
      if (!this.selectedType || !this.searchValue) {
        alert('검색어를 입력하세요.');
      }

      console.log(this.currentPage);
      const apiUrl = `https://job-brief-mjucapstone.com/api/news/search?type=${this.selectedType}&keyword=${this.searchValue}`;
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
    searchNews() {
      console.log(this.currentPage);
      const apiUrl = `https://job-brief-mjucapstone.com/api/news/search?type=${this.selectedType}&keyword=${this.searchValue}&page=${this.currentPage}`;
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
    }

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

  .pagination{
    justify-content: center; 
    align-items: center;
  }

  .search-button{
    width: 150px;
    
  }
  
  .page-item{
    align-items: center;
  }

</style>

