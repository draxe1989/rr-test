<template>
  <AppHeader>
  </AppHeader>
  <main>
    <AppFilters />
    <AppControls />
    <AppCardList/>
    <AppPaginator />
  </main>

        <ChoiceModal  />

  <AppFinalModal />

</template>
<script setup lang="ts">
import {
  AppHeader,
  AppFilters,
  AppCardList,
  AppControls,
} from "./components/components";
import { AppFinalModal, ChoiceModal } from "@/components/AppModals/modals";
import {AppPaginator} from "@/components/UI/ui";

</script>

