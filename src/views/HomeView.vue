<template>
  <div class="home">
    <section class="hero is-medium is-dark mb-6">
      <div class="hero-body is-text-centered">
        <p class="title mb-6">Welcome to T-Shirt Shop</p>
        <p class="subtitle">The best shirt shop online</p>
      </div>
    </section>

    <div class="columns is-multiline">
      <div class="column is-12">
        <h2 class="is-size-2 has-text-centered">Latest Products</h2>
      </div>

      <ProductBox
        v-for="product in latestProducts"
        v-bind:key="product.id"
        v-bind:product="product"
      />
    </div>
  </div>
</template>

<script>
import axios from "axios";

import ProductBox from "@/components/ProductBox.vue";
import Category from "./Category.vue";

export default {
  name: "Home",
  data() {
    return {
      latestProducts: [],
    };
  },
  components: {
    ProductBox,
  },
  mounted() {
    this.getLatestProducts();

    document.title = "Home | T-Shirt Shop";
  },
  methods: {
    getLatestProducts() {
      axios
        .get(`/api/v1/latest-products/`)
        .then((response) => {
          this.latestProducts = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
