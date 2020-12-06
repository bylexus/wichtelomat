<template>
    <v-container>
        <v-alert v-if="error" type="error">{{ error }}</v-alert>
        <v-card>
            <v-card-title>
                <v-avatar>
                    <v-icon color="black">fas fa-gifts</v-icon>
                </v-avatar>
                <v-badge bordered overlap offset-x="0" offset-y="10" color="primary" :content="anlaesse.length">
                    Deine Anlässe
                </v-badge>
                <v-spacer />
                <v-btn color="primary" fab small @click="onNewAnlassClick">
                    <v-icon color="white">fas fa-plus</v-icon>
                </v-btn>
            </v-card-title>
            <v-card-subtitle>Hier findest Du alle Deine Wichtel-Anlässe.</v-card-subtitle>
            <v-card-text>
                <v-row>
                    <v-col v-for="anlass in anlaesse" :key="anlass.id" cols="12" sm="6" md="4">
                        <v-card
                            color="yellow lighten-5"
                            :to="{ name: 'anlass', params: { id: anlass.id } }"
                            hover
                            style="position: relative"
                        >
                            <v-btn icon x-small absolute top right @click.prevent="removeAnlass(anlass.id)">
                                <v-icon x-small>fas fa-times</v-icon>
                            </v-btn>
                            <v-card-title>
                                <v-icon color="yellow darken-1" small>fas fa-star</v-icon>
                                <span class="ml-2">{{ anlass.title }}</span>
                            </v-card-title>
                            <v-card-subtitle v-if="anlass.subtitle">{{ anlass.subtitle }}</v-card-subtitle>
                            <v-card-text>
                                <ul>
                                    <li>Anlass am: {{ anlass.event_date }}</li>
                                </ul>
                            </v-card-text>
                        </v-card>
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>
        <v-dialog v-model="showDelConfirmDlg" persistent>
            <v-card>
                <v-card-title>Anlass löschen</v-card-title>
                <v-card-text> Willst Du diesen Anlass wirklich löschen? Alle Daten darin gehen verloren. </v-card-text>
                <v-card-actions>
                    <v-spacer />
                    <v-btn text @click="showDelConfirmDlg = false">Nein!</v-btn>
                    <v-btn color="primary" @click="delSelectedEvent">Ja!</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    name: 'HomeAuth',
    components: {},
    beforeRouteUpdate(to, from, next) {
        this.initiateAnlassLoad();
    },
    data: function () {
        return {
            loading: false,
            error: null,
            showDelConfirmDlg: false,
            eventToDelete: null,
        };
    },
    computed: {
        anlaesse() {
            return this.$store.state.anlaesse;
        },
    },
    mounted() {
        this.initiateAnlassLoad();
    },
    methods: {
        ...mapActions(['newAnlass', 'loadAnlaesse', 'deleteAnlass']),
        async initiateAnlassLoad() {
            this.loading = true;
            try {
                await this.loadAnlaesse();
            } catch (e) {
                this.error = e.message ? e.message : String(e);
            } finally {
                this.loading = false;
            }
            this.loading = false;
        },

        async onNewAnlassClick() {
            this.error = null;
            this.loading = true;
            try {
                let anlass = await this.newAnlass();
                this.$router.push({ name: 'anlass', params: { id: anlass.id } });
            } catch (e) {
                this.error = e.message ? e.message : String(e);
            } finally {
                this.loading = false;
            }
        },

        removeAnlass(id) {
            this.eventToDelete = id;
            this.showDelConfirmDlg = true;
        },

        delSelectedEvent() {
            let id = this.eventToDelete;
            this.showDelConfirmDlg = false;
            this.eventToDelete = null;
            this.deleteAnlass(id);
        },
    },
};
</script>
