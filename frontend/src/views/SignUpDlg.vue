<template>
    <v-dialog :value="value" persistent>
        <v-card>
            <v-card-title>Registrieren</v-card-title>
            <v-card-text>
                <v-form v-model="valid">
                    <p>
                        Hallo, Wichtelmeister! Registriere dich mit deiner Email, damit du den Wichtelomat nutzen
                        kannst.
                        <br />
                        Wir verwenden deine Email ausschliesslich für den Login. Sie wird nicht weitergegeben oder
                        anderweitig verwendet.
                    </p>
                    <v-text-field
                        v-model="signInEmail"
                        :rules="[rules.email]"
                        type="email"
                        label="Deine Email"
                        placeholder="z.B. master@eleves.com"
                    >
                    </v-text-field>
                </v-form>
            </v-card-text>
            <v-card-actions>
                <v-btn text @click="$emit('input', false)">schliessen</v-btn>
                <v-btn color="primary" :disabled="!valid || loading" @click="onSignInRequest">registrieren</v-btn>
            </v-card-actions>
            <v-card-text v-if="error">
                <v-alert type="error">{{ error }}</v-alert>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
import { apiCall } from '@/lib';

let emailRe = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default {
    name: 'SignUpDlg',
    components: {},
    props: {
        value: {
            type: Boolean,
            default: false,
        },
    },
    data: function () {
        return {
            valid: false,
            loading: false,
            signInEmail: null,
            error: null,
            rules: {
                email: (value) => {
                    return emailRe.test(value) || 'Ungültige Email';
                },
            },
        };
    },
    computed: {},
    watch: {},
    methods: {
        async onSignInRequest() {
            this.error = null;
            this.loading = true;
            try {
                await apiCall.post('/register', {
                    email: this.signInEmail,
                });
                this.$emit('registered');
                this.$emit('input', false);
            } catch (e) {
                this.error = e.message ? e.message : String(e);
            } finally {
                this.loading = false;
            }
        },
    },
};
</script>
