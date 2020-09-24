<template>
  <div class="cinema_body">
    <!-- <Loading v-if="isLoading"></Loading> -->
    <div class="search_body">
      <div class="search_input">
        <div class="search_input_wrapper">
          <i class="iconfont icon-sousuo"></i>
          <input type="text" @keyup.enter="handleChange" ref="searchInput" />
        </div>
      </div>
    </div>
    <Scroller v-if="isShow">
      <ul>
        <li v-for="(cinema, index) in filteredList" :key="index">
          <div>
            <span>{{ cinema.name }}</span>
            <span class="q">
              <span class="price">￥{{ cinema.lowPrice | filterPrice }}</span>
            </span>
          </div>
          <div class="address">
            <span>{{ cinema.address }}</span>
            <!-- <span>{{ cinema.Distance }}</span> -->
          </div>
          <div class="card">
            <div>小吃</div>
            <div>折扣卡</div>
          </div>
        </li>
      </ul>
    </Scroller>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cinemaList: [],
      filteredList: [],
      // isLoading: true,
      preCityId: -1,
      isShow: true,
    };
  },
  mounted() {
    // console.log("mounted", this.preCityId);
  },

  filters: {
    filterPrice(price) {
      return (price / 100).toFixed(1);
    },
  },

  activated() {
    this.isShow = false;
    this.$refs.searchInput.value = "";
    // console.log("activated", this.preCityId);
    let cityId = this.$store.state.city.id;
    let name = this.$store.state.city.name;
    console.log(name);
    if (this.preCityId === cityId) {
      return;
    }
    this.axios({
      url: `https://m.maizuo.com/gateway?cityId=${cityId}&ticketFlag=1&k=2443279`,
      headers: {
        "X-Client-Info":
          '{"a":"3000","ch":"1002","v":"5.0.4","e":"15610855429195524981146"}',
        "X-Host": "mall.film-ticket.cinema.list",
      },
    }).then((res) => {
      console.log(res.data.data);
      this.preCityId = cityId;
      // console.log(this.preCityId);
      this.cinemaList = res.data.data.cinemas;

      // this.filteredList = this.cinemaList.filter(
      //   (item) => item.address.indexOf(keyWord) > -1
      // );
      // console.log(this.filteredList);
    });
  },
  methods: {
    handleChange() {
      this.isShow = true;
      console.log(this.$refs.searchInput.value);
      let keyWord = this.$refs.searchInput.value;
      this.filteredList = this.cinemaList.filter(
        (item) => item.address.indexOf(keyWord) > -1
      );

      console.log(this.filteredList);
    },
  },
};
</script>

<style lang="scss" scoped>
#content .search_body {
  position: absolute;
  left: 0;
  top: 45px;
  // z-index: 99;
  width: 100%;
  flex: 1;
  overflow: auto;
}
.search_body .search_input {
  padding: 10px 10px;
  background-color: #f5f5f5;
  border-bottom: 1px solid #e5e5e5;
}
.search_body .search_input_wrapper {
  padding: 0 10px;
  border: 1px solid #e6e6e6;
  border-radius: 5px;
  background-color: #fff;
  display: flex;
  line-height: 20px;
}
.search_body .search_input_wrapper i {
  font-size: 16px;
  padding: 4px 0;
}
.search_body .search_input_wrapper input {
  border: none;
  font-size: 13px;
  color: #333;
  padding: 4px 0;
  outline: none;
  margin-left: 5px;
  width: 100%;
}

#content .cinema_body {
  margin-top: 70px;
  flex: 1;
  overflow: auto;
}
.cinema_body ul {
  padding: 20px;
}
.cinema_body li {
  border-bottom: 1px solid #e6e6e6;
  margin-bottom: 20px;
}
.cinema_body div {
  margin-bottom: 10px;
}
.cinema_body .q {
  font-size: 11px;
  color: #f03d37;
}
.cinema_body .price {
  font-size: 18px;
}
.cinema_body .address {
  font-size: 13px;
  color: #666;
}
.cinema_body .address span:nth-of-type(2) {
  float: right;
}
.cinema_body .card {
  display: flex;
}
.cinema_body .card div {
  padding: 0 3px;
  height: 15px;
  line-height: 15px;
  border-radius: 2px;
  color: #f90;
  border: 1px solid #f90;
  font-size: 13px;
  margin-right: 5px;
}
.cinema_body .card div.or {
  color: #f90;
  border: 1px solid #f90;
}
.cinema_body .card div.bl {
  color: #589daf;
  border: 1px solid #589daf;
}
</style>
