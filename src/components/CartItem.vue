<template>
  <tr>
    <td>
      <router-link :to="item.product.get_absolute_url">{{
        item.product.name
      }}</router-link>
    </td>
    <td>${{ item.product.price }}</td>
    <td>
      <a @click="decrementQuantity(item)">-</a>
      {{ item.quantity }}
      <a @click="incrementQuantity(item)">+</a>
    </td>
    <td>${{ getItemTotal(item).toFixed(2) }}</td>
    <td><button class="delete" @click="removeFromCart(item)"></button></td>
  </tr>
</template>

<script>
export default {
  name: "CartItem",
  props: {
    initialItem: Object,
  },
  data() {
    return {
      item: this.initialItem || {},
    };
  },
  mounted() {
    console.log("CartItem received item:", this.item);
  },

  methods: {
    getItemTotal(item) {
      return item.product.price * item.quantity;
    },
    decrementQuantity(item) {
      item.quantity--;

      if (item.quantity === 0) {
        this.$emit("removeFromCart", item);
      }

      this.updateCart();
    },
    incrementQuantity(item) {
      item.quantity++;
      this.updateCart();
    },
    updateCart() {
      localStorage.setItem("cart", JSON.stringify(this.$store.state.cart));
    },
    removeFromCart(item) {
      this.$emit("removeFromCart", item);
      this.updateCart();
    },
  },
};
</script>

<style lang="scss" scoped></style>
