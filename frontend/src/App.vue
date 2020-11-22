<template>
    <v-app>
        <v-app-bar app color="indigo" dark>
            <h1 class="as-title">
                <v-avatar color="pink accent-3"><v-icon>fas fa-hat-wizard</v-icon></v-avatar>
                Wichtelomat <span class="as-subtitle">Würfle Deinen Wichtel!</span>
            </h1>
            <v-spacer />
            <v-btn v-if="$route.meta.hideSignUp !== true" @click="showSignInDlg">registrieren</v-btn>
        </v-app-bar>

        <v-main>
            <router-view></router-view>
        </v-main>

        <v-footer app>
            <span class="mr-1">&copy; 2020&nbsp;</span>
            <a href="mailto:alex-der-wichtel@alexi.ch">alex schenkel</a>
            <v-spacer />
            <span>V 1.0.0</span>
        </v-footer>

        <SignUpDlg v-model="signUpDlgVisible" @registered="registeredOkDlg = true" />
        <v-dialog v-model="registeredOkDlg" persistent>
            <v-card>
                <v-card-title>Registrierung erfolgt!</v-card-title>
                <v-card-text>
                    Du bekommst in den nächsten Minuten ein Email mit einem Registrierungs-Link.
                </v-card-text>
                <v-card-actions>
                    <v-btn color="primary" @click="registeredOkDlg = false">ok!</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-app>
</template>


<script>
import SignUpDlg from '@/views/SignUpDlg.vue';

export default {
    name: 'App',
    components: {
        SignUpDlg,
    },

    data: () => ({
        signUpDlgVisible: false,
        registeredOkDlg: false,
    }),
    methods: {
        showSignInDlg() {
            this.signUpDlgVisible = true;
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
