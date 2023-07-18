<!-- <template>
  <div>
    <ul ref="el" class="cocktails__list">
      <li v-for="cocktail in cocktails" >{{ cocktail.strDrink }}</li>
    </ul>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import CocktailItem from './cocktails/CocktailItem.vue';
import { getCocktailsByLetter } from '../services/cocktails-api';
import { useRoute } from 'vue-router';
import { useInfiniteScroll } from '@vueuse/core';
const route = useRoute();

const el = ref<HTMLElement | null>(null)
const page = ref(1);
const letter = computed(() =>
  route.params.letter ? route.params.letter : 'A'
);
const cocktails = ref([]);

const getDrinksOnScroll = async () => {
  page.value += 1;
  const { drinks } = await getCocktailsByLetter(letter.value, page.value);
  if (drinks.length > 0) {
    cocktails.value.push(...drinks);
  } else {
    console.log('no more cocktails')
  }
};

onMounted(async () => {
  console.log('letter.value', letter.value);
  console.log('page.value', page.value);
  const { drinks } = await getCocktailsByLetter(letter.value, page.value);
  cocktails.value.push(...drinks);
  console.log('cocktails.value', cocktails.value);
  //   setEmptyResult();
});

useInfiniteScroll(
  el,
  async () => {
    await getDrinksOnScroll();
  },
  { distance: 10 }
);
</script>

<style lang="scss" scoped>
.cocktails {
  &__list {
    background-color: green;
    max-height: 150px;
    overflow: scroll;
    margin-top: 25px;
    padding: 12px 20px;
    /* display: grid; */
    /* grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); */
    /* grid-gap: 25px; */
    /* justify-items: center; */
    /* place-items: center; */
  }
  li {
    padding: 12px 0;
    color: red;
    font-size: 18px;
  }
}
</style> -->
