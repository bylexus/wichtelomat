<template>
    <v-app>
        <v-app-bar app color="indigo" dark>
            <h1 class="as-title">
                <v-avatar color="pink accent-3"><v-icon>fas fa-hat-wizard</v-icon></v-avatar>
                Wichtelomat <span class="as-subtitle">Würfle Deinen Wichtel!</span>
            </h1>
            <v-spacer />
            <v-btn v-if="user" icon color="primary" title="Ausloggen" @click="logout">
                <v-icon color="white">fas fa-sign-out-alt</v-icon>
            </v-btn>
        </v-app-bar>

        <v-main>
            <v-slide-x-transition mode="out-in">
                <router-view></router-view>
            </v-slide-x-transition>
        </v-main>

        <v-footer app>
            <span class="mr-1">&copy; 2020&nbsp;</span>
            <a href="mailto:alex-der-wichtel@alexi.ch">alex schenkel</a>
            <v-spacer />
            <span>V 1.0.0</span>
        </v-footer>
    </v-app>
</template>


<script>
import { apiCall } from '@/lib';

export default {
    name: 'App',
    data: () => ({}),
    computed: {
        user() {
            return this.$store.state.user;
        },
    },
    methods: {
        async logout() {
            this.error = null;
            this.loading = true;
            try {
                await apiCall.get('/logout');
                this.$store.commit('setUser', null);
                document.location.href = '/';
            } catch (e) {
                this.error = e.message ? e.message : String(e);
            } finally {
                this.loading = false;
            }
        },
    },
};
</script>

<style lang="scss" scoped>
.as-title {
    margin-bottom: 0;
}

.as-subtitle {
    font-size: 10.5pt;
}
</style>
