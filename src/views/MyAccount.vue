<template>
  <div class="page-my-account">
    <div class="columns is-multiline">
      <div class="column is-12">
        <div class="title">My account</div>
      </div>

      <div class="column is-12">
        <button class="button is-danger" @click="logout()">Log out</button>
      </div>

      <hr />

      <div class="column is-12">
        <h2 class="subtitle">My orders</h2>

        <OrderSummary
          v-for="order in orders"
          v-bind:key="order.id"
          v-bind:order="order"
        />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

import OrderSummary from "@/components/OrderSummary.vue";

export default {
  name: "MyAccount",
  components: {
    OrderSummary,
  },
  data() {
    return {
      orders: [],
    };
  },

  mounted() {
    document.title = "My account | Shop T-Shirt";

    this.getMyOrders();
  },
  methods: {
    logout() {
      axios.defaults.headers.common["Authorization"] = null;

      localStorage.removeItem("token");
      localStorage.removeItem("username");
      localStorage.removeItem("userid");

      this.$store.commit("removeToken");

      this.$router.push("/");
    },

    async getMyOrders() {
      this.$store.commit("setIsLoading", true);

      console.log("Token from store:", this.$store.state.token);

      await axios
        .get("/api/v1/orders/", {
          headers: {
            Authorization: `Token ${this.$store.state.token}`,
          },
        })
        .then((response) => {
          console.log(response.data);
          this.orders = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
      this.$store.commit("setIsLoading", false);
    },
    updateProfile() {
      // Logic to update user profile
    },
  },
};
</script>

<style lang="scss" scoped></style>
