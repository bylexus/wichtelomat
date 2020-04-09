<template>
    <v-app>
        <v-app-bar app color="indigo" dark>
            <h1 class="as-title">
                <v-avatar color="pink accent-3"><v-icon>fas fa-hat-wizard</v-icon></v-avatar>
                Wichtelomat <span class="as-subtitle">Würfle Deinen Wichtel!</span>
            </h1>
        </v-app-bar>

        <v-content>
            <Home />
        </v-content>

        <v-footer app>
            <span class="mr-1">&copy; 2020&nbsp;</span>
            <a href="mailto:alex-der-wichtel@alexi.ch">alex schenkel</a>
            <v-spacer />
            <span>V 2.1.0</span>
        </v-footer>
    </v-app>
</template>

<script>
import Home from '@/views/Home.vue';
export default {
    name: 'App',

    components: {
        Home
    },

    data: () => ({
        //
    })
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
