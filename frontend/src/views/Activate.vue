<template>
    <v-container>
        <v-card>
            <v-card-title>
                <v-avatar> <v-icon color="black">fas fa-gifts</v-icon> </v-avatar>Aktivierung Deines Logins
            </v-card-title>

            <v-card-text>
                <v-form v-model="valid">
                    <v-text-field v-model="activationHash" label="Aktivierungs-Code" />
                    <v-text-field
                        v-model="password"
                        type="password"
                        label="Dein Passwort"
                        :rules="[rules.minLength(3)]"
                    />
                    <v-text-field v-model="password2" type="password" label="Passwort-Bestätigung" />
                </v-form>
            </v-card-text>

            <v-card-actions>
                <v-spacer />
                <v-btn color="primary" :loading="loading" :disabled="!formCheck()" @click.stop="activate">
                    <v-icon left>fas fa-check</v-icon>
                    Aktiviere mich!
                </v-btn>
            </v-card-actions>
            <v-card-text v-if="error">
                <v-alert type="error">{{ error }}</v-alert>
            </v-card-text>
        </v-card>
        <v-dialog v-model="activationOkDlg" persistent>
            <v-card>
                <v-card-title>Aktivierung erfolgt!</v-card-title>
                <v-card-text> Hallo, {{email}}! Du kannst dich nun mit deinem Login anmelden. </v-card-text>
                <v-card-actions>
                    <v-btn color="primary" @click="redirectToLogin">zum Login</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script>
import { apiCall } from '@/lib';
export default {
    name: 'Activate',
    components: {},
    beforeRouteUpdate(to, from, next) {
        console.log(to.params);
        this.activationHash = to.params.activationHash || null;
        next();
    },
    data: function () {
        return {
            activationOkDlg: false,
            activationHash: null,
            loading: false,
            error: null,
            password: null,
            password2: null,
            email: null,
            valid: false,
            rules: {
                minLength: (len) => (value) => ((value || '').length >= len ? true : `mind. ${len} Zeichen`),
            },
        };
    },
    computed: {},
    watch: {},
    mounted() {
        this.activationHash = this.$route.params.activationHash || null;
    },

    methods: {
        formCheck() {
            return this.activationHash && this.valid && this.password === this.password2;
        },
        async activate() {
            this.error = null;
            this.loading = true;
            this.email = null;
            try {
                let ret = await apiCall.post('/activate', {
                    activationHash: this.activationHash,
                    password: this.password,
                });
                this.email = ret.email;
                this.activationOkDlg = true;
            } catch (e) {
                this.error = e.message ? e.message : String(e);
            } finally {
                this.loading = false;
            }
        },
        redirectToLogin() {
            this.activationOkDlg = false;
        },
    },
};
</script>
