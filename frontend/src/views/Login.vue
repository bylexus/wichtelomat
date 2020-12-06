<template>
    <v-container>
        <v-card>
            <v-card-title>
                <v-avatar><v-icon color="pink accent-3">fas fa-hat-wizard</v-icon></v-avatar>
                <span style="mr-2"> Willkommen beim Wichtelomat! </span>
            </v-card-title>
            <v-card-text>
                <v-form>
                    <v-text-field v-model="email" autofocus label="Email" placeholder="z.B. wichtel@alexi.ch" />
                    <v-text-field v-model="password" label="Passwort" type="password" />
                </v-form>
            </v-card-text>
            <v-card-actions>
                <v-btn link :disbled="loading" @click="showSignInDlg">registrieren</v-btn>
                <v-spacer />
                <v-btn color="primary" :disabled="!email || !password || loading" @click="login">
                    <v-icon left x-small>fas fa-sign-in-alt</v-icon>
                    Anmelden
                </v-btn>
            </v-card-actions>
        </v-card>
        <v-alert v-if="error" class="mt-3" type="error">{{ error }}</v-alert>
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
    </v-container>
</template>

<script>
import SignUpDlg from '@/views/SignUpDlg.vue';
import { apiCall } from '@/lib';

export default {
    name: 'Login',
    components: {
        SignUpDlg,
    },

    data: function () {
        return {
            email: null,
            password: null,
            signUpDlgVisible: false,
            registeredOkDlg: false,
            loading: false,
            error: false,
        };
    },
    computed: {},
    watch: {},
    methods: {
        showSignInDlg() {
            this.signUpDlgVisible = true;
        },
        async login() {
            this.error = null;
            this.loading = true;
            try {
                let res = await apiCall.post('/login', {
                    email: this.email,
                    password: this.password,
                });
                this.$store.commit('setUser', res.user);
            } catch (e) {
                this.error = e.message ? e.message : String(e);
            } finally {
                this.loading = false;
            }
        },
    },
};
</script>
