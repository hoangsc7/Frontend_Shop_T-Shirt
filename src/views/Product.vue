<template>
  <div class="page-product">
    <div class="columns is-multiline">
      <div class="column is-6 custom-h">
        <figure class="images mb-6">
          <img :src="product.get_image" alt="not" />
        </figure>
      </div>

      <div class="column is-5">
        <h1 class="title">{{ product.name }}</h1>
        <p>{{ product.description }}</p>

        <h2 class="subtitle">Information</h2>
        <p><strong>Price:</strong> ${{ product.price }}</p>

        <div class="field has-addons mt-6">
          <div class="control">
            <input class="input" type="number" min="1" v-model="quantity" />
          </div>

          <div class="control">
            <div class="button is-dark" @click="addToCart">Add to Cart</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { toast } from "bulma-toast";

export default {
  name: "Product",
  data() {
    return {
      product: {},
      quantity: 1,
    };
  },
  mounted() {
    this.getProduct();
  },
  methods: {
    getProduct() {
      this.$store.commit("setIsLoading", true);

      const category_slug = this.$route.params.category_slug;
      const product_slug = this.$route.params.product_slug;

      axios
        .get(`/api/v1/products/${category_slug}/${product_slug}/`)
        .then((response) => {
          this.product = response.data;

          document.title = this.product.name + " | T-Shirt Shop";
        })
        .catch((error) => {
          console.log(error);
        });

      this.$store.commit("setIsLoading", false);
    },
    addToCart() {
      if (isNaN(this.quantity) || this.quantity < 1) {
        this.quantity = 1;
      }

      const item = {
        product: this.product,
        quantity: this.quantity,
      };

      this.$store.commit("addToCart", item);

      toast({
        message: "Added to cart",
        type: "is-success",
        dismissible: true,
        pauseOnHover: true,
        duration: 2000,
        position: "bottom-right",
      });
    },
  },
};
</script>
<style>
.images {
  height: 700px;
  width: 700px;
}
.custom-h {
  height: 724.4px;
}
</style>
