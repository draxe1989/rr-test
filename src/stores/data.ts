import {ref, computed, reactive, watch} from 'vue'
import { defineStore } from 'pinia'

import type { Flat } from '@/mock';
import mockData from '@/mock'

type Filters = {
  objectName: string,
  rooms: string,
  areaFrom: number,
  areaTo: number,
  priceFrom: number,
  priceTo: number,
  liter: string,
  priceAsc: boolean | null,
  squareAsc: boolean | null,
}

export const useDataStore = defineStore('data', () => {
  const data = ref<Flat[]>([])

  data.value = mockData

  const filters = reactive<Filters>({
    objectName: '',
    rooms: '',
    areaFrom: 0,
    areaTo: 0,
    priceFrom: 0,
    priceTo: 0,
    liter: '',
    priceAsc: true,
    squareAsc: true,
  })

  const objects = computed(() => {
    return data.value.reduce((acc: string[], item) => {
      if (acc.includes(item.objectName)) {
        return acc
      } else {
        return [...acc, item.objectName]
      }
    }, [])
  })

  const square = computed(() => {
    const sortarr = data.value.sort((a, b) => +a.area - +b.area)
    return { from: +sortarr[0].area, to: +sortarr[sortarr.length - 1].area }
  })
  const price = computed(() => {
    const sortarr = data.value.sort((a, b) => {
      const numA = +a.price.replace(/\s/g, '');
      const numB = +b.price.replace(/\s/g, '');
      return numA - numB
    })
    return { from: +sortarr[0].price.replace(/\s/g, ''), to: +sortarr[sortarr.length - 1].price.replace(/\s/g, '') }
  })

  const corpuses = computed(() => {
    return data.value.reduce((acc: string[], item) => {
      if (acc.includes(item.literNum)) {
        return acc
      } else {
        return [...acc, item.literNum]
      }
    }, [])
  })

  const filteredData = computed(() => {
    const filtered = data.value.filter(item => {

      const objName = (filters.objectName ? item.objectName === filters.objectName : true)
      const shortTitle = (filters.rooms[0] ? item.shortTitle[0] === filters.rooms : true)
      const areaFrom = (filters.areaFrom ? +item.area >= filters.areaFrom : true)
      const areaTo = (filters.areaTo ? +item.area <= filters.areaTo : true)
      const priceFrom = (filters.priceFrom ? +item.price.replace(/\s/g, '') >= filters.priceFrom : true)
      const priceTo = (filters.priceTo ? +item.price.replace(/\s/g, '') <= filters.priceTo : true)
      const liter = (filters.liter ? item.literNum === filters.liter : true)

      return objName && shortTitle && areaFrom && areaTo && priceFrom && priceTo && liter

    })

    if (filters.squareAsc === null) {
      if (filters.priceAsc) {
        return filtered.sort((a, b) => {
          const numA = +a.price.replace(/\s/g, '');
          const numB = -b.price.replace(/\s/g, '');
          return numA - numB
        })
      } else {
        return filtered.sort((a, b) => {
          const numA = +a.price.replace(/\s/g, '');
          const numB = -b.price.replace(/\s/g, '');
          return numB - numA
        })
      }
    } else if (filters.priceAsc === null) {
      if (filters.squareAsc) {
        return filtered.sort((a, b) => +a.area - +b.area)
      } else {
        return filtered.sort((a, b) => +b.area - +a.area)
      }
    } else return filtered
  })


  function setObjectFilter(obj: string) {
    filters.objectName = obj
  }
  function setCorpusFilter(corp: string) {
    filters.liter = corp
  }
  function setRoomsFilter(rooms: string) {
    filters.rooms = rooms
  }
  function setAreaFilter(areas: { from: number, to: number }) {
    filters.areaFrom = areas.from
    filters.areaTo = areas.to
  }
  function setPriceFilter(areas: { from: number, to: number }) {
    filters.priceFrom = areas.from
    filters.priceTo = areas.to
  }

  function setPriceSort(payload: boolean) {
    filters.priceAsc = payload
    filters.squareAsc = null
  }

  function setAreaSort(payload: boolean) {
    filters.squareAsc = payload
    filters.priceAsc = null
  }
  const itemsOnPage = 8
  const currentPage = ref(0)

  const getCurrentPageData = computed(() => {
    return filteredData.value.slice(currentPage.value * itemsOnPage, (currentPage.value + 1) * itemsOnPage)
  })
  const getPaginationButtons = computed(() => {
    const arr = []
    for (let index = 0; index < filteredData.value.length / itemsOnPage; index++) {
      arr.push({ name: index + 1, value: index })
    }
    return arr
  })

  function setPaginationNumber(payload: number) {
    currentPage.value = payload
  }

  watch(filters, ()=>{
    currentPage.value = 0
  })

  return {
    data,
    objects,
    square,
    filters,
    price,
    corpuses,

    filteredData,



    setObjectFilter,
    setCorpusFilter,
    setRoomsFilter,
    setAreaFilter,
    setPriceFilter,
    setPriceSort,
    setAreaSort,

    currentPage,
    getCurrentPageData,
    getPaginationButtons,
    setPaginationNumber,
  }
})
