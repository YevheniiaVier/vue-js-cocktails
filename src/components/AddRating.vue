<template>
  <section class="rating">
    <div class="logo">
      <img src="/star-filled.svg" alt="star" />
      <h1>How do you like this drink?</h1>
    </div>

    <form name="select-rating" class="select-rating" @submit.prevent="onSubmit">
      <fieldset class="fields">
        <div v-for="value in values" :key="value" class="form-group">
          <input
            @change="onChange"
            type="radio"
            name="rating"
            :id="value"
            :value="value"
            v-model="rating"
          />
          <label :for="value">{{ value }}</label>
        </div>
      </fieldset>

      <button class="rating__btn" type="submit" title="submit review">
        Add value
      </button>
    </form>
  </section>
</template>

<script setup>
import { addRating } from '@/services/cocktails-api';
import { ref } from 'vue';

const rating = ref(1);
const emit = defineEmits(['on-close', 'update-rating']);

const props = defineProps({
  values: {
    type: Number,
    default: 5,
  },
  drinkId: {
    type: String,
    required: true,
  },
});

const onChange = e => {
  rating.value = e.target.value;
};
const onSubmit = async () => {
  try {
    await addRating(props.drinkId, rating.value);
    emit('update-rating');
  } catch (error) {
    console.log(error);
  }
  emit('on-close');
};
</script>

<style lang="scss" scoped>
@import '../assets/scss';
.rating {
  padding: 20px;
  display: flex;
  flex-direction: column;
  background-color: #ffffff5f;
  width: 70%;
  align-items: center;
}
.logo {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}
.select-rating {
  text-align: center;
}
.rating__btn {
  margin-top: 15px;
}
.form-group {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.fields {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
