<template>
  <div class="column is-3">
    <div class="box product-box">
      <figure class="image mb-2">
        <img :src="product.get_thumbnail" class="product-image" />
      </figure>

      <h3 class="is-size-6">{{ product.name }}</h3>
      <p class="is-size-6 has-text-grey">${{ product.price }}</p>

      <router-link
        class="button is-dark mt-4"
        v-bind:to="product.get_absolute_url"
      >
        View details
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductBox",
  props: {
    product: Object,
  },
};
</script>

<style scoped>
.product-box {
  height: 500px; /* Đặt chiều cao cố định cho hộp sản phẩm */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.product-image {
  max-height: 300px; /* Đặt chiều cao tối đa cho hình ảnh */
  object-fit: cover; /* Đảm bảo hình ảnh không làm thay đổi kích thước của hộp */
  width: 100%;
}

.image {
  margin-top: -1.25rem;
  margin-left: -1.25rem;
  margin-right: -1.25rem;
}
</style>
