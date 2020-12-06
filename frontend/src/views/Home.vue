<template>
    <HomeAuth v-if="user" />
    <Login v-else />
</template>

<script>
import HomeAuth from '@/views/HomeAuth.vue';
import Login from '@/views/Login.vue';
export default {
    name: 'HomeGuest',
    components: {
        HomeAuth,
        Login,
    },
    data: function () {
        return {};
    },
    computed: {
        user() {
            return this.$store.state.user;
        },
    },
    watch: {},
    methods: {},
};
</script>
