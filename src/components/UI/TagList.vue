<template>
    <div ref="tagListRef" class="tag-parent">
        <div class="tag" v-for="t in visibleTags.visible">{{ t }}</div>
        <div class="tag last" v-if="visibleTags.hidden.length">+{{visibleTags.hidden.length}}
            <div class="popup">
                <div v-for="t in visibleTags.hidden">{{t}}</div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>

import {onMounted, ref} from "vue";

type Tags = {visible: string[], hidden: string[]}

const props = defineProps<{
    tags: string[]
}>()

const tagListRef = ref()

const visibleTags = ref<Tags>({visible: [], hidden: []})

onMounted(()=>{
   visibleTags.value = props.tags.reduce((ac, item)=>{
       if ([...ac.visible].join('').length >=10) {
           return {...ac, hidden: [...ac.hidden, item]}
       } else {
           return {...ac, visible: [...ac.visible, item]}
       }
   }, {visible: [], hidden: []} as Tags )

})


</script>

<style scoped>
.tag {
    padding: 6px 10px;
    background-color: #e5f3ff;
    border-radius: 999px;
    color: #224e9c;
    font-size: 12px;
    white-space: nowrap;
}
.tag-parent {
    position: relative;
}
.popup {
    transition: all .2s;
    pointer-events: none;
    opacity: 0;
    position: absolute;
    top: 100%;
    right: 0;
    margin-top: 6px;

    padding: 6px 10px;
    background-color: #e5f3ff;
    border-radius: 15px;
    color: #224e9c;
    z-index: 100;
}
.popup>div{
    margin-bottom: 6px;
}
.tag.last:hover .popup {
    opacity: 1;
}
</style>