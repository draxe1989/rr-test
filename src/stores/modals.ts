import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Flat } from '@/mock'

export const useModalsStore = defineStore('modals', () => {
    const infoModalIsOpen = ref(false)
    const finalModalIsOpen = ref(false)

    const modalData = ref<Flat>()

    function openInfoModal(data: Flat) {
        modalData.value = data
        infoModalIsOpen.value = true
        document.body.style.overflow = "hidden"
    }
    function closeInfoModal() {
        modalData.value = undefined
        infoModalIsOpen.value = false
        document.body.style.overflow = "auto"
    }
    function openFinalModal() {
        finalModalIsOpen.value = true
        document.body.style.overflow = "hidden"
    }
    function closeFinalModal() {
        finalModalIsOpen.value = false
        document.body.style.overflow = "auto"
    }

    return {
        infoModalIsOpen,
        finalModalIsOpen,
        modalData,

        openInfoModal,
        openFinalModal,
        closeFinalModal,
        closeInfoModal

    }
})
