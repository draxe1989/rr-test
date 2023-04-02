import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useViewStore = defineStore('view', () => {
  const isCards = ref(true)

  function setIsCards(payload: boolean) {
    isCards.value = payload
  }

  const dataViewName = computed(() => {
    return isCards.value ? 'grid' : 'row'
  })

  return {
    isCards,
    setIsCards,
    dataViewName
  }
})
