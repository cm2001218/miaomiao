<template>
  <div id="detailContainer">
    <Header title="影片详情">
      <i class="fas fa-arrow-left" @click="handleToBack"></i>
    </Header>
    <Loading v-if="isLoading"></Loading>
    <div v-else id="content" class="contentDetail">
      <div class="detail_list">
        <div class="detail_list_bg" :style="{ 'background-image': `url(${detailMovie.poster})` }"></div>
        <div class="detail_list_filter"></div>
        <div class="detail_list_content">
          <div class="detail_list_img">
            <img :src="detailMovie.poster" alt="poster" />
          </div>
          <div class="detail_list_info">
            <h2>{{ detailMovie.name }}</h2>
            <p>{{ detailMovie.runtime }} mins</p>
            <p>{{ detailMovie.filmType.name }} / {{ detailMovie.category }}</p>
            <p>Nation:{{ detailMovie.nation }}</p>
          </div>
        </div>
      </div>
      <div class="detail_intro">
        <p>
          {{ detailMovie.synopsis }}
        </p>
      </div>
      <div class="detail_player swiper-container">
        <ul class="swiper-wrapper">
          <li class="swiper-slide" v-for="(item, index) in detailMovie.photos" :key="index">
            <div>
              <img :src="item | setWH('140.127')" alt="photo" />
            </div>
            <!-- <p>陈建斌</p>
            <p>马先勇</p> -->
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header";

import Swiper from "swiper";
import "swiper/swiper-bundle.css";

export default {
  name: "detail",
  data() {
    return {
      detailMovie: {},
      isLoading: true,
    };
  },
  components: {
    Header,
  },
  props: ["filmId"],
  methods: {
    handleToBack() {
      this.$router.back();
    },
  },
  mounted() {
    // console.log(this.$route);
    // console.log(this.$router);
    // console.log(this.filmId);
    this.axios({
      url: `https://m.maizuo.com/gateway?filmId=${this.$route.params.filmId}&k=4359832`,
      headers: {
        "X-Client-Info": '{"a":"3000","ch":"1002","v":"5.0.4","e":"15610855429195524981146"}',
        "X-Host": "mall.film-ticket.film.info",
      },
    }).then((res) => {
      // console.log(res.data);
      this.detailMovie = res.data.data.film;
      this.isLoading = false;
      console.log(this.detailMovie);
      this.$nextTick(() => {
        new Swiper(".swiper-container", {
          slidesPerView: "auto",
          freeMode: true,
          freeModeSticky: true,
        });
      });
    });
  },
};
</script>

<style lang="scss" scoped>
#detailContainer {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 100;
  width: 100%;
  min-height: 100%;
  background: white;
}

#content.contentDetail {
  display: block;
  margin-bottom: 0;
}
#content .detail_list {
  height: 200px;
  width: 100%;
  position: relative;
  overflow: hidden;
}
.detail_list .detail_list_bg {
  width: 100%;
  height: 100%;
  background: 0 40%;
  filter: blur(5px);
  background-size: cover;
  position: absolute;
  left: 0;
  top: 0;
}
.detail_list .detail_list_filter {
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: #40454d;
  opacity: 0.55;
  left: 0;
  top: 0;
  z-index: 1;
}
.detail_list .detail_list_content {
  display: flex;
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 2;
}
.detail_list .detail_list_img {
  width: 108px;
  height: 150px;
  border: solid 1px #f0f2f3;
  margin: 20px;
}
.detail_list .detail_list_img img {
  width: 100%;
  height: 100%;
}
.detail_list .detail_list_info {
  margin-top: 20px;
}
.detail_list .detail_list_info h2 {
  font-size: 20px;
  color: white;
  font-weight: normal;
  line-height: 40px;
}
.detail_list .detail_list_info p {
  color: white;
  line-height: 20px;
  font-size: 14px;
  color: #ccc;
}
#content .detail_intro {
  padding: 10px;
}
#content .detail_player {
  margin: 20px;
}
.detail_player .swiper-slide {
  width: 70px;
  margin-right: 20px;
  text-align: center;
  font-size: 14px;
}
.detail_player .swiper-slide img {
  width: 100%;
  margin-bottom: 5px;
}
.detail_player .swiper-slide p:nth-of-type(2) {
  color: #999;
}
</style>
