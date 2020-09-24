<template>
  <div class="cinema_body">
    <Loading v-if="isLoading"></Loading>
    <Scroller v-else>
      <ul>
        <li v-for="(cinema, index) in cinemaList" :key="index">
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
// import Vue from "vue";
// Vue.filter("filterPrice", (price) => {
//   return (price / 100).toFixed(1);
// });
export default {
  name: "CiList",
  data() {
    return {
      cinemaList: [],
      isLoading: true,
      preCityId: -1,
    };
  },
  filters: {
    filterPrice(price) {
      return (price / 100).toFixed(1);
    },
    formatCard(key) {
      var card = [
        { key: "allowRefund", value: "改签" },
        { key: "endorse", value: "退" },
        { key: "sell", value: "折扣卡" },
        { key: "snack", value: "小吃" },
      ];
      for (var i = 0; i < card.length; i++) {
        if (card[i].key === key) {
          return card[i].value;
        }
      }
      return "";
    },
    classCard(key) {
      var card = [
        { key: "allowRefund", value: "bl" },
        { key: "endorse", value: "bl" },
        { key: "sell", value: "or" },
        { key: "snack", value: "or" },
      ];
      for (var i = 0; i < card.length; i++) {
        if (card[i].key === key) {
          return card[i].value;
        }
      }
      return "";
    },
  },
  activated() {
    let cityId = this.$store.state.city.id;
    let name = this.$store.state.city.name;
    if (this.preCityId === cityId) {
      return;
    }
    this.isLoading = true;
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
      this.cinemaList = res.data.data.cinemas;
      this.isLoading = false;
    });
  },
};
</script>

<style lang="scss" scoped>
#content .cinema_body {
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
